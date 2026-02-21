// iPhone紧急修复脚本 - 解决导航看不见、显示不对问题
(function() {
  console.log('📱 iPhone紧急修复脚本加载...');
  
  // 检测是否为iPhone
  const ua = navigator.userAgent;
  const isiPhone = /iPhone/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  
  if (!isiPhone && !isIOS) {
    console.log('📱 非iOS设备，跳过iPhone修复');
    return;
  }
  
  console.log('📱 检测到iOS设备，开始紧急修复...');
  
  // 修复函数
  function applyEmergencyFixes() {
    console.log('🚨 应用iPhone紧急修复...');
    
    // 1. 确保body有正确的类
    document.body.classList.add('is-ios');
    if (isiPhone) {
      document.body.classList.add('is-iphone');
      document.body.classList.add('is-mobile');
    }
    
    // 2. 修复.app-container布局
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
      console.log('🏗️ 修复.app-container...');
      appContainer.style.display = 'flex';
      appContainer.style.flexDirection = 'column';
      appContainer.style.minHeight = '100vh';
      appContainer.style.height = 'auto';
    }
    
    // 3. 修复.sidebar（侧边栏）
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      console.log('📍 修复.sidebar...');
      
      // 确保侧边栏可见
      sidebar.style.display = 'block';
      sidebar.style.visibility = 'visible';
      sidebar.style.opacity = '1';
      sidebar.style.position = 'relative';
      sidebar.style.zIndex = '100';
      sidebar.style.width = '100%';
      sidebar.style.maxWidth = '100%';
      sidebar.style.overflow = 'visible';
      
      // 移除可能隐藏侧边栏的样式
      sidebar.style.maxHeight = 'none';
      sidebar.style.height = 'auto';
      
      // 检查内部元素
      const navList = sidebar.querySelector('.nav-list');
      if (navList) {
        navList.style.display = 'block';
        navList.style.visibility = 'visible';
      }
      
      const navItems = sidebar.querySelectorAll('.nav-item');
      navItems.forEach((item, index) => {
        item.style.display = 'block';
        item.style.visibility = 'visible';
        item.style.opacity = '1';
        
        // 确保导航链接可见
        const link = item.querySelector('.nav-link');
        if (link) {
          link.style.display = 'flex';
          link.style.alignItems = 'center';
          link.style.gap = '12px';
          link.style.padding = '14px 18px';
        }
      });
    }
    
    // 4. 修复.main-content（主内容区）
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      console.log('📄 修复.main-content...');
      mainContent.style.width = '100%';
      mainContent.style.maxWidth = '100%';
      mainContent.style.flex = '1';
      mainContent.style.minHeight = '300px';
      mainContent.style.overflow = 'visible';
    }
    
    // 5. 修复.module-content（模块内容）
    const moduleContent = document.getElementById('moduleContent');
    if (moduleContent) {
      console.log('📦 修复.module-content...');
      moduleContent.style.overflowY = 'auto';
      moduleContent.style.webkitOverflowScrolling = 'touch';
      moduleContent.style.minHeight = 'calc(100vh - 200px)';
    }
    
    // 6. 修复导航激活状态
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
      activeLink.style.background = 'var(--welsh-red)';
      activeLink.style.color = 'white';
    }
    
    // 7. 添加视觉反馈
    addVisualFeedback();
    
    console.log('✅ iPhone紧急修复完成');
    
    // 显示修复状态
    showFixStatus();
  }
  
  // 添加视觉反馈
  function addVisualFeedback() {
    // 添加边框帮助调试
    const style = document.createElement('style');
    style.textContent = `
      body.is-iphone .sidebar {
        border: 2px solid #28a745 !important;
        background: rgba(40, 167, 69, 0.05) !important;
      }
      
      body.is-iphone .main-content {
        border: 2px solid #d62828 !important;
        background: rgba(214, 40, 40, 0.05) !important;
      }
      
      body.is-iphone .nav-item {
        border-left: 3px solid #3498db !important;
        margin: 5px 0 !important;
      }
      
      /* 调试模式提示 */
      body.is-iphone:after {
        content: 'iPhone调试模式';
        position: fixed;
        top: 10px;
        left: 10px;
        background: #d62828;
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 12px;
        z-index: 9999;
        opacity: 0.8;
      }
    `;
    document.head.appendChild(style);
    
    // 5秒后移除调试样式
    setTimeout(() => {
      style.remove();
    }, 5000);
  }
  
  // 显示修复状态
  function showFixStatus() {
    const statusDiv = document.createElement('div');
    statusDiv.id = 'iphoneFixStatus';
    statusDiv.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 20px;
      background: #d62828;
      color: white;
      padding: 12px 18px;
      border-radius: 25px;
      font-size: 14px;
      z-index: 9999;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      gap: 10px;
      max-width: 300px;
    `;
    statusDiv.innerHTML = `
      <i class="fas fa-mobile-alt"></i>
      <div>
        <div style="font-weight: bold;">iPhone修复已应用</div>
        <div style="font-size: 12px; opacity: 0.9;">导航应该现在可见</div>
      </div>
      <button onclick="this.parentElement.remove()" style="
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: 10px;
        font-size: 18px;
      ">×</button>
    `;
    
    document.body.appendChild(statusDiv);
    
    // 10秒后自动隐藏
    setTimeout(() => {
      statusDiv.style.opacity = '0';
      statusDiv.style.transform = 'translateY(20px)';
      setTimeout(() => {
        if (statusDiv.parentElement) {
          statusDiv.remove();
        }
      }, 500);
    }, 10000);
  }
  
  // 添加手动修复按钮
  function addManualFixButton() {
    const fixButton = document.createElement('button');
    fixButton.id = 'iphoneManualFix';
    fixButton.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #d62828;
      color: white;
      border: none;
      border-radius: 50px;
      padding: 14px 24px;
      font-size: 15px;
      cursor: pointer;
      z-index: 9998;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      gap: 10px;
    `;
    fixButton.innerHTML = `
      <i class="fas fa-mobile-alt"></i>
      <span>修复iPhone显示</span>
    `;
    fixButton.onclick = function() {
      applyEmergencyFixes();
      this.innerHTML = '<i class="fas fa-check"></i> 已修复';
      this.style.background = '#28a745';
      setTimeout(() => {
        this.remove();
      }, 3000);
    };
    
    document.body.appendChild(fixButton);
    
    // 15秒后自动移除按钮
    setTimeout(() => {
      if (fixButton.parentElement) {
        fixButton.remove();
      }
    }, 15000);
  }
  
  // 检查并修复初始状态
  function checkInitialState() {
    console.log('🔍 检查初始状态...');
    
    // 检查侧边栏是否可见
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      const computedStyle = window.getComputedStyle(sidebar);
      const isVisible = computedStyle.display !== 'none' && 
                       computedStyle.visibility !== 'hidden' && 
                       computedStyle.opacity !== '0';
      
      console.log(`📊 侧边栏状态: 显示=${computedStyle.display}, 可见性=${computedStyle.visibility}, 不透明度=${computedStyle.opacity}`);
      
      if (!isVisible) {
        console.warn('⚠️ 侧边栏初始不可见，立即修复');
        applyEmergencyFixes();
        return;
      }
    } else {
      console.error('❌ 未找到侧边栏元素');
      applyEmergencyFixes();
      return;
    }
    
    // 检查导航项目
    const navItems = document.querySelectorAll('.nav-item');
    console.log(`📊 找到 ${navItems.length} 个导航项目`);
    
    if (navItems.length === 0) {
      console.warn('⚠️ 未找到导航项目，立即修复');
      applyEmergencyFixes();
      return;
    }
    
    // 延迟应用修复（确保DOM完全加载）
    setTimeout(() => {
      applyEmergencyFixes();
      setTimeout(addManualFixButton, 2000);
    }, 1000);
  }
  
  // 页面加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(checkInitialState, 500);
    });
  } else {
    setTimeout(checkInitialState, 500);
  }
  
  // 监听窗口大小变化（横竖屏切换）
  window.addEventListener('resize', function() {
    console.log('🔄 窗口大小变化，重新应用修复...');
    setTimeout(applyEmergencyFixes, 300);
  });
  
  // 监听方向变化
  window.addEventListener('orientationchange', function() {
    console.log('🔄 方向变化，重新应用修复...');
    setTimeout(applyEmergencyFixes, 500);
  });
  
  console.log('✅ iPhone紧急修复脚本加载完成');
})();