
const express = require('express')
const request = require('request');
const router = express.Router()
const sql = require('mssql')


const config = {

  user: "jimtest",
  password: "Password0123!",
  server: "jimtestsql.database.windows.net",
  port: 1433,
  database: "test",
  connectionTimeout: 3000,
  parseJSON: true,
  options: {
    encrypt: true,
    enableArithAbort: true
  },
  pool: {
    min: 0,
    idleTimeoutMillis: 3000
  }
};
const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

router.get('/', async function (req, res) {
  
  await poolConnect;
  try {
    const request = pool.request(); 
    const result = await request.query('select 1 as number')
    console.log(result);
    res.json(result.recordset);
    
} catch (err) {
    console.error('SQL error', err);
    res.send(err);
}
  


  //  var token = req.headers["x-ms-token-aad-access-token"]

  //      getstuff(token).then(response => {
  //        console.log(response)
  //       res.json(response)
  //       })
  //       .catch(error => {
  //           res.send(error)
  //       })

});

//   var getstuff =  async function (token) {

//     console.log("getting stuff");


// var options = {
//   'method': 'GET',
//   'url': 'https://testnodeweb06.azurewebsites.net/.auth/me',

//   'headers': {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer '+ token
//   }
// };
// console.log(options)
// return new Promise(resolve => {
//   request( options,  function (error, response, body) {
//      if(!error){
//        console.log(body)
//       resolve(JSON.parse(body));


//      }

//   });


// });

//   }

var app = express()
app.use('/', router)
const port = process.env.PORT || 1337;
app.listen(port)


console.log("Server running at http://localhost:%d", port);
