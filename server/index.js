const express = require("express")

const fs = require('fs')
const util= require('util')
const unlinkFile = util.promisify(fs.unlink)

const mysql = require('mysql');
const app = express();
const pool = dbConnection();

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const {uploadFile,deleteFile} = require('./s3')

const cors = require("cors")
app.use(cors())
app.use(express.json())

app.get('/pageLinks', async (req, res) => {
   let sql = `SELECT urlLink,urlText,urlNum,urlid
   FROM links
   WHERE userName = ?
   ORDER BY urlNum ASC`;
   let rows = await executeSQL(sql, ['Derockenthis']);
   // console.log(rows)
   res.send({rows})
   return "HELLO"
});
app.get('/getprofImage', async (req, res) => {
   let sql = `SELECT profileImage
   FROM profileimage
   WHERE userName = ?`;
   let rows = await executeSQL(sql, ['Derockenthis'])
   await checkProf('Derockenthis')
   res.send({rows})

   return "worked"
})
app.post('/profImage', upload.single('image'), async (req, res) => {
   const file = req.file
   const result = await uploadFile(file)
   await unlinkFile(file.path)
   const check = await checkProf('Derockenthis')
   if(check!=undefined){
      console.log(check.Name,"HEHEH")
      let sql = `UPDATE profileimage
            SET profileImage = ?,Name = ?
            WHERE userName = ?`
      let params = [result.Location,result.Key,'Derockenthis'];
      let rows = await executeSQL(sql, params); 
      const removeFile = await deleteFile(check.Name)
   }
   else{
      let sql = `INSERT INTO profileimage
      (userName,profileImage,Name)
      VALUES
      (?, ?,?)`;
      let params = ['Derockenthis',result.Location,result.Key];
      let rows = await executeSQL(sql, params); 
   }
   res.send("SUCCESS")
   return "worked"
})
app.post('/resortedLinks', async (req, res) => {

   links = req.body.links
   for(let i = 0; i<links.length;i++){
      let sql = `UPDATE links
               SET urlNum = ?
               WHERE urlid = ? and userName =?`
      let rows = await executeSQL(sql,[links[i].urlNum,links[i].urlid,'Derockenthis'])

   }
})
async function checkProf(username){
   let sql = `SELECT profileImage, Name
   FROM profileimage
   WHERE userName = ?`;
   let rows = await executeSQL(sql, [username])
   console.log(rows[0])
   return rows[0]
}
async function getnumLinks(username){
   let sql = `SELECT urlNum
   FROM links
   WHERE userName = ?`;
   let rows = await executeSQL(sql, [username]);

   return rows.length
}
app.post('/manage', async (req, res) => {
   //recieve links from front
   linkName = req.body.linkName;
   urlLink = req.body.urlLink;
   //query statement
   let sql = `INSERT INTO links
   (urlNum, urlLink, urlText,userName,userID)
   VALUES
   (?, ?, ?, ?,?)`;
   //insert into databse
   const num=await getnumLinks('Derockenthis')

   let params = [num, urlLink, linkName,'Derockenthis',1];
   let rows = await executeSQL(sql, params); 


   res.send("HELLOinRES")
   return "HELLO"
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