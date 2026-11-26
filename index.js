import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT;

// 각각 라우터
import staffRouter from './src/staff/staff.js';
import authRouter from './src/staff/auth.js';
import productRouter from './src/product/products.js';
import payRouter from './src/pay/pay.js';

app.use('/api/af3/auth/', authRouter);
app.use('/api/af3/staff/', staffRouter);
app.use('/api/af3/product/', productRouter);
app.use('/api/af3/pay/', payRouter);


const app = express(); // Express 객체

app.use(cors()); // 미들웨어를 등록하는 함수
app.use(express.json()); // JSON 파싱

app.get('/', (req, res) => {
    res.send(`공군부스3 백엔드 쪽임`);
})

app.listen(port, () => {
    console.log(`서버 실행 완료\n포트번호 : ${port}`);
});