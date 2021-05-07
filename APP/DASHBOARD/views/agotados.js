function getView(){
    let view = {
        encabezado: ()=>{
            return `
            <div class="row">

                <div class="card col-12">
                    <div class="card-header">
                        <h3>Lista de productos Agotados</h3>
                        <hr class="solid">
                        
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <label>Buscar</label>
                            <input type="text" class="form-control border-primary shadow col-4" id="txtBuscar" placeholder="Escriba para buscar...">
                        </div>
                        <div class="table-responsive">
                            <table class="table table-responsive table-striped table-hover" id="tblProductos">
                                <thead class="bg-trans-gradient text-white">
                                    <tr>
                                        <td>CODIGO</td>
                                        <td>PRODUCTO</td>
                                        <td>COSTO</td>
                                        <td>EXISTENCIA</td>
                                        <td>ULTIMA VENTA</td>
                                    </tr>
                                </thead>
                                <tbody id="tblAgotados"></tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
            `
        },
        modal: ()=>{}
    }

    root.innerHTML = view.encabezado();
};


async function addListeners(){

    await gettblAgotados('tblAgotados');

    let txtBuscar = document.getElementById('txtBuscar')
    txtBuscar.addEventListener('keyup',()=>{
        funciones.FiltrarTabla('tblProductos','txtBuscar');
    })
    
}


function gettblAgotados(idcontainer){

    let container = document.getElementById(idcontainer);
    container.innerHTML = GlobalLoader;

    let str = ""; //'`<option value=''>Todas...</option>`;
    axios.get('/reports/agotados?token=' + GlobalToken)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            str += `<tr class="border-bottom">
                        <td>${rows.CODPROD}</td>
                        <td>${rows.DESPROD}</td>
                        <td>${funciones.setMoneda(rows.COSTO,'Q')}</td>
                        <td>${rows.EXISTENCIA}</td>
                        <td>${funciones.convertDate(rows.LASTSALE)}</td>
                    </tr>`;
        })
        container.innerHTML = str;
    }, (error) => {
        console.log(error);
        container.innerHTML ='No se pudo cargar ...'
    });
    
}

function fcnIniciarVista(){
    getView();
    addListeners();
}