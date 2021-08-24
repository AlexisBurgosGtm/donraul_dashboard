const express = require('express');
const router = express.Router();
const execute = require('./connection');

// LOGIN
router.post("/login", async(req,res)=>{
	console.log('login solicitado...' + req.body)
	const {app,usuario,pass} = req.body;

	let qr = `SELECT TOKEN,USUARIO,SISTEMA, CODDOC FROM COMMUNITY_USUARIOS WHERE USUARIO='${usuario}' AND CLAVE='${pass}' AND APP='${app}'`
	execute.Query(res,qr);

});

// LISTADO DE USUARIOS
router.post("/listado", async(req,res)=>{

	let qr = `SELECT USUARIO, CLAVE, APP, CODDOC FROM COMMUNITY_USUARIOS`

	execute.Query(res,qr);

});

// NUEVO USUARIO
router.post("/insert", async(req,res)=>{

	const {usuario,clave,nivel,coddoc} = req.body;

	let qr = `INSERT INTO COMMUNITY_USUARIOS (USUARIO,CLAVE,APP,CODDOC,SISTEMA) 
	VALUES ('${usuario}','${clave}','${nivel}','${coddoc}','ISC');`

	execute.Query(res,qr);

});

// DELETE USUARIO
router.post("/delete", async(req,res)=>{

	const {usuario,clave} = req.body;
	
	let qr = `DELETE FROM COMMUNITY_USUARIOS
				 WHERE USUARIO='${usuario}' AND CLAVE='${clave}';`

	execute.Query(res,qr);

});




module.exports = router;