const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;

const pool = mysql.createPool({
    host: '122.42.163.63',
    user: 'coldjimin',
    password: '__J1m1n',
    database: 'cold-jimin',
    waitForConnections: true,
    connectionLimit: 10
});

app.use(express.json());

app.get('/api/test', (req, res) => {
    

    const [rows] = pool.query(
        'SELECT * FROM Users'
    );

    console.log(rows);
    
    res.json({
        success : true,
        message : '서버 정상 작동'
    });

});


app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});

