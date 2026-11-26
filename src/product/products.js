import express from 'express';
import db from '../../db.js';

const router = express.Router();

// 메인 상품 조회
router.get('/read', async (req, res) => {
   const { eventNumber } = req.query;
    try{
        const [rows] = await db.execute(
            `SELECT 
                Product_number						AS productNumber
            ,	Product_name						AS productName
            ,	Product_type						AS productType
            ,	FORMAT(Product_cost, 0)				AS productCost
            ,	FORMAT(Product_Count, 0)	    	AS productCount
            ,	FORMAT(Product_Left, 0)		        AS productLeft
            ,	FORMAT(Product_max_count, 0)		AS productMaxCount
            FROM Product
            WHERE 1=1
            AND Event_number = ?;`, [eventNumber]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: '상품을 찾을 수 없습니다.'
            });
        }

        res.json(rows);
    }catch(error){
        console.log(error);

        res.status(500).json({
            message: '서버 오류'
        });
    }
});

// 상세 상품(옵션) 조회
router.get('/readContent', async (req, res) => {
    const { productNumber } = req.query
    try{
        const [rows] = await db.execute(
            `SELECT 
                Product_Item_number					AS productItemNumber
            ,	Product_number						AS productNumber
            ,	product_name						AS productName
            ,	Product_Item_name					AS productItemName
            ,	FORMAT(Product_Item_cost, 0)		AS productItemCost
            ,	FORMAT(Product_Item_Count, 0)		AS productItemCount
            ,	FORMAT(Product_Item_Left, 0)		AS productItemLeft
            ,	FORMAT(Product_Item_max_count, 0)	AS productItemMaxCount
            FROM Product_Item
            WHERE 1=1
            AND Product_number = ?;`, [productNumber]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: '상품을 찾을 수 없습니다.'
            });
        }

        res.json(rows);
    }catch(error){
        console.log(error);
        res.status(500).json({
            message : '서버 오류'
        })
    }
});

// 상품 설정 변경
router.patch('/readContent', async (req, res) => {
    const { productNumber } = req.query
    try{
        const [rows] = await db.execute(
            `SELECT 
                Product_Item_number					AS productItemNumber
            ,	Product_number						AS productNumber
            ,	product_name						AS productName
            ,	Product_Item_name					AS productItemName
            ,	FORMAT(Product_Item_cost, 0)		AS productItemCost
            ,	FORMAT(Product_Item_Count, 0)		AS productItemCount
            ,	FORMAT(Product_Item_Left, 0)		AS productItemLeft
            ,	FORMAT(Product_Item_max_count, 0)	AS productItemMaxCount
            FROM Product_Item
            WHERE 1=1
            AND Product_number = ?;`, [productNumber]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: '상품을 찾을 수 없습니다.'
            });
        }

        res.json(rows);
    }catch(error){
        console.log(error);
        res.status(500).json({
            message : '서버 오류'
        })
    }
});

export default router;