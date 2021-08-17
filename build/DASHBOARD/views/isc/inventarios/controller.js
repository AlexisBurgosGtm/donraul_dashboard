
async function fcnIniciarVista(){
    let empresasContainer = document.getElementById('empresasContainer');
    let cmbEmpresas = document.getElementById('cmbEmpresas');
    let tblListado = document.getElementById('tblListado');

    //let cmbMarcas = document.getElementById('cmbMarcas');
    let txtBuscar = document.getElementById('txtBuscar');
    let btnBuscar = document.getElementById('btnBuscar');
  
    cmbEmpresas.addEventListener('change',()=>{
        funciones.crearBusquedaTabla('tblListado','cmbEmpresas');
    });
    /*
    cmbMarcas.addEventListener('change',()=>{
        funciones.crearBusquedaTabla('tblListado','cmbMarcas');
    });
    */
    txtBuscar.addEventListener('keyup',(e)=>{
        if (e.code=='Enter')  {
            btnBuscar.click();
        };
        if (e.code=='NumpadEnter')  {
            btnBuscar.click();
        };
    });
    btnBuscar.addEventListener('click',async ()=>{
        empresasContainer.style = "visibility:visible";
        tblListado.style = "visibility:visible";
        await getInventarioProducto('tblInventarios','txtBuscar');
    })

    document.getElementById('tblInventarios').innerHTML = '<h3 class="text-info">Busque un producto para iniciar..</h3>'

    await getEmpresas();

    empresasContainer.style = "visibility:hidden";
    tblListado.style = "visibility:hidden";
    //await getInventarios('tblInventarios');
};  


async function getEmpresas(){
    let str = ""; //'`<option value=''>Todas...</option>`;
    axios.get('/reports/empresas?token=' + GlobalToken)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            str += `<option value=${rows.EMPRESA}>${rows.EMPRESA}</option>`;
        })
        document.getElementById('cmbEmpresas').innerHTML= str;
    }, (error) => {
        console.log(error);
    });
};


async function getMarcas(){

};


async function getInventarios(idcontenedor){
    let container = document.getElementById(idcontenedor);
    container.innerHTML = GlobalLoader;
    let str = ``;

    axios.get('/reports/inventarios?token=' + GlobalToken)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            str += `<tr>
                        <td>
                            ${rows.DESPROD}
                            <br>
                            <small>${rows.CODPROD}</small>
                        </td>
                        <td class='text-info'><b>${rows.SALDO}</b>
                        <br>
                            <small class='text-primary'>Ent:${rows.ENTRADAS}-Sal:${rows.SALIDAS}</small></td>
                        </td>
                        <td>${funciones.setMoneda(rows.COSTO,'Q')}</td>
                        <td>${funciones.setMoneda(rows.TOTALCOSTO,'Q')}</td>
                        <td>${rows.DESMARCA}</td>
                    </tr>`;
        })
        container.innerHTML = str;
    }, (error) => {
        //console.log(error);
        container.innerHTML = `<h1 class="text-danger">Error al cargar datos.. ${error}</h1>`
    });
};

async function getInventarioProducto(idcontenedor,idfiltro){
 let container = document.getElementById(idcontenedor);
 let filtro = document.getElementById(idfiltro).value;

    container.innerHTML =GlobalLoader;
    let str = ``;

    axios.get('/reports/inventarioproducto?token=' + GlobalToken + '&filtro=' + filtro)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            str += `<tr>
                        <td>
                            ${rows.DESPROD}
                            <br>
                            <small>${rows.CODPROD}</small>
                        </td>
                        <td class='text-info'><b>${rows.SALDO}</b>
                        <br>
                            <small class='text-primary'>Ent:${rows.ENTRADAS}-Sal:${rows.SALIDAS}</small></td>
                        </td>
                        <td>${funciones.setMoneda(rows.COSTO,'Q')}</td>
                        <td>${funciones.setMoneda(rows.TOTALCOSTO,'Q')} </td>
                        <td>
                            <button class="btn btn-icon btn-success btn-circle" onclick="getDataProducto('${rows.EMPNIT}','${rows.CODPROD}');">
                                <li class="fal fa-tag"></li>
                            </button>
                        </td>
                    </tr>`;
        })
        container.innerHTML = str;
    }, (error) => {
        container.innerHTML = `<h3 class="text-danger">Error al cargar datos.. ${error}</h3>`
    });
}

async function getDataProducto(empnit,codprod){
    $('#modalDatosProducto').modal('show');

    let container = document.getElementById('tblPrecios');
    container.innerHTML = '<h3 class="text-danger">Cargando precios...</h3>';
    let str ='';
    axios.get(`/reports/preciosproducto?token=${GlobalToken}&empnit=${empnit}&codprod=${codprod}`)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            str += `<tr>
                        <td>${rows.CODMEDIDA}</td>
                        <td>${rows.EQUIVALE}</td>                     
                        <td>${funciones.setMoneda(rows.COSTO,'Q')}</td>
                        <td>${funciones.setMoneda(rows.PRECIO,'Q')}</td>
                        <td>${funciones.setMoneda(rows.MAYOREOA,'Q')}</td>
                        <td>${funciones.setMoneda(rows.MAYOREOB,'Q')}</td>
                        <td>${funciones.setMoneda(rows.MAYOREOC,'Q')}</td>                        
                    </tr>`;
        })
        container.innerHTML = str;
    }, (error) => {
        container.innerHTML = `<h3 class="text-danger">Error al cargar datos.. ${error}</h3>`
    });

}