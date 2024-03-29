﻿const execute = require('./connection');
const express = require('express');
const router = express.Router();

// VENTANA DE VENTAS
///////////////////////////////////////

// VENTAS BUSCAR PRODUCTO POR DESCRIPCION
router.get("/buscarproducto", async(req,res)=>{
    
    const {empnit,filtro,app,tipoprecio} = req.query;
    // app= sucusal
    // K= CAMBIO DE PRODUCTO

    let campoprecio = '';

    switch (tipoprecio) {
        case 'P':
            campoprecio = 'COMMUNITY_PRECIOS_SYNC.PRECIO';      //PRECIO  
            break;
        case 'C':
            campoprecio = 'COMMUNITY_PRECIOS_SYNC.MAYOREOC'; //ESPECIAL
            break;
        case 'B':
            campoprecio = 'COMMUNITY_PRECIOS_SYNC.MAYOREOB';//ESCALA
            break;
        case 'A':
            campoprecio = 'COMMUNITY_PRECIOS_SYNC.MAYOREOA'; //MAYORISTA
            break;
        case 'K':
            campoprecio = '0.01'
            break;
        default:
            campoprecio = 'COMMUNITY_PRECIOS_SYNC.PRECIO';
            break;
    }
    //MAYOREOC // COSTO / AS DESCUENTO

    let qry ='';
    qry = `SELECT COMMUNITY_PRODUCTOS_SYNC.CODPROD, COMMUNITY_PRODUCTOS_SYNC.DESPROD, COMMUNITY_PRECIOS_SYNC.CODMEDIDA, COMMUNITY_PRECIOS_SYNC.EQUIVALE, COMMUNITY_PRECIOS_SYNC.COSTO, 
	${campoprecio} as PRECIO, ISNULL(COMMUNITY_MARCAS.DESMARCA, 'SN') AS DESMARCA, COMMUNITY_INVSALDO_SYNC.SALDO AS EXISTENCIA, COMMUNITY_PRECIOS_SYNC.COSTO AS DESCUENTO
	FROM            COMMUNITY_PRODUCTOS_SYNC LEFT OUTER JOIN
                         COMMUNITY_PRECIOS_SYNC ON COMMUNITY_PRODUCTOS_SYNC.CODPROD = COMMUNITY_PRECIOS_SYNC.CODPROD AND COMMUNITY_PRODUCTOS_SYNC.EMPNIT = COMMUNITY_PRECIOS_SYNC.EMPNIT AND 
                         COMMUNITY_PRODUCTOS_SYNC.TOKEN = COMMUNITY_PRECIOS_SYNC.TOKEN LEFT OUTER JOIN
                         COMMUNITY_MARCAS ON COMMUNITY_PRODUCTOS_SYNC.TOKEN = COMMUNITY_MARCAS.TOKEN AND COMMUNITY_PRODUCTOS_SYNC.EMPNIT = COMMUNITY_MARCAS.EMPNIT LEFT OUTER JOIN
                         COMMUNITY_INVSALDO_SYNC ON COMMUNITY_PRODUCTOS_SYNC.TOKEN = COMMUNITY_INVSALDO_SYNC.TOKEN AND COMMUNITY_PRODUCTOS_SYNC.EMPNIT = COMMUNITY_INVSALDO_SYNC.EMPNIT AND 
                         COMMUNITY_PRODUCTOS_SYNC.CODPROD = COMMUNITY_INVSALDO_SYNC.CODPROD
    WHERE (COMMUNITY_PRODUCTOS_SYNC.DESPROD LIKE '%${filtro}%') 
        OR (COMMUNITY_PRODUCTOS_SYNC.CODPROD = '${filtro}')` 
    
    
    execute.Query(res,qry);

})
// obtiene el total de temp ventas según sea el usuario
router.get("/tempVentastotal", async(req,res)=>{
    let empnit = req.query.empnit;
    let usuario = req.query.usuario;
    let token = req.query.token;
    let app = req.query.app;

    let qry = '';


            qry = `SELECT COUNT(CODPROD) AS TOTALITEMS, SUM(TOTALCOSTO) AS TOTALCOSTO, SUM(TOTALPRECIO) AS TOTALPRECIO, SUM(EXENTO) AS TOTALEXENTO, SUM(PMODIF) AS MODIF
            FROM ME_TEMP_VENTAS
            WHERE (CODSUCURSAL = '${app}') AND (USUARIO = '${usuario}')`        

    execute.Query(res,qry);
    
});

// obtiene el grid de temp ventas
router.get("/tempVentas", async(req,res)=>{
    let empnit = req.query.empnit;
    let coddoc = req.query.coddoc;
    let usuario = req.query.usuario;
    let token = req.query.token;
    let app = req.query.app;

    let qry = '';

    qry = `SELECT 
            ME_TEMP_VENTAS.ID,ME_TEMP_VENTAS.CODPROD, 
            ME_TEMP_VENTAS.DESPROD, 
            ME_TEMP_VENTAS.CODMEDIDA, 
            ME_TEMP_VENTAS.CANTIDAD, 
            ME_TEMP_VENTAS.EQUIVALE,
            ME_TEMP_VENTAS.PRECIO, 
            ME_TEMP_VENTAS.TOTALPRECIO,
            ME_TEMP_VENTAS.DESCUENTO,
            ME_TEMP_VENTAS.PMODIF
                FROM ME_TEMP_VENTAS 
            WHERE (ME_TEMP_VENTAS.CODSUCURSAL = '${app}') AND (ME_TEMP_VENTAS.USUARIO = '${usuario}')
            ORDER BY ME_TEMP_VENTAS.ID DESC`

       
    execute.Query(res,qry);
    
});

// obtiene row de temp ventas
router.post("/tempVentasRow", async(req,res)=>{
    
    const {id,app} = req.body;

    let qry = '';
    
    qry = `SELECT ID,CODPROD,DESPROD,CODMEDIDA,CANTIDAD,EQUIVALE,COSTO,PRECIO,DESCUENTO,EXENTO FROM ME_TEMP_VENTAS WHERE ID=${id}`
  
    execute.Query(res,qry);
    
});

// ACTUALIZA el grid de temp ventas
router.put("/tempVentasRow", async(req,res)=>{
    
    const {app,id,totalcosto,totalprecio,cantidad,totalunidades,exento} = req.body;
    
    let qry = '';
    
    qry = `UPDATE ME_TEMP_VENTAS SET CANTIDAD=${cantidad},TOTALCOSTO=${totalcosto},TOTALPRECIO=${totalprecio},TOTALUNIDADES=${totalunidades},EXENTO=${exento} WHERE ID=${id}`
    
    
    execute.Query(res,qry);
    
});

