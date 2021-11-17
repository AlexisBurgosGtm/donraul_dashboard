const express = require('express');
const router = express.Router();
const execute = require('./connection');



router.post("/select_razas", async(req,res)=>{
  
  
  let qr = `SELECT CODRAZA, DESRAZA FROM FINCA_RAZAS; SELECT CODCATEGORIA, DESCATEGORIA FROM FINCA_CATEGORIAS;`
  
	execute.Query(res,qr);

});


router.post("/insert_animal", async(req,res)=>{
  
    const {codigo,nombre,codraza,sexo,color,compra,fechanacimiento,codcateoria,cargada,obs,status} = req.body;

    let qr = `INSERT INTO FINCA_ANIMALES (CODIGO,NOMBRE,CODRAZA,SEXO,COLOR, COMPRA,FECHANACIMIENTO,CODCATEGORIA,CARGADA,OBS,STATUS) 
        VALUES ('${codigo}','${nombre}',${codraza},'${sexo}','${color}','${compra}','${fechanacimiento}',${codcateoria},'${cargada}','${obs}','${status}')`
    
      execute.Query(res,qr);
  
});


router.post("/select_animales", async(req,res)=>{
  
  const {st} = req.body;
  
  let qr = `SELECT        FINCA_ANIMALES.ID, FINCA_ANIMALES.CODIGO, FINCA_ANIMALES.NOMBRE, FINCA_ANIMALES.CODRAZA, FINCA_RAZAS.DESRAZA, FINCA_ANIMALES.SEXO, FINCA_ANIMALES.COLOR, 
      FINCA_ANIMALES.COMPRA, FINCA_ANIMALES.FECHANACIMIENTO, FINCA_ANIMALES.CODCATEGORIA, FINCA_CATEGORIAS.DESCATEGORIA, FINCA_ANIMALES.CARGADA, FINCA_ANIMALES.OBS, 
      FINCA_ANIMALES.STATUS
    FROM            FINCA_ANIMALES LEFT OUTER JOIN
      FINCA_RAZAS ON FINCA_ANIMALES.CODRAZA = FINCA_RAZAS.CODRAZA LEFT OUTER JOIN
      FINCA_CATEGORIAS ON FINCA_ANIMALES.CODCATEGORIA = FINCA_CATEGORIAS.CODCATEGORIA
    WHERE (FINCA_ANIMALES.STATUS = '${st}')`
  
	  execute.Query(res,qr);

});


module.exports = router;
