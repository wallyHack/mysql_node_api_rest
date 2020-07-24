
// creamos la conexión con la base de datos
const mysql = require('mysql');

mysqlConnection = mysql.createConnection({
    user: 'root',
    password: 'Manny061195GaTo000#mM',
    host: 'localhost',
    database: 'company'
});

mysqlConnection.connect(function(err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('DB is connected...');
    }
});

module.exports = mysqlConnection;