// ACTUALIZA el grid de temp ventas Y PIDE AUTORIZACION
router.put("/tempVentasRowPrecioAutorizacion", async(req,res)=>{
    
    const {app,id,precio,totalprecio,exento,obs} = req.body;
    
    let qry = '';
    
    qry = `UPDATE ME_TEMP_VENTAS SET PRECIO=${precio},TOTALPRECIO=${totalprecio},EXENTO=${exento},PMODIF=1,OBS='${obs}' WHERE ID=${id}`
    
    
    execute.Query(res,qry);
    
});

// ACTUALIZA el grid de temp ventas Y PIDE AUTORIZACION
router.put("/tempVentasRowPrecio", async(req,res)=>{
    
    const {app,id,precio,totalprecio,exento,obs} = req.body;
    
    let qry = '';
    
    qry = `UPDATE ME_TEMP_VENTAS SET PRECIO=${precio},TOTALPRECIO=${totalprecio},EXENTO=${exento},PMODIF=0,OBS='${obs}' WHERE ID=${id}`
    
    
    execute.Query(res,qry);
    
});

// inserta un nuevo registro en temp ventas   
router.post("/tempVentas", async(req,res)=>{
        
    let empnit = req.body.empnit;
    let usuario = req.body.usuario;
    let token = req.body.token;

    let tipoprecio = req.body.tipoprecio;

    let codprod = req.body.codprod;
    let desprod = req.body.desprod;
    let codmedida= req.body.codmedida;
    let cantidad=Number(req.body.cantidad);
    let equivale = Number(req.body.equivale);
    let totalunidades = Number(req.body.totalunidades);
    let costo = Number(req.body.costo);
    let precio=Number(req.body.precio);
    let totalcosto =Number(req.body.totalcosto);
    let totalprecio=Number(req.body.totalprecio);
    let exento=Number(req.body.exento);
    let descuento = Number(req.body.descuento);

    let coddoc = req.body.coddoc;


    let app = req.body.app;
    let qry = '';

    qry = `INSERT INTO ME_TEMP_VENTAS 
            (EMPNIT,CODPROD,DESPROD,CODMEDIDA,CANTIDAD,EQUIVALE,TOTALUNIDADES,COSTO,PRECIO,TOTALCOSTO,TOTALPRECIO,EXENTO,USUARIO,TIPOPRECIO,CODSUCURSAL,PMODIF,DESCUENTO) 
    VALUES ('${empnit}','${codprod}','${desprod}','${codmedida}',${cantidad},${equivale},${totalunidades},${costo},${precio},${totalcosto},${totalprecio},${exento},'${usuario}','${tipoprecio}','${app}',0,${descuento})`        
     
        console.log(qry)
   execute.Query(res,qry);

});

// elimina un item de la venta
router.delete("/tempVentas", async(req,res)=>{
    let id=Number(req.body.id);
    

      let qry = `DELETE FROM ME_TEMP_VENTAS WHERE ID=${id}`
    
   execute.Query(res,qry);

});

// elimina temp ventas
router.post("/tempVentastodos", async(req,res)=>{
    const{empnit,usuario,app} = req.body;
    let qry = "";
   
    qry = `DELETE FROM ME_TEMP_VENTAS WHERE CODSUCURSAL='${app}' AND USUARIO='${usuario}'`

    execute.Query(res,qry);

});

// SIN USAR
// VENTAS BUSCAR CLIENTE POR NIT O CODIGO EN VENTAS
router.get("/buscarcliente", async(req,res)=>{
    
    const {empnit,nit, app} = req.query;
    
    let qry = '';

    qry = `SELECT CODCLIENTE, NIT, NOMCLIENTE, DIRCLIENTE,'P' AS CATEGORIA FROM CLIENTES WHERE CODCLIENTE='${nit}'`         

    execute.Query(res,qry);

});







