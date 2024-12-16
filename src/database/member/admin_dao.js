const con = require("../db_common")

const process ={
    dao_memberlist2 : async()=>{
        const sql = `select * from member`;
        let data;
        try{
            data = await (await con).execute(sql);
        }catch(err){
            console.log("catch dao : ", err)
        }
        return data;
    },
    dao_memberlist : async(start)=>{
        const sql = `select * from member order by id desc offset ${start} rows fetch next 15 rows only`;
        let data;
        try{
            data = await (await con).execute(sql);
        }catch(err){
            console.log("catch dao : ", err)
        }
        return data;
    },
    totalCnt : async() => {
        let cnt;
        try{
            cnt =  await (await con).execute(`select count(*) from member`); 
        }catch( err ){
            console.log( err )
        }
        return cnt;
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
    dao_boardlist : async()=>{
        const sql = `select * from board`;
        let data;
        try{
            data = await (await con).execute(sql);
        }catch(err){
            console.log("catch dao : ", err)
        }
        return data;
    },
    dao_boarddel : async(no)=>{
        const sql = `delete from board where WRITE_NO = '${no}'`;
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