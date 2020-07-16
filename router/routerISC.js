const express = require('express');
const router = express.Router();
const execute = require('./connection');

// OBTIENE EL TOTAL DE INVENTARIOS
router.get("/inventarios", async(req,res)=>{
  
  const token = req.query.token;
  
  let qr0 = `SELECT COMMUNITY_INVSALDO_SYNC.EMPNIT, COMMUNITY_EMPRESAS_SYNC.EMPNOMBRE, COMMUNITY_INVSALDO_SYNC.CODPROD, COMMUNITY_PRODUCTOS_SYNC.DESPROD, COMMUNITY_INVSALDO_SYNC.ENTRADAS, 
  COMMUNITY_INVSALDO_SYNC.SALIDAS, COMMUNITY_INVSALDO_SYNC.SALDO, COMMUNITY_MARCAS.DESMARCA, COMMUNITY_PRODUCTOS_SYNC.COSTO, (ISNULL((COMMUNITY_PRODUCTOS_SYNC.COSTO * COMMUNITY_INVSALDO_SYNC.SALDO),0)) AS TOTALCOSTO
  FROM COMMUNITY_MARCAS RIGHT OUTER JOIN
  COMMUNITY_PRODUCTOS_SYNC ON COMMUNITY_MARCAS.TOKEN = COMMUNITY_PRODUCTOS_SYNC.TOKEN AND COMMUNITY_MARCAS.CODMARCA = COMMUNITY_PRODUCTOS_SYNC.CODMARCA AND 
  COMMUNITY_MARCAS.EMPNIT = COMMUNITY_PRODUCTOS_SYNC.EMPNIT RIGHT OUTER JOIN
  COMMUNITY_INVSALDO_SYNC LEFT OUTER JOIN
  COMMUNITY_EMPRESAS_SYNC ON COMMUNITY_INVSALDO_SYNC.TOKEN = COMMUNITY_EMPRESAS_SYNC.TOKEN AND 
  COMMUNITY_INVSALDO_SYNC.EMPNIT = COMMUNITY_EMPRESAS_SYNC.EMPNIT ON COMMUNITY_PRODUCTOS_SYNC.TOKEN = COMMUNITY_INVSALDO_SYNC.TOKEN AND 
  COMMUNITY_PRODUCTOS_SYNC.CODPROD = COMMUNITY_INVSALDO_SYNC.CODPROD AND COMMUNITY_PRODUCTOS_SYNC.EMPNIT = COMMUNITY_INVSALDO_SYNC.EMPNIT
  WHERE (COMMUNITY_INVSALDO_SYNC.TOKEN = '${token}')`;


let qr=`SELECT        Invsaldo.EMP_NIT, Empresas.EMP_NOMCOM AS EMPNOMBRE, Invsaldo.CODPROD, Productos.DESPROD, Invsaldo.ENTRADAS, Invsaldo.SALIDAS, Invsaldo.SALDOFINAL AS SALDO, Marcas.DESMARCA, 
Productos.COSTOQUETZAL AS COSTO, (ISNULL(Productos.COSTOQUETZAL,0) * (ISNULL(Invsaldo.SALDOFINAL,0)) AS TOTALCOSTO
FROM            Marcas RIGHT OUTER JOIN
             Productos ON Marcas.CODMARCA = Productos.CODMARCA AND Marcas.EMP_NIT = Productos.EMP_NIT RIGHT OUTER JOIN
             Invsaldo ON Productos.CODPROD = Invsaldo.CODPROD AND Productos.EMP_NIT = Invsaldo.EMP_NIT LEFT OUTER JOIN
             Empresas ON Invsaldo.EMP_NIT = Empresas.EMP_NIT
             where invsaldo.INV_MES=10 and Invsaldo.INV_ANO=2019`

	execute.Query(res,qr);

});
// OBTIENE EL INVENTARIO DE UN SOLO PRODUCTO
router.get("/inventarioproducto", async(req,res)=>{
  
  const token = req.query.token;
  const filtro = req.query.filtro;
  
  let qr = `SELECT COMMUNITY_INVSALDO_SYNC.EMPNIT, COMMUNITY_EMPRESAS_SYNC.EMPNOMBRE, COMMUNITY_INVSALDO_SYNC.CODPROD, COMMUNITY_PRODUCTOS_SYNC.DESPROD, COMMUNITY_INVSALDO_SYNC.ENTRADAS, 
  COMMUNITY_INVSALDO_SYNC.SALIDAS, COMMUNITY_INVSALDO_SYNC.SALDO, COMMUNITY_MARCAS.DESMARCA, COMMUNITY_PRODUCTOS_SYNC.COSTO, (ISNULL((COMMUNITY_PRODUCTOS_SYNC.COSTO * COMMUNITY_INVSALDO_SYNC.SALDO),0)) AS TOTALCOSTO
  FROM COMMUNITY_MARCAS RIGHT OUTER JOIN
  COMMUNITY_PRODUCTOS_SYNC ON COMMUNITY_MARCAS.TOKEN = COMMUNITY_PRODUCTOS_SYNC.TOKEN AND COMMUNITY_MARCAS.CODMARCA = COMMUNITY_PRODUCTOS_SYNC.CODMARCA AND 
  COMMUNITY_MARCAS.EMPNIT = COMMUNITY_PRODUCTOS_SYNC.EMPNIT RIGHT OUTER JOIN
  COMMUNITY_INVSALDO_SYNC LEFT OUTER JOIN
  COMMUNITY_EMPRESAS_SYNC ON COMMUNITY_INVSALDO_SYNC.TOKEN = COMMUNITY_EMPRESAS_SYNC.TOKEN AND 
  COMMUNITY_INVSALDO_SYNC.EMPNIT = COMMUNITY_EMPRESAS_SYNC.EMPNIT ON COMMUNITY_PRODUCTOS_SYNC.TOKEN = COMMUNITY_INVSALDO_SYNC.TOKEN AND 
  COMMUNITY_PRODUCTOS_SYNC.CODPROD = COMMUNITY_INVSALDO_SYNC.CODPROD AND COMMUNITY_PRODUCTOS_SYNC.EMPNIT = COMMUNITY_INVSALDO_SYNC.EMPNIT
  WHERE (COMMUNITY_INVSALDO_SYNC.TOKEN = '${token}') AND (COMMUNITY_PRODUCTOS_SYNC.DESPROD LIKE '%${filtro}%') AND (COMMUNITY_PRODUCTOS_SYNC.HABILITADO='SI')`;

	execute.Query(res,qr);

});