// INSERTA UN PEDIDO EN LAS TABLAS DE DOCUMENTOS Y DOCPRODUCTOS
router.post("/documentos", async (req,res)=>{
    const {app,empnit,anio,mes,dia,coddoc,fecha,fechaentrega,formaentrega,codcliente,nomclie,codbodega,totalcosto,totalprecio,nitclie,dirclie,obs,direntrega,usuario,codven,lat,long} = req.body;
    

    let correlativo = req.body.correlativo;
    let ncorrelativo = correlativo;

    //variables sin asignar
    let concre = 'CRE';
    let abono = totalprecio; 
    let saldo = totalprecio;
    let pagotarjeta = 0; let recargotarjeta = 0;
    let codrep = 0;
    let totalexento=0;

    switch (correlativo.toString().length) {
        case 1:
            correlativo = '         ' + correlativo;
        break;
        case 2:
            correlativo = '        ' + correlativo;
        break;
        case 3:
            correlativo = '       ' + correlativo;
            
        break;
        case 4:
            correlativo = '      ' + correlativo;
            break;
        case 5:
            correlativo = '     ' + correlativo;
            break;
        case 6:
            correlativo = '    ' + correlativo;
            break;
        case 7:
            correlativo = '   ' + correlativo;
            break;
        case 8:
            correlativo = '  ' + correlativo;
        break;
        case 9:
            correlativo = ' ' + correlativo;
        break;
        case 10:
            correlativo = correlativo;
        break;
        default:
            break;
    };
    
    let nuevocorrelativo = Number(ncorrelativo) + 1;


    let qry = ''; // inserta los datos en la tabla documentos
    let qrydoc = ''; // inserta los datos de la tabla docproductos
    let qrycorrelativo = ''; //actualiza el correlativo del documento

            qry = `INSERT INTO ME_DOCUMENTOS (
                EMP_NIT, DOC_ANO, DOC_MES, CODDOC, DOC_NUMERO, 
                CODCAJA, DOC_FECHA, DOC_NUMREF, DOC_NOMREF, BODEGAENTRADA,
                BODEGASALIDA, USUARIO, DOC_ESTATUS, DOC_TOTALCOSTO, DOC_TOTALVENTA,
                DOC_HORA, DOC_FVENCE, DOC_DIASCREDITO, DOC_CONTADOCREDITO, DOC_DESCUENTOTOTAL,
                DOC_DESCUENTOPROD, DOC_PORDESCUTOTAL, DOC_IVA, DOC_SUBTOTALIVA, DOC_SUBTOTAL,
                NITCLIE, DOC_PORDESCUFAC, CODVEN, DOC_ABONOS, DOC_SALDO,
                DOC_VUELTO, DOC_NIT, DOC_PAGO, DOC_CODREF, DOC_TIPOCAMBIO,
                DOC_PARCIAL, DOC_ANTICIPO, ANT_CODDOC, ANT_DOCNUMERO, DOC_OBS,
                DOC_PORCENTAJEIVA, DOC_ENVIO, DOC_CUOTAS, DOC_TIPOCUOTA, 
                DIVA_NUMINT, FRT_CODIGO, TRANSPORTE, DOC_REFPEDIDO, DOC_REFFACTURA,
                CODPROV, DOC_TOTALOTROS, DOC_RECIBO, DOC_MATSOLI, DOC_REFERENCIA, 
                DOC_LUGAR, DOC_ANOMBREDE, DOC_IVAEXO, DOC_VALOREXO, DOC_SECTOR,
                DOC_DIRENTREGA, DOC_CANTENV, DOC_EXP, DOC_FECHAENT, TIPOPRODUCCION,
                DOC_TOTCOSINV, DOC_TOTALFIN, USUARIOENUSO, DOC_IMPUESTO1, DOC_TOTALIMPU1,
                DOC_PORCOMI, DOC_DOLARES, CODMESA, DOC_TIPOOPE, USUARIOAUTORIZA, 
                NUMAUTORIZA, DOC_TEMPORADA, DOC_INGUAT,
                CODVENBOD,
                CODHABI, DOC_SERIE,
                CTABAN, NUMINTBAN, 
                CODVENEMP,
                DOC_TOTCOSDOL, DOC_TOTCOSINVDOL, CODUNIDAD,
                TOTCOMBUSTIBLE, DOC_CODCONTRA, DOC_NUMCONTRA, INTERES, ABONOINTERES,
                SALDOINTERES, NUMEROCORTE, DOC_PORLOCAL, DOC_NUMORDEN, DOC_FENTREGA,
                DOC_INTERESADO, DOC_RECIBE, NUMEROROLLO, COD_CENTRO, GENCUOTA,
                DOC_PORINGUAT, DOC_INGUATEXENTO, DOC_TIPOTRANIVA, DOC_PORTIMBREPRE, DOC_TIMBREPRENSA,
                ABONOSANTICIPO, SALDOANTICIPO, DOC_PRODEXENTO, PUNTOSGANADOS, PUNTOSUSADOS,
                APL_ANTICIPO, COD_DEPARTA, FIRMAELECTRONICA, DOC_CODDOCRETENCION, DOC_SERIERETENCION,
                DOC_NUMRETENCION, FIRMAISC, ISCENVIADO, LAT, LONG, CODSUCURSAL
                ) 
                VALUES (
                '${empnit}', ${anio}, ${mes}, '${coddoc}', '${correlativo}',
                '', '${fecha}', '', '${nomclie}', '',
                '${codbodega}', '${usuario}', 'O', ${totalcosto}, ${totalprecio},
                0, '${fecha}', 0, '${concre}', 0,
                0, 0, 0, ${totalprecio}, ${totalprecio},
                '${nitclie}', 0, '${codven}', 0, ${saldo}, 
                0, '${nitclie}', 0, '', 1, 
                0, 0, '', '', '${obs}',
                0, 0, 0, 0, 
                0, '', '${formaentrega}', '', '',
                '', 0, 0, '${direntrega}', '', 
                '', '', '', 0, '', 
                '${dirclie}', '', '', '${fechaentrega}', '',
                ${totalcosto}, 0, '', 0, 0,
                0, 0, '', 0,'',
                0, 0, 0,
                0,
                '', '', 
                0, 0, 
                0,
                0, 0, '',
                0, '', '', 0, 0, 
                0, 0, 0, '','NO',
                '', '', 0, '', '',
                0, 'N', 'C', 0, 0,
                0, 0, 0, 0, 0,
                '', '', '', '', '',
                '', '', 0, ${lat},${long},'${app}'
                );`
                  //GETANSINULL()
            qrydoc = `INSERT INTO ME_DOCPRODUCTOS 
                  (EMP_NIT,DOC_ANO,DOC_MES,CODDOC,DOC_NUMERO,
                  DOC_ITEM,CODPROD,CODMEDIDA,CANTIDAD,EQUIVALE,
                  CANTIDADINV,COSTO,PRECIO,TOTALCOSTO,TOTALPRECIO,
                  BODEGAENTRADA,BODEGASALIDA,SUBTOTAL,DESCUENTOPROD,PORDESCUPROD,
                  DESCUENTOFAC,PORDESCUFAC,TOTALDESCUENTO,DESCRIPCION,SUBTOTALPROD,
                  TIPOCAMBIO,PRODPRECIO,CANTIDADENVIADA,CODFAC,NUMFAC,
                  ITEMFAC,NOAFECTAINV, DOCPESO,COSTOINV,FLETE,TOTALPRECIOFIN,PRECIOFIN,TOTALCOSTOINV,CANTIDADBONI,CODOPR,NUMOPR,
                  ITEMOPR,CODINV,NUMINV,ITEMINV,TIPOCLIE,LISTA,PORIVA,VALORIVA,NOLOTE,VALORIMPU1,DESEMPAQUE,
                  SALDOINVANTCOM,NCUENTAMESA,CUENTACERRADA,COSTODOL,COSTOINVDOL,TOTALCOSTODOL,TOTALCOSTOINVDOL,
                  IMPCOMBUSTIBLE,CODVENPROD,COMIVEN,SOBREPRECIO,CODREG,NUMREG,ITEMREG,CANTIDADORIGINAL,CANTIDADMODIFICADA,NSERIETARJETA,
                  CODOC,NUMOC,PORTIMBREPRENSA,VALORTIMBREPRENSA,CODTIPODESCU,TOTALPUNTOS,ITEMOC,CODPRODORIGEN,CODMEDIDAORIGEN,
                  CANTIDADDEVUELTA,CODARANCEL,TIPOPRECIO,CODSUCURSAL) 
                  SELECT 
                  EMPNIT,${anio} as DOC_ANO,${mes} AS DOC_MES,'${coddoc}' AS CODDOC,'${correlativo}' AS DOC_NUMERO,
                  ID AS DOC_ITEM,CODPROD,CODMEDIDA,CANTIDAD, EQUIVALE,
                  TOTALUNIDADES AS CANTIDADINV,COSTO,PRECIO,TOTALCOSTO,TOTALPRECIO,
                  '','${codbodega}',
                  TOTALPRECIO,0,0,0,0,0,DESPROD,TOTALPRECIO,1,PRECIO,0,'','',0,0,
                  0,COSTO,0,TOTALPRECIO,
                  PRECIO,TOTALCOSTO,0,'','',0,'','',0,
                  'P',
                  '',
                  0,0,'SN',0,'',0,'',0,0,COSTO,0,TOTALCOSTO,0,0,0,0,'','',0,0,0,'','','',0,0,'',0,0,'','',0,'',TIPOPRECIO,'${app}'
                  FROM ME_TEMP_VENTAS   
                  WHERE EMPNIT='${empnit}' AND USUARIO='${usuario}';`

            qrycorrelativo =`UPDATE ME_TIPODOCUMENTOS SET CORRELATIVO=${nuevocorrelativo} WHERE CODDOC='${coddoc}'`
            
 
    execute.Query(res,qry + qrydoc + qrycorrelativo);
    
});


