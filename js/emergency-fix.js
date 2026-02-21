// 紧急修复脚本 - 解决加载卡住问题
(function() {
  console.log('🚨 紧急修复脚本加载...');
  
  // 监听页面加载完成
  document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 页面DOM加载完成，开始紧急修复');
    
    // 检查是否卡在加载状态
    setTimeout(function() {
      const loadingElement = document.getElementById('loadingScreen');
      const mainContainer = document.getElementById('mainContainer');
      
      if (loadingElement && loadingElement.style.display !== 'none') {
        console.warn('⚠️ 检测到卡在加载状态，强制显示主内容');
        
        // 强制隐藏加载状态
        if (loadingElement) {
          loadingElement.style.display = 'none';
        }
        
        // 强制显示主内容
        if (mainContainer) {
          mainContainer.style.display = 'block';
        }
        
        // 尝试初始化应用
        if (window.app && typeof window.app.initUI === 'function') {
          try {
            window.app.initUI();
            console.log('✅ 应用UI已强制初始化');
          } catch (err) {
            console.error('❌ 应用初始化失败:', err);
          }
        }
        
        // 显示错误提示
        const errorMsg = document.createElement('div');
        errorMsg.style.cssText = `
          position: fixed;
          top: 10px;
          right: 10px;
          background: #e74c3c;
          color: white;
          padding: 10px 15px;
          border-radius: 5px;
          z-index: 9999;
          font-size: 12px;
          max-width: 300px;
        `;
        errorMsg.innerHTML = '数据加载超时，显示基础功能。请刷新页面重试。';
        document.body.appendChild(errorMsg);
        
        // 5秒后移除提示
        setTimeout(function() {
          errorMsg.remove();
        }, 5000);
      }
    }, 8000); // 8秒后检查
    
    // 添加重试按钮
    setTimeout(function() {
      const retryBtn = document.createElement('button');
      retryBtn.id = 'emergencyRetryBtn';
      retryBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--welsh-green);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 12px 24px;
        font-size: 14px;
        cursor: pointer;
        z-index: 9998;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        display: none;
      `;
      retryBtn.innerHTML = '🔄 重试加载';
      retryBtn.onclick = function() {
        location.reload();
      };
      document.body.appendChild(retryBtn);
      
      // 5秒后显示重试按钮
      setTimeout(function() {
        retryBtn.style.display = 'block';
      }, 5000);
    }, 3000);
  });
  
  // 全局错误捕获
  window.addEventListener('error', function(event) {
    console.error('🚨 全局错误捕获:', event.error);
    
    // 如果是应用初始化错误，显示友好提示
    if (event.error && event.error.message && 
        (event.error.message.includes('WelshLearningApp') || 
         event.error.message.includes('app'))) {
      
      const container = document.getElementById('moduleContent');
      if (container) {
        container.innerHTML = `
          <div style="text-align: center; padding: 50px 20px;">
            <div style="font-size: 3rem; color: #e74c3c; margin-bottom: 20px;">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3 style="color: #e74c3c; margin-bottom: 15px;">
              应用初始化遇到问题
            </h3>
            <p style="margin-bottom: 25px; color: #666;">
              抱歉，应用加载时遇到技术问题。请尝试：
            </p>
            <div style="
              display: flex;
              flex-direction: column;
              gap: 15px;
              max-width: 300px;
              margin: 0 auto;
            ">
              <button onclick="location.reload()" style="
                padding: 12px 20px;
                background: var(--welsh-green);
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
              ">
                <i class="fas fa-redo"></i> 刷新页面
              </button>
              <button onclick="window.app && window.app.useFallbackData && window.app.useFallbackData()" style="
                padding: 12px 20px;
                background: var(--welsh-blue);
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
              ">
                <i class="fas fa-download"></i> 使用基础数据
              </button>
            </div>
          </div>
        `;
      }
    }
  });
  
  console.log('✅ 紧急修复脚本已加载');
})();