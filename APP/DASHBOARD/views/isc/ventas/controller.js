
async function fcnIniciarVista(){
   
    let cmbEmpresas = document.getElementById('cmbEmpresas');
    let cmbMeses = document.getElementById('cmbMeses');
    let cmbAnio = document.getElementById('cmbAnio');

    cmbMeses.innerHTML = funciones.ComboMeses();
    cmbAnio.innerHTML = funciones.ComboAnio();
    
    let f = new Date();
    cmbAnio.value = f.getFullYear().toString();
    cmbMeses.value = f.getMonth()+1;
    
    //EMPRESAS
    cmbEmpresas.addEventListener('change',async()=>{
        GlobalEmpnit = cmbEmpresas.value;
        await getVentasDia('tblVentas','cmbMeses','cmbAnio');    
        await getComparativaDias();
    });
    //MES
    cmbMeses.addEventListener('change',async()=>{
        await getVentasDia('tblVentas','cmbMeses','cmbAnio');    
    });
    
    //ANIO
    cmbAnio.addEventListener('change',async()=>{
        await getVentasDia('tblVentas','cmbMeses','cmbAnio');    
        await getComparativaDias();
    });

    // INICIALES
    await getEmpresas();
    

    
};  


function getEmpresas(){

        let str = ''; //`<option value=''>Todas...</option>`;
        
        axios.get('/reports/empresas?token=' + GlobalToken)
        .then(async(response) => {
            const data = response.data;        
            data.recordset.map((rows)=>{
                str += `<option value=${rows.EMPNIT}>${rows.EMPRESA}</option>`;
            })
            let emp = document.getElementById('cmbEmpresas');
            emp.innerHTML= str;
            GlobalEmpnit = emp.value;
            
            await getVentasDia('tblVentas','cmbMeses','cmbAnio');
            await getTotalCompras(GlobalEmpnit,'cmbMeses','cmbAnio');
            await getComparativaDias();

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
    let totalcosto =0;
    let diasprom = 0;
    
    container.innerHTML = '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>'
    let str = ``;

    //para la grafica
    let labels = [];
    let dataset = [];

    axios.get(`/reports/ventasmesdia?token=${GlobalToken}&mes=${mes}&anio=${anio}&empnit=${GlobalEmpnit}`)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            labels.push(rows.FECHA.replace('T00:00:00.000Z','').toString());
            dataset.push(rows.TOTALVENTAS);
            //suma el total venta
            totalventa += Number(rows.TOTALVENTAS);
            let costreal = 0; let utilreal =0;
            if(Number(rows.TOTALCOSTODOL)==0){costreal=Number(rows.TOTALCOSTO)}else{costreal=Number(rows.TOTALCOSTODOL)}
            utilreal = Number(rows.TOTALVENTAS) - costreal;
            totalcosto +=costreal;
            diasprom += 1;
            totalUtilidad += utilreal;//Number(rows.UTILIDAD);
            str += `<tr>
                        <td>${rows.FECHA.replace('T00:00:00.000Z','')}</td>
                        <td>${funciones.setMoneda(costreal,'Q')}</td>
                        <td>${funciones.setMoneda(rows.TOTALVENTAS,'Q')}</td>
                        <td>${funciones.setMoneda(utilreal,'Q')}</td>
                        <td>${((utilreal/costreal*100).toFixed(2))} % </td>  
                        <td>
                            <button class="btn btn-icon btn-success btn-circle" onclick="getDataVentas('${rows.EMPNIT}','${rows.FECHA}');">
                                <li class="fal fa-tag"></li>
                            </button>
                        </td>
                        <td>
                        <button class="btn btn-icon btn-warning btn-circle" onclick="getDataProductos('${rows.EMPNIT}','${rows.FECHA}',${mes},${anio});">
                            <li class="fal fa-th-list"></li>
                        </button>
                    </td>
                    </tr>`;
        })
        container.innerHTML = str;
        document.getElementById('txtPromedioDia').innerText=funciones.setMoneda((totalventa/diasprom),'Q');
        document.getElementById('txtTotalMes').innerText=funciones.setMoneda(totalventa,'Q');
        document.getElementById('txtTotalUtilidades').innerHTML= `${funciones.setMoneda(totalUtilidad,'Q')}`;
        document.getElementById('txtTotalUtilidadesPorc').innerHTML= `${((totalUtilidad/totalcosto)*100).toFixed(1)}%`;

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
    var barChart = new Chart(barChartCanvas, {type: 'line', data: datagraf, options: options});

    }, (error) => {
        //console.log(error);
        container.innerHTML = `<h1 class="text-danger">Error al cargar datos.. ${error}</h1>`
    });
};

