
const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const mysqlConnection = require('../database'); // se importa la conexión con la DB

// ruta que extrae todos los registros GET
router.get('/', (req, res) =>{
    mysqlConnection.query('SELECT *FROM employees', (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });    
});

// ruta que extrae un registro especifico
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

// ruta que agrega un registro a la DB

module.exports = router;