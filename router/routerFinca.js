const express = require('express');
const router = express.Router();
const execute = require('./connection');



router.post("/select_razas", async(req,res)=>{
  
  
  let qr = `SELECT CODRAZA, DESRAZA FROM FINCA_RAZAS`
  
	execute.Query(res,qr);

});





module.exports = router;
