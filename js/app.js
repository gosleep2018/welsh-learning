// Welsh Learning - 独立项目主应用
class WelshLearningApp {
  constructor() {
    this.config = {
      api: {
        tts: 'https://web-x0ya.onrender.com/tts'
      },
      tts: {
        voice: 'cy-GB-NiaNeural', // 威尔士语女性语音（Azure支持）
        language: 'cy-GB', // 威尔士语（英国）
        region: 'eastus' // Azure区域
      },
      settings: {
        showPrefixSuffix: true,
        showMemoryHints: true,
        showExtensions: true,
        autoPlayAudio: false,
        learningMode: 'balanced' // quick, balanced, deep
      },
      currentModule: 'dailyWords',
      currentWordIndex: 0
    };
    
    this.data = {
      dailyWords: [],
      commonPhrases: [],
      pronunciation: [],
      culture: []
    };
    
    this.init();
  }
  
  async init() {
    console.log('🏴󠁧󠁢󠁷󠁬󠁳󠁿 威尔士学习应用初始化...');
    
    try {
      // 先显示加载状态
      this.showLoading(true);
      
      // 初始化进度数据
      this.progressData = this.loadProgress();
      console.log('📊 进度数据加载完成');
      
      // 加载词汇数据（带超时）
      console.log('📦 开始加载词汇数据...');
      const dataLoaded = await this.loadDataWithTimeout();
      console.log('📦 词汇数据加载结果:', dataLoaded ? '成功' : '失败');
      
      // 验证数据完整性
      this.validateData();
      console.log('📦 单词数量:', this.data.dailyWords.length);
      
      // 从API加载服务器进度（如果可用，不阻塞主流程）
      this.loadServerProgress().catch(err => {
        console.warn('服务器进度加载失败，使用本地数据:', err);
      });
      
      // 初始化UI
      this.initUI();
      console.log('🎨 UI初始化完成');
      
      // 绑定基础事件
      this.bindEvents();
      console.log('🔗 基础事件绑定完成');
      
      // 绑定设置事件（等UI初始化完成）
      setTimeout(() => {
        this.bindSettingEvents();
      }, 100);
      
      // 显示初始内容
      console.log('🚀 开始显示学习内容...');
      this.showModule(this.config.currentModule);
      
      console.log('✅ 应用初始化完成');
    } catch (error) {
      console.error('❌ 应用初始化失败:', error);
      console.error('❌ 错误详情:', error.stack);
      this.showError('应用初始化失败: ' + error.message);
    } finally {
      // 隐藏加载状态
      this.showLoading(false);
      console.log('👋 加载状态隐藏完成');
    }
  }
  
