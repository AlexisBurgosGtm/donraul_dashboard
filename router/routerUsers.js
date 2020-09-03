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

module.exports = router;