
/******************************************************************************
 *
 * You may not use the identified files except in compliance with the Apache
 * License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * NAME
 *   example.js
 *
 * DESCRIPTION
 *   A basic node-oracledb example using Node.js 8's async/await syntax.
 *
 *   For a connection pool example see connectionpool.js
 *   For a ResultSet example see resultset2.js
 *   For a query stream example see selectstream.js
 *   For a Promise example see promises.js
 *   For a callback example see select1.js
 *
 *   This example requires node-oracledb 2.2 or later.
 *
 *****************************************************************************/

// Using a fixed Oracle time zone helps avoid machine and deployment differences
process.env.ORA_SDTZ = 'UTC';

var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
const path = require("path");
var request = require("request");
const cors = require("cors");


// routes will go here

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
// respond with "hello world" when a GET request is made to the homepage
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use(cors());



app.post('/finishForm', function (req, res) {
  //res.send('GET request to the homepage');
  var id = req.query.username;
  var pass = req.query.pass;
  var LoanApplication = req.body;

  var request = require("request");

  var options = { method: 'POST',
    url: 'http://129.146.98.197:8011/REST/Giros/Solicitud/aperturaCuenta',
    headers:
     {
       apiKey: '6b39740d-3518-4547-bd07-57626a1d5260',
       'Content-Type': 'application/json' },
    body:
     { startLoanApplication:
        { formArg:
           { LoanApplication } } },
    json: true };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(response.statusCode);
    res.send(response.statusCode)

  });





});





// GET method route
app.get('/user', function (req, res) {
  //res.send('GET request to the homepage');
  var id = req.query.username;
  var pass = req.query.pass;
//  console.log('id: ' + req.query.username);
//  console.log('pass: ' + req.query.pass);

    async function run() {
      let connection;

      try {

        let sql, binds, options, result;

        connection = await oracledb.getConnection(  {
          user          : dbConfig.user,
          password      : dbConfig.password,
          connectString : dbConfig.connectString,
          privilege     : oracledb.SYSDBA

        });

        binds = {};
        // For a complete list of options see the documentation.
        options = {
          autoCommit: true,
          // batchErrors: true,  // continue processing even if there are data errors
          bindDefs: [
            { type: oracledb.NUMBER },
            { type: oracledb.STRING, maxSize: 20 }
          ]
        };



        sql = "SELECT * FROM GIROSYFINANZASCUENTAAHORROS WHERE USERNAME = " + "'" + id +"'" +" AND PASS  = " +"'" + pass +"'";
        console.log(sql);

        result = await connection.execute(sql, binds, options);
        console.log("Current date query results: ");

    //    console.log(result.rows[0]);
      //  console.log("Stuff");
      //  console.log(result);
        res.send(result.rows[0])

      } catch (err) {
        console.error(err);
      } finally {
        if (connection) {
          try {
            await connection.close();
          } catch (err) {
            console.error(err);
          }
        }
      }
    }

    run();


    //USERNAME
  //PASS


});


app.post('/updateTemporal', function (req, res) {
  //res.send('GET request to the homepage');
  var id = req.query.username || "null";
  var pass = req.query.pass || "null";
  var nomeroid = req.body.noidentificacion || "null";
  var lugarexpedicion = req.body.lugarexpedicion || "null";
  var celular = req.body.celular || "null";
  var ocupacion = req.body.ocupacion || "null";
  var profesion = req.body.profesion || "null";
  var ingresosmensuales = req.body.ingresosmensuales || "null";
  var egresosmensuales = req.body.ingresosmensuales || "null";

    async function run() {
      let connection;

      try {

        let sql, binds, options, result;

        connection = await oracledb.getConnection(  {
          user          : dbConfig.user,
          password      : dbConfig.password,
          connectString : dbConfig.connectString,
          privilege     : oracledb.SYSDBA

        });

        binds = {};
        // For a complete list of options see the documentation.
        options = {
          autoCommit: true,
          // batchErrors: true,  // continue processing even if there are data errors
          bindDefs: [
            { type: oracledb.NUMBER },
            { type: oracledb.STRING, maxSize: 20 }
          ]
        };
          sql = "INSERT INTO GIROSYFINANZASCUENTAAHORROS"+
        "  (NOIDENTIFICACION, LUGAREXPEDICION, CELULAR, INGRESOSMENSUALES, EGRESOSMENSUALES, OCUPACION, PROFESION, USERNAME, PASS)"+
        "   VALUES ('"+nomeroid+"','"+lugarexpedicion+"','"+celular+"','"+ingresosmensuales+"','"+egresosmensuales+"','"+ocupacion+"','"+profesion+"','"+id+"','"+pass+"')";

      //  sql = `INSERT INTO mytab VALUES (:1, :2)`;
//INSERT INTO "SYS"."GIROSYFINANZASCUENTAAHORROS" (NOIDENTIFICACION, LUGAREXPEDICION, FINALIZADO, USERNAME, PASS) VALUES ('123', 'BOGOta', 'N', 'javier', 'javier')

    //    sql = "SELECT * FROM GIROSYFINANZASCUENTAAHORROS WHERE USERNAME = " + "'" + id +"'" +" AND PASS  = " +"'" + pass +"'";
        console.log(sql);

        result = await connection.execute(sql,options);
        console.log("Current date query results: ");

    //    console.log(result.rows[0]);
      //  console.log("Stuff");
      //  console.log(result);
        res.send(result)

      } catch (err) {
        console.error(err);
      } finally {
        if (connection) {
          try {
            await connection.close();
          } catch (err) {
            console.error(err);
          }
        }
      }
    }

    run();


});



