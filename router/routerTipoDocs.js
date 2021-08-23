const execute = require('./connection');
const express = require('express');
const router = express.Router();

// VENTAS BUSCAR PRODUCTO POR DESCRIPCION
router.get("/tipo", async(req,res)=>{
    const {app,empnit,tipo} = req.query;
        
    let qry ='';

    qry = `SELECT CODDOC,CORRELATIVO FROM ME_TIPODOCUMENTOS WHERE TIPODOC='${tipo}'`     
  
    execute.Query(res,qry);

});

router.get("/tipopedido", async(req,res)=>{
    const {app,empnit,tipo} = req.query;
        
    let qry ='';

    qry = `SELECT CODDOC,CORRELATIVO FROM ME_TIPODOCUMENTOS WHERE TIPODOC='PED'`     
  
    execute.Query(res,qry);

});


router.get("/correlativodoc", async(req,res)=>{
    const {app,empnit,tipo,coddoc} = req.query;
        
    let qry ='';

    qry = `SELECT CODDOC,CORRELATIVO FROM ME_TIPODOCUMENTOS WHERE TIPODOC='${tipo}' AND CODDOC='${coddoc}'`     
    
    execute.Query(res,qry);

});


router.get("/correlativocot", async(req,res)=>{
    const {empnit,coddoc} = req.query;
        
    let qry ='';

    qry = `SELECT CODDOC,CORRELATIVO FROM DONRAUL_TIPODOC WHERE CODDOC='${coddoc}'`     
    
    execute.Query(res,qry);

});

// OBTIENE LAS SUCURSALES
router.get("/sucursales", async(req,res)=>{
            
    let qry ='';

    qry = `SELECT CODSUCURSAL, NOMBRE, ENCARGADO FROM ME_SUCURSALES`     
  
    execute.Query(res,qry);

});

module.exports = router;