// LISTADOS DE PEDIDOS
router.post("/pedidosautorizar", async(req,res)=>{
    const {sucursal,codven}  = req.body;
    
    let qry = '';
    qry = `SELECT * FROM ME_TEMP_VENTAS WHERE PMODIF=1 `

    
    execute.Query(res,qry);
});

router.put("/autorizarprecio", async(req,res)=>{
    const {id}  = req.body;
    
    let qry = '';
    qry = `UPDATE ME_TEMP_VENTAS SET PMODIF=0 WHERE ID=${id} `
    
    execute.Query(res,qry);
});

router.put("/denegarprecio", async(req,res)=>{
    const {id}  = req.body;
    
    let qry = '';
    qry = `UPDATE ME_TEMP_VENTAS SET PMODIF=2 WHERE ID=${id} `
    
    execute.Query(res,qry);
});

router.post("/pedidospendientes", async(req,res)=>{
    const {sucursal,codven}  = req.body;
    
    let qry = '';
    qry = `SELECT DOC_FECHA AS FECHA, CODDOC, NITCLIE, DOC_NUMERO AS CORRELATIVO, DOC_NOMREF AS NOMCLIE, DOC_DIRENTREGA AS DIRCLIE, '' AS DESMUNI, DOC_TOTALVENTA AS IMPORTE, LAT, LONG, DOC_NUMORDEN AS EMBARQUE, DOC_ESTATUS AS ST, DOC_OBS AS OBS, DOC_MATSOLI AS DIRENTREGA,DOC_FECHAENT AS FECHAENTREGA
            FROM ME_Documentos
            WHERE (CODVEN = ${codven}) AND (DOC_ESTATUS='O') AND (ISCENVIADO=0)
            ORDER BY DOC_FECHA,DOC_NUMERO`

    
    execute.Query(res,qry);
});

router.post("/pedidosbloqueados", async(req,res)=>{
    const {sucursal,codven}  = req.body;
    
    let qry = '';
    qry = `SELECT DOC_FECHA AS FECHA, CODDOC, NITCLIE, DOC_NUMERO AS CORRELATIVO, DOC_NOMREF AS NOMCLIE, DOC_DIRENTREGA AS DIRCLIE, '' AS DESMUNI, DOC_TOTALVENTA AS IMPORTE, LAT, LONG, DOC_NUMORDEN AS EMBARQUE, DOC_ESTATUS AS ST, DOC_OBS AS OBS, DOC_MATSOLI AS DIRENTREGA,DOC_FECHAENT AS FECHAENTREGA
            FROM ME_Documentos
            WHERE (CODVEN = ${codven}) AND (DOC_ESTATUS='A') AND (ISCENVIADO=0)
            ORDER BY DOC_FECHA,DOC_NUMERO`

    
    execute.Query(res,qry);
});

router.post("/pedidosgenerados", async(req,res)=>{
    const {sucursal,codven}  = req.body;
    
    let qry = '';
    qry = `SELECT DOC_FECHA AS FECHA, CODDOC, NITCLIE, DOC_NUMERO AS CORRELATIVO, DOC_NOMREF AS NOMCLIE, DOC_DIRENTREGA AS DIRCLIE, '' AS DESMUNI, DOC_TOTALVENTA AS IMPORTE, LAT, LONG, DOC_NUMORDEN AS EMBARQUE, DOC_ESTATUS AS ST, DOC_OBS AS OBS, DOC_MATSOLI AS DIRENTREGA,DOC_FECHAENT AS FECHAENTREGA
            FROM ME_Documentos
            WHERE (CODVEN = ${codven}) AND (DOC_ESTATUS='I') AND (ISCENVIADO=0)
            ORDER BY DOC_FECHA,DOC_NUMERO`

    
    execute.Query(res,qry);
});

router.post("/detallepedido", async(req,res)=>{
    const {sucursal,fecha,coddoc,correlativo}  = req.body;

    let ncorrelativo = correlativo;
    
        
    let qry = '';
    qry = `SELECT ME_Docproductos.CODPROD, ME_Docproductos.DESCRIPCION AS DESPROD, ME_Docproductos.CODMEDIDA, ME_Docproductos.CANTIDAD, ME_Docproductos.PRECIO, ME_Docproductos.TOTALPRECIO AS IMPORTE, ME_Docproductos.DOC_ITEM, ME_Docproductos.TOTALCOSTO
            FROM ME_Documentos LEFT OUTER JOIN
            ME_Docproductos ON ME_Documentos.CODSUCURSAL = ME_Docproductos.CODSUCURSAL AND ME_Documentos.DOC_NUMERO = ME_Docproductos.DOC_NUMERO AND 
            ME_Documentos.CODDOC = ME_Docproductos.CODDOC AND ME_Documentos.EMP_NIT = ME_Docproductos.EMP_NIT
            WHERE  (ME_Documentos.DOC_FECHA = '${fecha}') 
            AND (ME_Documentos.CODDOC = '${coddoc}') 
            AND (ME_Documentos.DOC_NUMERO = '${ncorrelativo}')`;

    execute.Query(res,qry);
});

