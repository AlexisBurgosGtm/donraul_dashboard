async function fcnIniciarVista(){
    
    await getEmpresas();

    let cmbMeses = document.getElementById('cmbMeses');
    let cmbAnio = document.getElementById('cmbAnio');
    let btnCargar = document.getElementById('btnCargar');

    cmbMeses.innerHTML = funciones.ComboMeses();
    cmbAnio.innerHTML = funciones.ComboAnio();
    
    let f = new Date();
    cmbAnio.value = f.getFullYear().toString();
    cmbMeses.value = f.getMonth()+1;

    // LISTENERS
    btnCargar.addEventListener('click',async()=>{
        await getCortesMes('tblCortes','cmbMeses','cmbAnio','cmbEmpresas');    
    })

    await getCortesMes('tblCortes','cmbMeses','cmbAnio','cmbEmpresas');    
};


async function getEmpresas(){
    let str = ``;
    axios.get('/reportscommunity/empresas?token=' + GlobalToken)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            str += `<option value=${rows.EMPNIT}>${rows.EMPRESA}</option>`;
        })
        document.getElementById('cmbEmpresas').innerHTML= str;
    }, (error) => {
        console.log(error);
    });
};

async function getCortesMes(idcontenedor,idMes,idAnio,idEmpresa){
    let container = document.getElementById(idcontenedor);
    let empnit = document.getElementById(idEmpresa).value;
    let mes = document.getElementById(idMes).value;
    let anio = document.getElementById(idAnio).value;

        
    container.innerHTML = '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>'
    let str = ``;

    axios.get(`/reportscommunity/cortesmes?token=${GlobalToken}&mes=${mes}&anio=${anio}&empnit=${empnit}`)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            str += `<tr>
                        <td>${rows.FECHA.replace('T00:00:00.000Z','')}</td>
                        <td>${rows.HORA}</td>
                        <td>${rows.CORRELATIVO}</td>
                        <td>${funciones.setMoneda(rows.VENTAS,'Q')}</td>
                        <td>${funciones.setMoneda(rows.RECIBOS,'Q')}</td>
                        <td class="text-info">${funciones.setMoneda(rows.INGRESOS,'Q')}</td>
                        <td><b>${funciones.setMoneda(rows.REPORTADO,'Q')}<b></td>
                        <td class="text-danger">${funciones.setMoneda(rows.FALTANTE,'Q')}</td>
                        <td class="text-success">${funciones.setMoneda(rows.SOBRANTE,'Q')}</td>
                        <td>${rows.USUARIO}</td>
                        <td>
                            <button class="btn btn-icon btn-success btn-circle" onclick="getDataCorte('${rows.EMPNIT}','${rows.CORRELATIVO}','tblDocumentos');">
                                <li class="fal fa-tag"></li>
                            </button>
                        </td>
                    </tr>`;
        })
        container.innerHTML = str;

    
    }, (error) => {
        //console.log(error);
        container.innerHTML = `<h1 class="text-danger">Error al cargar datos.. ${error}</h1>`
    });
};

async function getDataCorte(empnit,correlativo,idContainer){
    $('#ModalDetalleCorte').modal('show');

    let container = document.getElementById(idContainer);
        //document.getElementById('txtObs').innerHTML = obs;

    container.innerHTML = '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>'
    let str = ``;

    axios.get(`/reportscommunity/ventascorte?token=${GlobalToken}&correlativo=${correlativo}&empnit=${empnit}`)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            str += `<tr>
                        <td>${rows.FECHA.replace('T00:00:00.000Z','')}</td>
                        <td>${rows.HORA}</td>
                        <td>${rows.CODDOC}</td>
                        <td>${rows.CORRELATIVO}</td>                        
                        <td>${funciones.setMoneda(rows.PRECIO,'Q')}</td>
                        <td>${funciones.setMoneda(rows.RECARGO,'Q')}</td>
                        <td>${funciones.setMoneda(rows.IMPORTE,'Q')}</td>
                    </tr>`;
        })
        container.innerHTML = str;
    
    }, (error) => {
        //console.log(error);
        container.innerHTML = `<h1 class="text-danger">Error al cargar datos.. ${error}</h1>`
    });
}
