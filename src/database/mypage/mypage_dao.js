const con = require("../db_common")

const dao = {
    // 사용자 정보 조회
    getUserInfo : async (userId) => {
        const sql = `SELECT id, name, addr, phone, email FROM member WHERE id = :userId`;
        const data = await (await con).execute(sql, [userId]);
        if (data.rows.length === 0){
            return null;
        }
        return data.rows[0];
    },
    // 사용자 정보 업데이트
    updatePersonalInfo : async (userId, id, pwd, name, addr, phone, email) => {
        const sql = `
            UPDATE member 
            SET id = :id, pwd = :pwd, name = :name, addr = :addr, phone = :phone, email = :email
            WHERE id = :userId
        `;
        const result = await (await con).execute(sql, { userId, id, pwd, name, addr, phone, email });
        return result;
    },
    // 사용자 삭제
    deleteUser: async (userId) => {
        const sql = `DELETE FROM member WHERE id = :userId`;
        await (await con).execute(sql, [userId]);
    }
};

module.exports = dao;