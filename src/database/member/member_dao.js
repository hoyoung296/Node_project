const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config")
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

const con = require("../db_common")
const process = {
    dao_insert: async (body) => {
        const sql = `insert into member(id,pwd,name,addr,phone,email,dotori,thema_no,LOGIN_FAIL_COUNT) values(:id,:pwd,:name,:addr,:phone,:email,:dotori,:thema,:count)`;
        let result = 0;
        try {
            // const con = await oracledb.getConnection(dbConfig);
            // result = await con.execute(sql, body);
            console.log("con : ", con)
            result = await (await con).execute(sql, body);
        } catch (err) {
            console.log(err)
        }
        return result;
    },
    dao_login: async (id) => {
        //console.log("dao : ", username )
        const sql = `select * from member where id='${id}'`;
        let member;
        try {
            member = await (await con).execute(sql);
        } catch (err) {
            console.log("catch dao : ", err)
        }
        //console.log(member)
        return member;
    },
    selectLoginFailCount: async (uid) => {
        const sql = `SELECT 
        TO_CHAR(LAST_LOGIN_FAIL_TIME + (10/(24*60)), 'YYYY-MM-DD HH24:MI:SS')AS LOGIN_FAIL_TIME,
        TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') AS CURRENT_TIME,
        LOGIN_FAIL_COUNT
    from member
    where id='${uid}'`;
        let faillog;
        try {
            const rs = await (await con).execute(sql);
            faillog = rs.rows;
        } catch (err) {
            console.log("catch dao : ", err)
        }
        //console.log(member)
        return faillog;
    },
    clearLoginFailCount: async (uid) => {
        const sql = ` UPDATE member SET LOGIN_FAIL_COUNT = 0 where id='${uid}'`;
        let rs
        try {
             rs = await (await con).execute(sql);
        } catch (err) {
            console.log("catch dao : ", err)
        }
        //console.log(member)
        return rs;
    },
    updateLoginFailCount : async (uid) => {
        const sql = ` UPDATE member SET LOGIN_FAIL_COUNT = LOGIN_FAIL_COUNT + 1, LAST_LOGIN_FAIL_TIME = SYSDATE where id='${uid}'`;
        let rs
        try {
             rs = await (await con).execute(sql);
        } catch (err) {
            console.log("catch dao : ", err)
        }
        //console.log(member)
        return rs;
    },
    dao_idCheck: async (uid) => {
        const sql = `select id from member where id='${uid}'`;
        let id;
        try {
            id = await (await con).execute(sql);
        } catch (err) {
            console.log("catch dao : ", err)
        }
        //console.log(member)
        return id;
    },
    dao_emailCheck: async (email, uid) => {
        const sql = `select email from member where email='${email}' AND id='${uid}'`;
        let rs;
        try {
            rs = await (await con).execute(sql);
        } catch (err) {
            console.log("catch dao : ", err)
        }
        //console.log(member)
        return rs;
    },
    dao_chagePwd: async (email, uid, pwd) => {
        console.log("dao임시비밀번호 : ", pwd)
        console.log("dao_uid : ", email)
        console.log("dao_email : ", uid)
        const sql = `update member set pwd='${pwd}' where email='${email}' AND id='${uid}'`;
        let rs;
        try {
            rs = await (await con).execute(sql);
        } catch (err) {
            console.log("catch dao : ", err)
        }
        //console.log(member)
        return rs;
    },
    dao_emailCheck2: async (email) => {
        const sql = `select email from member where email='${email}'`;
        let rs;
        try {
            rs = await (await con).execute(sql);
        } catch (err) {
            console.log("catch dao : ", err)
        }
        //console.log(member)
        return rs;
    },
    dao_idsearch: async (email) => {
        const sql = `select id from member where email='${email}'`;
        let rs;
        try {
            rs = await (await con).execute(sql);
        } catch (err) {
            console.log("catch dao : ", err)
        }
        //console.log(member)
        return rs;
    },

}

module.exports = { process };