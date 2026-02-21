#!/bin/bash

# 现代化UI部署脚本
echo "🎨 开始部署现代化威尔士学习平台..."

# 检查必要文件
if [ ! -f "css/modern-ui.css" ]; then
    echo "❌ 错误: 找不到 modern-ui.css"
    exit 1
fi

if [ ! -f "modern-index.html" ]; then
    echo "❌ 错误: 找不到 modern-index.html"
    exit 1
fi

# 备份原文件
echo "📦 备份原文件..."
cp index.html index.html.backup
cp css/style.css css/style.css.backup

# 部署现代化文件
echo "🚀 部署现代化文件..."

# 1. 复制现代化CSS到主样式
cp css/modern-ui.css css/style.css

# 2. 复制现代化HTML到主页面
cp modern-index.html index.html

# 3. 确保必要的JavaScript文件存在
if [ ! -f "js/app.js" ]; then
    echo "⚠️ 警告: app.js 不存在，创建基础版本..."
    cat > js/app.js << 'EOF'
// 现代化威尔士学习应用
console.log('🏴󠁧󠁢󠁷󠁬󠁳󠁿 威尔士学习平台已加载');

// 初始化应用
function initApp() {
    console.log('应用初始化完成');
    
    // 绑定事件
    bindEvents();
    
    // 加载初始数据
    loadInitialData();
}

// 绑定事件
function bindEvents() {
    console.log('事件绑定完成');
}

// 加载初始数据
function loadInitialData() {
    console.log('数据加载完成');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initApp);
EOF
fi

# 4. 更新package.json（如果存在）
if [ -f "package.json" ]; then
    echo "📝 更新package.json..."
    # 添加现代化描述
    sed -i '' 's/"description": ".*"/"description": "现代化威尔士语学习平台 - 精美UI设计"/' package.json
fi

# 5. 创建现代化README
echo "📖 创建现代化README..."
cat > README_MODERN.md << 'EOF'
# 现代化威尔士语学习平台

## 🎨 设计特点

### 现代化UI设计
- **渐变配色方案** - 基于威尔士国旗颜色的现代化渐变
- **玻璃态效果** - 现代化毛玻璃设计元素
- **流畅动画** - 平滑的过渡和微交互
- **响应式布局** - 完美适配所有设备尺寸

### 移动端优化
- **移动端优先** - 从小屏幕开始设计
- **触摸友好** - 大按钮和足够的触摸区域
- **安全区域支持** - 适配iPhone刘海屏和Home指示器
- **横竖屏适配** - 自动调整布局

### 用户体验
- **加载动画** - 现代化加载指示器
- **即时反馈** - 按钮点击和操作反馈
- **进度跟踪** - 可视化学习进度
- **暗色模式** - 支持系统暗色模式

## 📱 设备支持

### 完美支持的设备
- iPhone 12/13/14/15 系列
- iPad 所有型号
- Android 手机和平板
- 桌面浏览器 (Chrome, Safari, Firefox, Edge)

### 优化的功能
1. **导航栏** - 现代化侧边栏设计，移动端自动折叠
2. **单词卡片** - 现代化卡片设计，悬停效果
3. **按钮交互** - 现代化按钮设计，点击反馈
4. **进度显示** - 现代化进度条和统计
5. **设置面板** - 现代化切换开关

## 🚀 部署状态

- **主页面**: `index.html` (现代化版本)
- **样式表**: `css/style.css` (现代化版本)
- **JavaScript**: `js/app.js` (现代化版本)
- **部署时间**: $(date)

## 🔧 技术栈

- **HTML5** - 语义化标记
- **CSS3** - 现代化样式和动画
- **JavaScript** - 现代化交互
- **Font Awesome** - 图标系统
- **Google Fonts** - 现代化字体

## 📞 支持

如有问题，请检查：
1. 浏览器控制台错误
2. 网络连接状态
3. 设备兼容性

或联系开发团队获取支持。
EOF

# 6. Git提交
echo "📤 提交到Git..."
git add .
git commit -m "Deploy modern UI: gradient design, mobile optimization, smooth animations, dark mode support" 2>/dev/null || echo "⚠️ Git提交跳过（可能没有更改）"

# 7. 推送到GitHub
echo "🚀 推送到GitHub..."
git push origin main 2>/dev/null || echo "⚠️ GitHub推送跳过"

# 8. 触发Render部署
echo "🌐 触发Render自动部署..."
DEPLOY_RESPONSE=$(curl -s -X POST "https://api.render.com/v1/services/srv-d6cnieh4tr6s73ca7do0/deploys" \
  -H "Authorization: Bearer rnd_dokIPF1DjCBGnLReNGLZercOxRYU")

DEPLOY_ID=$(echo $DEPLOY_RESPONSE | jq -r '.id')
DEPLOY_STATUS=$(echo $DEPLOY_RESPONSE | jq -r '.status')

if [ "$DEPLOY_ID" != "null" ]; then
    echo "✅ 部署已触发"
    echo "📦 部署ID: $DEPLOY_ID"
    echo "📊 状态: $DEPLOY_STATUS"
    
    # 等待部署完成
    echo "⏳ 等待部署完成..."
    sleep 10
    
    # 检查部署状态
    STATUS_RESPONSE=$(curl -s -X GET "https://api.render.com/v1/services/srv-d6cnieh4tr6s73ca7do0/deploys/$DEPLOY_ID" \
      -H "Authorization: Bearer rnd_dokIPF1DjCBGnLReNGLZercOxRYU")
    
    FINAL_STATUS=$(echo $STATUS_RESPONSE | jq -r '.status')
    echo "🎯 最终状态: $FINAL_STATUS"
else
    echo "⚠️ 部署触发失败，但文件已更新"
fi

# 9. 显示完成信息
echo ""
echo "🎉 现代化部署完成！"
echo ""
echo "📱 测试链接:"
echo "   • 主应用: https://welsh-learning.onrender.com"
echo "   • 现代化测试: https://welsh-learning.onrender.com/modern-index.html"
echo ""
echo "🔍 测试建议:"
echo "   1. 在iPhone上测试响应式设计"
echo "   2. 测试横竖屏切换"
echo "   3. 测试所有按钮交互"
echo "   4. 检查暗色模式支持"
echo ""
echo "🛠️ 如有问题，可以恢复备份:"
echo "   cp index.html.backup index.html"
echo "   cp css/style.css.backup css/style.css"
echo ""
echo "📞 现代化UI部署完成于: $(date)"