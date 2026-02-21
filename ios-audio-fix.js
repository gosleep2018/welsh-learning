// iOS音频修复方案
// 专门解决iPhone上的发音问题

(function() {
    'use strict';
    
    console.log('📱 iOS音频修复脚本加载...');
    
    // 检测iOS设备
    function isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }
    
    // 检测是否在iPhone上
    function isiPhone() {
        return /iPhone/.test(navigator.userAgent) && !window.MSStream;
    }
    
    // 初始化
    function initIOSAudioFix() {
        if (!isIOS()) {
            console.log('📱 非iOS设备，跳过音频修复');
            return;
        }
        
        console.log('📱 检测到iOS设备，应用音频修复...');
        
        // 修复1: 预加载音频上下文
        preloadAudioContext();
        
        // 修复2: 修复发音按钮
        fixPronunciationForIOS();
        
        // 修复3: 修复所有音频播放
        fixAllAudioPlayback();
        
        // 修复4: 添加iOS特定的事件处理
        addIOSEventHandlers();
        
        console.log('✅ iOS音频修复完成');
    }
    
    // 预加载音频上下文（iOS要求）
    function preloadAudioContext() {
        console.log('🎵 预加载音频上下文...');
        
        // 创建并立即暂停音频上下文
        if (window.AudioContext || window.webkitAudioContext) {
            try {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                window.iosAudioContext = new AudioContextClass();
                
                // iOS要求音频上下文必须在用户交互后恢复
                if (window.iosAudioContext.state === 'suspended') {
                    console.log('🎵 音频上下文已创建（暂停状态）');
                    
                    // 在用户交互时恢复
                    document.addEventListener('click', function resumeAudioContext() {
                        if (window.iosAudioContext && window.iosAudioContext.state === 'suspended') {
                            window.iosAudioContext.resume().then(() => {
                                console.log('✅ 音频上下文已恢复');
                            });
                            document.removeEventListener('click', resumeAudioContext);
                        }
                    }, { once: true });
                }
            } catch (error) {
                console.error('❌ 音频上下文创建失败:', error);
            }
        }
    }
    
    // 修复发音按钮（iOS专用）
    function fixPronunciationForIOS() {
        console.log('🔊 修复iOS发音按钮...');
        
        const pronounceBtn = document.getElementById('pronounceBtn');
        if (!pronounceBtn) {
            console.error('❌ 发音按钮未找到');
            return;
        }
        
        // 移除所有现有的事件监听器
        const newButton = pronounceBtn.cloneNode(true);
        pronounceBtn.parentNode.replaceChild(newButton, pronounceBtn);
        
        // 重新获取按钮
        const fixedButton = document.getElementById('pronounceBtn');
        
        // iOS专用播放函数
        function playPronunciationIOS() {
            console.log('📱 iOS发音播放开始...');
            
            // 更新按钮状态
            const originalHTML = fixedButton.innerHTML;
            const originalText = fixedButton.textContent;
            
            fixedButton.innerHTML = '<i class="fas fa-volume-up"></i> 播放中...';
            fixedButton.disabled = true;
            fixedButton.style.opacity = '0.7';
            
            // iOS音频播放策略
            const audio = new Audio();
            
            // 设置音频源（TTS服务）
            const text = encodeURIComponent('Os gwelwch yn dda');
            const ttsUrl = `https://web-x0ya.onrender.com/tts?text=${text}&lang=cy`;
            audio.src = ttsUrl;
            
            // iOS要求：设置音量（不能为0）
            audio.volume = 1.0;
            
            // iOS要求：设置preload
            audio.preload = 'auto';
            
            // iOS要求：立即播放（在用户交互事件中）
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('✅ iOS音频播放成功');
                    
                    // 监听播放结束
                    audio.addEventListener('ended', function() {
                        console.log('✅ iOS音频播放完成');
                        resetPronunciationButton(fixedButton, originalHTML);
                        showToast('发音播放完成');
                    });
                    
                    // 监听错误
                    audio.addEventListener('error', function(e) {
                        console.error('❌ iOS音频播放错误:', e);
                        resetPronunciationButton(fixedButton, originalHTML);
                        showToast('发音播放失败，请重试');
                    });
                    
                }).catch(error => {
                    console.error('❌ iOS音频播放被拒绝:', error);
                    
                    // iOS常见错误处理
                    if (error.name === 'NotAllowedError') {
                        console.log('⚠️ iOS播放被拒绝：需要用户交互');
                        showToast('请点击播放按钮');
                    } else if (error.name === 'NotSupportedError') {
                        console.log('⚠️ iOS播放被拒绝：格式不支持');
                        showToast('音频格式不支持');
                    }
                    
                    resetPronunciationButton(fixedButton, originalHTML);
                });
            }
            
            // 超时恢复
            setTimeout(() => {
                if (fixedButton.disabled) {
                    resetPronunciationButton(fixedButton, originalHTML);
                }
            }, 10000);
        }
        
        // 重置按钮状态
        function resetPronunciationButton(button, originalHTML) {
            button.innerHTML = originalHTML;
            button.disabled = false;
            button.style.opacity = '';
            button.style.transform = '';
        }
        
        // iOS专用事件绑定
        // 1. 点击事件（主要）
        fixedButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🖱️ iOS点击事件触发');
            playPronunciationIOS();
        });
        
        // 2. 触摸事件（iOS主要）
        fixedButton.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('👆 iOS触摸事件触发');
            
            // 添加触摸反馈
            this.style.transform = 'scale(0.95)';
            this.style.opacity = '0.8';
            
            // 立即播放（iOS要求）
            playPronunciationIOS();
        }, { passive: false });
        
        // 3. 触摸结束（恢复样式）
        fixedButton.addEventListener('touchend', function() {
            this.style.transform = '';
            this.style.opacity = '';
        });
        
        // 4. 触摸取消（防止卡住）
        fixedButton.addEventListener('touchcancel', function() {
            this.style.transform = '';
            this.style.opacity = '';
        });
        
        console.log('✅ iOS发音按钮修复完成');
    }
    
    // 修复所有音频播放
    function fixAllAudioPlayback() {
        console.log('🎵 修复所有音频播放...');
        
        // 重写Audio.prototype.play以添加iOS支持
        const originalPlay = Audio.prototype.play;
        
        Audio.prototype.play = function() {
            console.log('🎵 音频播放调用（iOS修复版）');
            
            // iOS要求：确保音量不为0
            if (this.volume === 0) {
                this.volume = 1.0;
            }
            
            // iOS要求：确保不是静音
            this.muted = false;
            
            // iOS要求：设置正确的preload
            if (!this.preload) {
                this.preload = 'auto';
            }
            
            // 调用原始播放方法
            return originalPlay.call(this).then(() => {
                console.log('✅ 音频播放成功（iOS修复）');
                return Promise.resolve();
            }).catch(error => {
                console.error('❌ 音频播放失败（iOS修复）:', error);
                
                // iOS特定错误处理
                if (isIOS()) {
                    if (error.name === 'NotAllowedError') {
                        console.log('⚠️ iOS：需要用户交互后才能播放');
                        showToast('请先点击页面任意位置');
                    }
                }
                
                return Promise.reject(error);
            });
        };
        
        console.log('✅ 所有音频播放修复完成');
    }
    
    // 添加iOS特定的事件处理
    function addIOSEventHandlers() {
        console.log('📱 添加iOS特定事件处理...');
        
        // iOS要求：页面加载后需要用户交互才能播放音频
        let userInteracted = false;
        
        // 标记用户已交互
        function markUserInteracted() {
            if (!userInteracted) {
                userInteracted = true;
                console.log('✅ 用户已交互，音频可以播放');
                
                // 恢复音频上下文（如果需要）
                if (window.iosAudioContext && window.iosAudioContext.state === 'suspended') {
                    window.iosAudioContext.resume().then(() => {
                        console.log('✅ 音频上下文已恢复（用户交互后）');
                    });
                }
            }
        }
        
        // 监听所有可能的用户交互
        const interactionEvents = ['click', 'touchstart', 'touchend', 'keydown', 'mousedown'];
        
        interactionEvents.forEach(eventType => {
            document.addEventListener(eventType, markUserInteracted, { 
                passive: true,
                once: true 
            });
        });
        
        // 专门处理音频按钮的第一次点击
        document.addEventListener('click', function firstAudioClick(e) {
            if (e.target.matches('#pronounceBtn, .audio-btn, [data-audio]')) {
                markUserInteracted();
                document.removeEventListener('click', firstAudioClick);
            }
        }, { passive: true });
        
        console.log('✅ iOS事件处理添加完成');
    }
    
    // 显示提示
    function showToast(message) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: calc(100px + env(safe-area-inset-bottom, 0px));
            right: 20px;
            background: #264653;
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
            max-width: 300px;
            font-size: 0.9rem;
            font-weight: 500;
        `;
        toast.textContent = `📱 ${message}`;
        
        // 添加动画样式
        if (!document.querySelector('#ios-toast-animations')) {
            const style = document.createElement('style');
            style.id = 'ios-toast-animations';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
    
    // 等待DOM加载
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initIOSAudioFix);
    } else {
        initIOSAudioFix();
    }
    
    // 导出修复函数
    window.IOSAudioFix = {
        init: initIOSAudioFix,
        isIOS: isIOS,
        isiPhone: isiPhone,
        version: '1.0.0-ios'
    };
    
    console.log('📱 iOS音频修复脚本加载完成');
    
})();