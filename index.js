import db from './db.js';

async function main() {
    try {
        const [rows] = await db.query(
            `SELECT 
                Product_number						AS productNumber
            ,	Product_name						AS productName
            ,	Product_type						AS productType
            ,	FORMAT(Product_cost, 0)				AS productCost
            ,	FORMAT(Product_Count, 0)		AS productCount
            ,	FORMAT(Product_Left, 0)		AS productLeft
            ,	FORMAT(Product_max_count, 0)		AS productMaxCount
            FROM Product
            WHERE 1=1
            AND Event_number = ?`, [1]
        );

        console.log(rows);

    } catch (error) {
        console.error('DB 오류:', error.message);
    } finally {
        await db.end();
    }
}

main();