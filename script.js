document.addEventListener('DOMContentLoaded', () => {
    
    // --- Логика переключения вкладок (Таб-бар) ---
    const btnPsy = document.getElementById('btn-psy');
    const btnBracelets = document.getElementById('btn-bracelets');
    const btnContacts = document.getElementById('btn-contacts');

    const contentPsy = document.getElementById('content-psy');
    const contentBracelets = document.getElementById('content-bracelets');
    const contentContacts = document.getElementById('content-contacts');

    const tabs = [
        { id: 'psy', btn: btnPsy, content: contentPsy, scroll: 0 },
        { id: 'bracelets', btn: btnBracelets, content: contentBracelets, scroll: 0 },
        { id: 'contacts', btn: btnContacts, content: contentContacts, scroll: 0 }
    ];

    let currentTabId = 'psy';

    function switchTab(targetId) {
        if (targetId === currentTabId) return;

        // Сохраняем позицию текущей вкладки
        const activeTab = tabs.find(t => t.id === currentTabId);
        if (activeTab) activeTab.scroll = window.scrollY;

        // Переключаем видимость и классы
        tabs.forEach(tab => {
            const isActive = tab.id === targetId;
            tab.btn.classList.toggle('active', isActive);
            tab.content.style.display = isActive ? 'flex' : 'none';
        });

        // Восстанавливаем позицию прокрутки целевой вкладки
        const targetTab = tabs.find(t => t.id === targetId);
        window.scrollTo(0, targetTab ? targetTab.scroll : 0);

        currentTabId = targetId;
    }

    btnPsy.addEventListener('click', () => switchTab('psy'));
    btnBracelets.addEventListener('click', () => switchTab('bracelets'));
    btnContacts.addEventListener('click', () => switchTab('contacts'));

    // --- Логика кнопки телефона ---
    const phoneBtn = document.getElementById('phone-btn');
    if (phoneBtn) {
        phoneBtn.addEventListener('click', (e) => {
            if (window.innerWidth > 768) {
                e.preventDefault(); 
                const phoneNumber = phoneBtn.getAttribute('href').replace('tel:', '');
                navigator.clipboard.writeText(phoneNumber).then(() => {
                    alert('Номер скопирован: ' + phoneNumber);
                });
            }
        });
    }

    // --- Логика стрелочек для карусели браслетов ---
    const carousel = document.getElementById('bracelet-carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (carousel && prevBtn && nextBtn) {
        // Прокрутка вправо
        nextBtn.addEventListener('click', () => {
            const slideWidth = carousel.clientWidth; // Узнаем ширину одной картинки
            carousel.scrollBy({ left: slideWidth, behavior: 'smooth' });
        });

        // Прокрутка влево
        prevBtn.addEventListener('click', () => {
            const slideWidth = carousel.clientWidth;
            carousel.scrollBy({ left: -slideWidth, behavior: 'smooth' });
        });
    }

    const carousel2 = document.getElementById('bracelet-carousel-2');
    const prevBtn2 = document.getElementById('prev-btn-2');
    const nextBtn2 = document.getElementById('next-btn-2');

    if (carousel2 && prevBtn2 && nextBtn2) {
        // Прокрутка вправо
        nextBtn2.addEventListener('click', () => {
            const slideWidth2 = carousel2.clientWidth;
            carousel2.scrollBy({ left: slideWidth2, behavior: 'smooth' });
        });

        // Прокрутка влево
        prevBtn2.addEventListener('click', () => {
            const slideWidth2 = carousel2.clientWidth;
            carousel2.scrollBy({ left: -slideWidth2, behavior: 'smooth' });
        });
    }

    // --- Логика карусели отзывов ---
    const psyReviewsCarousel = document.getElementById('psy-reviews-carousel');
    const prevBtnPsy = document.getElementById('prev-btn-psy');
    const nextBtnPsy = document.getElementById('next-btn-psy');

    function resetReviews() {
        document.querySelectorAll('.review-card').forEach(card => {
            const textElement = card.querySelector('.review-text');
            const readMoreBtn = card.querySelector('.read-more-btn');
            if (textElement && textElement.classList.contains('expanded')) {
                textElement.classList.remove('expanded');
                readMoreBtn.textContent = 'Читать полностью';
            }
        });
    }

    if (psyReviewsCarousel && prevBtnPsy && nextBtnPsy) {
        // Прокрутка вправо
        nextBtnPsy.addEventListener('click', () => {
            resetReviews(); // Сворачиваем текст перед прокруткой
            const slideWidth = psyReviewsCarousel.clientWidth;
            psyReviewsCarousel.scrollBy({ left: slideWidth, behavior: 'smooth' });
        });

        // Прокрутка влево
        prevBtnPsy.addEventListener('click', () => {
            resetReviews(); // Сворачиваем текст перед прокруткой
            const slideWidth = psyReviewsCarousel.clientWidth;
            psyReviewsCarousel.scrollBy({ left: -slideWidth, behavior: 'smooth' });
        });
    }

    // --- Логика карусели отзывов (Браслеты) ---
    const braceletsReviewsCarousel = document.getElementById('bracelets-reviews-carousel');
    const prevBtnBracelets = document.getElementById('prev-btn-bracelets');
    const nextBtnBracelets = document.getElementById('next-btn-bracelets');

    if (braceletsReviewsCarousel && prevBtnBracelets && nextBtnBracelets) {
        // Прокрутка вправо
        nextBtnBracelets.addEventListener('click', () => {
            resetReviews(); // Функция сброса текста, которую мы написали ранее
            const slideWidth = braceletsReviewsCarousel.clientWidth;
            braceletsReviewsCarousel.scrollBy({ left: slideWidth, behavior: 'smooth' });
        });

        // Прокрутка влево
        prevBtnBracelets.addEventListener('click', () => {
            resetReviews(); // Функция сброса текста
            const slideWidth = braceletsReviewsCarousel.clientWidth;
            braceletsReviewsCarousel.scrollBy({ left: -slideWidth, behavior: 'smooth' });
        });
    }

    // --- Логика разворачивания текста отзывов ---
    const reviewCards = document.querySelectorAll('.review-card');
    
    reviewCards.forEach(card => {
        const textElement = card.querySelector('.review-text');
        const readMoreBtn = card.querySelector('.read-more-btn');
        
        if (textElement && readMoreBtn) {
            // Обработчик клика по кнопке
            readMoreBtn.addEventListener('click', () => {
                textElement.classList.toggle('expanded');
                if (textElement.classList.contains('expanded')) {
                    readMoreBtn.textContent = 'Свернуть';
                } else {
                    readMoreBtn.textContent = 'Читать полностью';
                }
            });

            // Наблюдатель за изменениями размеров (срабатывает, когда вкладка открывается)
            const resizeObserver = new ResizeObserver(() => {
                // Если элемент скрыт (высота 0) или текст уже развернут — пропускаем
                if (textElement.clientHeight === 0 || textElement.classList.contains('expanded')) {
                    return;
                }
                
                // Если реальная высота текста больше видимой — показываем кнопку
                if (textElement.scrollHeight > textElement.clientHeight) {
                    readMoreBtn.style.display = 'block';
                } else {
                    readMoreBtn.style.display = 'none';
                }
            });

            // Запускаем слежение за текстовым блоком
            resizeObserver.observe(textElement);
        }
    });

    // --- Логика карусели сертификатов (Психология) ---
    const certsCarousel = document.getElementById('certs-carousel');
    const prevBtnCerts = document.getElementById('prev-btn-certs');
    const nextBtnCerts = document.getElementById('next-btn-certs');

    if (certsCarousel && prevBtnCerts && nextBtnCerts) {
        // Прокрутка вправо
        nextBtnCerts.addEventListener('click', () => {
            const slideWidth = certsCarousel.clientWidth;
            certsCarousel.scrollBy({ left: slideWidth, behavior: 'smooth' });
        });

        // Прокрутка влево
        prevBtnCerts.addEventListener('click', () => {
            const slideWidth = certsCarousel.clientWidth;
            certsCarousel.scrollBy({ left: -slideWidth, behavior: 'smooth' });
        });
    }
});