app.post('/temporal', function (req, res) {
  console.log("ENTROO")

  console.log(req.body)
  //res.send('GET request to the homepage');
  var id = req.query.username || "null";
  var pass = req.query.pass || "null";
  var nomeroid = req.body.noidentificacion || "null";
  var lugarexpedicion = req.body.lugarexpedicion || "null";
  var celular = req.body.celular || "null";
  var ocupacion = req.body.ocupacion || "null";
  var profesion = req.body.profesion || "null";
  var ingresosmensuales = req.body.ingresosmensuales || "null";
  var egresosmensuales = req.body.ingresosmensuales || "null";

    async function run() {
      let connection;

      try {

        let sql, binds, options, result;

        connection = await oracledb.getConnection(  {
          user          : dbConfig.user,
          password      : dbConfig.password,
          connectString : dbConfig.connectString,
          privilege     : oracledb.SYSDBA

        });

        binds = {};
        // For a complete list of options see the documentation.
        options = {
          autoCommit: true
          // batchErrors: true,  // continue processing even if there are data errors
        };
          sql = "INSERT INTO GIROSYFINANZASCUENTAAHORROS"+
        "  (NOIDENTIFICACION, LUGAREXPEDICION, CELULAR, INGRESOSMENSUALES, EGRESOSMENSUALES, OCUPACION, PROFESION, USERNAME, PASS)"+
        "   VALUES ('"+nomeroid+"','"+lugarexpedicion+"','"+celular+"','"+ingresosmensuales+"','"+egresosmensuales+"','"+ocupacion+"','"+profesion+"','"+id+"','"+pass+"')";

      //  sql = `INSERT INTO mytab VALUES (:1, :2)`;
//INSERT INTO "SYS"."GIROSYFINANZASCUENTAAHORROS" (NOIDENTIFICACION, LUGAREXPEDICION, FINALIZADO, USERNAME, PASS) VALUES ('123', 'BOGOta', 'N', 'javier', 'javier')

    //    sql = "SELECT * FROM GIROSYFINANZASCUENTAAHORROS WHERE USERNAME = " + "'" + id +"'" +" AND PASS  = " +"'" + pass +"'";
        console.log(sql);

        result = await connection.execute(sql,binds,options);
    //    console.log("Current date query results: ");

    //    console.log(result.rows[0]);
      //  console.log("Stuff");
      //  console.log(result);
      console.log(result);
        res.send( result)

      } catch (err) {
        console.error(err);
      } finally {
        if (connection) {
          try {
            await connection.close();
          } catch (err) {
            console.error(err);
          }
        }
      }
    }

    run();


});



