const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;
const bodyParser = require('body-parser'); // body-parser 미들웨어 추가
const db = new sqlite3.Database('database.db');


app.use(bodyParser.urlencoded({ extended: false })); // URL-encoded 데이터 파싱
app.use(bodyParser.json()); // JSON 데이터 파싱
app.use(express.json());


// 'users' 테이블 생성 쿼리
const createTable = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT,
    password TEXT,
    email TEXT,
    phone TEXT
)
`;

db.run(createTable, (err) => {
    if (err) {
        console.error('테이블 생성 오류:', err.message);
    } else {
        console.log('테이블이 성공적으로 생성되었습니다.');
    }
});
// 회원가입 페이지 제공
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// 회원가입 요청 처리
app.post('/signup', (req, res) => {
  const userData = req.body;
  db.run(
      'INSERT INTO users (username, password, email, phone) VALUES (?, ?, ?, ?)',
      [userData.username, userData.password, userData.email, userData.phone],
      (err) => {
          if (err) {
              console.error(err); // 에러 메시지를 서버 콘솔에 출력
              return res.status(500).send('회원가입 실패');
          }
          res.redirect('/sub');
      }
  );
});

// 서브 페이지 제공
app.get('/sub', (req, res) => {
    res.sendFile(__dirname + '/sub.html');
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});


app.post('/confirm', (req, res) => {
    const confirmPhone = req.body['confirm-phone'];

  console.log('휴대폰 번호:', confirmPhone); // 클라이언트에서 받은 휴대폰 번호 확인

  db.get('SELECT username, password, email FROM users WHERE phone = ?', [confirmPhone], (err, row) => {
      if (err) {
          console.error('데이터베이스 조회 오류:', err); // 데이터베이스 오류 확인
          return res.status(500).send('조회 실패');
      }
      if (row) {
          console.log('서버에서 보낸 데이터:', row); // 서버에서 보낸 데이터 확인
          res.status(200).json(row);
      } else {
          res.status(404).send('사용자 정보를 찾을 수 없음');
      }
  });
});





