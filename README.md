# 🏴󠁧󠁢󠁷󠁬󠁳󠁿 威尔士语学习平台

专为**英语使用者**设计的威尔士语快速入门平台，包含词根词缀分析、记忆技巧、扩展学习和Azure TTS发音。

## ✨ 功能特性

### 🎯 核心学习功能
- **每日词汇学习** - 精选高频威尔士语词汇
- **词根词缀分析** - 理解单词构成，加速记忆
- **记忆技巧** - 联想、图像、口诀等记忆方法
- **扩展学习** - 同义词、反义词、常用搭配、例句
- **Azure TTS发音** - 高质量语音合成，准确发音

### 🎛️ 个性化设置
- **学习模式调节** - 快速/平衡/深度三种模式
- **模块开关** - 可关闭不需要的学习模块
- **自动播放** - 自动播放单词发音
- **进度跟踪** - 实时学习进度显示

### 📱 技术特性
- **响应式设计** - 支持桌面、平板、手机
- **离线可用** - 核心功能支持离线使用
- **快速加载** - 优化性能，秒级加载
- **威尔士主题** - 红龙旗配色，沉浸式体验

## 🎯 目标用户

**英语熟练者**，想快速入门威尔士语，希望：
- 4周掌握100高频表达
- 能进行3分钟基础对话
- 掌握核心发音规则
- 了解威尔士文化/艺术

## 📁 项目结构

```
welsh-learning/
├── public/                    # 公开访问文件
│   ├── index.html            # 主页面
│   ├── css/
│   │   └── style.css         # 主样式
│   ├── js/
│   │   └── app.js            # 主应用逻辑
│   └── images/               # 图片资源
├── data/                     # 学习数据
│   └── words.json           # 词汇数据
├── scripts/                  # 工具脚本
│   └── generate-data.js     # 数据生成脚本
├── deploy/                   # 部署配置
│   └── deploy.sh            # 部署脚本
├── project.json             # 项目配置
└── README.md                # 项目文档
```

## 🚀 快速开始

### 本地运行
```bash
# 克隆项目
git clone <repository-url>
cd welsh-learning

# 本地测试
./deploy/deploy.sh test

# 或直接使用Python
cd public
python3 -m http.server 8080
```

访问: http://localhost:8080

### 部署到GitHub Pages
```bash
# 完整部署流程
./deploy/deploy.sh all

# 或分步执行
./deploy/deploy.sh check    # 检查依赖
./deploy/deploy.sh build    # 构建项目
./deploy/deploy.sh deploy   # 部署到GitHub Pages
```

## 📊 学习数据

### 词汇分类
1. **问候与寒暄** - 日常问候用语
2. **基础词汇** - 数字、颜色、时间等
3. **餐饮购物** - 餐厅、购物常用语
4. **出行问路** - 交通、方向、地点
5. **紧急求助** - 紧急情况表达

### 数据格式
```json
{
  "english": "hello",
  "welsh": "helo",
  "pronunciation": "HEH-lo",
  "prefix": "",
  "suffix": "-o (常见结尾)",
  "memoryHint": "和英语 hello 几乎一样，只是发音更短促",
  "extensions": {
    "synonyms": ["hi", "greetings"],
    "antonyms": ["goodbye"],
    "collocations": ["say hello", "hello there"],
    "sentence": "Helo, sut wyt ti? (Hello, how are you?)"
  },
  "ttsText": "helo",
  "category": "greetings"
}
```

## 🛠️ 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **样式**: 自定义CSS，威尔士主题配色
- **发音**: Azure Speech Services TTS
- **部署**: GitHub Pages
- **开发**: 纯静态，无需后端

## 🔧 自定义配置

### 修改主题色
编辑 `public/css/style.css` 中的CSS变量：
```css
:root {
  --welsh-red: #d21034;      /* 威尔士红 */
  --welsh-green: #008751;    /* 威尔士绿 */
  --welsh-white: #ffffff;    /* 白色 */
  --welsh-gold: #ffd700;     /* 金色 */
  --welsh-dark: #1a1a2e;     /* 深色 */
}
```

### 添加新词汇
编辑数据文件或使用脚本生成：
```bash
node scripts/generate-data.js
```

### 修改TTS服务
在 `public/js/app.js` 中修改：
```javascript
config: {
  api: {
    tts: 'https://your-tts-service.com/tts'  // 修改为你的TTS服务
  }
}
```

## 📈 学习路线

### 第1周：基础入门
- 掌握50个高频词汇
- 学习基本发音规则
- 能进行简单问候

### 第2周：日常表达
- 学习餐饮购物用语
- 掌握数字和时间表达
- 能进行基础对话

### 第3周：深入交流
- 学习出行问路表达
- 掌握常用短语和句型
- 能进行3分钟对话

### 第4周：文化融入
- 了解威尔士文化
- 学习文化艺术词汇
- 能理解简单文化内容

## 🤝 贡献指南

欢迎贡献！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 威尔士语学习资源提供者
- Azure Speech Services 团队
- 所有贡献者和用户

## 📞 支持与反馈

如有问题或建议，请：
1. 查看 [Issues](https://github.com/your-username/welsh-learning/issues)
2. 提交新的 Issue
3. 或通过邮件联系

---

**🏴󠁧󠁢󠁷󠁬󠁳󠁿 开始你的威尔士语学习之旅吧！**