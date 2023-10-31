document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signup-form');
  const response = document.getElementById('response');

  form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;

      const userData = {
          username,
          password,
          email,
          phone,
      };

      try {
          const response = await fetch('/signup', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
          });

          if (response.ok) {
              // 회원가입이 성공하면 서브 페이지로 이동
              window.location.href = 'sub.html';
          } else {
              const errorMessage = await response.text();
              response.innerHTML = '회원가입 실패: ' + errorMessage;
          }
      } catch (error) {
          response.innerHTML = '네트워크 오류: ' + error;
      }
  });
});