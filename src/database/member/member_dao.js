const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config")
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

const con = require("../db_common")
const process = {
    dao_insert : async (body) => {
        const sql = `insert into member(id,pwd,name,addr,phone,email,dotori) values(:id,:pwd,:name,:addr,:phone,:email,:dotori)`;
        let result = 0;
        try{
            // const con = await oracledb.getConnection(dbConfig);
            // result = await con.execute(sql, body);
            console.log("con : ", con)
            result = await(await con).execute(sql, body);
        }catch(err){
            console.log(err)
        }
        return result;
    },
    dao_login : async ( id ) => {
        //console.log("dao : ", username )
        const sql = `select * from member where id='${id}'`;
        let member;
        try{
            member = await(await con).execute(sql);
        }catch(err){
            console.log("catch dao : ", err)
        }
        //console.log(member)
        return member;
    },
    dao_idCheck : async(uid) => {
        const sql = `select id from member where id='${uid}'`;
        let id;
        try{
            id = await(await con).execute(sql);
        }catch(err){
            console.log("catch dao : ", err)
        }
        //console.log(member)
        return id;
    }
}

module.exports = { process };