async function getTotalCompras(empnit,idmes,idanio){
          
  let mes = document.getElementById(idmes).value;
  let anio = document.getElementById(idanio).value;

  axios.get(`/reports/totalcompras?empnit=${empnit}&mes=${mes}&anio=${anio}`)
  .then(async(response) => {
      const data = response.data;        
      data.recordset.map((rows)=>{
          document.getElementById('txtTotalCompras').innerText = funciones.setMoneda(rows.TOTALVENTA,'Q ')
      })
  }, (error) => {
      console.log(error);
  });
};

async function getDataVentas(empnit,dia){
    $('#modalDatosVenta').modal('show');

    document.getElementById('txtDiaSeleccionado').innerText = `Ventas del día ${dia.replace('T00:00:00.000Z','')}`;
    
    let container = document.getElementById('tblVentasDia');

    //container.innerHTML = '<h3 class="text-danger">Cargando ventas del día...</h3>';
    container.innerHTML ='<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>'
    let str ='';
    axios.get(`/reports/ventasdia?token=${GlobalToken}&empnit=${empnit}&dia=${dia}`)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            let cost = 0; let util = 0;
            //verifica si costodol está en cero, y pone totalcosto
            if(Number(rows.COSTO2)==0){cost=Number(rows.COSTO)}else{cost=Number(rows.COSTO2)}
            //calcula la utilidad
            util = Number(rows.IMPORTE) - cost;
            str += `<tr>
                        <td>${rows.CODDOC}</td>
                        <td>${rows.CORRELATIVO}</td>                     
                        <td>${rows.CLIENTE}</td>
                        <td>${funciones.setMoneda(cost,'Q')}</td>
                        <td>${funciones.setMoneda(rows.PRECIO,'Q')}</td>
                        <td>${funciones.setMoneda(rows.DESCUENTO,'Q')}</td>
                        <td>${funciones.setMoneda(rows.IMPORTE,'Q')}</td>
                        <td>${funciones.setMoneda(util,'Q')}
                        <br>
                            <small class="text-success">${((util/cost)*100).toFixed(2)} %</small>
                        </td>                        
                    </tr>`;
        })
        container.innerHTML = str;
    }, (error) => {
        container.innerHTML = `<h5 class="text-danger">Error al cargar datos.. ${error}</h5>`
    });

};

async function getDataProductos(empnit,dia,mes,anio){
    $('#modalDatosProductos').modal('show');

    document.getElementById('txtDiaSeleccionadoProductos').innerText = `Productos vendidos el ${dia.replace('T00:00:00.000Z','')}`;
    
    let container = document.getElementById('tblVentasDiaProductos');
        
    container.innerHTML ='<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>'
    let str ='';
    axios.get(`/reports/ventasdiaproductos?token=${GlobalToken}&empnit=${empnit}&dia=${dia}&mes=${mes}&anio=${anio}`)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            str += `<tr>
                        <td>${rows.DESPROD}
                            <br>
                            <small>${rows.CODPROD}</small>
                        </td>
                        <td>${rows.UNIDADES}</td>                     
                        <td>${funciones.setMoneda(rows.COSTO,'Q')}</td>
                        <td>${funciones.setMoneda(rows.VENTA,'Q')}</td>
                        <td>${funciones.setMoneda(rows.UTILIDAD,'Q')}
                        <td class="text-success">${((rows.UTILIDAD/rows.COSTO)*100).toFixed(2)}%</td>                        
                    </tr>`;
        })
        container.innerHTML = str;
    }, (error) => {
        container.innerHTML = `<h5 class="text-danger">Error al cargar datos.. ${error}</h5>`
    });
    
};

async function getComparativaDias(){

    let container = document.getElementById('barChart2');
    let totalventa = 0;
    let f = new Date();
    
    let anio = document.getElementById('cmbAnio').value;
    let dia = f.getDate();

    console.log('comparando dia ' + dia)
       
    container.innerHTML = GlobalLoader;
    
    //para la grafica
    let labels = [];
    let dataset = [];

    
    axios.get(`/reports/graficacomparativadias?token=${GlobalToken}&anio=${anio}&empnit=${GlobalEmpnit}&dia=${dia}`)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            labels.push(rows.MES);
            dataset.push(rows.TOTALVENTAS);
            
            //suma el total venta
            totalventa += Number(rows.TOTALVENTAS);
            
        })
      
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

    var barChartCanvas = $("#barChart2").get(0).getContext("2d");
    var barChart = new Chart(barChartCanvas, {type: 'bar', data: datagraf, options: options});

    }, (error) => {
        //console.log(error);
        container.innerHTML = `<h1 class="text-danger">Error al cargar datos.. ${error}</h1>`
    });

};