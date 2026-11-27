import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { rateLimit } from 'express-rate-limit';
import db from '../../db.js';
import authMiddleware from '../../middlewares/auth.js';

const router = express.Router();

// 로그인 시도 제한
const loginLimter = rateLimit ({
    windowMs : 15 * 60 * 1000, // 15분
    max : 5, // 5번 시도 후 차단
    message : '로그인 너무 많으니, 관리자 찾아가세요\n추가로 해당 계정들은 참여자들만 만들어진 관리자 계정입니다'
});

router.post('/login', loginLimter, async (req, res) => {
    const {id, password} = req.body ?? {};

     if (
        typeof id !== 'string' ||
        typeof password !== 'string' ||
        !id.trim() ||
        id.length > 50 ||
        !password ||
        Buffer.byteLength(password, 'utf8') > 72
    ) {
        return res.status(400).json({
            message: '잘못된 로그인 정보입니다.'
        });
    }

    try{
        const [rows] = await db.query(`
            SELECT 
                IF(sha2(?, 256) = Staff_password, 'C', 'N') AS matchPassword
            FROM 
                Staff 
            WHERE 1=1 
            AND Staff_Id = ?;
            `, [password, id]
        );
        
        // 유저 존재여부 확인 작업
        if(rows.length === 0){
            return res.status(401).json({
                message: '아이디 또는 비밀번호가 잘못되었습니다.'
            });
        }
        

        //JWT 생성
        const token = jwt.sign(
            {
                id: rows[0].id,
                version: rows[0].token_version
            },
            process.env.JWT_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '1d'
            }
        );
        
        // 비밀번호 확인 작업
        rows[0].matchPassword === 'C' ? res.status(200).json({
            message: '로그인 성공',
            token: token
        }) : res.status(401).json({
            message: '아이디 또는 비밀번호가 잘못되었습니다.'
        });


    }catch(error){
        console.error(error);
        res.status(500).json({
            message: '서버 오류가 발생했습니다.'
        });
    }
});


export default router;