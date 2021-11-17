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
                <div class="card-body">
                    <div class="row" id="tblAnimales">
                    
                    </div>
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

                        <div class="modal-body p-4" style="font-size:85%">
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
                                        <select id="cmbColor" class="form-control">
                                        </select>
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

                            <div class="row">
                            
                                <div class="col-sm-12 col-lg-6 col-xl-6 col-md-6">
                                    <div class="form-group">
                                        <label>Categoría</label>
                                        <select id="cmbCategoria" class="form-control">
                                            
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="col-sm-12 col-lg-6 col-xl-6 col-md-6">
                                    <div class="form-group">
                                        <label>Cargada</label>
                                        <select id="cmbCargada" class="form-control">
                                            <option value="CARGADA">CARGADA</option>
                                            <option value="VACIA">VACIA</option>
                                        </select>
                                    </div>
                                </div>
                            
                            </div>
                            <br>                      

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
    getRazasCategorias()
    .then((data)=>{
     
        let str = '';
        data.recordsets[0].map((r)=>{
            str += `<option value="${r.CODRAZA}">${r.DESRAZA}</option>`;
        })
        document.getElementById('cmbRaza').innerHTML = str;
        str ='';
        data.recordsets[1].map((r)=>{
            str += `<option value="${r.CODCATEGORIA}">${r.DESCATEGORIA}</option>`;
        })

        document.getElementById('cmbCategoria').innerHTML = str;
    });


    document.getElementById('txtFechaNacimiento').value = funciones.getFecha();

    document.getElementById('btnNuevo').addEventListener('click',()=>{

        document.getElementById('txtCodigo').value='';
        document.getElementById('txtNombre').value='';
        document.getElementById('cmbComprada').value='NO';
        document.getElementById('txtFechaNacimiento').value= funciones.getFecha();
        document.getElementById('cmbCategoria').value="1";
        document.getElementById('cmbCargada').value='VACIA';
        document.getElementById('txtObs').value='SN';

        $('#modalNueva').modal('show');
    });

    //document.getElementById('cmbCategoria').innerHTML = getCategorias();
    document.getElementById('cmbColor').innerHTML = getColores();

    let bntGuardarNuevo = document.getElementById('bntGuardarNuevo');
    bntGuardarNuevo.addEventListener('click',()=>{

        funciones.Confirmacion('¿Está seguro que desea Crear este nuevo Animal?')
        .then((value)=>{
            if(value==true){

                bntGuardarNuevo.innerHTML = '<i class="fal fa-save fa-spin"></i>';
                bntGuardarNuevo.disabled = true;
        
                insert_animal()
                .then(()=>{
                    funciones.Aviso('Animal creado Exitosamente !!');
                    bntGuardarNuevo.innerHTML = '<i class="fal fa-save"></i>';
                    bntGuardarNuevo.disabled = false;
                    $('#modalNueva').modal('hide');
                    getListadoAnimales();
                })
                .catch(()=>{
                    funciones.AvisoError('No se pudo guardar, verifique si el código es repetido o si hay datos incompletos')
                    bntGuardarNuevo.innerHTML = '<i class="fal fa-save"></i>';
                    bntGuardarNuevo.disabled = false;
                 
                })

            }
        })

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

    let str = '';

    axios.post('/finca/select_animales', {st:'A'})
    .then((response) => {
        const data = response.data.recordset;
        data.map((r)=>{
            let icono = '';
            if(r.SEXO=='MACHO'){icono='<i class="fal fa-male"></i>'}else{icono='<i class="fal fa-female"></i>'}
            str += `
                <div class="card p-3 shadow card-rounded col-sm-6 col-md-4 col-xl-3 col-lg-3 hand" style="font-size:90%; width:17rem;">
                    <div class="form-group"> 
                        
                        <label class="negrita">Código: ${r.CODIGO}</label>
                        <br>
                        <h5>${r.NOMBRE} -  ${icono}</h5>
                    </div>
                    <div class="card border-secondary p-4 card-rounded bg-white text-secondary negrita">
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <label>Raza: ${r.DESRAZA}</label>
                                </div>     
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label>Sexo: ${r.SEXO}</label>
                                </div>
                            </div>
                        </div>
                        
                        <br class="solid">

                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <label>Color: ${r.COLOR}</label>
                                </div>     
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label>Compra: ${r.COMPRA}</label>
                                </div>
                            </div>
                        </div>

                        <br class="solid">

                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <label>Nacimiento: ${funciones.convertDate2(r.FECHANACIMIENTO)}</label>
                                </div>     
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label>Cargada: ${r.CARGADA}</label>
                                </div>
                            </div>
                        </div>

                        
                        <div class="row bg-campesino text-white text-center">
                            <h5 class="col-12">${r.DESCATEGORIA}</label>
                        </div>

                    </div>
                    
                </div>
                    `
        })
        container.innerHTML = str;
    })
    .catch(()=>{
        container.innerHTML = 'No se pudieron cargar los datos...';
    })

    
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



function getColores(){
    let colores = [
        {color:"BARCINA"},
        {color:"BARROSA"},
        {color:"BERMEJA"},
        {color:"BERMEJO"},
        {color:"OSCA"},
        {color:"OVERA"},
        {color:"PRIETA"},
        {color:"ZARDA"},
        {color:"ZARDO"},
        
    ]

    let str = '';
    colores.map((r)=>{
        str += `<option value="${r.color}">${r.color}</option>`
    })

    return str;

};

function getRazasCategorias(){
    return new Promise((resolve, reject)=>{

        axios.post('/finca/select_razas')
        .then((response) => {
            const data = response.data;
           
            resolve(data);
        })
        .catch(()=>{
            reject();
        })
        
    })
    
};




function insert_animal(){

    return new Promise((resolve, reject)=>{
        let data = {
            codigo: document.getElementById('txtCodigo').value,
            nombre: document.getElementById('txtNombre').value,
            codraza: document.getElementById('cmbRaza').value,
            sexo: document.getElementById('cmbSexo').value,
            color: document.getElementById('cmbColor').value,
            compra: document.getElementById('cmbComprada').value,
            fechanacimiento: funciones.devuelveFecha("txtFechaNacimiento"),
            codcateoria: document.getElementById('cmbCategoria').value,
            cargada: document.getElementById('cmbCargada').value,
            obs: document.getElementById('txtObs').value,
            status:"A"
        }
        axios.post('/finca/insert_animal', data)
        .then((response) => {
            const datos = response.data;
            if(Number(datos.rowsAffected[0])==0){
                reject();
            }else{
                resolve();
            }
            
        })
        .catch(()=>{
            reject();
        })
        
    })
    
};