function getView(){
    let view = {
        body :()=>{
            return `
            <div class="panel-container show">
                <div class="panel-content">
                    <ul class="nav nav-pills nav-justified" role="tablist">
                        <li class="nav-item hidden"><a class="nav-link active" data-toggle="tab" href="#panelInicio" id="btnTabInicio">Inicio</a></li>
                        <li class="nav-item hidden"><a class="nav-link" data-toggle="tab" href="#panelProductos" id="btnTabProductos">Productos</a></li>
                        <li class="nav-item hidden"><a class="nav-link" data-toggle="tab" href="#panelCliente" id="btnTabCliente">Cliente</a></li>
                    </ul>
                    <div class="tab-content py-3">

                        <div class="tab-pane fade active show" id="panelInicio" role="tabpanel">
                          ${view.listadoAnimales() + view.modalDetallesAnimal()}
                        </div>
                        
                        <div class="tab-pane fade" id="panelProductos" role="tabpanel">
                          
                        </div>

                        <div class="tab-pane fade" id="panelCliente" role="tabpanel">
                         
                        </div>
   
                    </div>
                </div>
            </div>
            `
        },
        listadoAnimales:()=>{
            return `
            <div class="card shadow">
                <div class="card-header">
                    <h5 class="">Listado de Animales</h5>
                </div>
                <div class="card-body card-columns" id="tblAnimales">
            
                </div>
            </div>
            <div id="fixed-btn2">
                <button class="btn btn-success waves-themed waves-effect shadow hand btn-circle btn-xl" id="btnNuevo">
                    <i class="fal fa-plus"></i>
                </button>
            </div>
            `
        },
        modalDetallesAnimal :()=>{
            return `
            <div class="modal fade  modal-with-scroll" id="modalNueva" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-right" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <label class="modal-title text-danger h3" id="">Detalles del Nuevo Animal</label>
                        </div>

                        <div class="modal-body p-4" style="font-size:80%">
                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label>Código</label>
                                        <input type="number" id="txtCodigo" class="form-control bg-amarillo">
                                    </div>    
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label>Fecha Nacimiento</label>
                                        <input type="date" id="txtFechaNacimiento" class="form-control">
                                    </div>    
                                </div>
                            </div>
                            <br>
                            
                            <div class="form-group">
                                <label>Nombre</label>
                                <input type="text" id="txtNombre" class="form-control" value="SN">
                            </div>


                            <div class="row">
                            
                                <div class="col-sm-12 col-lg-6 col-xl-6 col-md-6">
                                    <div class="form-group">
                                        <label>Raza</label>
                                        <select id="cmbRaza" class="form-control">
                                        </select>
                                    </div>    
                                </div>
                                 
                                <div class="col-sm-12 col-lg-6 col-xl-6 col-md-6">
                                    <div class="form-group">
                                        <label>Color</label>
                                        <input type="text" id="txtColor" class="form-control">
                                    </div>    
                                </div>
                            </div>
                            <br>

                            <div class="row">
                            
                                <div class="col-sm-12 col-lg-6 col-xl-6 col-md-6">
                                    <div class="form-group">
                                        <label>¿Es Comprada?</label>
                                        <select id="cmbComprada" class="form-control">
                                            <option value="NO">NO</option>
                                            <option value="SI">SI</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="col-sm-12 col-lg-6 col-xl-6 col-md-6">
                                    <div class="form-group">
                                        <label>Sexo</label>
                                        <select id="cmbSexo" class="form-control">
                                            <option value="MACHO">MACHO</option>
                                            <option value="HEMBRA">HEMBRA</option>
                                        </select>
                                    </div>
                                </div>

                              
                            </div>
                            <br>
                            <div class="form-group">
                                <label>Categoría</label>
                                <select id="cmbCategoria" class="form-control">
                                    
                                </select>
                            </div>

                            <div class="form-group">
                                    <label>Observaciones</label>
                                    <textarea rows="2" id="txtObs" class="form-control" value="SN">
                                    </textarea>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-6">
                                    <button class="btn btn-outline-secondary btn-circle shadow btn-xl" data-dismiss="modal" id="bntCerrarModal">
                                        X
                                    </button>
                                </div>
                                <div class="col-6">
                                    <button class="btn btn-info btn-circle shadow btn-xl" id="bntGuardarNuevo">
                                        <i class="fal fa-save"></i>
                                    </button>
                                </div>
                            </div>


                        </div>
                        
                    
                    </div>
                </div>
              
            </div>
            
            `
        }
    }

    root.innerHTML = view.body()
};


function addListeners(){

    //---------------------------------------------------------------------
    getRazas()
    .then((datos)=>{
        let str = '';
        datos.map((r)=>{
            str += `<option value="${r.CODRAZA}">${r.DESRAZA}</option>`;
        })
        document.getElementById('cmbRaza').innerHTML = str;
    });

    document.getElementById('txtFechaNacimiento').value = funciones.getFecha();



    document.getElementById('btnNuevo').addEventListener('click',()=>{
        $('#modalNueva').modal('show');
    });

    document.getElementById('cmbCategoria').innerHTML = getCategorias();


    let bntGuardarNuevo = document.getElementById('bntGuardarNuevo');
    bntGuardarNuevo.addEventListener('click',()=>{
        bntGuardarNuevo.innerHTML = '<i class="fal fa-save fa-spin"></i>';
        bntGuardarNuevo.disabled = true;


        bntGuardarNuevo.innerHTML = '<i class="fal fa-save"></i>';
        bntGuardarNuevo.disabled = false;


    })
    //---------------------------------------------------------------------

    getListadoAnimales();

};

function fcnIniciarVista(){
    getView();    
    addListeners();
    

};


function getListadoAnimales(){
    let container = document.getElementById('tblAnimales');
    container.innerHTML = GlobalLoader;

    let view = `
    <div class="card p-3 shadow card-rounded bg-danger text-white">
        <div class="form-group">
            <i class="fal fa-horse-head fa-spin" style="font-size:200%"></i>
            <label>Nombre del Animal</label>
        </div>
        <div class="form-group">
            <label>Clasificacion</label>
        </div>
        <div class="form-group">
            <label>Edad (años)</label>
        </div>
    </div>

  
    `

    container.innerHTML = view;

};



function getCategorias(){
    let categorias = [
        {codcategoria:1,descategoria:"GENERAL" },
        {codcategoria:2,descategoria:"NOVILLAS/OS" },
        {codcategoria:4,descategoria:"LECHERAS" },
        {codcategoria:5,descategoria:"CHIVAS/OS" },
        {codcategoria:7,descategoria:"ENGORDE" }
    ]

    let str = '';
    categorias.map((r)=>{
        str += `<option value="${r.codcategoria}">${r.descategoria}</option>`
    })

    return str;

};


function getRazas(){
    return new Promise((resolve, reject)=>{

        axios.post('/finca/select_razas')
        .then((response) => {
            const datos = response.data.recordset;
            resolve(datos);
        })
        .catch(()=>{
            reject();
        })
        
    })
    
}