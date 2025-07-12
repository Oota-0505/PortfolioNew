console.log("script.js loaded");
document.addEventListener('DOMContentLoaded', function() {
  // ローディング画面の制御
  const loadingScreen = document.getElementById('loading');
  
  // ページ読み込み完了後にローディング画面をフェードアウト
  window.addEventListener('load', function() {
      setTimeout(function() {
          loadingScreen.classList.add('fade-out');
          setTimeout(function() {
              loadingScreen.style.display = 'none';
          }, 500);
      }, 1000); // 1秒間ローディングを表示
  });

  // フローティングナビゲーション
  const floatingNavToggle = document.getElementById('floatingNavToggle');
  const floatingNavMenu = document.getElementById('floatingNavMenu');

  floatingNavToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      floatingNavMenu.classList.toggle('active');
  });

  // メニュー外をクリックしたときにメニューを閉じる
  document.addEventListener('click', function(event) {
      if (!floatingNavToggle.contains(event.target) && !floatingNavMenu.contains(event.target)) {
          floatingNavToggle.classList.remove('active');
          floatingNavMenu.classList.remove('active');
      }
  });

  // フローティングナビのリンクをクリックしたときにメニューを閉じる
  document.querySelectorAll('.floating-nav-item').forEach(item => {
      item.addEventListener('click', function() {
          floatingNavToggle.classList.remove('active');
          floatingNavMenu.classList.remove('active');
      });
  });

  // スムーズスクロール
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
          }
      });
  });

  // スクロールアニメーション
  const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
          }
      });
  }, observerOptions);

  // アニメーション対象の要素を監視
  const animateElements = document.querySelectorAll('.detail-item, .project-image, .project-info');
  animateElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(element);
  });
});



