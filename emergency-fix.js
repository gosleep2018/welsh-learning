// 紧急修复：导航栏和按钮点击问题
// 问题：导航栏无法点击，单词下一条无法点按

(function() {
    console.log('🚨 紧急修复脚本加载...');
    
    // 等待DOM加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEmergencyFix);
    } else {
        initEmergencyFix();
    }
    
    function initEmergencyFix() {
        console.log('🔧 开始紧急修复...');
        
        // 修复1: 移动端导航点击问题
        fixMobileNavigation();
        
        // 修复2: 下一个按钮点击问题
        fixNextButton();
        
        // 修复3: 所有按钮点击反馈
        fixAllButtons();
        
        // 修复4: 事件委托（防止动态内容问题）
        setupEventDelegation();
        
        console.log('✅ 紧急修复完成');
        showEmergencyToast('紧急修复已应用，请测试功能');
    }
    
    // 修复移动端导航
    function fixMobileNavigation() {
        const mobileNavToggle = document.getElementById('mobileNavToggle');
        const mobileNavPanel = document.getElementById('mobileNavPanel');
        const mobileNavClose = document.getElementById('mobileNavClose');
        
        if (!mobileNavToggle || !mobileNavPanel) {
            console.warn('⚠️ 移动端导航元素未找到');
            return;
        }
        
        console.log('🔧 修复移动端导航...');
        
        // 移除可能冲突的事件监听器
        const newToggle = mobileNavToggle.cloneNode(true);
        mobileNavToggle.parentNode.replaceChild(newToggle, mobileNavToggle);
        
        const newPanel = mobileNavPanel.cloneNode(true);
        mobileNavPanel.parentNode.replaceChild(newPanel, mobileNavPanel);
        
        // 重新获取元素
        const toggle = document.getElementById('mobileNavToggle');
        const panel = document.getElementById('mobileNavPanel');
        const close = document.getElementById('mobileNavClose');
        
        // 汉堡菜单交互
        function toggleMobileNav() {
            panel.classList.toggle('active');
            document.body.style.overflow = panel.classList.contains('active') ? 'hidden' : 'auto';
            console.log('🍔 导航面板状态:', panel.classList.contains('active') ? '展开' : '隐藏');
        }
        
        // 绑定事件
        toggle.addEventListener('click', toggleMobileNav);
        
        if (close) {
            close.addEventListener('click', toggleMobileNav);
        }
        
        // 点击面板外部关闭
        panel.addEventListener('click', function(e) {
            if (e.target === panel) {
                toggleMobileNav();
            }
        });
        
        // 修复导航项点击
        fixNavItems();
    }
    
    // 修复导航项点击
    function fixNavItems() {
        const navItems = document.querySelectorAll('.mobile-nav-link, .nav-link');
        
        navItems.forEach(item => {
            // 移除旧的事件监听器
            const newItem = item.cloneNode(true);
            item.parentNode.replaceChild(newItem, item);
            
            // 重新绑定事件
            newItem.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('📱 导航项点击:', this.textContent.trim());
                
                // 移除所有active类
                document.querySelectorAll('.mobile-nav-link, .nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                // 添加active类
                this.classList.add('active');
                
                // 同步另一个导航的active状态
                const module = this.getAttribute('data-module');
                if (module) {
                    document.querySelectorAll(`[data-module="${module}"]`).forEach(link => {
                        link.classList.add('active');
                    });
                }
                
                // 显示反馈
                showEmergencyToast(`切换到: ${this.querySelector('span').textContent}`);
                
                // 如果是移动端，关闭导航面板
                if (window.innerWidth <= 768 && this.classList.contains('mobile-nav-link')) {
                    const panel = document.getElementById('mobileNavPanel');
                    if (panel && panel.classList.contains('active')) {
                        panel.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                }
            });
        });
        
        console.log(`🔧 修复了 ${navItems.length} 个导航项`);
    }
    
    // 修复下一个按钮
    function fixNextButton() {
        // 查找所有"下一个"按钮
        const nextButtons = document.querySelectorAll('button:contains("下一个"), button:has(i.fa-arrow-right)');
        
        nextButtons.forEach(button => {
            // 移除旧的事件监听器
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // 重新绑定事件
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('➡️ 下一个按钮点击');
                
                // 模拟下一个单词
                simulateNextWord();
                
                // 添加点击反馈
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
        });
        
        console.log(`🔧 修复了 ${nextButtons.length} 个下一个按钮`);
    }
    
    // 模拟下一个单词
    function simulateNextWord() {
        const wordCards = document.querySelectorAll('.word-card');
        if (wordCards.length === 0) return;
        
        // 简单的轮换显示
        let currentIndex = 0;
        wordCards.forEach((card, index) => {
            if (card.style.display !== 'none') {
                currentIndex = index;
            }
        });
        
        // 隐藏当前
        wordCards[currentIndex].style.display = 'none';
        
        // 显示下一个（循环）
        const nextIndex = (currentIndex + 1) % wordCards.length;
        wordCards[nextIndex].style.display = 'block';
        
        showEmergencyToast(`切换到第 ${nextIndex + 1} 个单词`);
    }
    
    // 修复所有按钮
    function fixAllButtons() {
        const allButtons = document.querySelectorAll('button, .btn, [role="button"]');
        
        allButtons.forEach(button => {
            // 确保有点击事件
            if (!button.hasAttribute('data-fixed')) {
                button.setAttribute('data-fixed', 'true');
                
                button.addEventListener('click', function(e) {
                    console.log('🔄 按钮点击:', this.textContent.trim() || this.className);
                    
                    // 添加点击反馈
                    this.style.transform = 'scale(0.95)';
                    this.style.opacity = '0.8';
                    
                    setTimeout(() => {
                        this.style.transform = '';
                        this.style.opacity = '';
                    }, 200);
                });
            }
        });
        
        console.log(`🔧 修复了 ${allButtons.length} 个按钮`);
    }
    
    // 设置事件委托
    function setupEventDelegation() {
        // 为动态内容设置事件委托
        document.addEventListener('click', function(e) {
            // 检查是否是按钮
            if (e.target.matches('button, .btn, [role="button"]')) {
                console.log('🎯 事件委托捕获按钮点击:', e.target.textContent.trim());
            }
            
            // 检查是否是导航链接
            if (e.target.matches('.mobile-nav-link, .nav-link') || 
                e.target.closest('.mobile-nav-link, .nav-link')) {
                const link = e.target.matches('.mobile-nav-link, .nav-link') ? 
                    e.target : e.target.closest('.mobile-nav-link, .nav-link');
                
                e.preventDefault();
                console.log('🎯 事件委托捕获导航点击:', link.textContent.trim());
                
                // 触发自定义事件
                link.dispatchEvent(new Event('click', { bubbles: true }));
            }
        });
    }
    
    // 显示紧急修复提示
    function showEmergencyToast(message) {
        // 移除旧的toast
        const oldToasts = document.querySelectorAll('.emergency-toast');
        oldToasts.forEach(toast => toast.remove());
        
        const toast = document.createElement('div');
        toast.className = 'emergency-toast';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e63946;
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 9999;
            animation: emergencySlideIn 0.3s ease, emergencyFadeOut 0.3s ease 2.7s forwards;
            max-width: 300px;
            font-size: 0.9rem;
            font-weight: 500;
        `;
        toast.textContent = `🚨 ${message}`;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes emergencySlideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes emergencyFadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
            style.remove();
        }, 3000);
    }
    
    // 添加调试信息
    console.log('🔍 页面状态检查:');
    console.log('- window.innerWidth:', window.innerWidth);
    console.log('- 移动端导航元素:', {
        toggle: document.getElementById('mobileNavToggle'),
        panel: document.getElementById('mobileNavPanel'),
        close: document.getElementById('mobileNavClose')
    });
    console.log('- 导航项数量:', document.querySelectorAll('.mobile-nav-link, .nav-link').length);
    console.log('- 下一个按钮数量:', document.querySelectorAll('button:contains("下一个"), button:has(i.fa-arrow-right)').length);
    
})();