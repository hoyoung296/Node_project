const oracledb = require("oracledb");
const dbConfig = require("../../config/db_config")
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

const con = require("../db_common")