router.put("/pedidoquitaritem", async(req,res)=>{

    const {sucursal,coddoc,correlativo,item,totalprecio,totalcosto} = req.body;

    let qry = `DELETE FROM ME_DOCPRODUCTOS WHERE CODDOC='${coddoc}' AND DOC_NUMERO='${correlativo}' AND DOC_ITEM=${item};`
    let qryEditDocto = `UPDATE ME_DOCUMENTOS SET DOC_TOTALCOSTO=(DOC_TOTALCOSTO-${totalcosto}), DOC_TOTALVENTA=(DOC_TOTALVENTA-${totalprecio}), DOC_SUBTOTALIVA=(DOC_TOTALVENTA-${totalprecio}), DOC_SUBTOTAL=(DOC_TOTALVENTA-${totalprecio}), DOC_TOTCOSINV=(DOC_TOTALCOSTO-${totalcosto}) WHERE CODDOC='${coddoc}' AND DOC_NUMERO='${correlativo}';`

        
    execute.Query(res,qry + qryEditDocto);

});

router.put('/pedidobloquear', async(req,res)=>{
    const {coddoc,correlativo} = req.body;

    let qry = `UPDATE ME_DOCUMENTOS SET DOC_ESTATUS='A' WHERE CODDOC='${coddoc}' AND DOC_NUMERO='${correlativo}'`;
    
    execute.Query(res,qry);

});

router.put('/pedidofacturado', async(req,res)=>{
    const {coddoc,correlativo} = req.body;

    let qry = `UPDATE ME_DOCUMENTOS SET DOC_ESTATUS='I' WHERE CODDOC='${coddoc}' AND DOC_NUMERO='${correlativo}'`;
    
    execute.Query(res,qry);

});


//******************************* */
// REPORTES DE VENDEDORES
//******************************* */

// UNA FECHA (DIA)
// LISTA DE PEDIDOS POR UNA FECHA
router.post("/listapedidos", async(req,res)=>{
    const {sucursal,codven,fecha}  = req.body;
    
    let qry = '';
    qry = `SELECT CODDOC, DOC_NUMERO AS CORRELATIVO, DOC_NOMREF AS NOMCLIE, DOC_DIRENTREGA AS DIRCLIE, '' AS DESMUNI, DOC_TOTALVENTA AS IMPORTE, DOC_FECHA AS FECHA, LAT, LONG, DOC_OBS AS OBS, DOC_MATSOLI AS DIRENTREGA
            FROM ME_Documentos
            WHERE (CODSUCURSAL = '${sucursal}') AND (DOC_FECHA = '${fecha}') AND (CODVEN = ${codven}) AND (DOC_ESTATUS<>'A')`

    
    execute.Query(res,qry);
});

//reporte de productos del dia y vendedor
router.post('/reporteproductosdia', async(req,res)=>{
    
    const {fecha,sucursal,codven} = req.body;

    let qry = `SELECT ME_Docproductos.CODPROD, ME_Productos.DESPROD, SUM(ME_Docproductos.CANTIDADINV) AS TOTALUNIDADES, SUM(ME_Docproductos.TOTALCOSTO) AS TOTALCOSTO, SUM(ME_Docproductos.TOTALPRECIO) 
    AS TOTALPRECIO
FROM            ME_Docproductos LEFT OUTER JOIN
    ME_Productos ON ME_Docproductos.CODSUCURSAL = ME_Productos.CODSUCURSAL AND ME_Docproductos.CODPROD = ME_Productos.CODPROD RIGHT OUTER JOIN
    ME_Documentos ON ME_Docproductos.DOC_NUMERO = ME_Documentos.DOC_NUMERO AND ME_Docproductos.CODDOC = ME_Documentos.CODDOC AND 
    ME_Docproductos.CODSUCURSAL = ME_Documentos.CODSUCURSAL AND ME_Docproductos.DOC_ANO = ME_Documentos.DOC_ANO AND ME_Docproductos.EMP_NIT = ME_Documentos.EMP_NIT LEFT OUTER JOIN
    ME_Tipodocumentos ON ME_Documentos.CODSUCURSAL = ME_Tipodocumentos.CODSUCURSAL AND ME_Documentos.CODDOC = ME_Tipodocumentos.CODDOC AND ME_Documentos.EMP_NIT = ME_Tipodocumentos.EMP_NIT
            WHERE (ME_Tipodocumentos.TIPODOC = 'PED') AND (ME_Documentos.DOC_FECHA = '${fecha}') AND (ME_Documentos.CODSUCURSAL = '${sucursal}') AND (ME_Documentos.CODVEN = ${codven}) AND (ME_Documentos.DOC_ESTATUS<>'A')
            GROUP BY ME_Docproductos.CODPROD, ME_Productos.DESPROD`;
    
    execute.Query(res,qry);

});

// reporte de marcas por vendedor y dia
router.post('/reportemarcasdia',async(req,res)=>{

    const {fecha,sucursal,codven} = req.body;

    let qry = `SELECT       ME_Marcas.DESMARCA, SUM(ME_Docproductos.TOTALCOSTO) AS TOTALCOSTO, SUM(ME_Docproductos.TOTALPRECIO) AS TOTALPRECIO
    FROM            ME_Productos LEFT OUTER JOIN
                             ME_Marcas ON ME_Productos.CODSUCURSAL = ME_Marcas.CODSUCURSAL AND ME_Productos.CODMARCA = ME_Marcas.CODMARCA RIGHT OUTER JOIN
                             ME_Docproductos ON ME_Productos.CODSUCURSAL = ME_Docproductos.CODSUCURSAL AND ME_Productos.CODPROD = ME_Docproductos.CODPROD RIGHT OUTER JOIN
                             ME_Documentos ON ME_Docproductos.DOC_MES = ME_Documentos.DOC_MES AND ME_Docproductos.DOC_ANO = ME_Documentos.DOC_ANO AND ME_Docproductos.EMP_NIT = ME_Documentos.EMP_NIT AND 
                             ME_Docproductos.CODDOC = ME_Documentos.CODDOC AND ME_Docproductos.DOC_NUMERO = ME_Documentos.DOC_NUMERO LEFT OUTER JOIN
                             ME_Tipodocumentos ON ME_Documentos.CODSUCURSAL = ME_Tipodocumentos.CODSUCURSAL AND ME_Documentos.CODDOC = ME_Tipodocumentos.CODDOC AND ME_Documentos.EMP_NIT = ME_Tipodocumentos.EMP_NIT
                WHERE (ME_Tipodocumentos.TIPODOC = 'PED') AND (ME_Documentos.DOC_ESTATUS <> 'A') AND (ME_Documentos.CODVEN = ${codven}) AND (ME_Documentos.DOC_FECHA = '${fecha}') AND 
                             (ME_Documentos.CODSUCURSAL = '${sucursal}')
                GROUP BY ME_Marcas.DESMARCA`;

    execute.Query(res,qry);

});