  // 带超时的数据加载
  async loadDataWithTimeout() {
    const timeout = 5000; // 5秒超时
    
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('数据加载超时'));
      }, timeout);
      
      this.loadData()
        .then(() => {
          clearTimeout(timer);
          resolve();
        })
        .catch(err => {
          clearTimeout(timer);
          reject(err);
        });
    });
  }
  
  // 显示/隐藏加载状态
  showLoading(show) {
    const loadingElement = document.getElementById('loadingScreen');
    const mainContainer = document.getElementById('mainContainer');
    
    if (loadingElement && mainContainer) {
      if (show) {
        loadingElement.style.display = 'flex';
        mainContainer.style.display = 'none';
      } else {
        loadingElement.style.opacity = '0';
        setTimeout(() => {
          loadingElement.style.display = 'none';
          mainContainer.style.display = 'block';
        }, 500);
      }
    }
  }
  
  // 验证数据完整性
  validateData() {
    console.log('🔍 开始验证数据完整性...');
    
    const issues = [];
    
    // 检查数据对象
    if (!this.data) {
      issues.push('this.data 未定义');
      this.data = { dailyWords: [] };
    }
    
    if (!this.data.dailyWords) {
      issues.push('this.data.dailyWords 未定义');
      this.data.dailyWords = [];
    }
    
    if (!Array.isArray(this.data.dailyWords)) {
      issues.push('this.data.dailyWords 不是数组');
      this.data.dailyWords = [];
    }
    
    if (issues.length > 0) {
      console.warn('⚠️ 数据验证发现问题:', issues);
      return false;
    }
    
    console.log('✅ 数据验证通过');
    return true;
  }
  
  // 显示错误信息
  showError(message) {
    const container = document.getElementById('moduleContent');
    if (container) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px;">
          <div style="font-size: 3rem; color: #e74c3c; margin-bottom: 20px;">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <h3 style="color: #e74c3c; margin-bottom: 15px;">加载失败</h3>
          <p style="margin-bottom: 20px;">${message}</p>
          <button onclick="location.reload()" style="
            padding: 10px 20px;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          ">
            <i class="fas fa-redo"></i> 刷新页面
          </button>
        </div>
      `;
    }
  }
  
  // 从服务器加载进度
  async loadServerProgress() {
    try {
      if (window.welshAPI) {
        const result = await window.welshAPI.getUserProgress();
        if (result.success && result.data) {
          console.log('✅ 从服务器加载进度:', result.data);
          
          // 合并服务器进度到本地
          this.mergeServerProgress(result.data);
        }
      }
    } catch (error) {
      console.warn('无法从服务器加载进度，使用本地存储:', error);
    }
  }
  
  // 合并服务器进度
  mergeServerProgress(serverProgress) {
    // 这里可以根据需要实现服务器和本地进度的合并逻辑
    // 例如：如果服务器有更新的进度，覆盖本地进度
    console.log('合并服务器进度:', serverProgress);
  }
  
  async loadData() {
    console.log('📦 loadData() 开始执行...');
    
    try {
      // 硬编码的示例数据 - 确保总有数据
      const sampleWords = [
        {
          id: 1,
          english: "hello",
          welsh: "helo",
          pronunciation: "HEH-lo",
          prefix: "",
          suffix: "-o (常见结尾)",
          memoryHint: "和英语 hello 几乎一样，只是发音更短促",
          extensions: {
            synonyms: ["hi", "greetings"],
            antonyms: ["goodbye"],
            collocations: ["say hello", "hello there"],
            sentence: "Helo, sut wyt ti? (Hello, how are you?)"
          },
          ttsText: "helo",
          category: "greetings"
        },
        {
          id: 2,
          english: "thank you",
          welsh: "diolch",
          pronunciation: "DEE-olch",
          prefix: "di- (强调前缀)",
          suffix: "-olch (感谢后缀)",
          memoryHint: "联想：DEEp OLCH → 深深的感谢",
          extensions: {
            synonyms: ["thanks", "gratitude"],
            antonyms: ["ingratitude"],
            collocations: ["diolch yn fawr (非常感谢)"],
            sentence: "Diolch am eich help. (谢谢你的帮助。)"
          },
          ttsText: "diolch",
          category: "courtesy"
        },
        {
          id: 3,
          english: "water",
          welsh: "dŵr",
          pronunciation: "door",
          prefix: "",
          suffix: "ŵr (液体后缀)",
          memoryHint: "发音像英语 door，想象水从门里流出来",
          extensions: {
            synonyms: ["liquid", "aqua"],
            antonyms: ["fire"],
            collocations: ["tap water", "mineral water"],
            sentence: "Mae'r dŵr yn oer. (水是冷的。)"
          },
          ttsText: "dŵr",
          category: "basics"
        },
        {
          id: 4,
          english: "good",
          welsh: "da",
          pronunciation: "dah",
          prefix: "",
          suffix: "-a (形容词后缀)",
          memoryHint: "发音像中文'大'，想象'大的就是好的'",
          extensions: {
            synonyms: ["fine", "excellent"],
            antonyms: ["bad"],
            collocations: ["very good", "good morning"],
            sentence: "Mae'n dda iawn. (非常好。)"
          },
          ttsText: "da",
          category: "basics"
        },
        {
          id: 5,
          english: "house",
          welsh: "tŷ",
          pronunciation: "tee",
          prefix: "",
          suffix: "ŷ (名词后缀)",
          memoryHint: "发音像英语 tea，想象在房子里喝茶",
          extensions: {
            synonyms: ["home", "dwelling"],
            antonyms: ["outside"],
            collocations: ["big house", "house number"],
            sentence: "Mae'r tŷ yn fawr. (房子很大。)"
          },
          ttsText: "tŷ",
          category: "basics"
        }
      ];
      
      // 确保数据不为空
      this.data.dailyWords = sampleWords;
      console.log('📦 数据已赋值到 this.data.dailyWords');
      
      // 计算学习进度
      this.calculateProgress();
      
      console.log(`✅ 数据加载完成: ${this.data.dailyWords.length} 个单词`);
      console.log('📦 第一个单词:', this.data.dailyWords[0]?.english);
      return true;
    } catch (error) {
      console.error('❌ 数据加载失败，使用备用数据:', error);
      console.error('❌ 错误堆栈:', error.stack);
      
      // 使用最小化的备用数据
      this.data.dailyWords = [
        {
          id: 1,
          english: "hello",
          welsh: "helo",
          pronunciation: "HEH-lo",
          ttsText: "helo",
          category: "greetings"
        }
      ];
      console.log('📦 使用备用数据，数量:', this.data.dailyWords.length);
      
      this.calculateProgress();
      return false;
    }
  }
  
  initUI() {
    // 初始化设置控件
    this.updateSettingsUI();
    
    // 更新进度显示
    this.updateProgressUI();
    
    // 设置当前日期
    document.getElementById('currentDate').textContent = 
      new Date().toLocaleDateString('zh-CN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
      });
  }
  
  bindEvents() {
    console.log('🔗 开始绑定事件...');
    
    // 导航链接 - 这些元素在初始HTML中就存在
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('🔗 找到导航链接:', navLinks.length);
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const module = e.target.dataset.module || e.target.closest('.nav-link').dataset.module;
        console.log('🔗 导航点击:', module);
        this.showModule(module);
      });
    });
    
    // 设置切换 - 延迟绑定，等元素存在后再绑定
    this.bindSettingEvents();
    
    console.log('✅ 基础事件绑定完成');
  }
  
  // 绑定设置相关事件（在元素存在后调用）
  bindSettingEvents() {
    console.log('🔗 绑定设置事件...');
    
    const togglePrefix = document.getElementById('togglePrefix');
    const toggleMemory = document.getElementById('toggleMemory');
    const toggleExtensions = document.getElementById('toggleExtensions');
    const toggleAutoPlay = document.getElementById('toggleAutoPlay');
    const learningMode = document.getElementById('learningMode');
    
    if (togglePrefix) {
      togglePrefix.addEventListener('change', (e) => {
        this.config.settings.showPrefixSuffix = e.target.checked;
        this.renderCurrentWord();
      });
      console.log('✅ togglePrefix 事件绑定');
    }
    
    if (toggleMemory) {
      toggleMemory.addEventListener('change', (e) => {
        this.config.settings.showMemoryHints = e.target.checked;
        this.renderCurrentWord();
      });
      console.log('✅ toggleMemory 事件绑定');
    }
    
    if (toggleExtensions) {
      toggleExtensions.addEventListener('change', (e) => {
        this.config.settings.showExtensions = e.target.checked;
        this.renderCurrentWord();
      });
      console.log('✅ toggleExtensions 事件绑定');
    }
    
    if (toggleAutoPlay) {
      toggleAutoPlay.addEventListener('change', (e) => {
        this.config.settings.autoPlayAudio = e.target.checked;
      });
      console.log('✅ toggleAutoPlay 事件绑定');
    }
    
    if (learningMode) {
      learningMode.addEventListener('change', (e) => {
        this.config.settings.learningMode = e.target.value;
        this.applyLearningMode();
      });
      console.log('✅ learningMode 事件绑定');
    }
    
    // 导航按钮会在 showDailyWords() 中动态绑定
    console.log('✅ 设置事件绑定完成');
  }
  
  // 绑定单词导航按钮（在动态生成后调用）
  bindWordNavEvents() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prevWord());
      console.log('✅ prevBtn 事件绑定');
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextWord());
      console.log('✅ nextBtn 事件绑定');
    }
  }
  
  showModule(moduleName) {
    this.config.currentModule = moduleName;
    
    // 更新导航激活状态
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.module === moduleName);
    });
    
    // 更新模块标题
    const moduleTitles = {
      dailyWords: '每日威尔士语词汇',
      wordList: '威尔士语单词列表',
      commonPhrases: '常用短语',
      pronunciation: '发音练习',
      culture: '威尔士文化'
    };
    
    document.getElementById('moduleTitle').textContent = 
      moduleTitles[moduleName] || '威尔士语学习';
    
    // 显示对应内容
    if (moduleName === 'dailyWords') {
      this.showDailyWords();
    } else if (moduleName === 'wordList') {
      this.showWordList();
    } else {
      this.showComingSoon(moduleName);
    }
  }
  
  showDailyWords() {
    console.log('📖 showDailyWords() 被调用');
    console.log('📖 this.data:', this.data);
    console.log('📖 this.data.dailyWords:', this.data.dailyWords);
    console.log('📖 单词数据量:', this.data.dailyWords?.length || 0);
    
    const container = document.getElementById('moduleContent');
    if (!container) {
      console.error('❌ 找不到容器: moduleContent');
      console.error('❌ 检查HTML中是否有id="moduleContent"的元素');
      this.showError('页面元素加载失败，请刷新页面');
      return;
    }
    console.log('✅ 找到容器: moduleContent');
    
    // 如果数据为空，强制加载数据
    if (!this.data.dailyWords || this.data.dailyWords.length === 0) {
      console.warn('⚠️ 单词数据为空，立即重新加载数据');
      container.innerHTML = `
        <div class="loading">
          <div class="spinner"></div>
          <p>加载单词数据中...</p>
        </div>
      `;
      
      // 立即重新加载数据
      this.loadData().then((success) => {
        console.log('📦 重新加载数据结果:', success ? '成功' : '失败');
        console.log('📦 重新加载后数据量:', this.data.dailyWords.length);
        if (this.data.dailyWords.length > 0) {
          this.showDailyWords(); // 重新调用自己
        } else {
          this.showError('无法加载单词数据，请刷新页面');
        }
      }).catch(error => {
        console.error('❌ 重新加载数据失败:', error);
        this.showError('数据加载失败: ' + error.message);
      });
      return;
    }
    
    console.log('✅ 数据验证通过，开始显示单词');
    
    // 显示单词学习界面
    container.innerHTML = `
      <div class="word-learning">
        <div id="wordCardContainer"></div>
        <div class="nav-buttons">
          <button id="prevBtn" class="btn btn-prev">
            <i class="fas fa-arrow-left"></i> 上一个
          </button>
          <div class="word-counter">
            <span id="wordCounter">1 / ${this.data.dailyWords.length}</span>
          </div>
          <button id="nextBtn" class="btn btn-next">
            下一个 <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;
    
    // 重新绑定导航按钮
    this.bindWordNavEvents();
    
    // 显示当前单词
    this.config.currentWordIndex = 0;
    this.renderCurrentWord();
    
    // 自动播放（如果开启）
    if (this.config.settings.autoPlayAudio) {
      setTimeout(() => this.playCurrentWordAudio(), 800);
    }
  }
  
  renderCurrentWord() {
    const container = document.getElementById('wordCardContainer');
    if (!container || this.data.dailyWords.length === 0) return;
    
    const word = this.data.dailyWords[this.config.currentWordIndex];
    if (!word) return;
    
    let html = `
      <div class="word-card">
        <div class="word-header">
          <div class="word-text">
            <div class="word-english">${word.english}</div>
            <div class="word-welsh">${word.welsh}</div>
            <div class="pronunciation">发音: ${word.pronunciation}</div>
          </div>
          <div class="audio-controls">
            <button class="btn-audio" id="playCurrentWord">
              <i class="fas fa-volume-up"></i>
            </button>
            <div class="progress-controls" style="display: flex; gap: 10px; margin-left: 15px;">
              <button class="btn-progress" id="markForReview" style="padding: 8px 15px; background: #f39c12; color: white; border: none; border-radius: 5px; cursor: pointer;">
                <i class="fas fa-redo"></i> 需要复习
              </button>
              <button class="btn-progress" id="markAsMastered" style="padding: 8px 15px; background: #27ae60; color: white; border: none; border-radius: 5px; cursor: pointer;">
                <i class="fas fa-check-circle"></i> 已掌握
              </button>
            </div>
          </div>
        </div>
    `;
    
    // 词根词缀（根据设置显示）
    if (this.config.settings.showPrefixSuffix && (word.prefix || word.suffix)) {
      html += `
        <div class="enhanced-module">
          <div class="module-title">
            <i class="fas fa-puzzle-piece"></i> 词根词缀分析
          </div>
          <div class="prefix-suffix-grid">
            ${word.prefix ? `
              <div class="prefix-box">
                <strong>前缀:</strong> ${word.prefix}
              </div>
            ` : ''}
            ${word.suffix ? `
              <div class="suffix-box">
                <strong>后缀:</strong> ${word.suffix}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }
    
    // 记忆技巧（根据设置显示）
    if (this.config.settings.showMemoryHints && word.memoryHint) {
      html += `
        <div class="enhanced-module">
          <div class="module-title">
            <i class="fas fa-lightbulb"></i> 记忆技巧
          </div>
          <div class="memory-hint-box">
            ${word.memoryHint}
          </div>
        </div>
      `;
    }
    
    // 扩展学习（根据设置显示）
    if (this.config.settings.showExtensions && word.extensions) {
      html += `
        <div class="enhanced-module">
          <div class="module-title">
            <i class="fas fa-expand-alt"></i> 扩展学习
          </div>
          <div class="extensions-grid">
      `;
      
      if (word.extensions.synonyms) {
        html += `
          <div class="extension-card">
            <div class="extension-title">同义词</div>
            <div>${word.extensions.synonyms.join(', ')}</div>
          </div>
        `;
      }
      
      if (word.extensions.antonyms) {
        html += `
          <div class="extension-card">
            <div class="extension-title">反义词</div>
            <div>${word.extensions.antonyms.join(', ')}</div>
          </div>
        `;
      }
      
      if (word.extensions.collocations) {
        html += `
          <div class="extension-card">
            <div class="extension-title">常用搭配</div>
            <div>${word.extensions.collocations.join(', ')}</div>
          </div>
        `;
      }
      
      html += `</div>`;
      
      if (word.extensions.sentence) {
        html += `
          <div class="example-sentence">
            <strong>例句:</strong> ${word.extensions.sentence}
          </div>
        `;
      }
      
      html += `</div>`;
    }
    
    html += `</div>`;
    container.innerHTML = html;
    
    // 绑定播放按钮
    document.getElementById('playCurrentWord').addEventListener('click', () => 
      this.playCurrentWordAudio()
    );
    
    // 绑定进度控制按钮
    document.getElementById('markForReview').addEventListener('click', () => {
      const word = this.data.dailyWords[this.config.currentWordIndex];
      this.markWordForReview(word.id);
    });
    
    document.getElementById('markAsMastered').addEventListener('click', () => {
      const word = this.data.dailyWords[this.config.currentWordIndex];
      this.markWordAsMastered(word.id);
    });
    
    // 显示当前单词状态
    const wordStatus = this.getWordStatus(word.id);
    if (wordStatus === 'mastered') {
      document.getElementById('markAsMastered').innerHTML = '<i class="fas fa-check-double"></i> 已掌握';
      document.getElementById('markAsMastered').style.background = '#2ecc71';
      document.getElementById('markAsMastered').disabled = true;
    } else if (wordStatus === 'reviewed') {
      document.getElementById('markForReview').innerHTML = '<i class="fas fa-clock"></i> 复习中';
      document.getElementById('markForReview').style.background = '#e67e22';
    }
    
    // 更新计数器
    document.getElementById('wordCounter').textContent = 
      `${this.config.currentWordIndex + 1} / ${this.data.dailyWords.length}`;
    
    // 更新进度
    this.updateProgressUI();
  }
  
  playCurrentWordAudio() {
    const word = this.data.dailyWords[this.config.currentWordIndex];
    if (!word) return;
    
    const ttsUrl = `${this.config.api.tts}?text=${encodeURIComponent(word.ttsText)}&voice=${this.config.tts.voice}`;
    const audio = new Audio(ttsUrl);
    
    // 视觉反馈
    const btn = document.getElementById('playCurrentWord');
    if (btn) {
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      btn.disabled = true;
      
      audio.play().then(() => {
        audio.onended = () => {
          btn.innerHTML = originalHTML;
          btn.disabled = false;
        };
      }).catch(err => {
        console.error('❌ 音频播放失败:', err);
        btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
        btn.disabled = false;
        
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.disabled = false;
        }, 2000);
      });
    }
  }
  
  prevWord() {
    if (this.config.currentWordIndex > 0) {
      this.config.currentWordIndex--;
      this.renderCurrentWord();
      
      if (this.config.settings.autoPlayAudio) {
        setTimeout(() => this.playCurrentWordAudio(), 300);
      }
    }
  }
  
  nextWord() {
    if (this.config.currentWordIndex < this.data.dailyWords.length - 1) {
      this.config.currentWordIndex++;
      this.renderCurrentWord();
      
      if (this.config.settings.autoPlayAudio) {
        setTimeout(() => this.playCurrentWordAudio(), 300);
      }
    }
  }
  
  updateSettingsUI() {
    document.getElementById('togglePrefix').checked = this.config.settings.showPrefixSuffix;
    document.getElementById('toggleMemory').checked = this.config.settings.showMemoryHints;
    document.getElementById('toggleExtensions').checked = this.config.settings.showExtensions;
    document.getElementById('toggleAutoPlay').checked = this.config.settings.autoPlayAudio;
    document.getElementById('learningMode').value = this.config.settings.learningMode;
  }
  
  applyLearningMode() {
    switch(this.config.settings.learningMode) {
      case 'quick':
        this.config.settings.showPrefixSuffix = false;
        this.config.settings.showMemoryHints = true;
        this.config.settings.showExtensions = false;
        this.config.settings.autoPlayAudio = true;
        break;
      case 'balanced':
        this.config.settings.showPrefixSuffix = true;
        this.config.settings.showMemoryHints = true;
        this.config.settings.showExtensions = true;
        this.config.settings.autoPlayAudio = true;
        break;
      case 'deep':
        this.config.settings.showPrefixSuffix = true;
        this.config.settings.showMemoryHints = true;
        this.config.settings.showExtensions = true;
        this.config.settings.autoPlayAudio = true;
        // 深度模式可以添加更多功能
        break;
    }
    
    this.updateSettingsUI();
    this.renderCurrentWord();
  }
  
  calculateProgress() {
    // 从本地存储加载学习状态
    const progressData = this.loadProgress();
    const totalWords = this.data.dailyWords.length;
    
    // 计算已掌握单词数
    const masteredWords = progressData.masteredWords.length;
    const reviewedWords = progressData.reviewedWords.length;
    const totalLearned = new Set([...progressData.masteredWords, ...progressData.reviewedWords]).size;
    
    this.progress = {
      mastered: masteredWords,
      reviewed: reviewedWords,
      totalLearned: totalLearned,
      total: totalWords,
      percentage: Math.round((totalLearned / totalWords) * 100),
      streak: progressData.streak,
      lastStudyDate: progressData.lastStudyDate
    };
  }
  
  // 加载学习进度
  loadProgress() {
    const defaultProgress = {
      masteredWords: [],      // 完全掌握的单词ID
      reviewedWords: [],      // 复习过的单词ID
      learningHistory: [],    // 学习记录
      streak: 0,              // 连续学习天数
      lastStudyDate: null,    // 最后学习日期
      settings: this.config.settings
    };
    
    try {
      const saved = localStorage.getItem('welshLearningProgress');
      if (saved) {
        const parsed = JSON.parse(saved);
        
        // 检查是否需要重置连续天数
        if (parsed.lastStudyDate) {
          const lastDate = new Date(parsed.lastStudyDate);
          const today = new Date();
          const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) {
            parsed.streak += 1;
          } else if (diffDays > 1) {
            parsed.streak = 0;
          }
        }
        
        return { ...defaultProgress, ...parsed };
      }
    } catch (error) {
      console.error('加载进度失败:', error);
    }
    
    return defaultProgress;
  }
  
  // 保存学习进度
  saveProgress() {
    const progressData = {
      masteredWords: this.progressData.masteredWords,
      reviewedWords: this.progressData.reviewedWords,
      learningHistory: this.progressData.learningHistory,
      streak: this.progress.streak,
      lastStudyDate: new Date().toISOString(),
      settings: this.config.settings,
      updatedAt: new Date().toISOString()
    };
    
    try {
      localStorage.setItem('welshLearningProgress', JSON.stringify(progressData));
      console.log('✅ 进度已保存');
    } catch (error) {
      console.error('保存进度失败:', error);
    }
  }
  
  // 标记单词为已掌握
  async markWordAsMastered(wordId) {
    if (!this.progressData.masteredWords.includes(wordId)) {
      this.progressData.masteredWords.push(wordId);
      
      // 从复习列表中移除（如果存在）
      this.progressData.reviewedWords = this.progressData.reviewedWords.filter(id => id !== wordId);
      
      // 记录学习历史
      this.progressData.learningHistory.push({
        wordId: wordId,
        action: 'mastered',
        timestamp: new Date().toISOString()
      });
      
      // 保存到本地
      this.saveProgress();
      
      // 同步到服务器（如果可用）
      try {
        if (window.welshAPI) {
          await window.welshAPI.updateWordStatus(wordId, 'mastered');
        }
      } catch (error) {
        console.warn('同步到服务器失败:', error);
      }
      
      this.updateProgressUI();
      
      // 显示成功反馈
      this.showToast('🎉 单词已标记为已掌握！', 'success');
    }
  }
  
  // 标记单词为需要复习
  async markWordForReview(wordId) {
    if (!this.progressData.reviewedWords.includes(wordId) && 
        !this.progressData.masteredWords.includes(wordId)) {
      this.progressData.reviewedWords.push(wordId);
      
      this.progressData.learningHistory.push({
        wordId: wordId,
        action: 'reviewed',
        timestamp: new Date().toISOString()
      });
      
      // 保存到本地
      this.saveProgress();
      
      // 同步到服务器（如果可用）
      try {
        if (window.welshAPI) {
          await window.welshAPI.updateWordStatus(wordId, 'reviewed');
        }
      } catch (error) {
        console.warn('同步到服务器失败:', error);
      }
      
      this.updateProgressUI();
      
      this.showToast('📝 单词已加入复习列表', 'info');
    }
  }
  
  // 获取单词学习状态
  getWordStatus(wordId) {
    if (this.progressData.masteredWords.includes(wordId)) {
      return 'mastered';
    } else if (this.progressData.reviewedWords.includes(wordId)) {
      return 'reviewed';
    } else {
      return 'new';
    }
  }
  
  updateProgressUI() {
    this.calculateProgress();
    
    // 更新进度条
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
      progressFill.style.width = `${this.progress.percentage}%`;
    }
    
    // 更新进度文本
    const progressText = document.getElementById('progressText');
    if (progressText) {
      progressText.innerHTML = `
        <div style="margin-bottom: 5px;">
          <strong>进度:</strong> ${this.progress.totalLearned}/${this.progress.total} 单词 (${this.progress.percentage}%)
        </div>
        <div style="font-size: 0.9rem; color: #666;">
          <span style="color: #27ae60;">✓ 已掌握: ${this.progress.mastered}</span> | 
          <span style="color: #f39c12;">📝 需复习: ${this.progress.reviewed}</span> | 
          <span style="color: #3498db;">🔥 连续: ${this.progress.streak}天</span>
        </div>
      `;
    }
    
    // 更新侧边栏统计
    const statsElement = document.getElementById('progressStats');
    if (statsElement) {
      statsElement.innerHTML = `
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value" style="color: #27ae60;">${this.progress.mastered}</div>
            <div class="stat-label">已掌握</div>
          </div>
          <div class="stat-item">
            <div class="stat-value" style="color: #f39c12;">${this.progress.reviewed}</div>
            <div class="stat-label">需复习</div>
          </div>
          <div class="stat-item">
            <div class="stat-value" style="color: #e74c3c;">${this.progress.total - this.progress.totalLearned}</div>
            <div class="stat-label">未学习</div>
          </div>
          <div class="stat-item">
            <div class="stat-value" style="color: #3498db;">${this.progress.streak}</div>
            <div class="stat-label">连续天数</div>
          </div>
        </div>
      `;
    }
  }
  
  // 显示通知
  showToast(message, type = 'info') {
    // 移除现有通知
    const existingToast = document.getElementById('learningToast');
    if (existingToast) existingToast.remove();
    
    // 创建新通知
    const toast = document.createElement('div');
    toast.id = 'learningToast';
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
      color: white;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      z-index: 10000;
      animation: slideIn 0.3s ease;
      max-width: 300px;
    `;
    
    toast.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <div>${message}</div>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // 3秒后自动消失
    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }
    }, 3000);
  }
  
  // 显示单词列表
  showWordList() {
    console.log('📋 显示单词列表');
    
    const container = document.getElementById('moduleContent');
    if (!container) return;
    
    if (this.data.dailyWords.length === 0) {
      container.innerHTML = `
        <div class="loading">
          <div class="spinner"></div>
          <p>加载单词数据中...</p>
        </div>
      `;
      return;
    }
    
    // 按类别分组
    const wordsByCategory = {};
    this.data.dailyWords.forEach(word => {
      if (!wordsByCategory[word.category]) {
        wordsByCategory[word.category] = [];
      }
      wordsByCategory[word.category].push(word);
    });
    
    let html = `
      <div class="word-list-container">
        <div class="word-list-header">
          <h3 style="color: var(--welsh-red); margin-bottom: 20px;">
            <i class="fas fa-book"></i> 威尔士语单词库
          </h3>
          <p style="margin-bottom: 25px; color: #666;">
            共 ${this.data.dailyWords.length} 个单词，按类别分组。点击发音按钮听威尔士语发音。
          </p>
        </div>
    `;
    
    // 为每个类别创建表格
    Object.keys(wordsByCategory).forEach(category => {
      const words = wordsByCategory[category];
      const categoryName = this.getCategoryName(category);
      
      html += `
        <div class="category-section" style="margin-bottom: 30px;">
          <h4 style="color: var(--welsh-green); margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid var(--welsh-gold);">
            <i class="fas fa-folder"></i> ${categoryName} (${words.length}个)
          </h4>
          
          <div class="word-table-container" style="overflow-x: auto;">
            <table class="word-table" style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f8f9fa;">
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">英语</th>
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">威尔士语</th>
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">发音</th>
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">类别</th>
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">操作</th>
                </tr>
              </thead>
              <tbody>
      `;
      
      words.forEach((word, index) => {
        const wordStatus = this.getWordStatus(word.id);
        const statusColor = wordStatus === 'mastered' ? '#27ae60' : 
                          wordStatus === 'reviewed' ? '#f39c12' : '#95a5a6';
        const statusText = wordStatus === 'mastered' ? '已掌握' : 
                         wordStatus === 'reviewed' ? '需复习' : '未学习';
        
        html += `
          <tr style="border-bottom: 1px solid #eee; ${index % 2 === 0 ? 'background: #f8f9fa;' : ''}">
            <td style="padding: 12px; font-weight: bold;">${word.english}</td>
            <td style="padding: 12px; color: var(--welsh-red); font-weight: bold; font-size: 1.1rem;">${word.welsh}</td>
            <td style="padding: 12px; color: #666; font-style: italic;">${word.pronunciation}</td>
            <td style="padding: 12px;">
              <span style="display: inline-block; padding: 4px 10px; background: #e8f4fc; border-radius: 15px; font-size: 0.85rem;">
                ${categoryName}
              </span>
            </td>
            <td style="padding: 12px;">
              <div style="display: flex; gap: 10px; align-items: center;">
                <button class="btn-play-audio" data-word-id="${word.id}" style="
                  padding: 6px 12px;
                  background: var(--welsh-green);
                  color: white;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  gap: 5px;
                ">
                  <i class="fas fa-volume-up"></i> 发音
                </button>
                <span style="padding: 4px 10px; background: ${statusColor}; color: white; border-radius: 15px; font-size: 0.85rem;">
                  ${statusText}
                </span>
              </div>
            </td>
          </tr>
        `;
      });
      
      html += `
              </tbody>
            </table>
          </div>
        </div>
      `;
    });
    
    html += `
        <div class="word-list-summary" style="
          background: #f8f9fa;
          padding: 20px;
          border-radius: 10px;
          margin-top: 30px;
          border-left: 4px solid var(--welsh-red);
        ">
          <h4 style="color: var(--welsh-red); margin-bottom: 10px;">
            <i class="fas fa-chart-bar"></i> 学习统计
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
            <div style="text-align: center;">
              <div style="font-size: 1.8rem; font-weight: bold; color: var(--welsh-red);">${this.data.dailyWords.length}</div>
              <div style="color: #666; font-size: 0.9rem;">总单词数</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 1.8rem; font-weight: bold; color: #27ae60;">${this.progress?.mastered || 0}</div>
              <div style="color: #666; font-size: 0.9rem;">已掌握</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 1.8rem; font-weight: bold; color: #f39c12;">${this.progress?.reviewed || 0}</div>
              <div style="color: #666; font-size: 0.9rem;">需复习</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 1.8rem; font-weight: bold; color: #3498db;">${this.progress?.streak || 0}</div>
              <div style="color: #666; font-size: 0.9rem;">连续天数</div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    container.innerHTML = html;
    
    // 绑定发音按钮事件
    this.bindWordListAudioButtons();
  }
  
  // 获取类别名称
  getCategoryName(categoryKey) {
    const categoryNames = {
      'greetings': '问候语',
      'courtesy': '礼貌用语',
      'basics': '基础词汇',
      'food': '餐饮食物',
      'numbers': '数字',
      'default': '其他'
    };
    
    return categoryNames[categoryKey] || categoryKey;
  }
  
  // 绑定单词列表发音按钮
  bindWordListAudioButtons() {
    document.querySelectorAll('.btn-play-audio').forEach(button => {
      button.addEventListener('click', (e) => {
        const wordId = parseInt(e.target.closest('.btn-play-audio').dataset.wordId);
        const word = this.data.dailyWords.find(w => w.id === wordId);
        
        if (word) {
          this.playWordAudio(word);
          
          // 视觉反馈
          const originalHTML = button.innerHTML;
          button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 播放中';
          button.disabled = true;
          
          setTimeout(() => {
            button.innerHTML = originalHTML;
            button.disabled = false;
          }, 2000);
        }
      });
    });
  }
  
  // 播放单词音频
  playWordAudio(word) {
    if (!word || !word.ttsText) return;
    
    const ttsUrl = `${this.config.api.tts}?text=${encodeURIComponent(word.ttsText)}&voice=${this.config.tts.voice}`;
    const audio = new Audio(ttsUrl);
    
    audio.play().catch(err => {
      console.error('❌ 音频播放失败:', err);
      this.showToast('发音播放失败，请检查网络连接', 'error');
    });
  }
  
  showComingSoon(moduleName) {
    const container = document.getElementById('moduleContent');
    const moduleNames = {
      commonPhrases: '常用短语',
      pronunciation: '发音练习',
      culture: '威尔士文化'
    };
    
    container.innerHTML = `
      <div class="text-center mt-20 mb-20">
        <div style="font-size: 4rem; color: var(--welsh-gold); margin-bottom: 20px;">
          <i class="fas fa-tools"></i>
        </div>
        <h2 style="color: var(--welsh-red); margin-bottom: 15px;">
          ${moduleNames[moduleName] || moduleName} 模块
        </h2>
        <p style="font-size: 1.2rem; margin-bottom: 30px;">
          正在开发中，即将推出...
        </p>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-top: 20px;">
          <p>这个模块正在积极开发中，很快就会推出！</p>
        </div>
      </div>
    `;
  }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', function() {
  // 检查是否已经初始化
  if (!window.app) {
    console.log('🚀 正在初始化威尔士学习应用...');
    window.app = new WelshLearningApp();
  }
});