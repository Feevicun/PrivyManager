function redirectToDataPage() {
    // Отримати форму
    var form = document.getElementById('loginForm');
    
    // Ваш код для перевірки правильності введених даних та реєстрації користувача
    // Якщо реєстрація успішна, перенаправити користувача на data.html
    // Наприклад, якщо ви використовуєте вбудовані можливості браузера:
    form.addEventListener('submit', function(event) {
      // Попередити браузер про те, що ви відповідаєте за перенаправлення
      event.preventDefault();

      // Здійснити перенаправлення на data.html
      window.location.href = 'data.html';
    });
  }