// MENSUALES
//reporte de fechas por vendedor y mes
router.post("/reportedinero", async (req,res)=>{

    const {anio,mes,sucursal,codven} = req.body;

    let qry = `SELECT       ME_Documentos.DOC_FECHA AS FECHA, COUNT(ME_Documentos.DOC_FECHA) AS PEDIDOS, SUM(ME_Documentos.DOC_TOTALVENTA) AS TOTALVENTA
    FROM            ME_Documentos LEFT OUTER JOIN
                             ME_Tipodocumentos ON ME_Documentos.CODSUCURSAL = ME_Tipodocumentos.CODSUCURSAL AND ME_Documentos.CODDOC = ME_Tipodocumentos.CODDOC AND ME_Documentos.EMP_NIT = ME_Tipodocumentos.EMP_NIT
                WHERE (ME_Documentos.DOC_ANO = ${anio}) AND (ME_Documentos.DOC_MES = ${mes}) AND (ME_Documentos.CODVEN = ${codven}) AND (ME_Documentos.CODSUCURSAL = '${sucursal}') AND (ME_Tipodocumentos.TIPODOC = 'PED') AND 
                             (ME_Documentos.DOC_ESTATUS <> 'A')
                GROUP BY ME_Documentos.DOC_FECHA`;
    
    execute.Query(res,qry);
                             
});

//reporte de productos por mes y vendedo
router.post('/reporteproductos', async(req,res)=>{
    
    const {anio,mes,sucursal,codven} = req.body;

    let qry = `SELECT       ME_Docproductos.CODPROD, ME_Productos.DESPROD, SUM(ME_Docproductos.CANTIDADINV) AS TOTALUNIDADES, SUM(ME_Docproductos.TOTALCOSTO) AS TOTALCOSTO, SUM(ME_Docproductos.TOTALPRECIO) 
    AS TOTALPRECIO
FROM            ME_Docproductos LEFT OUTER JOIN
    ME_Productos ON ME_Docproductos.CODSUCURSAL = ME_Productos.CODSUCURSAL AND ME_Docproductos.CODPROD = ME_Productos.CODPROD RIGHT OUTER JOIN
    ME_Documentos ON ME_Docproductos.DOC_NUMERO = ME_Documentos.DOC_NUMERO AND ME_Docproductos.CODDOC = ME_Documentos.CODDOC AND 
    ME_Docproductos.CODSUCURSAL = ME_Documentos.CODSUCURSAL AND ME_Docproductos.DOC_ANO = ME_Documentos.DOC_ANO AND ME_Docproductos.EMP_NIT = ME_Documentos.EMP_NIT LEFT OUTER JOIN
    ME_Tipodocumentos ON ME_Documentos.CODSUCURSAL = ME_Tipodocumentos.CODSUCURSAL AND ME_Documentos.CODDOC = ME_Tipodocumentos.CODDOC AND ME_Documentos.EMP_NIT = ME_Tipodocumentos.EMP_NIT
            WHERE (ME_Documentos.DOC_ESTATUS<>'A') AND (ME_Tipodocumentos.TIPODOC = 'PED') AND (ME_Documentos.DOC_MES = ${mes}) AND (ME_Documentos.DOC_ANO = ${anio}) AND (ME_Documentos.CODSUCURSAL = '${sucursal}') AND (ME_Documentos.CODVEN = ${codven})
            GROUP BY ME_Docproductos.CODPROD, ME_Productos.DESPROD`;
    
    execute.Query(res,qry);

});



// reporte de marcas por vendedor y mes
router.post('/reportemarcas',async(req,res)=>{

    const {anio,mes,sucursal,codven} = req.body;

    let qry = `SELECT       ME_Marcas.DESMARCA, SUM(ME_Docproductos.TOTALCOSTO) AS TOTALCOSTO, SUM(ME_Docproductos.TOTALPRECIO) AS TOTALPRECIO
    FROM            ME_Marcas RIGHT OUTER JOIN
                             ME_Productos ON ME_Marcas.CODSUCURSAL = ME_Productos.CODSUCURSAL AND ME_Marcas.CODMARCA = ME_Productos.CODMARCA RIGHT OUTER JOIN
                             ME_Documentos LEFT OUTER JOIN
                             ME_Docproductos ON ME_Documentos.CODSUCURSAL = ME_Docproductos.CODSUCURSAL AND ME_Documentos.DOC_MES = ME_Docproductos.DOC_MES AND ME_Documentos.DOC_ANO = ME_Docproductos.DOC_ANO AND 
                             ME_Documentos.EMP_NIT = ME_Docproductos.EMP_NIT AND ME_Documentos.CODDOC = ME_Docproductos.CODDOC AND ME_Documentos.DOC_NUMERO = ME_Docproductos.DOC_NUMERO ON 
                             ME_Productos.CODSUCURSAL = ME_Docproductos.CODSUCURSAL AND ME_Productos.CODPROD = ME_Docproductos.CODPROD LEFT OUTER JOIN
                             ME_Tipodocumentos ON ME_Documentos.CODSUCURSAL = ME_Tipodocumentos.CODSUCURSAL AND ME_Documentos.CODDOC = ME_Tipodocumentos.CODDOC AND ME_Documentos.EMP_NIT = ME_Tipodocumentos.EMP_NIT
                WHERE (ME_Tipodocumentos.TIPODOC = 'PED') AND (ME_Documentos.DOC_ESTATUS <> 'A') AND (ME_Documentos.CODVEN = ${codven}) AND (ME_Documentos.DOC_MES = ${mes}) AND (ME_Documentos.DOC_ANO = ${anio}) AND 
                             (ME_Documentos.CODSUCURSAL = '${sucursal}')
                GROUP BY ME_Marcas.DESMARCA`;

                

    execute.Query(res,qry);


});

