// ===== 新デザインシステム JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    // ===== ナビゲーション =====
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    // モバイルメニューの開閉
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // ナビゲーションリンクのクリック処理
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // index.html以外ではデフォルト遷移を許可
            if (!location.pathname.endsWith('index.html') && !location.pathname.endsWith('/')) {
                return; // 何もせず通常のリンク遷移
            }
            e.preventDefault();
            
            // アクティブクラスの更新
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // スムーズスクロール
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // モバイルメニューを閉じる
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // ===== スクロール時のヘッダー処理 =====
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // ヘッダーの背景透明度調整
        if (scrollTop > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // アクティブセクションの検出
        updateActiveNavigation();
        
        lastScrollTop = scrollTop;
    });

    // ===== アクティブナビゲーションの更新 =====
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + header.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ===== スクロールアニメーション =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // アニメーション対象要素の監視
    const animateElements = document.querySelectorAll('.work-card, .about-content, .skills-section, .timeline-section');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // ===== ワークカードのホバーエフェクト強化 =====
    const workCards = document.querySelectorAll('.work-card');
    
    workCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ===== スムーズスクロール（ヒーローセクションのボタン） =====
    const heroButtons = document.querySelectorAll('.hero-actions .btn');
    
    heroButtons.forEach(button => {
        if (button.getAttribute('href').startsWith('#')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // ===== パフォーマンス最適化：画像の遅延読み込み =====
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // 画像の読み込みをトリガー
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // ===== キーボードナビゲーション対応 =====
    document.addEventListener('keydown', function(e) {
        // Escキーでモバイルメニューを閉じる
        if (e.key === 'Escape' && navList.classList.contains('active')) {
            navList.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // ===== フォーカス管理 =====
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focus-visible');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('focus-visible');
        });
    });

    // ===== レスポンシブ対応：ウィンドウリサイズ処理 =====
    let resizeTimer;
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // ウィンドウサイズが変更された時の処理
            if (window.innerWidth > 768 && navList.classList.contains('active')) {
                navList.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }, 250);
    });

    // ===== 初期化完了ログ =====
    console.log('Portfolio site initialized successfully!');
});

// Heroセクションのアニメーションをページロード時にトリガー
window.addEventListener('DOMContentLoaded', () => {
  // すでにCSSアニメーションが遅延付きで設定されているため、
  // JSでの追加制御は不要ですが、
  // もしスクロール時やインタラクションで追加アニメーションをしたい場合はここに記述
});

// ===== Other Works（全workページ共通）自動生成 =====
const workList = [
  {
    id: 'work.html',
    title: 'ぎふ就労支援センター様 ホームページリニューアル',
    desc: 'WordPressを活用したレスポンシブWebサイトの制作',
    img: './images/Screenshot 2025-05-07 at 17.59.08.png',
    link: './work.html',
  },
  {
    id: 'work2.html',
    title: '架空サイト（Fashion）',
    desc: 'ファッションブランドのコンセプトサイト',
    img: './images/FashonTOP.png',
    link: './work2.html',
  },
  {
    id: 'work3.html',
    title: 'MISSIONA様 LP制作',
    desc: 'コンバージョンを重視したランディングページ',
    img: './images/MPC.png',
    link: './work3.html',
  },
  {
    id: 'work4.html',
    title: 'コンサル系ブログ リニューアル',
    desc: 'ユーザビリティを重視したブログサイトの改善',
    img: './images/HIROMOZA.png',
    link: './work4.html',
  },
  {
    id: 'work5.html',
    title: 'Coffee コーポレートサイト',
    desc: 'Reactを使用したモダンなコーポレートサイト',
    img: './images/Screenshot 2025-07-13 at 8.58.05.png',
    link: './work5.html',
  },
  {
    id: 'work6.html',
    title: '岐阜県ナビ Blog運営',
    desc: '地域情報発信のためのブログサイト運営',
    img: './images/Navi.png',
    link: './work6.html',
  },
  {
    id: 'work7.html',
    title: 'WPカスタムテンプレート作成',
    desc: 'WordPressカスタムテーマ制作の基礎学習',
    img: './images/Custom.png',
    link: './work7.html',
  },
];

function renderOtherWorksSlider(currentId) {
  const sliderGrid = document.querySelector('.related-works-grid');
  if (!sliderGrid) return;
  sliderGrid.innerHTML = '';
  workList.filter(w => w.id !== currentId).forEach(work => {
    const card = document.createElement('article');
    card.className = 'work-card';
    card.innerHTML = `
      <div class="work-image">
        <img src="${work.img}" alt="${work.title}" loading="lazy">
        <div class="work-overlay">
          <a href="${work.link}" class="work-link">詳細を見る</a>
        </div>
      </div>
      <div class="work-content">
        <h3 class="work-title">${work.title}</h3>
        <p class="work-description">${work.desc}</p>
      </div>
    `;
    sliderGrid.appendChild(card);
  });
}

// ページごとにOther Worksを自動生成
const pageName = location.pathname.split('/').pop();
if (document.querySelector('.related-works-grid')) {
  renderOtherWorksSlider(pageName);
}

// ===== Other Worksスライダー自動送り（2件ずつ） =====
function setupAutoOtherWorksSlider() {
  const slider = document.querySelector('.related-works-grid');
  if (!slider) return;
  const cards = slider.querySelectorAll('.work-card');
  if (cards.length <= 1) return;
  let currentIndex = 0;
  function getVisibleCount() {
    return window.innerWidth <= 900 ? 1 : 2;
  }
  function slideTo(index) {
    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(slider).gap) || 0;
    slider.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
  }
  setInterval(() => {
    const visibleCount = getVisibleCount();
    currentIndex += visibleCount;
    if (currentIndex >= cards.length) {
      currentIndex = 0;
    }
    slideTo(currentIndex);
  }, 3000);
}
if (document.querySelector('.related-works-grid')) {
  setupAutoOtherWorksSlider();
}

// ===== アートカーソル追従 =====
function setupArtCursor() {
  // 既存のart-cursorをすべて削除
  document.querySelectorAll('#art-cursor').forEach(el => el.remove());
  // 新規生成
  const artCursor = document.createElement('div');
  artCursor.id = 'art-cursor';
  document.body.appendChild(artCursor);
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;
    artCursor.style.transform = `translate3d(${cursorX - 22}px, ${cursorY - 22}px, 0)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}
setupArtCursor();

// ===== 共通パーツ（ローディング・フッター）自動挿入 =====
function includeCommonParts() {
    return Promise.all([
        fetch('loading.html')
            .then(res => res.text())
            .then(html => {
                const loadingDiv = document.getElementById('loading');
                if (loadingDiv) {
                    loadingDiv.outerHTML = html;
                } else {
                    document.body.insertAdjacentHTML('afterbegin', html);
                }
            }),
        fetch('footer.html')
            .then(res => res.text())
            .then(html => {
                const footer = document.querySelector('footer.footer');
                if (footer) {
                    footer.outerHTML = html;
                } else {
                    document.body.insertAdjacentHTML('beforeend', html);
                }
            })
    ]);
}

// 共通パーツ挿入後に初期化処理を再実行
includeCommonParts().then(() => {
    // ===== ローディング画面の初期化 =====
    const loadingScreen = document.getElementById('loading');
    if (loadingScreen) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }
    // ===== 既存の初期化処理（必要に応じて再実行） =====
    // ここに必要な初期化処理を追加
    setupArtCursor(); // フッター挿入後にも再実行
});

// ===== ユーティリティ関数 =====

// スムーズスクロール関数
function smoothScrollTo(targetPosition, duration = 800) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// デバウンス関数
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

