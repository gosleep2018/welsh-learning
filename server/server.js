const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// 创建应用
const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 数据库初始化
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// 初始化数据库表
function initDatabase() {
  db.serialize(() => {
    // 用户表
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password_hash TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME
      )
    `);
    
    // 学习进度表
    db.run(`
      CREATE TABLE IF NOT EXISTS learning_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        word_id INTEGER,
        status TEXT CHECK(status IN ('new', 'reviewed', 'mastered')),
        review_count INTEGER DEFAULT 0,
        last_reviewed DATETIME,
        next_review DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        UNIQUE(user_id, word_id)
      )
    `);
    
    // 学习历史表
    db.run(`
      CREATE TABLE IF NOT EXISTS learning_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        word_id INTEGER,
        action TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        details TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
    
    // 用户统计表
    db.run(`
      CREATE TABLE IF NOT EXISTS user_stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER UNIQUE,
        total_words INTEGER DEFAULT 0,
        mastered_words INTEGER DEFAULT 0,
        reviewed_words INTEGER DEFAULT 0,
        learning_streak INTEGER DEFAULT 0,
        last_study_date DATETIME,
        total_study_time INTEGER DEFAULT 0,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
    
    console.log('✅ 数据库初始化完成');
  });
}

// API路由

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'Welsh Learning API'
  });
});

// 获取用户进度
app.get('/api/progress/:userId', (req, res) => {
  const userId = req.params.userId;
  
  db.get(`
    SELECT 
      us.total_words,
      us.mastered_words,
      us.reviewed_words,
      us.learning_streak,
      us.last_study_date,
      us.total_study_time,
      (SELECT COUNT(*) FROM learning_progress WHERE user_id = ? AND status = 'mastered') as mastered_count,
      (SELECT COUNT(*) FROM learning_progress WHERE user_id = ? AND status = 'reviewed') as reviewed_count,
      (SELECT COUNT(*) FROM learning_progress WHERE user_id = ?) as total_learned
    FROM user_stats us
    WHERE us.user_id = ?
  `, [userId, userId, userId, userId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (row) {
      res.json({
        success: true,
        data: {
          totalWords: row.total_words || 0,
          masteredWords: row.mastered_count || 0,
          reviewedWords: row.reviewed_count || 0,
          totalLearned: row.total_learned || 0,
          streak: row.learning_streak || 0,
          lastStudyDate: row.last_study_date,
          totalStudyTime: row.total_study_time || 0,
          percentage: row.total_words ? Math.round((row.total_learned / row.total_words) * 100) : 0
        }
      });
    } else {
      // 用户没有统计记录，创建默认记录
      res.json({
        success: true,
        data: {
          totalWords: 0,
          masteredWords: 0,
          reviewedWords: 0,
          totalLearned: 0,
          streak: 0,
          lastStudyDate: null,
          totalStudyTime: 0,
          percentage: 0
        }
      });
    }
  });
});

// 更新单词状态
app.post('/api/progress/:userId/word/:wordId', (req, res) => {
  const { userId, wordId } = req.params;
  const { status, reviewCount = 0 } = req.body;
  
  if (!['new', 'reviewed', 'mastered'].includes(status)) {
    res.status(400).json({ error: '无效的状态值' });
    return;
  }
  
  const now = new Date().toISOString();
  
  // 开始事务
  db.serialize(() => {
    db.run('BEGIN TRANSACTION');
    
    // 更新或插入进度记录
    db.run(`
      INSERT OR REPLACE INTO learning_progress 
      (user_id, word_id, status, review_count, last_reviewed, next_review)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      userId,
      wordId,
      status,
      reviewCount,
      now,
      status === 'reviewed' ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() : null
    ], function(err) {
      if (err) {
        db.run('ROLLBACK');
        res.status(500).json({ error: err.message });
        return;
      }
      
      // 记录学习历史
      db.run(`
        INSERT INTO learning_history (user_id, word_id, action, details)
        VALUES (?, ?, ?, ?)
      `, [userId, wordId, `word_${status}`, JSON.stringify({ status, reviewCount })], (err) => {
        if (err) {
          db.run('ROLLBACK');
          res.status(500).json({ error: err.message });
          return;
        }
        
        // 更新用户统计
        updateUserStats(userId, (err) => {
          if (err) {
            db.run('ROLLBACK');
            res.status(500).json({ error: err.message });
            return;
          }
          
          db.run('COMMIT');
          res.json({
            success: true,
            message: '进度更新成功',
            data: {
              wordId,
              status,
              updatedAt: now
            }
          });
        });
      });
    });
  });
});