// reporte de locaciones por vendedor y mes
router.post('/reportelocaciones',async(req,res)=>{

    const {anio,mes,sucursal,codven} = req.body;

    let qry = `
    SELECT ME_Documentos.DOC_FECHA AS FECHA, ME_Documentos.DOC_NOMREF AS CLIENTE, COUNT(ME_Documentos.DOC_FECHA) AS PEDIDOS, SUM(ME_Documentos.DOC_TOTALVENTA) AS TOTALVENTA, ME_Documentos.LAT, ME_Documentos.LONG
    FROM ME_Documentos LEFT OUTER JOIN ME_Tipodocumentos ON ME_Documentos.CODDOC = ME_Tipodocumentos.CODDOC AND ME_Documentos.EMP_NIT = ME_Tipodocumentos.EMP_NIT
    WHERE (ME_Documentos.DOC_ANO = ${anio}) 
            AND (ME_Documentos.DOC_MES = ${mes}) 
            AND (ME_Documentos.CODVEN = ${codven}) 
            AND (ME_Documentos.CODSUCURSAL = '${sucursal}') 
            AND (ME_Tipodocumentos.TIPODOC = 'PED') 
            AND (ME_Documentos.DOC_ESTATUS <> 'A')
    GROUP BY ME_Documentos.DOC_FECHA, ME_Documentos.DOC_NOMREF, ME_Documentos.LAT, ME_Documentos.LONG`;

    execute.Query(res,qry);

});


//******************************* */
// REPORTES DE GERENCIA
//******************************* */

// reporte de sucursales ventas
router.post('/rptsucursalesventas',async(req,res)=>{

    const {anio,mes} = req.body;

    let qry = `SELECT ME_Sucursales.NOMBRE AS SUCURSAL, SUM(ME_Documentos.DOC_TOTALCOSTO) AS COSTO, SUM(ME_Documentos.DOC_TOTALVENTA) AS IMPORTE, Me_Sucursales.COLOR
                    FROM     ME_Documentos LEFT OUTER JOIN
                             ME_Tipodocumentos ON ME_Documentos.CODSUCURSAL = ME_Tipodocumentos.CODSUCURSAL AND ME_Documentos.CODDOC = ME_Tipodocumentos.CODDOC AND 
                             ME_Documentos.EMP_NIT = ME_Tipodocumentos.EMP_NIT LEFT OUTER JOIN
                             ME_Sucursales ON ME_Documentos.CODSUCURSAL = ME_Sucursales.CODSUCURSAL
                    WHERE   (ME_Documentos.DOC_ANO = ${anio}) AND (ME_Documentos.DOC_MES = ${mes}) AND (ME_Documentos.DOC_ESTATUS <> 'A') AND (ME_Tipodocumentos.TIPODOC = 'PED')
                    GROUP BY ME_Sucursales.NOMBRE, ME_Sucursales.COLOR`;

    execute.Query(res,qry);

});

// ranking de vendedores
router.post('/rptrankingvendedores', async(req,res)=>{
    const {anio,mes} = req.body;
    let qry = `SELECT ME_Vendedores.NOMVEN, ME_Sucursales.NOMBRE AS SUCURSAL, SUM(ME_Documentos.DOC_TOTALCOSTO) AS TOTALCOSTO, SUM(ME_Documentos.DOC_TOTALVENTA) AS TOTALPRECIO
                FROM ME_Documentos LEFT OUTER JOIN
                ME_Vendedores ON ME_Documentos.CODVEN = ME_Vendedores.CODVEN AND ME_Documentos.CODSUCURSAL = ME_Vendedores.CODSUCURSAL LEFT OUTER JOIN
                ME_Sucursales ON ME_Vendedores.CODSUCURSAL = ME_Sucursales.CODSUCURSAL
                WHERE (ME_Documentos.DOC_ESTATUS <> 'A') AND (ME_Documentos.DOC_ANO = ${anio}) AND (ME_Documentos.DOC_MES = ${mes})
                GROUP BY ME_Vendedores.NOMVEN, ME_Sucursales.NOMBRE
                ORDER BY TOTALPRECIO DESC`;
    
    execute.Query(res,qry);
});


//******************************* */
// REPORTES DE SUPERVISOR
//******************************* */


// ranking de vendedores por sucursal y fecha
router.post('/rptrankingvendedoressucursal', async(req,res)=>{
    const {fecha,sucursal} = req.body;
    let qry = `SELECT       ME_Vendedores.NOMVEN, COUNT(ME_Documentos.CODDOC) AS PEDIDOS, SUM(ME_Documentos.DOC_TOTALVENTA) AS TOTALPRECIO
    FROM            ME_Documentos LEFT OUTER JOIN
                             ME_Vendedores ON ME_Documentos.CODVEN = ME_Vendedores.CODVEN AND ME_Documentos.CODSUCURSAL = ME_Vendedores.CODSUCURSAL
                WHERE (ME_Documentos.DOC_ESTATUS <> 'A') AND (ME_Documentos.CODSUCURSAL = '${sucursal}') AND (ME_Documentos.DOC_FECHA = '${fecha}')
                GROUP BY ME_Vendedores.NOMVEN
                ORDER BY TOTALPRECIO DESC`;
    
    execute.Query(res,qry);
});

// ranking de vendedores por sucursal y fecha
router.post('/rptrankingvendedoressucursalmes', async(req,res)=>{
    const {anio,mes,sucursal} = req.body;
    let qry = `SELECT       ME_Vendedores.NOMVEN, COUNT(ME_Documentos.CODDOC) AS PEDIDOS, SUM(ME_Documentos.DOC_TOTALVENTA) AS TOTALPRECIO
    FROM            ME_Documentos LEFT OUTER JOIN
                             ME_Vendedores ON ME_Documentos.CODVEN = ME_Vendedores.CODVEN AND ME_Documentos.CODSUCURSAL = ME_Vendedores.CODSUCURSAL
                WHERE (ME_Documentos.DOC_ESTATUS <> 'A') AND (ME_Documentos.CODSUCURSAL = '${sucursal}') AND (ME_Documentos.DOC_ANO = ${anio}) AND (ME_Documentos.DOC_MES = ${mes})
                GROUP BY ME_Vendedores.NOMVEN
                ORDER BY TOTALPRECIO DESC`;
    
    execute.Query(res,qry);
});