// OBTIENE EL DETALLE DE LOS PRODUCTOS
router.get("/preciosproducto", async(req,res)=>{
  
  const {token,codprod,empnit} = req.query;
  
  let qr = `SELECT CODMEDIDA,EQUIVALE,COSTO,PRECIO,MAYOREOA,MAYOREOB,MAYOREOC FROM COMMUNITY_PRECIOS_SYNC WHERE TOKEN='${token}' AND EMPNIT='${empnit}' AND CODPROD='${codprod}'`

  //let qr = `SELECT CODMEDIDA,EQUIVALE,COSTO,PRECIO,MAYORISTA AS MAYOREOA ,ESCALA AS MAYOREOB,ESPECIAL AS MAYOREOC FROM PRECIOS WHERE EMP_NIT='${empnit}' AND CODPROD='${codprod}'`

	execute.Query(res,qr);

});

// OBTIENE LA LISTA DE LOS PRODUCTOS
router.get("/productos", async(req,res)=>{
  
  const {token,filtro} = req.query;
  
  let qr = `SELECT CODPROD,DESPROD,COSTO FROM COMMUNITY_PRODUCTOS_SYNC WHERE TOKEN='${token}' AND DESPROD LIKE '%${filtro}%'`
  
	execute.Query(res,qr);

});

// OBTIENE LA LISTA DE COMPRAS DEL PRODUCTO
router.get("/productocompras", async(req,res)=>{
  
  const {token,codprod} = req.query;
  
  let qr = `SELECT FECHA,NOMBRE, UNIDADES,COSTO AS TOTALCOSTO,(COSTO/UNIDADES) AS COSTOUNITARIO FROM ISC_RPT_PRODUCTOS WHERE TOKEN='${token}' AND CODPROD ='${codprod}' AND TIPODOC='COM' ORDER BY FECHA DESC`
  
	execute.Query(res,qr);

});

// OBTIENE LA LISTA DE VENTAS POR MES DEL PRODUCTO
router.get("/productoventasmes", async(req,res)=>{
  
  const {token,codprod} = req.query;
  
  let qr = `SELECT ANIO, MES, CODPROD, SUM(UNIDADES) AS UNIDADES, SUM(VENTA) AS VENTA
            FROM ISC_RPT_PRODUCTOS
            WHERE (TIPODOC = 'FAC') AND (CODPROD='${codprod}') AND (TOKEN='${token}')
            GROUP BY ANIO, MES, CODPROD
            ORDER BY ANIO, MES DESC`
  
	execute.Query(res,qr);

});


