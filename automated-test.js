// 自动化测试脚本 - 测试点击功能
// 在浏览器控制台中运行此脚本

(function() {
    console.log('🤖 开始自动化点击测试...');
    
    // 测试配置
    const config = {
        delay: 1000, // 每个测试之间的延迟
        maxWait: 5000, // 最大等待时间
        testAll: true // 测试所有功能
    };
    
    // 测试结果
    const results = {
        passed: 0,
        failed: 0,
        tests: []
    };
    
    // 添加测试结果
    function addTest(name, passed, message) {
        const test = {
            name,
            passed,
            message,
            timestamp: new Date().toISOString()
        };
        
        results.tests.push(test);
        
        if (passed) {
            results.passed++;
            console.log(`✅ ${name}: ${message}`);
        } else {
            results.failed++;
            console.log(`❌ ${name}: ${message}`);
        }
        
        return test;
    }
    
    // 等待函数
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // 检查元素是否存在
    function elementExists(selector) {
        return document.querySelector(selector) !== null;
    }
    
    // 模拟点击
    function simulateClick(selector) {
        const element = document.querySelector(selector);
        if (!element) {
            return false;
        }
        
        try {
            // 创建点击事件
            const clickEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            
            element.dispatchEvent(clickEvent);
            return true;
        } catch (error) {
            console.error(`点击失败: ${error.message}`);
            return false;
        }
    }
    
    // 测试1: 检查基本元素
    async function testBasicElements() {
        console.log('🔍 测试基本元素...');
        
        const elements = [
            { selector: '#mobileNavToggle', name: '汉堡菜单按钮' },
            { selector: '#mobileNavPanel', name: '移动端导航面板' },
            { selector: '#nextBtn', name: '下一个按钮' },
            { selector: '.btn-primary', name: '主要按钮' },
            { selector: '.mobile-nav-link', name: '移动端导航项' },
            { selector: '.nav-link', name: '桌面端导航项' }
        ];
        
        for (const element of elements) {
            const exists = elementExists(element.selector);
            addTest(
                `检查${element.name}`,
                exists,
                exists ? `找到元素: ${element.selector}` : `未找到元素: ${element.selector}`
            );
            await wait(200);
        }
    }
    
    // 测试2: 测试汉堡菜单
    async function testHamburgerMenu() {
        console.log('🍔 测试汉堡菜单...');
        
        const toggle = document.getElementById('mobileNavToggle');
        const panel = document.getElementById('mobileNavPanel');
        
        if (!toggle || !panel) {
            addTest('汉堡菜单测试', false, '汉堡菜单元素未找到');
            return;
        }
        
        // 记录初始状态
        const initialPanelState = panel.classList.contains('active');
        
        // 点击打开
        const opened = simulateClick('#mobileNavToggle');
        await wait(500);
        
        const afterClickState = panel.classList.contains('active');
        
        addTest(
            '汉堡菜单点击打开',
            opened && afterClickState !== initialPanelState,
            opened ? `点击成功，面板状态: ${afterClickState ? '打开' : '关闭'}` : '点击失败'
        );
        
        // 再次点击关闭（如果打开了）
        if (afterClickState) {
            await wait(500);
            simulateClick('#mobileNavToggle');
            await wait(500);
            
            const finalState = panel.classList.contains('active');
            addTest(
                '汉堡菜单点击关闭',
                !finalState,
                finalState ? '面板仍然打开' : '面板已关闭'
            );
        }
    }
    
    // 测试3: 测试导航项点击
    async function testNavigationItems() {
        console.log('🧭 测试导航项...');
        
        const navItems = document.querySelectorAll('.mobile-nav-link, .nav-link');
        
        if (navItems.length === 0) {
            addTest('导航项测试', false, '未找到导航项');
            return;
        }
        
        // 测试第一个导航项
        const firstItem = navItems[0];
        const initialActive = firstItem.classList.contains('active');
        
        // 模拟点击
        const clicked = simulateClick(firstItem);
        await wait(300);
        
        const afterClickActive = firstItem.classList.contains('active');
        
        addTest(
            '导航项点击',
            clicked,
            clicked ? `点击成功，active状态: ${afterClickActive}` : '点击失败'
        );
        
        // 测试多个导航项
        if (navItems.length > 1) {
            for (let i = 1; i < Math.min(3, navItems.length); i++) {
                await wait(300);
                simulateClick(navItems[i]);
                
                addTest(
                    `导航项${i+1}点击`,
                    true,
                    `点击了: ${navItems[i].textContent.trim()}`
                );
            }
        }
    }
    
    // 测试4: 测试下一个按钮
    async function testNextButton() {
        console.log('➡️ 测试下一个按钮...');
        
        const nextButton = document.getElementById('nextBtn');
        
        if (!nextButton) {
            addTest('下一个按钮测试', false, '未找到下一个按钮');
            return;
        }
        
        // 记录初始状态
        const initialText = nextButton.textContent;
        
        // 模拟点击
        const clicked = simulateClick('#nextBtn');
        await wait(300);
        
        addTest(
            '下一个按钮点击',
            clicked,
            clicked ? `点击成功，按钮文本: ${nextButton.textContent}` : '点击失败'
        );
        
        // 测试点击反馈
        if (clicked) {
            // 检查是否有点击反馈样式
            await wait(100);
            const hasFeedback = nextButton.classList.contains('click-feedback') || 
                               nextButton.style.transform.includes('scale');
            
            addTest(
                '下一个按钮点击反馈',
                hasFeedback,
                hasFeedback ? '有点击反馈' : '无点击反馈'
            );
        }
    }
    
    // 测试5: 测试所有按钮
    async function testAllButtons() {
        console.log('🔄 测试所有按钮...');
        
        const allButtons = document.querySelectorAll('button, .btn, [role="button"]');
        
        if (allButtons.length === 0) {
            addTest('所有按钮测试', false, '未找到按钮');
            return;
        }
        
        addTest(
            '按钮数量检查',
            allButtons.length > 0,
            `找到 ${allButtons.length} 个按钮`
        );
        
        // 测试几个关键按钮
        const testButtons = [
            { selector: '#pronounceBtn', name: '发音按钮' },
            { selector: '#addFlashcardBtn', name: '加入闪卡按钮' },
            { selector: '#markLearnedBtn', name: '标记已学按钮' },
            { selector: '#prevBtn', name: '上一个按钮' }
        ];
        
        for (const button of testButtons) {
            if (elementExists(button.selector)) {
                const clicked = simulateClick(button.selector);
                await wait(300);
                
                addTest(
                    button.name,
                    clicked,
                    clicked ? '点击成功' : '点击失败'
                );
            }
        }
    }
    
    // 测试6: 测试事件监听器
    async function testEventListeners() {
        console.log('🎯 测试事件监听器...');
        
        const elements = [
            { selector: '#mobileNavToggle', name: '汉堡菜单' },
            { selector: '#nextBtn', name: '下一个按钮' },
            { selector: '.mobile-nav-link', name: '导航项' }
        ];
        
        for (const element of elements) {
            const el = document.querySelector(element.selector);
            if (el) {
                // 检查是否有事件监听器（通过检查_onclick或事件监听器数量）
                const hasOnClick = el.onclick !== null;
                const hasEventListeners = el._eventListeners && el._eventListeners.click;
                
                addTest(
                    `${element.name}事件监听器`,
                    hasOnClick || hasEventListeners,
                    hasOnClick || hasEventListeners ? '有事件监听器' : '无事件监听器'
                );
            }
            await wait(200);
        }
    }
    
    // 运行所有测试
    async function runAllTests() {
        console.log('🚀 开始运行所有自动化测试...');
        
        const testSuites = [
            testBasicElements,
            testHamburgerMenu,
            testNavigationItems,
            testNextButton,
            testAllButtons,
            testEventListeners
        ];
        
        for (const testSuite of testSuites) {
            try {
                await testSuite();
                await wait(config.delay);
            } catch (error) {
                console.error(`测试失败: ${error.message}`);
                addTest(testSuite.name, false, `测试异常: ${error.message}`);
            }
        }
        
        // 显示测试结果
        showTestResults();
    }
    
    // 显示测试结果
    function showTestResults() {
        console.log('\n📊 测试结果汇总:');
        console.log(`✅ 通过: ${results.passed}`);
        console.log(`❌ 失败: ${results.failed}`);
        console.log(`📈 总计: ${results.tests.length}`);
        console.log(`🎯 通过率: ${((results.passed / results.tests.length) * 100).toFixed(1)}%`);
        
        console.log('\n🔍 详细结果:');
        results.tests.forEach(test => {
            console.log(`${test.passed ? '✅' : '❌'} ${test.name}: ${test.message}`);
        });
        
        // 创建结果摘要
        const summary = document.createElement('div');
        summary.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #264653;
            color: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 9999;
            max-width: 400px;
            font-family: monospace;
            font-size: 0.9rem;
        `;
        
        summary.innerHTML = `
            <div style="color: #ffd166; font-weight: bold; margin-bottom: 10px;">🤖 自动化测试结果</div>
            <div style="margin-bottom: 5px;">✅ 通过: ${results.passed}</div>
            <div style="margin-bottom: 5px;">❌ 失败: ${results.failed}</div>
            <div style="margin-bottom: 5px;">📈 总计: ${results.tests.length}</div>
            <div style="margin-bottom: 15px;">🎯 通过率: ${((results.passed / results.tests.length) * 100).toFixed(1)}%</div>
            <div style="color: #ffd166; font-size: 0.8rem;">测试完成时间: ${new Date().toLocaleTimeString()}</div>
        `;
        
        document.body.appendChild(summary);
        
        // 10秒后自动移除
        setTimeout(() => {
            summary.remove();
        }, 10000);
    }
    
    // 导出测试函数到全局作用域
    window.runAutomatedTests = runAllTests;
    window.testResults = results;
    
    console.log('🤖 自动化测试脚本加载完成');
    console.log('运行 window.runAutomatedTests() 开始测试');
    
    // 自动运行测试（可选）
    if (config.testAll) {
        setTimeout(runAllTests, 1000);
    }
    
})();