async function fcnIniciarVista(){

    let btnBuscar = document.getElementById('btnBuscar');
    let txtBuscar = document.getElementById('txtBuscar');

    btnBuscar.addEventListener('click',()=>{
        getProductos(txtBuscar.value,'tblProductos');
    });
    
};

async function getProductos(filtro,idContainer){

    let container = document.getElementById(idContainer);
    
    container.innerHTML = GlobalWaitElement;

    let str = ""; 
    axios.get(`/reports/productos?token=${GlobalToken}&filtro=${filtro}`)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            str += rowProducto(rows.CODPROD,rows.DESPROD,rows.COSTO,'')
        })
        container.innerHTML= str;
        
    }, (error) => {
        console.log(error);
    });
};

function rowProducto (codprod,desprod,costo,marca){
    return `<tr>
                <td>
                    ${desprod}
                    <br>
                    <small class="text-danger"><b>${codprod}</b></small>
                </td>
                <td>${funciones.setMoneda(costo,'Q ')}</td>
                <td>
                    <button class="btn btn-warning btn-sm btn-circle" onClick="getComprasProducto('${codprod}','tblComprasProducto');">+</button>
                </td>
                <td>
                    <button class="btn btn-info btn-sm btn-circle" onClick="getVentasProductoMes('${codprod}','tblVentasProducto');">+</button>
                </td>
                <td>
                    <button class="btn btn-success btn-sm btn-circle" onClick="getResumenProducto('${codprod}');">
                        <li class="fal fa-tag"></li>
                    </button>
                </td>
            </tr>`
    
};

async function getComprasProducto(codprod,idContainer){
    $('#modalComprasProducto').modal('show');

    let container = document.getElementById(idContainer);
    
    container.innerHTML = GlobalWaitElement;

    let str = ""; 
    axios.get(`/reports/productocompras?token=${GlobalToken}&codprod=${codprod}`)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            str += `<tr>
                        <td>${rows.FECHA.toString().replace('T00:00:00.000Z','')}</td>
                        <td>${rows.NOMBRE}</td>
                        <td>${rows.UNIDADES}</td>
                        <td><b>${funciones.setMoneda(rows.COSTOUNITARIO,'Q')}</b></td>
                        <td>${funciones.setMoneda(rows.TOTALCOSTO,'Q')}</td>
                    </tr>`
        })
        container.innerHTML= str;
        
    }, (error) => {
        console.log(error);
    });
};

async function getVentasProductoMes(codprod,idContainer){
    $('#modalVentasProducto').modal('show');

    let container = document.getElementById(idContainer);
    
    container.innerHTML = GlobalWaitElement;

    let str = ""; 
    axios.get(`/reports/productoventasmes?token=${GlobalToken}&codprod=${codprod}`)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            str += `<tr>
                        <td>${rows.ANIO}</td>
                        <td>${rows.MES}</td>
                        <td>${rows.UNIDADES}</td>
                        <td><b>${funciones.setMoneda(rows.VENTA,'Q')}</b></td>
                    </tr>`
        })
        container.innerHTML= str;
        
    }, (error) => {
        console.log(error);
    });
}