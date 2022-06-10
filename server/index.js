const express = require("express")
const mysql = require('mysql');
const app = express();
const pool = dbConnection();
const cors = require("cors")
app.use(cors())
app.use(express.json())


app.post('/', async (req, res) => {
   console.log("hello");
});
async function executeSQL(sql, params){
    return new Promise (function (resolve, reject) {
    pool.query(sql, params, function (err, rows, fields) {
      if (err) throw err;
         resolve(rows);
      });
    });
}//executeSQL
//values in red must be updated
function dbConnection(){

   const pool  = mysql.createPool({

      connectionLimit: 10,
      host: "vkh7buea61avxg07.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
      user: "e0onowbbw5y152bm",
      password: "nvtkqcovq5e10car",
      database: "qfu2mxm9593gt8ef"

   }); 

   return pool;
    
} //dbConnection
//start server
app.listen(3001, '127.0.0.1', () => {
    console.log("Expresss server running at http://127.0.0.1:3001/")
} )