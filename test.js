const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app   = express();
const port  = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

 const connection =
    mysql.createConnection({
       host: "localhost",
       user:  "root",
       password: "",
       database: "hna",
    });

    connection.connect((err) => {
        if(err){
            console.error('Error connecting to mysql' + err.stack);
            return;
        }
        console.log('connetted to mysql' + connection.threadId);
     });

     app.get('/', (req, res) => {

        res.sendFile(__dirname + '/index.html');
     });

     app.post('/submit', (req, res) => {
        const email = req.body.email;
        const password  = req.body.password;

        if(!email || !password){
            return 
            res.status(400).send('Username and password are required');
        }

        
        const sql = 'INSERT INTO signuptest (email, password) VALUES (?, ?)';
        connection.query(sql, [email, password], (error, results) => {
            if (error) {
                console.error('error inserting into mysql' + error.stack);
                return
                res.status(500).send('internal error');
            }
            res.send('user register succccess');
     })

     });
     app.listen(port, () => {
        console.log(`server is running at ${port}`)
     });
    

   