// 获取需要复习的单词
app.get('/api/progress/:userId/review', (req, res) => {
  const userId = req.params.userId;
  const limit = req.query.limit || 10;
  
  db.all(`
    SELECT 
      lp.word_id,
      lp.status,
      lp.review_count,
      lp.last_reviewed,
      lp.next_review
    FROM learning_progress lp
    WHERE lp.user_id = ? 
      AND lp.status = 'reviewed'
      AND (lp.next_review IS NULL OR lp.next_review <= ?)
    ORDER BY lp.next_review ASC, lp.last_reviewed ASC
    LIMIT ?
  `, [userId, new Date().toISOString(), limit], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    res.json({
      success: true,
      data: {
        reviewWords: rows,
        count: rows.length
      }
    });
  });
});

// 获取学习历史
app.get('/api/progress/:userId/history', (req, res) => {
  const userId = req.params.userId;
  const limit = req.query.limit || 50;
  const offset = req.query.offset || 0;
  
  db.all(`
    SELECT 
      lh.id,
      lh.word_id,
      lh.action,
      lh.timestamp,
      lh.details
    FROM learning_history lh
    WHERE lh.user_id = ?
    ORDER BY lh.timestamp DESC
    LIMIT ? OFFSET ?
  `, [userId, limit, offset], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    res.json({
      success: true,
      data: {
        history: rows,
        count: rows.length
      }
    });
  });
});

// 更新用户统计
function updateUserStats(userId, callback) {
  const now = new Date().toISOString();
  
  // 获取当前统计
  db.get(`
    SELECT 
      COUNT(DISTINCT word_id) as total_learned,
      SUM(CASE WHEN status = 'mastered' THEN 1 ELSE 0 END) as mastered_count,
      SUM(CASE WHEN status = 'reviewed' THEN 1 ELSE 0 END) as reviewed_count
    FROM learning_progress
    WHERE user_id = ?
  `, [userId], (err, row) => {
    if (err) {
      callback(err);
      return;
    }
    
    // 检查连续学习天数
    db.get(`
      SELECT last_study_date, learning_streak
      FROM user_stats
      WHERE user_id = ?
    `, [userId], (err, statsRow) => {
      if (err) {
        callback(err);
        return;
      }
      
      let streak = 0;
      if (statsRow && statsRow.last_study_date) {
        const lastDate = new Date(statsRow.last_study_date);
        const today = new Date();
        const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
          streak = statsRow.learning_streak || 0;
        } else if (diffDays === 1) {
          streak = (statsRow.learning_streak || 0) + 1;
        }
      } else {
        streak = 1; // 第一次学习
      }
      
      // 更新或插入统计记录
      db.run(`
        INSERT OR REPLACE INTO user_stats 
        (user_id, total_words, mastered_words, reviewed_words, learning_streak, last_study_date, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        userId,
        row ? row.total_learned : 0,
        row ? row.mastered_count : 0,
        row ? row.reviewed_count : 0,
        streak,
        now,
        now
      ], (err) => {
        callback(err);
      });
    });
  });
}

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('API错误:', err);
  res.status(500).json({ 
    success: false, 
    error: '服务器内部错误',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404处理
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'API端点不存在' 
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 威尔士学习API服务运行在 http://localhost:${PORT}`);
  console.log(`📊 健康检查: http://localhost:${PORT}/api/health`);
  
  // 初始化数据库
  initDatabase();
});

module.exports = app;