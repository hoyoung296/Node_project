const oracledb = require("oracledb");
const dbConfig = require("../../config/cookie_session/cookie_session_config")
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

module.exports = oracledb.getConnection( dbConfig )