// OBTIENE LA LISTA DE VENTAS POR MES DEL PRODUCTO
router.get("/alertasultimaventa", async(req,res)=>{
  
  const {token} = req.query;
  
  let qr = `SELECT       COMMUNITY_PRODUCTOS_SYNC.CODPROD, COMMUNITY_PRODUCTOS_SYNC.DESPROD, COMMUNITY_PRODUCTOS_SYNC.COSTO, COMMUNITY_PRODUCTOS_SYNC.LASTSALE, 
  COMMUNITY_INVSALDO_SYNC.SALDO AS EXISTENCIA
FROM            COMMUNITY_PRODUCTOS_SYNC LEFT OUTER JOIN
  COMMUNITY_INVSALDO_SYNC ON COMMUNITY_PRODUCTOS_SYNC.TOKEN = COMMUNITY_INVSALDO_SYNC.TOKEN AND COMMUNITY_PRODUCTOS_SYNC.CODPROD = COMMUNITY_INVSALDO_SYNC.CODPROD AND 
  COMMUNITY_PRODUCTOS_SYNC.EMPNIT = COMMUNITY_INVSALDO_SYNC.EMPNIT
WHERE        (COMMUNITY_PRODUCTOS_SYNC.TOKEN = '${token}')
ORDER BY COMMUNITY_PRODUCTOS_SYNC.LASTSALE`
  
	execute.Query(res,qr);

});




// OBTIENE LA LISTA DE EMPRESAS
router.get("/empresas", async(req,res)=>{
  
  const token = req.query.token;
  
  let qr = `SELECT EMPNOMBRE AS EMPRESA FROM COMMUNITY_EMPRESAS_SYNC WHERE TOKEN='${token}'`

  //let qr = `SELECT EMP_NOMCOM AS EMPRESA FROM EMPRESAS`

	execute.Query(res,qr);

});

//////////////////////////////
// VENTAS
//////////////////////////////

// VENTAS POR DIA
router.get("/ventasmesdia", async(req,res)=>{
  
  const {token,anio,mes} = req.query;
 
  let qr = `SELECT ISC_RPT_DOCUMENTOS.EMPNIT, COMMUNITY_EMPRESAS_SYNC.EMPNOMBRE, ISC_RPT_DOCUMENTOS.FECHA, SUM(ISC_RPT_DOCUMENTOS.TOTALCOSTO) AS TOTALCOSTO, SUM(ISC_RPT_DOCUMENTOS.TOTALCOSTODOL) AS TOTALCOSTODOL, SUM(ISC_RPT_DOCUMENTOS.TOTALVENTA) 
  AS TOTALPRECIO, SUM(ISC_RPT_DOCUMENTOS.IMPORTE) AS TOTALVENTAS, SUM(ISC_RPT_DOCUMENTOS.GANANCIA) AS UTILIDAD
    FROM  ISC_RPT_DOCUMENTOS LEFT OUTER JOIN
    COMMUNITY_EMPRESAS_SYNC ON ISC_RPT_DOCUMENTOS.TOKEN = COMMUNITY_EMPRESAS_SYNC.TOKEN AND ISC_RPT_DOCUMENTOS.EMPNIT = COMMUNITY_EMPRESAS_SYNC.EMPNIT
    WHERE (ISC_RPT_DOCUMENTOS.MES = ${mes}) AND (ISC_RPT_DOCUMENTOS.ANIO = ${anio}) AND (ISC_RPT_DOCUMENTOS.TOKEN = '${token}')
GROUP BY ISC_RPT_DOCUMENTOS.EMPNIT, COMMUNITY_EMPRESAS_SYNC.EMPNOMBRE, ISC_RPT_DOCUMENTOS.FECHA ORDER BY FECHA`

	execute.Query(res,qr);

});
// VENTAS DEL DIA
router.get("/ventasdia", async(req,res)=>{
  
  const {token,empnit,dia} = req.query;
  

  let qr = `SELECT        EMPNIT, FECHA AS DIA, CODDOC, CORRELATIVO, NOMCLIENTE AS CLIENTE, TOTALCOSTO AS COSTO, TOTALCOSTODOL AS COSTO2, TOTALVENTA AS PRECIO, TOTALDESCUENTO AS DESCUENTO, IMPORTE, GANANCIA AS UTILIDAD
  FROM            ISC_RPT_DOCUMENTOS
  WHERE        (TOKEN = '${token}') AND (FECHA = '${dia}') AND (EMPNIT = '${empnit}')`

	execute.Query(res,qr);

});
// VENTAS DEL DIA PRODUCTOS
router.get("/ventasdiaproductos", async(req,res)=>{
  
  const {token,empnit,dia,mes,anio} = req.query;
  
  let qr = `SELECT EMPNIT, CODPROD, DESPROD, SUM(UNIDADES) AS UNIDADES, SUM(COSTO) AS COSTO, SUM(VENTA) AS VENTA, SUM(VENTA) - SUM(COSTO) AS UTILIDAD
            FROM ISC_RPT_PRODUCTOS
            WHERE (FECHA = '${dia}') AND (TOKEN = '${token}') AND (ANIO=${anio}) AND (MES=${mes}) AND (TIPODOC='FAC')
            GROUP BY EMPNIT, CODPROD, DESPROD
            HAVING (EMPNIT = '${empnit}')
            ORDER BY DESPROD`
  
	execute.Query(res,qr);

});


module.exports = router;
