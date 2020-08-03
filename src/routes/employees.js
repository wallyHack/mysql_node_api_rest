
const { Router, request, query } = require('express');
const router = Router();
const _ = require('underscore');
const mysqlConnection = require('../database'); // se importa la conexión con la DB

// ruta que extrae todos los registros de employees GET
router.get('/', (req, res) =>{
    mysqlConnection.query('SELECT *FROM employees', (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });    
});

// ruta que extrae un registro especifico de employee
router.get('/:id', (req, res) =>{    
    const { id } = req.params;    
    mysqlConnection.query('SELECT *FROM employees WHERE ID = ?', [id],
    (err, rows, fields) =>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

// ruta que agrega el registro de un employee POST
router.post('/', (req, res) =>{
    // parametros de la interface cliente
    const { ID, NAME, SALARY } = req.body;
    console.log(req.body);

    // creamos la consulta que usa el procedimiento almacenado
    // const query = `       
    //     CALL employeeAddOrEdit(?, ?, ?);
    // `;

    const query = 'INSERT INTO employees VALUES(?, ?, ?)';
    mysqlConnection.query(query, [ID, NAME, SALARY], (err, rows, fields) =>{
        if(!err){
            res.json({"Status": "Employee saved..."});
        }else{
            console.log(err);
        }
    });
});

// ruta que actualiza el registro de un employee PUT
router.put('/:id', (req, res) =>{
    // parametros de la interface cliente
    const { NAME, SALARY } = req.body;
    console.log(req.body);
    const { id } = req.params; // id de la URL

    // creamos la consulta que usa el procedimiento almacenado
    // const query = `
    //     CALL employeeAddOrEdit(?, ?, ?);
    // `;

    const query = 'UPDATE employees SET NAME = ?, SALARY = ? WHERE ID = ?';
    mysqlConnection.query(query, [NAME, SALARY, id], (err, rows, fields) =>{
        if(!err){
            res.json({"status": "Employee Updated..."});
        }else{
            console.log(err);
        }
    });
});

// ruta que elimina el registro de un employee DELETE
router.delete('/:id', (req, res) =>{    
    const { id } = req.params;   
    console.log(id); 
    mysqlConnection.query('DELETE FROM employees WHERE (ID = ?)', [id],
    (err, rows, fields) =>{
        if(!err){
            res.json({"status": "Employee Deleted..."});
        }else{
            console.log(err);
        }
    });
});

module.exports = router;