const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values ('Lucas'), ('Nicolas'), ('João')`
connection.query(sql)
connection.end()

app.set('view engine', 'pug');

app.get('/', (req, resp) => {
    var header = 'Full Cycle Rocks!'
    var results = []

    var con = mysql.createConnection(config)

    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM people", function (err, result, fields) {
          if (err) throw err;
          result.forEach( (value) => results.push(value.name))
          resp.render('people', {title: header, results: results })
        });
      });

})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})