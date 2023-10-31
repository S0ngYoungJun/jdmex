document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('confirm-form');
  const confirmResponse = document.getElementById('confirm-response');

  form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const confirmPhone = document.querySelector('[name="confirm-phone"]').value;

      // 서버로 POST 요청을 보냅니다.
      try {
          const response = await fetch('/confirm', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ confirmPhone }),
          });

          if (response.ok) {
              const data = await response.json();
              if (data.username && data.password && data.email) {
                  // 정보를 표시합니다.
                  confirmResponse.innerHTML = `
                      <div>
                          <p>아이디: ${data.username}</p>
                          <p>비밀번호: ${data.password}</p>
                          <p>이메일: ${data.email}</p>
                      </div>
                  `;
              } else {
                  confirmResponse.innerHTML = '일치하는 정보가 없습니다.';
              }
          } else {
              confirmResponse.innerHTML = '서버 오류 발생';
          }
      } catch (error) {
          console.error('네트워크 오류 발생:', error);
          confirmResponse.innerHTML = '네트워크 오류 발생: ' + error;
      }
  });
});