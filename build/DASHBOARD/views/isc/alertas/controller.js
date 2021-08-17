async function fcnIniciarVista(){
    await getListaUltimaVenta('tblProductosAlerta');
};

async function getListaUltimaVenta(idContainer){

    let container = document.getElementById(idContainer);
    
    container.innerHTML = GlobalWaitElement;

    let str = ""; 
    axios.get(`/reports/alertasultimaventa?token=${GlobalToken}`)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            if(rows.LASTSALE){
                str += rowProductoV(rows.CODPROD,rows.DESPROD,rows.COSTO,rows.EXISTENCIA, rows.LASTSALE)
            }
            
        })
        container.innerHTML= str;
        
    }, (error) => {
        console.log(error);
    });
};


function rowProductoV (codprod,desprod,costo,existencia,ultimaventa){
      return `<tr>
        <td>
            ${desprod}
            <br>
            <small class="text-danger"><b>${codprod}</b></small>
        </td>
        <td>${funciones.setMoneda(costo,'Q ')}</td>
        <td>${existencia}</td>
        <td>${ultimaventa.replace('T00:00:00.000Z','').toString()}</td>
    </tr>`
   
    
};