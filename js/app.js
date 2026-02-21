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
          chinese: "你好",
          welsh: "helo",
          pronunciation: "HEH-lo",
          prefix: "",
          suffix: "-o (常见结尾)",
          memoryHint: "和英语 hello 几乎一样，只是发音更短促",
          extensions: {
            synonyms: ["hi", "greetings"],
            antonyms: ["goodbye"],
            collocations: ["say hello", "hello there"],
            sentence: "Helo, sut wyt ti? (Hello, how are you?)",
            sentenceTts: "Helo, sut wyt ti?"  // 例句的TTS文本
          },
          ttsText: "helo",
          category: "greetings"
        },
        {
          id: 2,
          english: "thank you",
          chinese: "谢谢",
          welsh: "diolch",
          pronunciation: "DEE-olch",
          prefix: "di- (强调前缀)",
          suffix: "-olch (感谢后缀)",
          memoryHint: "联想：DEEp OLCH → 深深的感谢",
          extensions: {
            synonyms: ["thanks", "gratitude"],
            antonyms: ["ingratitude"],
            collocations: ["diolch yn fawr (非常感谢)"],
            sentence: "Diolch am eich help. (谢谢你的帮助。)",
            sentenceTts: "Diolch am eich help."
          },
          ttsText: "diolch",
          category: "courtesy"
        },
        {
          id: 3,
          english: "water",
          chinese: "水",
          welsh: "dŵr",
          pronunciation: "door",
          prefix: "",
          suffix: "ŵr (液体后缀)",
          memoryHint: "发音像英语 door，想象水从门里流出来",
          extensions: {
            synonyms: ["liquid", "aqua"],
            antonyms: ["fire"],
            collocations: ["tap water", "mineral water"],
            sentence: "Mae'r dŵr yn oer. (水是冷的。)",
            sentenceTts: "Mae'r dŵr yn oer."
          },
          ttsText: "dŵr",
          category: "basics"
        },
        {
          id: 4,
          english: "good",
          chinese: "好",
          welsh: "da",
          pronunciation: "dah",
          prefix: "",
          suffix: "-a (形容词后缀)",
          memoryHint: "发音像中文'大'，想象'大的就是好的'",
          extensions: {
            synonyms: ["fine", "excellent"],
            antonyms: ["bad"],
            collocations: ["very good", "good morning"],
            sentence: "Mae'n dda iawn. (非常好。)",
            sentenceTts: "Mae'n dda iawn."
          },
          ttsText: "da",
          category: "basics"
        },
        {
          id: 5,
          english: "house",
          chinese: "房子",
          welsh: "tŷ",
          pronunciation: "tee",
          prefix: "",
          suffix: "ŷ (名词后缀)",
          memoryHint: "发音像英语 tea，想象在房子里喝茶",
          extensions: {
            synonyms: ["home", "dwelling"],
            antonyms: ["outside"],
            collocations: ["big house", "house number"],
            sentence: "Mae'r tŷ yn fawr. (房子很大。)",
            sentenceTts: "Mae'r tŷ yn fawr."
          },
          ttsText: "tŷ",
          category: "basics"
        },
        // 添加更多词汇用于搜索
        {
          id: 6,
          english: "morning",
          chinese: "早晨",
          welsh: "bore",
          pronunciation: "BOR-eh",
          prefix: "",
          suffix: "-e (名词后缀)",
          memoryHint: "发音像 'bore'（无聊），但早晨不无聊",
          extensions: {
            synonyms: ["dawn", "sunrise"],
            antonyms: ["evening"],
            collocations: ["good morning", "morning coffee"],
            sentence: "Bore da! (早上好！)",
            sentenceTts: "Bore da!"
          },
          ttsText: "bore",
          category: "time"
        },
        {
          id: 7,
          english: "night",
          chinese: "夜晚",
          welsh: "nos",
          pronunciation: "nohs",
          prefix: "",
          suffix: "-os (名词后缀)",
          memoryHint: "发音像 'nose'（鼻子），晚上睡觉鼻子要呼吸",
          extensions: {
            synonyms: ["evening", "darkness"],
            antonyms: ["day"],
            collocations: ["good night", "night time"],
            sentence: "Nos da! (晚安！)",
            sentenceTts: "Nos da!"
          },
          ttsText: "nos",
          category: "time"
        },
        {
          id: 8,
          english: "bread",
          chinese: "面包",
          welsh: "bara",
          pronunciation: "BAH-rah",
          prefix: "",
          suffix: "-a (名词后缀)",
          memoryHint: "发音像 'bar'（酒吧）+ 'ah'，想象在酒吧吃面包",
          extensions: {
            synonyms: ["loaf"],
            antonyms: [""],
            collocations: ["bara brith (威尔士水果面包)", "fresh bread"],
            sentence: "Dw i eisiau bara. (我想要面包。)",
            sentenceTts: "Dw i eisiau bara."
          },
          ttsText: "bara",
          category: "food"
        },
        {
          id: 9,
          english: "coffee",
          chinese: "咖啡",
          welsh: "coffi",
          pronunciation: "KOF-ee",
          prefix: "",
          suffix: "-i (名词后缀)",
          memoryHint: "和英语 coffee 几乎一样，只是发音更短",
          extensions: {
            synonyms: ["java", "brew"],
            antonyms: ["tea"],
            collocations: ["morning coffee", "coffee shop"],
            sentence: "Coffi, os gwelwch yn dda. (请给我咖啡。)",
            sentenceTts: "Coffi, os gwelwch yn dda."
          },
          ttsText: "coffi",
          category: "food"
        },
        {
          id: 10,
          english: "please",
          chinese: "请",
          welsh: "os gwelwch yn dda",
          pronunciation: "os GWELL-ooch un THAH",
          prefix: "os (如果)",
          suffix: "da (好)",
          memoryHint: "字面意思：'如果你觉得好'，比较正式的说法",
          extensions: {
            synonyms: ["if you please"],
            antonyms: ["demand"],
            collocations: ["please sit down", "please wait"],
            sentence: "Coffi, os gwelwch yn dda. (请给我咖啡。)",
            sentenceTts: "Coffi, os gwelwch yn dda."
          },
          ttsText: "os gwelwch yn dda",
          category: "courtesy"
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
      search: '搜索翻译',
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
    } else if (moduleName === 'search') {
      this.showSearch();
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
        const hasSentenceTts = word.extensions.sentenceTts && word.extensions.sentenceTts.trim() !== '';
        
        html += `
          <div class="example-sentence">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <strong>例句:</strong>
              ${hasSentenceTts ? `
                <button class="btn-sentence-audio" data-word-id="${word.id}" style="
                  padding: 4px 10px;
                  background: var(--welsh-green);
                  color: white;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
                  font-size: 0.85rem;
                  display: flex;
                  align-items: center;
                  gap: 5px;
                ">
                  <i class="fas fa-volume-up"></i> 听例句
                </button>
              ` : ''}
            </div>
            <div>${word.extensions.sentence}</div>
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
    
    // 绑定例句发音按钮
    const sentenceAudioBtn = document.querySelector('.btn-sentence-audio');
    if (sentenceAudioBtn) {
      sentenceAudioBtn.addEventListener('click', () => {
        const word = this.data.dailyWords[this.config.currentWordIndex];
        this.playSentenceAudio(word);
      });
    }
    
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
  
  // 播放例句音频
  playSentenceAudio(word) {
    if (!word || !word.extensions || !word.extensions.sentenceTts) {
      console.warn('❌ 例句没有TTS文本:', word);
      this.showToast('此例句暂无发音', 'warning');
      return;
    }
    
    const ttsUrl = `${this.config.api.tts}?text=${encodeURIComponent(word.extensions.sentenceTts)}&voice=${this.config.tts.voice}`;
    const audio = new Audio(ttsUrl);
    
    // 视觉反馈
    const btn = document.querySelector('.btn-sentence-audio');
    if (btn) {
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 播放中';
      btn.disabled = true;
      
      audio.play().then(() => {
        audio.onended = () => {
          btn.innerHTML = originalHTML;
          btn.disabled = false;
        };
      }).catch(err => {
        console.error('❌ 例句音频播放失败:', err);
        btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> 失败';
        btn.disabled = false;
        
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.disabled = false;
        }, 2000);
        
        this.showToast('例句发音播放失败', 'error');
      });
    } else {
      audio.play().catch(err => {
        console.error('❌ 例句音频播放失败:', err);
        this.showToast('例句发音播放失败', 'error');
      });
    }
  }
  
  // 显示搜索翻译界面
  showSearch() {
    console.log('🔍 显示搜索翻译界面');
    
    const container = document.getElementById('moduleContent');
    if (!container) return;
    
    container.innerHTML = `
      <div class="search-container">
        <div class="search-header" style="text-align: center; margin-bottom: 30px;">
          <h3 style="color: var(--welsh-red); margin-bottom: 15px;">
            <i class="fas fa-search"></i> 威尔士语搜索翻译
          </h3>
          <p style="color: #666; margin-bottom: 25px;">
            输入中文或英文，搜索威尔士语翻译、发音和例句
          </p>
        </div>
        
        <div class="search-box" style="
          max-width: 600px;
          margin: 0 auto 30px;
          background: white;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        ">
          <div style="display: flex; gap: 10px; margin-bottom: 15px;">
            <input type="text" 
                   id="searchInput" 
                   placeholder="输入中文或英文，如：hello、你好、咖啡..."
                   style="
                     flex: 1;
                     padding: 12px 15px;
                     border: 2px solid #dee2e6;
                     border-radius: 8px;
                     font-size: 1rem;
                     outline: none;
                     transition: border-color 0.3s;
                   "
                   onfocus="this.style.borderColor='var(--welsh-green)'"
                   onblur="this.style.borderColor='#dee2e6'">
            <button id="searchButton" style="
              padding: 12px 25px;
              background: var(--welsh-green);
              color: white;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              font-weight: bold;
              display: flex;
              align-items: center;
              gap: 8px;
              transition: all 0.3s;
            ">
              <i class="fas fa-search"></i> 搜索
            </button>
          </div>
          
          <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
            <button class="quick-search" data-search="hello" style="
              padding: 8px 15px;
              background: #e8f4fc;
              border: 1px solid #3498db;
              color: #3498db;
              border-radius: 20px;
              cursor: pointer;
              font-size: 0.9rem;
              transition: all 0.3s;
            ">
              你好
            </button>
            <button class="quick-search" data-search="thank you" style="
              padding: 8px 15px;
              background: #e8f4fc;
              border: 1px solid #3498db;
              color: #3498db;
              border-radius: 20px;
              cursor: pointer;
              font-size: 0.9rem;
              transition: all 0.3s;
            ">
              谢谢
            </button>
            <button class="quick-search" data-search="water" style="
              padding: 8px 15px;
              background: #e8f4fc;
              border: 1px solid #3498db;
              color: #3498db;
              border-radius: 20px;
              cursor: pointer;
              font-size: 0.9rem;
              transition: all 0.3s;
            ">
              水
            </button>
            <button class="quick-search" data-search="good morning" style="
              padding: 8px 15px;
              background: #e8f4fc;
              border: 1px solid #3498db;
              color: #3498db;
              border-radius: 20px;
              cursor: pointer;
              font-size: 0.9rem;
              transition: all 0.3s;
            ">
              早上好
            </button>
            <button class="quick-search" data-search="coffee" style="
              padding: 8px 15px;
              background: #e8f4fc;
              border: 1px solid #3498db;
              color: #3498db;
              border-radius: 20px;
              cursor: pointer;
              font-size: 0.9rem;
              transition: all 0.3s;
            ">
              咖啡
            </button>
          </div>
        </div>
        
        <div id="searchResults" style="
          max-width: 800px;
          margin: 0 auto;
        ">
          <div style="text-align: center; padding: 40px; color: #999;">
            <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px;"></i>
            <p>输入中文或英文开始搜索</p>
          </div>
        </div>
        
        <div class="search-help" style="
          max-width: 600px;
          margin: 40px auto 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
          border-left: 4px solid var(--welsh-gold);
        ">
          <h4 style="color: var(--welsh-red); margin-bottom: 10px;">
            <i class="fas fa-info-circle"></i> 使用提示
          </h4>
          <ul style="color: #666; line-height: 1.6; padding-left: 20px;">
            <li>支持中文、英文搜索</li>
            <li>点击搜索结果可播放威尔士语发音</li>
            <li>点击"听例句"按钮播放完整句子</li>
            <li>点击快速搜索按钮快速查找常用词</li>
            <li>当前词库包含 ${this.data.dailyWords.length} 个单词</li>
          </ul>
        </div>
      </div>
    `;
    
    // 绑定搜索事件
    this.bindSearchEvents();
  }
  
  // 绑定搜索事件
  bindSearchEvents() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const quickSearchButtons = document.querySelectorAll('.quick-search');
    
    // 搜索按钮点击
    searchButton.addEventListener('click', () => {
      this.performSearch(searchInput.value.trim());
    });
    
    // 回车键搜索
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.performSearch(searchInput.value.trim());
      }
    });
    
    // 快速搜索按钮
    quickSearchButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const searchText = e.target.dataset.search;
        searchInput.value = searchText;
        this.performSearch(searchText);
      });
    });
  }
  
  // 执行搜索
  performSearch(query) {
    if (!query) {
      this.showToast('请输入搜索内容', 'warning');
      return;
    }
    
    console.log('🔍 搜索:', query);
    
    // 清空输入框焦点
    document.getElementById('searchInput').blur();
    
    // 显示搜索中状态
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = `
      <div style="text-align: center; padding: 30px;">
        <div class="spinner" style="margin: 0 auto 20px;"></div>
        <p>搜索中: "${query}"</p>
      </div>
    `;
    
    // 模拟搜索延迟
    setTimeout(() => {
      const results = this.searchWords(query);
      this.displaySearchResults(results, query);
    }, 300);
  }
  
  // 搜索单词
  searchWords(query) {
    const lowerQuery = query.toLowerCase().trim();
    
    // 如果查询为空，返回空数组
    if (!lowerQuery) return [];
    
    // 搜索逻辑：按优先级匹配
    const results = [];
    
    this.data.dailyWords.forEach(word => {
      let score = 0;
      
      // 完全匹配（最高优先级）
      if (word.english.toLowerCase() === lowerQuery) score += 100;
      if (word.chinese === lowerQuery) score += 100;
      if (word.welsh.toLowerCase() === lowerQuery) score += 100;
      
      // 包含匹配
      if (word.english.toLowerCase().includes(lowerQuery)) score += 50;
      if (word.chinese.includes(lowerQuery)) score += 50;
      if (word.welsh.toLowerCase().includes(lowerQuery)) score += 50;
      
      // 发音匹配
      if (word.pronunciation.toLowerCase().includes(lowerQuery)) score += 30;
      
      // 同义词匹配
      if (word.extensions?.synonyms) {
        const synonymMatch = word.extensions.synonyms.some(syn => 
          syn.toLowerCase().includes(lowerQuery)
        );
        if (synonymMatch) score += 20;
      }
      
      // 类别匹配
      if (word.category.toLowerCase().includes(lowerQuery)) score += 10;
      
      // 如果分数大于0，添加到结果
      if (score > 0) {
        results.push({
          word: word,
          score: score,
          matchType: this.getMatchType(word, lowerQuery)
        });
      }
    });
    
    // 按分数排序
    results.sort((a, b) => b.score - a.score);
    
    return results;
  }
  
  // 获取匹配类型
  getMatchType(word, query) {
    if (word.english.toLowerCase() === query) return '英文完全匹配';
    if (word.chinese === query) return '中文完全匹配';
    if (word.welsh.toLowerCase() === query) return '威尔士语完全匹配';
    if (word.english.toLowerCase().includes(query)) return '英文包含匹配';
    if (word.chinese.includes(query)) return '中文包含匹配';
    if (word.welsh.toLowerCase().includes(query)) return '威尔士语包含匹配';
    return '相关匹配';
  }
  
  // 显示搜索结果
  displaySearchResults(results, query) {
    const resultsContainer = document.getElementById('searchResults');
    
    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <div style="text-align: center; padding: 40px;">
          <div style="font-size: 3rem; color: #e74c3c; margin-bottom: 20px;">
            <i class="fas fa-search-minus"></i>
          </div>
          <h4 style="color: #e74c3c; margin-bottom: 15px;">未找到结果</h4>
          <p style="margin-bottom: 20px; color: #666;">
            未找到与 "<strong>${query}</strong>" 相关的威尔士语单词
          </p>
          <div style="color: #999; font-size: 0.9rem;">
            <p>尝试：</p>
            <ul style="text-align: left; display: inline-block; margin-top: 10px;">
              <li>使用更简单的词汇</li>
              <li>检查拼写是否正确</li>
              <li>尝试英文或中文搜索</li>
              <li>使用上面的快速搜索按钮</li>
            </ul>
          </div>
        </div>
      `;
      return;
    }
    
    let html = `
      <div class="search-results-header" style="margin-bottom: 25px;">
        <h4 style="color: var(--welsh-green); margin-bottom: 10px;">
          <i class="fas fa-check-circle"></i> 找到 ${results.length} 个结果
        </h4>
        <p style="color: #666;">
          搜索 "<strong>${query}</strong>" 的结果
        </p>
      </div>
    `;
    
    // 显示所有结果
    results.forEach((result, index) => {
      const word = result.word;
      const wordStatus = this.getWordStatus(word.id);
      const statusColor = wordStatus === 'mastered' ? '#27ae60' : 
                        wordStatus === 'reviewed' ? '#f39c12' : '#95a5a6';
      const statusText = wordStatus === 'mastered' ? '已掌握' : 
                       wordStatus === 'reviewed' ? '需复习' : '未学习';
      
      html += `
        <div class="search-result-card" style="
          background: white;
          border-radius: 10px;
          padding: 25px;
          margin-bottom: 20px;
          box-shadow: 0 3px 15px rgba(0,0,0,0.08);
          border-left: 4px solid var(--welsh-red);
        ">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
            <div>
              <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                <span style="
                  display: inline-block;
                  width: 30px;
                  height: 30px;
                  background: var(--welsh-red);
                  color: white;
                  border-radius: 50%;
                  text-align: center;
                  line-height: 30px;
                  font-weight: bold;
                ">${index + 1}</span>
                <span style="color: #999; font-size: 0.9rem;">${result.matchType}</span>
              </div>
              
              <div style="display: flex; align-items: baseline; gap: 20px; flex-wrap: wrap;">
                <div>
                  <div style="font-size: 0.9rem; color: #666; margin-bottom: 5px;">英文</div>
                  <div style="font-size: 1.3rem; font-weight: bold;">${word.english}</div>
                </div>
                
                <div style="font-size: 1.5rem; color: var(--welsh-gold);">→</div>
                
                <div>
                  <div style="font-size: 0.9rem; color: #666; margin-bottom: 5px;">威尔士语</div>
                  <div style="font-size: 1.8rem; font-weight: bold; color: var(--welsh-red);">${word.welsh}</div>
                </div>
                
                <div style="font-size: 1.5rem; color: var(--welsh-gold);">→</div>
                
                <div>
                  <div style="font-size: 0.9rem; color: #666; margin-bottom: 5px;">中文</div>
                  <div style="font-size: 1.3rem; font-weight: bold;">${word.chinese}</div>
                </div>
              </div>
            </div>
            
            <div style="text-align: right;">
              <span style="
                display: inline-block;
                padding: 4px 12px;
                background: ${statusColor};
                color: white;
                border-radius: 15px;
                font-size: 0.85rem;
                margin-bottom: 10px;
              ">${statusText}</span>
              <div style="color: #999; font-size: 0.85rem;">匹配度: ${result.score}分</div>
            </div>
          </div>
          
          <div style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
          ">
            <div class="result-detail" style="
              background: #f8f9fa;
              padding: 15px;
              border-radius: 8px;
            ">
              <div style="font-weight: bold; color: var(--welsh-green); margin-bottom: 8px;">
                <i class="fas fa-volume-up"></i> 发音
              </div>
              <div style="color: #666; margin-bottom: 10px;">${word.pronunciation}</div>
              <button class="btn-play-search-audio" data-word-id="${word.id}" style="
                padding: 8px 15px;
                background: var(--welsh-green);
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
              ">
                <i class="fas fa-play"></i> 播放威尔士语发音
              </button>
            </div>
            
            <div class="result-detail" style="
              background: #f8f9fa;
              padding: 15px;
              border-radius: 8px;
            ">
              <div style="font-weight: bold; color: var(--welsh-green); margin-bottom: 8px;">
                <i class="fas fa-book"></i> 词根词缀
              </div>
              <div style="color: #666;">
                ${word.prefix ? `<div>前缀: ${word.prefix}</div>` : ''}
                ${word.suffix ? `<div>后缀: ${word.suffix}</div>` : ''}
                ${!word.prefix && !word.suffix ? '<div>无特殊词根词缀</div>' : ''}
              </div>
            </div>
            
            <div class="result-detail" style="
              background: #f8f9fa;
              padding: 15px;
              border-radius: 8px;
            ">
              <div style="font-weight: bold; color: var(--welsh-green); margin-bottom: 8px;">
                <i class="fas fa-lightbulb"></i> 记忆技巧
              </div>
              <div style="color: #666;">${word.memoryHint}</div>
            </div>
          </div>
          
          ${word.extensions?.sentence ? `
            <div class="result-example" style="
              background: #e8f4fc;
              padding: 20px;
              border-radius: 8px;
              margin-top: 20px;
              border-left: 4px solid var(--welsh-blue);
            ">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <div style="font-weight: bold; color: var(--welsh-blue);">
                  <i class="fas fa-comment"></i> 例句
                </div>
                ${word.extensions.sentenceTts ? `
                  <button class="btn-play-search-sentence" data-word-id="${word.id}" style="
                    padding: 6px 12px;
                    background: var(--welsh-blue);
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 0.9rem;
                  ">
                    <i class="fas fa-volume-up"></i> 听例句
                  </button>
                ` : ''}
              </div>
              <div style="color: #333; font-style: italic;">${word.extensions.sentence}</div>
            </div>
          ` : ''}
          
          ${word.extensions?.synonyms || word.extensions?.antonyms ? `
            <div class="result-relations" style="
              display: flex;
              gap: 20px;
              margin-top: 15px;
              flex-wrap: wrap;
            ">
              ${word.extensions?.synonyms ? `
                <div>
                  <div style="font-size: 0.9rem; color: #666; margin-bottom: 5px;">同义词</div>
                  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    ${word.extensions.synonyms.map(syn => `
                      <span style="
                        padding: 4px 10px;
                        background: #d4edda;
                        color: #155724;
                        border-radius: 15px;
                        font-size: 0.85rem;
                      ">${syn}</span>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
              
              ${word.extensions?.antonyms ? `
                <div>
                  <div style="font-size: 0.9rem; color: #666; margin-bottom: 5px;">反义词</div>
                  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    ${word.extensions.antonyms.map(ant => `
                      <span style="
                        padding: 4px 10px;
                        background: #f8d7da;
                        color: #721c24;
                        border-radius: 15px;
                        font-size: 0.85rem;
                      ">${ant}</span>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          ` : ''}
          
          <div style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px solid #eee;
          ">
            <div style="color: #999; font-size: 0.85rem;">
              <i class="fas fa-tag"></i> 类别: ${this.getCategoryName(word.category)}
            </div>
            
            <div style="display: flex; gap: 10px;">
              <button class="btn-mark-review-search" data-word-id="${word.id}" style="
                padding: 6px 12px;
                background: #f39c12;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                gap: 5px;
              ">
                <i class="fas fa-redo"></i> 标记为需复习
              </button>
              
              <button class="btn-mark-mastered-search" data-word-id="${word.id}" style="
                padding: 6px 12px;
                background: #27ae60;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                gap: 5px;
              ">
                <i class="fas fa-check-circle"></i> 标记为已掌握
              </button>
            </div>
          </div>
        </div>
      `;
    });
    
    resultsContainer.innerHTML = html;
    
    // 绑定搜索结果中的事件
    this.bindSearchResultEvents();
  }
  
  // 绑定搜索结果事件
  bindSearchResultEvents() {
    // 绑定发音按钮
    document.querySelectorAll('.btn-play-search-audio').forEach(button => {
      button.addEventListener('click', (e) => {
        const wordId = parseInt(e.target.closest('.btn-play-search-audio').dataset.wordId);
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
    
    // 绑定例句发音按钮
    document.querySelectorAll('.btn-play-search-sentence').forEach(button => {
      button.addEventListener('click', (e) => {
        const wordId = parseInt(e.target.closest('.btn-play-search-sentence').dataset.wordId);
        const word = this.data.dailyWords.find(w => w.id === wordId);
        
        if (word) {
          this.playSentenceAudio(word);
        }
      });
    });
    
    // 绑定标记复习按钮
    document.querySelectorAll('.btn-mark-review-search').forEach(button => {
      button.addEventListener('click', (e) => {
        const wordId = parseInt(e.target.closest('.btn-mark-review-search').dataset.wordId);
        this.markWordForReview(wordId);
        this.showToast('已标记为需复习', 'success');
        
        // 更新UI
        setTimeout(() => {
          const searchInput = document.getElementById('searchInput');
          if (searchInput.value.trim()) {
            this.performSearch(searchInput.value.trim());
          }
        }, 500);
      });
    });
    
    // 绑定标记掌握按钮
    document.querySelectorAll('.btn-mark-mastered-search').forEach(button => {
      button.addEventListener('click', (e) => {
        const wordId = parseInt(e.target.closest('.btn-mark-mastered-search').dataset.wordId);
        this.markWordAsMastered(wordId);
        this.showToast('已标记为已掌握', 'success');
        
        // 更新UI
        setTimeout(() => {
          const searchInput = document.getElementById('searchInput');
          if (searchInput.value.trim()) {
            this.performSearch(searchInput.value.trim());
          }
        }, 500);
      });
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