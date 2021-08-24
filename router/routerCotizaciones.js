const execute = require('./connection');
const express = require('express');
const router = express.Router();


router.post("/eliminar", async(req,res)=>{

    const {coddoc,correlativo}  = req.body;

    let qry = '';
    qry = `DELETE FROM DONRAUL_COTIZACIONES 
    WHERE CODDOC='${coddoc}' AND CORRELATIVO=${correlativo};
    DELETE FROM DONRAUL_COTIZACIONES_DET 
    WHERE CODDOC='${coddoc}' AND CORRELATIVO=${correlativo};`
    
    execute.Query(res,qry);

})


router.post("/listado", async(req,res)=>{

    const {mes,anio,coddoc}  = req.body;

    let qry = '';
    qry = `SELECT CODDOC, CORRELATIVO,FECHA, CLIENTE, DIRECCION, EMAIL, OBS, TELEFONO, FLETE, TOTALPRECIO 
    FROM DONRAUL_COTIZACIONES 
    WHERE CODDOC='${coddoc}' AND ANIO=${anio} AND MES=${mes}`
    
    execute.Query(res,qry);

})


router.post("/listaproductos", async(req,res)=>{
    
    const {empnit} = req.body;
    // app= sucusal
    // K= CAMBIO DE PRODUCTO
      //MAYOREOC // COSTO / AS DESCUENTO

    let qry ='';
    qry = `SELECT 
    COMMUNITY_PRODUCTOS_SYNC.EMPNIT AS CODSUCURSAL,
    COMMUNITY_PRODUCTOS_SYNC.CODPROD, 
    COMMUNITY_PRODUCTOS_SYNC.DESPROD,
    COMMUNITY_PRODUCTOS_SYNC.DESPROD2,
    COMMUNITY_PRODUCTOS_SYNC.DESPROD3, 
    COMMUNITY_PRECIOS_SYNC.CODMEDIDA, 
    COMMUNITY_PRECIOS_SYNC.EQUIVALE, COMMUNITY_PRECIOS_SYNC.COSTO, 
	COMMUNITY_PRECIOS_SYNC.PRECIO, COMMUNITY_PRECIOS_SYNC.MAYOREOA AS PRECIOA, 
    COMMUNITY_PRECIOS_SYNC.MAYOREOB AS PRECIOB, 
    COMMUNITY_PRECIOS_SYNC.MAYOREOC AS PRECIOC, 
    ISNULL(COMMUNITY_MARCAS.DESMARCA, 'SN') AS DESMARCA, 
    COMMUNITY_INVSALDO_SYNC.SALDO AS EXISTENCIA, 
    COMMUNITY_PRECIOS_SYNC.COSTO AS DESCUENTO, 0 AS EXENTO
	FROM  COMMUNITY_PRODUCTOS_SYNC LEFT OUTER JOIN
                         COMMUNITY_PRECIOS_SYNC ON COMMUNITY_PRODUCTOS_SYNC.CODPROD = COMMUNITY_PRECIOS_SYNC.CODPROD AND COMMUNITY_PRODUCTOS_SYNC.EMPNIT = COMMUNITY_PRECIOS_SYNC.EMPNIT AND 
                         COMMUNITY_PRODUCTOS_SYNC.TOKEN = COMMUNITY_PRECIOS_SYNC.TOKEN LEFT OUTER JOIN
                         COMMUNITY_MARCAS ON COMMUNITY_PRODUCTOS_SYNC.TOKEN = COMMUNITY_MARCAS.TOKEN AND COMMUNITY_PRODUCTOS_SYNC.EMPNIT = COMMUNITY_MARCAS.EMPNIT LEFT OUTER JOIN
                         COMMUNITY_INVSALDO_SYNC ON COMMUNITY_PRODUCTOS_SYNC.TOKEN = COMMUNITY_INVSALDO_SYNC.TOKEN AND COMMUNITY_PRODUCTOS_SYNC.EMPNIT = COMMUNITY_INVSALDO_SYNC.EMPNIT AND 
                         COMMUNITY_PRODUCTOS_SYNC.CODPROD = COMMUNITY_INVSALDO_SYNC.CODPROD
     ` 
    //WHERE (COMMUNITY_PRODUCTOS_SYNC.EMPNIT='${empnit}')
    
    execute.Query(res,qry);

})



module.exports = router;
