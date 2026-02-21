// iPhone检测和优化脚本
// 自动检测iPhone设备并应用优化

(function() {
    'use strict';
    
    console.log('📱 iPhone优化脚本加载...');
    
    // 检测iPhone设备
    function isiPhone() {
        const userAgent = navigator.userAgent.toLowerCase();
        const platform = navigator.platform.toLowerCase();
        
        // iPhone检测
        const isIOS = /iphone|ipad|ipod/.test(userAgent);
        const isIOSPlatform = /iphone|ipad|ipod/.test(platform);
        
        // 检查屏幕尺寸（iPhone典型尺寸）
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const isiPhoneScreen = (
            (screenWidth === 375 && screenHeight === 812) || // iPhone 12/13/14
            (screenWidth === 390 && screenHeight === 844) || // iPhone 12/13/14 Pro
            (screenWidth === 428 && screenHeight === 926) || // iPhone 12/13/14 Pro Max
            (screenWidth === 414 && screenHeight === 896) || // iPhone 11/Xr/Xs Max
            (screenWidth === 375 && screenHeight === 667) || // iPhone 6/7/8/SE2
            (screenWidth === 320 && screenHeight === 568)    // iPhone 5/SE
        );
        
        // 检查触摸支持
        const hasTouch = 'ontouchstart' in window;
        
        // 检查安全区域支持
        const hasSafeArea = CSS.supports('padding-top: env(safe-area-inset-top)');
        
        return (isIOS || isIOSPlatform || isiPhoneScreen) && hasTouch;
    }
    
    // 检测具体iPhone型号
    function detectiPhoneModel() {
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const pixelRatio = window.devicePixelRatio;
        
        const models = {
            '375x812': 'iPhone 12/13/14',
            '390x844': 'iPhone 12/13/14 Pro',
            '428x926': 'iPhone 12/13/14 Pro Max',
            '414x896': 'iPhone 11/Xr/Xs Max',
            '375x667': 'iPhone 6/7/8/SE2',
            '320x568': 'iPhone 5/SE'
        };
        
        const key = `${screenWidth}x${screenHeight}`;
        return models[key] || `未知iPhone (${screenWidth}×${screenHeight})`;
    }
    
    // 应用iPhone优化
    function applyiPhoneOptimizations() {
        console.log('🔧 应用iPhone优化...');
        
        // 1. 添加iPhone标识类
        document.body.classList.add('is-iphone', 'iphone-optimized');
        
        // 2. 检测并添加具体型号类
        const model = detectiPhoneModel();
        const modelClass = model.toLowerCase().replace(/[^a-z0-9]/g, '-');
        document.body.classList.add(`iphone-${modelClass}`);
        
        console.log(`📱 检测到: ${model}`);
        
        // 3. 应用安全区域优化
        applySafeAreaOptimizations();
        
        // 4. 优化触摸目标
        optimizeTouchTargets();
        
        // 5. 优化点击反馈
        optimizeClickFeedback();
        
        // 6. 优化滚动
        optimizeScrolling();
        
        // 7. 优化性能
        optimizePerformance();
        
        // 8. 监听方向变化
        setupOrientationListener();
        
        // 9. 添加调试信息
        addDebugInfo();
        
        console.log('✅ iPhone优化应用完成');
    }
    
    // 应用安全区域优化
    function applySafeAreaOptimizations() {
        const elements = [
            '.mobile-nav-header',
            '.header',
            '.content-area',
            '.sidebar',
            '.footer'
        ];
        
        elements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.classList.add('iphone-safe-area');
            });
        });
        
        // 固定定位元素
        const fixedElements = [
            '.mobile-nav-toggle',
            '.mobile-nav-close',
            '.fab'
        ];
        
        fixedElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (el.classList.contains('mobile-nav-toggle')) {
                    el.classList.add('iphone-fixed-top');
                }
                if (el.classList.contains('fab')) {
                    el.classList.add('iphone-fixed-bottom');
                }
            });
        });
    }
    
    // 优化触摸目标
    function optimizeTouchTargets() {
        const touchElements = [
            'button',
            '.btn',
            '.mobile-nav-link',
            '.nav-link',
            '.mobile-nav-toggle',
            '.mobile-nav-close',
            '.word-card',
            '[role="button"]'
        ];
        
        touchElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                // 检查尺寸
                const rect = el.getBoundingClientRect();
                const minSize = Math.min(rect.width, rect.height);
                
                if (minSize < 44) {
                    el.classList.add('iphone-touch-target');
                }
                
                // 添加触摸优化类
                el.classList.add('iphone-touch-target-small', 'iphone-no-context-menu');
                
                // 确保cursor正确
                el.style.cursor = 'pointer';
            });
        });
    }
    
    // 优化点击反馈
    function optimizeClickFeedback() {
        // 为所有可点击元素添加点击反馈
        document.addEventListener('touchstart', function(e) {
            const target = e.target;
            const clickable = target.closest('button, .btn, .mobile-nav-link, .nav-link, [role="button"]');
            
            if (clickable) {
                clickable.classList.add('iphone-click-feedback');
            }
        }, { passive: true });
        
        document.addEventListener('touchend', function(e) {
            const target = e.target;
            const clickable = target.closest('button, .btn, .mobile-nav-link, .nav-link, [role="button"]');
            
            if (clickable) {
                setTimeout(() => {
                    clickable.classList.remove('iphone-click-feedback');
                }, 150);
            }
        }, { passive: true });
        
        // 防止长按菜单
        document.addEventListener('contextmenu', function(e) {
            const target = e.target;
            if (target.closest('.iphone-no-context-menu')) {
                e.preventDefault();
            }
        });
    }
    
    // 优化滚动
    function optimizeScrolling() {
        const scrollElements = [
            '.mobile-nav-content',
            '.content-area',
            '.module-content',
            '.scroll-test'
        ];
        
        scrollElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.classList.add('iphone-scroll');
                
                // 添加惯性滚动
                el.style.webkitOverflowScrolling = 'touch';
                el.style.overscrollBehavior = 'contain';
            });
        });
        
        // 防止body滚动当模态框打开时
        const modalElements = document.querySelectorAll('.mobile-nav-panel');
        modalElements.forEach(modal => {
            modal.addEventListener('touchmove', function(e) {
                if (this.classList.contains('active')) {
                    e.preventDefault();
                }
            }, { passive: false });
        });
    }
    
    // 优化性能
    function optimizePerformance() {
        // 添加GPU加速
        const performanceElements = [
            '.mobile-nav-panel',
            '.mobile-nav-content',
            '.word-card',
            '.study-tip'
        ];
        
        performanceElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.classList.add('iphone-gpu-accelerate', 'iphone-transform-layer');
            });
        });
        
        // 优化字体渲染
        document.body.classList.add('iphone-font-smoothing');
        
        // 优化图片
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.classList.add('iphone-img');
            img.loading = 'lazy';
        });
    }
    
    // 设置方向监听
    function setupOrientationListener() {
        let lastOrientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
        
        window.addEventListener('resize', function() {
            const currentOrientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
            
            if (currentOrientation !== lastOrientation) {
                console.log(`🔄 方向变化: ${lastOrientation} → ${currentOrientation}`);
                
                // 更新body类
                document.body.classList.remove(`iphone-${lastOrientation}`);
                document.body.classList.add(`iphone-${currentOrientation}`);
                
                // 应用方向特定优化
                if (currentOrientation === 'landscape') {
                    applyLandscapeOptimizations();
                } else {
                    applyPortraitOptimizations();
                }
                
                lastOrientation = currentOrientation;
            }
        });
        
        // 初始方向
        document.body.classList.add(`iphone-${lastOrientation}`);
    }
    
    // 横屏优化
    function applyLandscapeOptimizations() {
        console.log('🔄 应用横屏优化');
        
        // 调整布局
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.classList.add('iphone-landscape');
        }
        
        // 隐藏不必要的元素
        const hideElements = document.querySelectorAll('.iphone-landscape-hide');
        hideElements.forEach(el => {
            el.style.display = 'none';
        });
        
        // 调整字体大小
        document.body.classList.add('iphone-landscape-text');
    }
    
    // 竖屏优化
    function applyPortraitOptimizations() {
        console.log('📱 应用竖屏优化');
        
        // 恢复布局
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.classList.remove('iphone-landscape');
        }
        
        // 显示元素
        const hideElements = document.querySelectorAll('.iphone-landscape-hide');
        hideElements.forEach(el => {
            el.style.display = '';
        });
        
        // 恢复字体大小
        document.body.classList.remove('iphone-landscape-text');
    }
    
    // 添加调试信息
    function addDebugInfo() {
        if (window.location.search.includes('debug=iphone')) {
            const debugInfo = document.createElement('div');
            debugInfo.className = 'iphone-debug-info';
            debugInfo.style.cssText = `
                position: fixed;
                top: 10px;
                left: 10px;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 10px;
                border-radius: 5px;
                font-family: monospace;
                font-size: 12px;
                z-index: 9999;
                pointer-events: none;
            `;
            
            const model = detectiPhoneModel();
            const orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
            const safeArea = {
                top: 'env(safe-area-inset-top)',
                bottom: 'env(safe-area-inset-bottom)',
                left: 'env(safe-area-inset-left)',
                right: 'env(safe-area-inset-right)'
            };
            
            debugInfo.innerHTML = `
                📱 ${model}<br>
                🖥 ${window.innerWidth}×${window.innerHeight}<br>
                🔄 ${orientation}<br>
                👆 ${'ontouchstart' in window ? '触摸支持' : '无触摸'}<br>
                🛡 安全区域: 支持
            `;
            
            document.body.appendChild(debugInfo);
            
            // 添加触摸目标调试
            document.body.classList.add('iphone-debug-touch');
        }
    }
    
    // 初始化
    function init() {
        if (isiPhone()) {
            console.log('✅ 检测到iPhone设备');
            applyiPhoneOptimizations();
            
            // 发送分析事件
            if (typeof gtag !== 'undefined') {
                gtag('event', 'iphone_detected', {
                    'device_model': detectiPhoneModel(),
                    'screen_size': `${window.innerWidth}×${window.innerHeight}`,
                    'pixel_ratio': window.devicePixelRatio
                });
            }
        } else {
            console.log('❌ 非iPhone设备，跳过优化');
            document.body.classList.add('not-iphone');
        }
    }
    
    // 等待DOM加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // 导出函数供外部使用
    window.iPhoneOptimizer = {
        isiPhone,
        detectiPhoneModel,
        applyiPhoneOptimizations,
        version: '1.0.0'
    };
    
    console.log('📱 iPhone优化脚本加载完成');
    
})();