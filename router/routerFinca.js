const express = require('express');
const router = express.Router();
const execute = require('./connection');



router.post("/select_razas", async(req,res)=>{
  
  
  let qr = `SELECT CODRAZA, DESRAZA FROM FINCA_RAZAS`
  
	execute.Query(res,qr);

});


router.post("/insert_animal", async(req,res)=>{
  
    const {codigo,nombre,codraza,sexo,color,compra,fechanacimiento,codcateoria,cargada,obs,status} = req.body;

    let qr = `INSERT INTO FINCA_ANIMALES (CODIGO,NOMBRE,CODRAZA,SEXO,COLOR, COMPRA,FECHANACIMIENTO,CODCATEGORIA,CARGADA,OBS,STATUS) 
        VALUES ('${codigo}','${nombre}',${codraza},'${sexo}','${color}','${compra}','${fechanacimiento}',${codcateoria},'${cargada}','${obs}','${status}')`
    
      execute.Query(res,qr);
  
});



module.exports = router;
