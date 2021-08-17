
async function fcnIniciarVista(){
   
    let cmbEmpresas = document.getElementById('cmbEmpresas');
    let cmbMeses = document.getElementById('cmbMeses');
    let cmbAnio = document.getElementById('cmbAnio');
    let btnCargar = document.getElementById('btnCargar');

    cmbMeses.innerHTML = funciones.ComboMeses();
    cmbAnio.innerHTML = funciones.ComboAnio();
    
    let f = new Date();
    cmbAnio.value = f.getFullYear().toString();
    cmbMeses.value = f.getMonth()+1;


    cmbEmpresas.addEventListener('change',()=>{
        funciones.crearBusquedaTabla('tblListado','cmbEmpresas');
    });

    btnCargar.addEventListener('click',async()=>{
        await getVentasDia('tblVentas','cmbMeses','cmbAnio');    
    })
    
    await getEmpresas();
    
    await getVentasDia('tblVentas','cmbMeses','cmbAnio');
};  


async function getEmpresas(){
    let str = `<option value=''>Todas...</option>`;
    axios.get('/reportscommunity/empresas?token=' + GlobalToken)
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

async function getVentasDia(idcontenedor,idMes,idAnio){
    let container = document.getElementById(idcontenedor);

    let mes = document.getElementById(idMes).value;
    let anio = document.getElementById(idAnio).value;
    
    let totalventa =0;
    let totalUtilidad = 0;
    let diasprom = 0;
    
    container.innerHTML = '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>'
    let str = ``;

    //para la grafica
    let labels = [];
    let dataset = [];

    axios.get(`/reportscommunity/ventasmesdia?token=${GlobalToken}&mes=${mes}&anio=${anio}`)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            labels.push(rows.DIA.toString());
            dataset.push(rows.TOTALVENTAS);
            //suma el total venta
            totalventa += Number(rows.TOTALVENTAS);
            diasprom += 1;
            totalUtilidad += Number(rows.UTILIDAD);
            str += `<tr>
                        <td>${rows.EMPNOMBRE}</td>                        
                        <td>${rows.DIA}</td>
                        <td>${funciones.setMoneda(rows.TOTALCOSTO,'Q')}</td>
                        <td>${funciones.setMoneda(rows.TOTALVENTAS,'Q')}</td>
                        <td>${funciones.setMoneda(rows.UTILIDAD,'Q')}</td>
                        <td>
                            <button class="btn btn-icon btn-success btn-circle" onclick="getDataVentas('${rows.EMPNIT}','${rows.DIA}');">
                                <li class="fal fa-tag"></li>
                            </button>
                        </td>
                    </tr>`;
        })
        container.innerHTML = str;
        document.getElementById('txtTotalMes').innerText=funciones.setMoneda(totalventa,'Q');
        document.getElementById('txtTotalUtilidades').innerText=funciones.setMoneda(totalUtilidad,'Q');
        document.getElementById('txtPromedioDia').innerText=funciones.setMoneda((totalventa/diasprom),'Q');

    // CARGANDO DATOS DE LA GRAFICA
    var datagraf = {
            labels: labels,
            datasets: [{
              label: 'Q',
              data: dataset,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              fill: false
            }]
          };

    var options = {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            },
            legend: {
              display: false
            },
            elements: {
              point: {
                radius: 0
              }
            }
    };

    var barChartCanvas = $("#barChart").get(0).getContext("2d");
    var barChart = new Chart(barChartCanvas, {type: 'bar', data: datagraf, options: options});

    }, (error) => {
        //console.log(error);
        container.innerHTML = `<h1 class="text-danger">Error al cargar datos.. ${error}</h1>`
    });
};

async function getDataVentas(empnit,dia){
    $('#modalDatosVenta').modal('show');

    document.getElementById('txtDiaSeleccionado').innerText = `Ventas del día ${dia}`;
    
    let container = document.getElementById('tblVentasDia');

    //container.innerHTML = '<h3 class="text-danger">Cargando ventas del día...</h3>';
    container.innerHTML ='<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>'
    let str ='';
    axios.get(`/reportscommunity/ventasdia?token=${GlobalToken}&empnit=${empnit}&dia=${dia}`)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            str += `<tr>
                        <td>${rows.CODDOC}</td>
                        <td>${rows.CORRELATIVO}</td>                     
                        <td>${rows.CLIENTE}</td>
                        <td>${funciones.setMoneda(rows.COSTO,'Q')}</td>
                        <td>${funciones.setMoneda(rows.PRECIO,'Q')}</td>
                        <td>${funciones.setMoneda(rows.RECARGO,'Q')}</td>
                        <td>${funciones.setMoneda(rows.IMPORTE,'Q')}</td>
                        <td>${funciones.setMoneda(rows.UTILIDAD,'Q')}</td>                        
                    </tr>`;
        })
        container.innerHTML = str;
    }, (error) => {
        container.innerHTML = `<h5 class="text-danger">Error al cargar datos.. ${error}</h5>`
    });

};