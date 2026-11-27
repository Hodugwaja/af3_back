import jwt from 'jsonwebtoken';
import db from '../db.js';

export default async function authMiddleware(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({
            message: '로그인이 필요합니다.'
        });
    }

    const token = authHeader.slice(7);

    let decoded;

    try {
        decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,
            { algorithms: ['HS256'] }
        );
    } catch {
        return res.status(401).json({
            message: '유효하지 않거나 만료된 토큰입니다.'
        });
    }

    try {
        const [rows] = await db.execute(
            `SELECT id, username, role, token_version
             FROM users WHERE id = ?`,
            [decoded.id]
        );

        const user = rows[0];

        if (!user || user.token_version !== decoded.version) {
            return res.status(401).json({
                message: '다시 로그인해주세요.'
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: '서버 오류'
        });
    }
}