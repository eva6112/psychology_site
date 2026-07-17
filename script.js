document.addEventListener('DOMContentLoaded', () => {
    const phoneBtn = document.getElementById('phone-btn');
    
    phoneBtn.addEventListener('click', (e) => {
        // Если пользователь с телефона, пусть звонит (по умолчанию), 
        // если с компьютера - копируем номер
        if (window.innerWidth > 768) {
            e.preventDefault(); // Останавливаем звонок на ПК
            const phoneNumber = phoneBtn.getAttribute('href').replace('tel:', '');
            navigator.clipboard.writeText(phoneNumber).then(() => {
                alert('Номер скопирован: ' + phoneNumber);
            });
        }
    });
});