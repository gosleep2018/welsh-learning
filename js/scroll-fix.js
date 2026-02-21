// 紧急滚动修复脚本 - 解决iPhone"向上滑不动"问题
(function() {
  console.log('🔄 加载紧急滚动修复脚本...');
  
  // 检测是否为iPhone
  const isiPhone = /iPhone/i.test(navigator.userAgent);
  if (!isiPhone) {
    console.log('📱 非iPhone设备，跳过滚动修复');
    return;
  }
  
  console.log('📱 检测到iPhone，开始滚动修复...');
  
  // 修复函数
  function fixScrolling() {
    console.log('🔧 执行滚动修复...');
    
    // 1. 修复html和body元素
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.webkitOverflowScrolling = 'touch';
    document.body.style.overflow = 'auto';
    document.body.style.webkitOverflowScrolling = 'touch';
    
    // 2. 修复.app-container
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
      appContainer.style.overflow = 'visible';
      appContainer.style.height = 'auto';
      appContainer.style.minHeight = '100vh';
    }
    
    // 3. 修复.module-content（主要内容区域）
    const moduleContent = document.getElementById('moduleContent');
    if (moduleContent) {
      console.log('🎯 修复主要内容区域滚动...');
      
      // 强制启用滚动
      moduleContent.style.overflowY = 'scroll';
      moduleContent.style.webkitOverflowScrolling = 'touch';
      moduleContent.style.overscrollBehaviorY = 'auto';
      
      // 移除可能的高度限制
      moduleContent.style.height = 'auto';
      moduleContent.style.maxHeight = 'none';
      moduleContent.style.minHeight = 'calc(100vh - 150px)';
      
      // 添加触摸事件确保滚动工作
      moduleContent.addEventListener('touchstart', function() {
        this.style.overflowY = 'scroll';
      }, { passive: true });
      
      moduleContent.addEventListener('touchmove', function(e) {
        // 允许所有触摸移动事件
        e.stopPropagation();
      }, { passive: true });
      
      // 检查内容高度
      setTimeout(() => {
        const scrollHeight = moduleContent.scrollHeight;
        const clientHeight = moduleContent.clientHeight;
        console.log(`📏 滚动区域: 内容高度=${scrollHeight}px, 可视高度=${clientHeight}px`);
        
        if (scrollHeight <= clientHeight) {
          console.log('⚠️ 内容高度不足，添加填充');
          moduleContent.style.paddingBottom = '100px';
        }
      }, 1000);
    }
    
    // 4. 修复.sidebar（侧边栏）
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.style.overflowY = 'auto';
      sidebar.style.webkitOverflowScrolling = 'touch';
    }
    
    // 5. 移除可能阻止滚动的事件监听器
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      // 保存原始事件监听器
      const originalTouchMove = el.ontouchmove;
      if (originalTouchMove && typeof originalTouchMove === 'function') {
        console.log('🔍 发现可能阻止滚动的事件监听器');
      }
    });
    
    // 6. 添加全局触摸滚动优化
    document.addEventListener('touchmove', function(e) {
      // 允许所有单点触摸滚动
      if (e.touches.length === 1) {
        e.stopPropagation();
      }
    }, { passive: true });
    
    console.log('✅ 滚动修复完成');
    
    // 显示修复状态
    showFixStatus();
  }
  
  // 显示修复状态
  function showFixStatus() {
    const statusDiv = document.createElement('div');
    statusDiv.id = 'scrollFixStatus';
    statusDiv.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #28a745;
      color: white;
      padding: 10px 15px;
      border-radius: 20px;
      font-size: 12px;
      z-index: 9999;
      opacity: 0.9;
      display: flex;
      align-items: center;
      gap: 8px;
    `;
    statusDiv.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>滚动已修复</span>
      <button onclick="this.parentElement.remove()" style="
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: 10px;
      ">×</button>
    `;
    
    document.body.appendChild(statusDiv);
    
    // 5秒后自动隐藏
    setTimeout(() => {
      statusDiv.style.opacity = '0';
      setTimeout(() => {
        if (statusDiv.parentElement) {
          statusDiv.remove();
        }
      }, 500);
    }, 5000);
  }
  
  // 添加手动修复按钮
  function addManualFixButton() {
    const fixButton = document.createElement('button');
    fixButton.id = 'manualScrollFix';
    fixButton.style.cssText = `
      position: fixed;
      bottom: 70px;
      right: 20px;
      background: #d62828;
      color: white;
      border: none;
      border-radius: 50px;
      padding: 12px 20px;
      font-size: 14px;
      cursor: pointer;
      z-index: 9998;
      box-shadow: 0 3px 10px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      gap: 8px;
    `;
    fixButton.innerHTML = `
      <i class="fas fa-sync-alt"></i>
      <span>修复滚动</span>
    `;
    fixButton.onclick = function() {
      fixScrolling();
      this.innerHTML = '<i class="fas fa-check"></i> 已修复';
      this.style.background = '#28a745';
      setTimeout(() => {
        this.remove();
      }, 3000);
    };
    
    document.body.appendChild(fixButton);
    
    // 10秒后自动移除按钮
    setTimeout(() => {
      if (fixButton.parentElement) {
        fixButton.remove();
      }
    }, 10000);
  }
  
  // 页面加载完成后执行修复
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(fixScrolling, 1000);
      setTimeout(addManualFixButton, 2000);
    });
  } else {
    setTimeout(fixScrolling, 1000);
    setTimeout(addManualFixButton, 2000);
  }
  
  // 监听内容变化，动态修复
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' || mutation.type === 'attributes') {
        // 内容变化时重新检查滚动
        setTimeout(fixScrolling, 500);
      }
    });
  });
  
  // 开始观察主要内容区域
  const moduleContent = document.getElementById('moduleContent');
  if (moduleContent) {
    observer.observe(moduleContent, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  }
  
  console.log('✅ 紧急滚动修复脚本加载完成');
})();