app.post('/temporalWeb', function (req, res) {
  console.log("ENTROO")

  console.log(req.body)
  //res.send('GET request to the homepage');
  var id = req.query.username || "null";
  var pass = req.query.pass || "null";
  var nomeroid = req.query.noidentificacion || "null";
  var lugarexpedicion = req.query.lugarexpedicion || "null";
  var celular = req.query.celular || "null";
  var ocupacion = req.query.ocupacion || "null";
  var profesion = req.query.profesion || "null";
  var ingresosmensuales = req.query.ingresosmensuales || "null";
  var egresosmensuales = req.query.ingresosmensuales || "null";

    async function run() {
      let connection;

      try {

        let sql, binds, options, result;

        connection = await oracledb.getConnection(  {
          user          : dbConfig.user,
          password      : dbConfig.password,
          connectString : dbConfig.connectString,
          privilege     : oracledb.SYSDBA

        });

        binds = {};
        // For a complete list of options see the documentation.
        options = {
          autoCommit: true
          // batchErrors: true,  // continue processing even if there are data errors
        };
          sql = "INSERT INTO GIROSYFINANZASCUENTAAHORROS"+
        "  (NOIDENTIFICACION, LUGAREXPEDICION, CELULAR, INGRESOSMENSUALES, EGRESOSMENSUALES, OCUPACION, PROFESION, USERNAME, PASS)"+
        "   VALUES ('"+nomeroid+"','"+lugarexpedicion+"','"+celular+"','"+ingresosmensuales+"','"+egresosmensuales+"','"+ocupacion+"','"+profesion+"','"+id+"','"+pass+"')";

      //  sql = `INSERT INTO mytab VALUES (:1, :2)`;
//INSERT INTO "SYS"."GIROSYFINANZASCUENTAAHORROS" (NOIDENTIFICACION, LUGAREXPEDICION, FINALIZADO, USERNAME, PASS) VALUES ('123', 'BOGOta', 'N', 'javier', 'javier')

    //    sql = "SELECT * FROM GIROSYFINANZASCUENTAAHORROS WHERE USERNAME = " + "'" + id +"'" +" AND PASS  = " +"'" + pass +"'";
        console.log(sql);

        result = await connection.execute(sql,binds,options);
    //    console.log("Current date query results: ");

    //    console.log(result.rows[0]);
      //  console.log("Stuff");
      //  console.log(result);
      console.log(result);
        res.send( result)

      } catch (err) {
        console.error(err);
      } finally {
        if (connection) {
          try {
            await connection.close();
          } catch (err) {
            console.error(err);
          }
        }
      }
    }

    run();


});

// POST method route
app.post('/', function (req, res) {
  console.log(req.body.username)
  console.log(req.body.pass)

});


/**
async function run() {
  let connection;

  try {

    let sql, binds, options, result;

    connection = await oracledb.getConnection(  {
      user          : dbConfig.user,
      password      : dbConfig.password,
      connectString : dbConfig.connectString,
      privilege     : oracledb.SYSDBA

    });

    // Create a table

    await connection.execute(
      `BEGIN
         EXECUTE IMMEDIATE 'DROP TABLE mytab';
         EXCEPTION
         WHEN OTHERS THEN
           IF SQLCODE NOT IN (-00942) THEN
             RAISE;
           END IF;
       END;`);

    await connection.execute(
      `CREATE TABLE mytab (id NUMBER, data VARCHAR2(20))`);

    // Insert some data

    sql = `INSERT INTO mytab VALUES (:1, :2)`;

    binds = [ [101, "Alpha" ], [102, "Beta" ], [103, "Gamma" ] ];

    // For a complete list of options see the documentation.
    options = {
      autoCommit: true,
      // batchErrors: true,  // continue processing even if there are data errors
      bindDefs: [
        { type: oracledb.NUMBER },
        { type: oracledb.STRING, maxSize: 20 }
      ]
    };

    result = await connection.executeMany(sql, binds, options);

    console.log("Number of rows inserted:", result.rowsAffected);

    // Query the data

    sql = `SELECT * FROM mytab`;

    binds = {};

    // For a complete list of options see the documentation.
    options = {
      outFormat: oracledb.OBJECT   // query result format
      // extendedMetaData: true,   // get extra metadata
      // fetchArraySize: 100       // internal buffer allocation size for tuning
    };

    result = await connection.execute(sql, binds, options);

    console.log("Column metadata: ", result.metaData);
    console.log("Query results: ");
    console.log(result.rows);

    // Show the date.  The value of ORA_SDTZ affects the output

    sql = `SELECT TO_CHAR(CURRENT_DATE, 'DD-Mon-YYYY HH24:MI') AS CD FROM DUAL`;
    result = await connection.execute(sql, binds, options);
    console.log("Current date query results: ");
    console.log(result.rows[0]['CD']);

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();
*/