// reporte de marcas por fecha
router.post('/reportemarcasfecha',async(req,res)=>{

    const {sucursal,fecha} = req.body;

    let qry = `SELECT       ME_Marcas.DESMARCA, SUM(ME_Docproductos.TOTALCOSTO) AS TOTALCOSTO, SUM(ME_Docproductos.TOTALPRECIO) AS TOTALPRECIO
    FROM            ME_Documentos LEFT OUTER JOIN
                             ME_Docproductos LEFT OUTER JOIN
                             ME_Productos LEFT OUTER JOIN
                             ME_Marcas ON ME_Productos.CODSUCURSAL = ME_Marcas.CODSUCURSAL AND ME_Productos.CODMARCA = ME_Marcas.CODMARCA ON ME_Docproductos.CODSUCURSAL = ME_Productos.CODSUCURSAL AND 
                             ME_Docproductos.CODPROD = ME_Productos.CODPROD ON ME_Documentos.CODSUCURSAL = ME_Docproductos.CODSUCURSAL AND ME_Documentos.DOC_MES = ME_Docproductos.DOC_MES AND 
                             ME_Documentos.DOC_ANO = ME_Docproductos.DOC_ANO AND ME_Documentos.EMP_NIT = ME_Docproductos.EMP_NIT AND ME_Documentos.CODDOC = ME_Docproductos.CODDOC AND 
                             ME_Documentos.DOC_NUMERO = ME_Docproductos.DOC_NUMERO LEFT OUTER JOIN
                             ME_Tipodocumentos ON ME_Documentos.CODSUCURSAL = ME_Tipodocumentos.CODSUCURSAL AND ME_Documentos.CODDOC = ME_Tipodocumentos.CODDOC AND ME_Documentos.EMP_NIT = ME_Tipodocumentos.EMP_NIT
                WHERE (ME_Tipodocumentos.TIPODOC = 'PED') AND (ME_Documentos.DOC_ESTATUS <> 'A') AND (ME_Documentos.CODSUCURSAL = '${sucursal}') AND (ME_Documentos.DOC_FECHA = '${fecha}')
                GROUP BY ME_Marcas.DESMARCA`;

                

    execute.Query(res,qry);


});

// reporte de marcas por mes
router.post('/reportemarcasmes',async(req,res)=>{

    const {anio,mes,sucursal} = req.body;

    let qry = `SELECT       ME_Marcas.DESMARCA, SUM(ME_Docproductos.TOTALCOSTO) AS TOTALCOSTO, SUM(ME_Docproductos.TOTALPRECIO) AS TOTALPRECIO
    FROM            ME_Documentos LEFT OUTER JOIN
                             ME_Docproductos LEFT OUTER JOIN
                             ME_Productos LEFT OUTER JOIN
                             ME_Marcas ON ME_Productos.CODSUCURSAL = ME_Marcas.CODSUCURSAL AND ME_Productos.CODMARCA = ME_Marcas.CODMARCA ON ME_Docproductos.CODSUCURSAL = ME_Productos.CODSUCURSAL AND 
                             ME_Docproductos.CODPROD = ME_Productos.CODPROD ON ME_Documentos.CODSUCURSAL = ME_Docproductos.CODSUCURSAL AND ME_Documentos.DOC_MES = ME_Docproductos.DOC_MES AND 
                             ME_Documentos.DOC_ANO = ME_Docproductos.DOC_ANO AND ME_Documentos.EMP_NIT = ME_Docproductos.EMP_NIT AND ME_Documentos.CODDOC = ME_Docproductos.CODDOC AND 
                             ME_Documentos.DOC_NUMERO = ME_Docproductos.DOC_NUMERO LEFT OUTER JOIN
                             ME_Tipodocumentos ON ME_Documentos.CODSUCURSAL = ME_Tipodocumentos.CODSUCURSAL AND ME_Documentos.CODDOC = ME_Tipodocumentos.CODDOC AND ME_Documentos.EMP_NIT = ME_Tipodocumentos.EMP_NIT
                WHERE (ME_Tipodocumentos.TIPODOC = 'PED') AND (ME_Documentos.DOC_ESTATUS <> 'A') AND (ME_Documentos.DOC_MES = ${mes}) AND (ME_Documentos.DOC_ANO = ${anio}) AND 
                             (ME_Documentos.CODSUCURSAL = '${sucursal}')
                GROUP BY ME_Marcas.DESMARCA`;

                

    execute.Query(res,qry);


});


// INSERTA UN PEDIDO EN LAS TABLAS DE DOCUMENTOS Y DOCPRODUCTOS
router.post("/insertventa", async (req,res)=>{
    
    const {jsondocproductos,codsucursal,empnit,anio,mes,dia,coddoc,correl,fecha,fechaentrega,formaentrega,codcliente,nomclie,codbodega,totalcosto,totalprecio,nitclie,dirclie,telefono,email,obs,direntrega,usuario,codven,lat,long,flete} = req.body;
      
    let tblDocproductos = JSON.parse(jsondocproductos);

    let qrycorrelativo = ''; //actualiza el correlativo del documento
    let correlativo = correl;
    
  
    let nuevocorrelativo = Number(correlativo) + 1;

    qrycorrelativo =`   UPDATE DONRAUL_TIPODOC SET CORRELATIVO=${nuevocorrelativo} WHERE CODDOC='${coddoc}';
                                    `

    let qryDoc = `
    INSERT INTO DONRAUL_COTIZACIONES 
                (CODDOC,CORRELATIVO,ANIO,MES,FECHA,NIT,CLIENTE,DIRECCION,TELEFONO,EMAIL,OBS,FLETE,TOTALCOSTO,TOTALPRECIO) VALUES 
                ('${coddoc}', ${correlativo},${anio},${mes},'${fecha}','${nitclie}','${nomclie}','${dirclie}',
                '${telefono}','${email}','${obs}',${flete},${totalcosto},${totalprecio});
    `
    let qryProd = '';
    tblDocproductos.map((p)=>{
        qryProd = qryProd + `INSERT INTO DONRAUL_COTIZACIONES_DET 
        (CODDOC,CORRELATIVO,ANIO,MES,CODPROD,DESPROD,CODMEDIDA,EQUIVALE,CANTIDAD,COSTO,PRECIONORMAL,PRECIO,TOTALPRECIO) 
        VALUES
        ('${coddoc}',${correlativo},${anio},${mes},'${p.CODPROD}','${p.DESPROD}','${p.CODMEDIDA}',
        ${p.EQUIVALE},${p.CANTIDAD},${p.COSTO},${p.PRECIO},${p.PRECIO},${p.TOTALPRECIO});`
    });


    execute.Query(res, qrycorrelativo + qryDoc + qryProd);
    
});


module.exports = router;