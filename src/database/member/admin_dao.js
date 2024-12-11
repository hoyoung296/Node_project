const con = require("../db_common")

const process ={
    dao_memberlist : async()=>{
        const sql = `select * from member`;
        let data;
        try{
            data = await (await con).execute(sql);
        }catch(err){
            console.log("catch dao : ", err)
        }
        return data;
    },
    dao_memberdel : async(id)=>{
        const sql = `delete from member where id = '${id}'`;
        let rs;
        try{
            rs = await (await con).execute(sql);
        }catch(err){
            console.log("catch dao : ", err)
        }
        return rs;
    },
}

module.exports = { process };