// Aboutセクション用のJavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Aboutセクションのアニメーション
    const aboutSection = document.querySelector('.about-section');
    const aboutContainer = document.querySelector('.about-container');
    const profileImage = document.querySelector('.profile-image');
    const aboutInfo = document.querySelector('.about-info');
    
    // Intersection Observer for About section animations
    const aboutObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // コンテナのアニメーション
                if (aboutContainer) {
                    aboutContainer.classList.add('is-visible');
                }
                
                // プロフィール画像のアニメーション（少し遅延）
                setTimeout(() => {
                    if (profileImage) {
                        profileImage.classList.add('is-visible');
                    }
                }, 200);
                
                // テキスト情報のアニメーション（さらに遅延）
                setTimeout(() => {
                    if (aboutInfo) {
                        aboutInfo.classList.add('is-visible');
                    }
                }, 400);
                
                // スキルタグのアニメーション
                const skillTags = document.querySelectorAll('.skill-tag');
                skillTags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.opacity = '0';
                        tag.style.transform = 'translateY(20px)';
                        tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        
                        setTimeout(() => {
                            tag.style.opacity = '1';
                            tag.style.transform = 'translateY(0)';
                        }, 50);
                    }, 600 + (index * 100));
                });
                
                // 経歴アイテムのアニメーション
                const experienceItems = document.querySelectorAll('.experience-item');
                experienceItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateX(-20px)';
                        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, 50);
                    }, 800 + (index * 200));
                });
            }
        });
    }, aboutObserverOptions);
    
    // Aboutセクションを監視
    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }
    
    // スキルタグのホバーエフェクト強化
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // プロフィール画像のクリックイベント（オプション）
    if (profileImage) {
        profileImage.addEventListener('click', function() {
            // 画像クリック時のエフェクト
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
});



// カスタムカーソルの実装
document.addEventListener('DOMContentLoaded', function() {
    // より厳密なタッチデバイス判定関数
    function isTouchDevice() {
        return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
    }
    // モバイルデバイスやタッチデバイスでは実行しない
    if (window.innerWidth <= 768 || isTouchDevice()) {
        return;
    }
    
    // カスタムカーソル要素を作成
    const customCursor = document.createElement('div');
    customCursor.className = 'custom-cursor';
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    
    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    
    customCursor.appendChild(cursorDot);
    customCursor.appendChild(cursorOutline);
    document.body.appendChild(customCursor);
    
    // カーソルの位置を追跡する変数
    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    // マウスの動きを追跡
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // カーソルの位置を更新する関数
    function updateCursor() {
        // ドットは即座に追従
        dotX = mouseX;
        dotY = mouseY;
        
        // アウトラインはさらに速く追従
        outlineX += (mouseX - outlineX) * 0.6;
        outlineY += (mouseY - outlineY) * 0.6;
        
        // 位置を適用
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    
    // アニメーションを開始
    updateCursor();
    
    // ホバー可能な要素を定義
    const hoverElements = {
        text: 'h1, h2, h3, h4, h5, h6, p, span, li, td, th, label',
        link: 'a, button, [role="button"], .clickable',
        button: 'button, input[type="submit"], input[type="button"], .btn'
    };
    
    // テキスト要素のホバーイベント
    document.querySelectorAll(hoverElements.text).forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursorDot.classList.add('text-hover');
            cursorOutline.classList.add('text-hover');
        });
        
        element.addEventListener('mouseleave', function() {
            cursorDot.classList.remove('text-hover');
            cursorOutline.classList.remove('text-hover');
        });
    });
    
    // リンク要素のホバーイベント
    document.querySelectorAll(hoverElements.link).forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursorDot.classList.add('link-hover');
            cursorOutline.classList.add('link-hover');
        });
        
        element.addEventListener('mouseleave', function() {
            cursorDot.classList.remove('link-hover');
            cursorOutline.classList.remove('link-hover');
        });
    });
    
    // ボタン要素のホバーイベント
    document.querySelectorAll(hoverElements.button).forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursorDot.classList.add('link-hover');
            cursorOutline.classList.add('button-hover');
        });
        
        element.addEventListener('mouseleave', function() {
            cursorDot.classList.remove('link-hover');
            cursorOutline.classList.remove('button-hover');
        });
    });
    
    // クリックイベント
    document.addEventListener('mousedown', function() {
        cursorDot.classList.add('clicking');
        cursorOutline.classList.add('clicking');
    });
    
    document.addEventListener('mouseup', function() {
        setTimeout(() => {
            cursorDot.classList.remove('clicking');
            cursorOutline.classList.remove('clicking');
        }, 300);
    });
    
    // マウスがページから離れた時の処理
    document.addEventListener('mouseleave', function() {
        customCursor.classList.add('inactive');
    });
    
    document.addEventListener('mouseenter', function() {
        customCursor.classList.remove('inactive');
    });
    
    // 動的に追加される要素にもイベントを適用する関数
    function attachCursorEvents(container = document) {
        // テキスト要素
        container.querySelectorAll(hoverElements.text).forEach(element => {
            if (!element.hasAttribute('data-cursor-attached')) {
                element.setAttribute('data-cursor-attached', 'true');
                
                element.addEventListener('mouseenter', function() {
                    cursorDot.classList.add('text-hover');
                    cursorOutline.classList.add('text-hover');
                });
                
                element.addEventListener('mouseleave', function() {
                    cursorDot.classList.remove('text-hover');
                    cursorOutline.classList.remove('text-hover');
                });
            }
        });
        
        // リンク要素
        container.querySelectorAll(hoverElements.link).forEach(element => {
            if (!element.hasAttribute('data-cursor-attached')) {
                element.setAttribute('data-cursor-attached', 'true');
                
                element.addEventListener('mouseenter', function() {
                    cursorDot.classList.add('link-hover');
                    cursorOutline.classList.add('link-hover');
                });
                
                element.addEventListener('mouseleave', function() {
                    cursorDot.classList.remove('link-hover');
                    cursorOutline.classList.remove('link-hover');
                });
            }
        });
        
        // ボタン要素
        container.querySelectorAll(hoverElements.button).forEach(element => {
            if (!element.hasAttribute('data-cursor-attached')) {
                element.setAttribute('data-cursor-attached', 'true');
                
                element.addEventListener('mouseenter', function() {
                    cursorDot.classList.add('link-hover');
                    cursorOutline.classList.add('button-hover');
                });
                
                element.addEventListener('mouseleave', function() {
                    cursorDot.classList.remove('link-hover');
                    cursorOutline.classList.remove('button-hover');
                });
            }
        });
    }
    
    // MutationObserverで動的に追加される要素を監視
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Element node
                    attachCursorEvents(node);
                }
            });
        });
    });
    
    // DOM変更の監視を開始
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // 初期化時に既存の要素にイベントを適用
    attachCursorEvents();
    
    // ウィンドウのリサイズ時にモバイル判定を再実行
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            customCursor.style.display = 'none';
        } else {
            customCursor.style.display = 'block';
        }
    });
});

