function getView(){
    let view = {
        body :()=>{
            return `
            <div class="panel-container show">
                <div class="panel-content">
                    <ul class="nav nav-pills nav-justified border-bottom border-campesino" role="tablist">
                        <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#panelInicio" id="btnTabInicio">Inicio</a></li>
                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#panelEstadisticas" id="">Estadística</a></li>
                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#panelEmbarazos" id="">Embarazos</a></li>
                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#panelNacimientos" id="">Nacimientos</a></li>
                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#panelGenealogico" id="">Parientes</a></li>
                    </ul>
                    <div class="tab-content py-3">

                        <div class="tab-pane fade active show" id="panelInicio" role="tabpanel">
                          ${view.listadoAnimales() + view.modalDetallesAnimal() + view.modalDetallesAnimalE() + view.modalMenuAnimal() + view.modalMenuAnimalCargada()}
                        </div>
                        
                        <div class="tab-pane fade" id="panelEstadisticas" role="tabpanel">
                          
                        </div>

                        <div class="tab-pane fade" id="panelEmbarazos" role="tabpanel">
                         
                        </div>

                        <div class="tab-pane fade" id="panelNacimientos" role="tabpanel">
                         
                        </div>

                        <div class="tab-pane fade" id="panelGenealogico" role="tabpanel">
                         
                        </div>
                        
                    </div>
                </div>
            </div>

            <div class="row">
                ${view.botones()}
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
        },
        modalDetallesAnimalE :()=>{
            return `
            <div class="modal fade  modal-with-scroll" id="modalEditar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-right" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <label class="modal-title text-info h3" id="">Editar datos del Animal</label>
                        </div>

                        <div class="modal-body p-4" style="font-size:85%">
                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label>Código</label>
                                        <input type="number" id="txtCodigoE" class="form-control bg-amarillo" disabled="true">
                                    </div>    
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label>Fecha Nacimiento</label>
                                        <input type="date" id="txtFechaNacimientoE" class="form-control">
                                    </div>    
                                </div>
                            </div>
                            <br>
                            
                            <div class="form-group">
                                <label>Nombre</label>
                                <input type="text" id="txtNombreE" class="form-control" value="SN">
                            </div>


                            <div class="row">
                            
                                <div class="col-sm-12 col-lg-6 col-xl-6 col-md-6">
                                    <div class="form-group">
                                        <label>Raza</label>
                                        <select id="cmbRazaE" class="form-control">
                                        </select>
                                    </div>    
                                </div>
                                 
                                <div class="col-sm-12 col-lg-6 col-xl-6 col-md-6">
                                    <div class="form-group">
                                        <label>Color</label>
                                        <select id="cmbColorE" class="form-control">
                                        </select>
                                    </div>    
                                </div>
                            </div>
                            <br>

                            <div class="row">
                            
                                <div class="col-sm-12 col-lg-6 col-xl-6 col-md-6">
                                    <div class="form-group">
                                        <label>¿Es Comprada?</label>
                                        <select id="cmbCompradaE" class="form-control">
                                            <option value="NO">NO</option>
                                            <option value="SI">SI</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="col-sm-12 col-lg-6 col-xl-6 col-md-6">
                                    <div class="form-group">
                                        <label>Sexo</label>
                                        <select id="cmbSexoE" class="form-control">
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
                                        <select id="cmbCategoriaE" class="form-control">
                                            
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="col-sm-12 col-lg-6 col-xl-6 col-md-6">
                                    <div class="form-group">
                                        <label>Cargada</label>
                                        <select id="cmbCargadaE" class="form-control">
                                            <option value="CARGADA">CARGADA</option>
                                            <option value="VACIA">VACIA</option>
                                        </select>
                                    </div>
                                </div>
                            
                            </div>
                            <br>                      

                            <div class="form-group">
                                    <label>Observaciones</label>
                                    <textarea rows="2" id="txtObsE" class="form-control" value="SN">
                                    </textarea>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-6">
                                    <button class="btn btn-outline-secondary btn-circle shadow btn-xl" data-dismiss="modal" id="bntCerrarModalE">
                                        X
                                    </button>
                                </div>
                                <div class="col-6">
                                    <button class="btn btn-info btn-circle shadow btn-xl" id="bntGuardarE">
                                        <i class="fal fa-save"></i>
                                    </button>
                                </div>
                            </div>


                        </div>
                        
                    
                    </div>
                </div>
              
            </div>
            
            `
        },
        modalMenuAnimal :()=>{
            return `
            <div class="modal fade" id="modalMenu" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog" role="document">
                    <div class="modal-content">
                       

                        <div class="modal-body p-4">
                           
                            <h5>Opciones Generales</h5>
                            <hr class="solid">

                            <div class="row">
                                <div class="col-3">
                                    <button class="btn btn-outline-secondary btn-circle shadow btn-xl" data-dismiss="modal" id="bntCerrarModalE">
                                        X
                                    </button> 
                                </div>
                                <div class="col-3">
                                        <div class="card p-4 shadow hand card-rounded text-info border-info">
                                            <div class="row">
                                                <i class="fal fa-edit" style="font-size:120%"></i>
                                            </div>
                                            <div class="row">
                                                EDITAR DATOS
                                            </div>
                                        </div>
                                </div>
                                <div class="col-3">
                                        <div class="card p-4 shadow hand card-rounded bg-campesino text-white">
                                            <div class="row">
                                                <i class="fal fa-sync" style="font-size:120%"></i>
                                            </div>
                                            <div class="row">
                                                DESHABILITAR
                                            </div>
                                        </div>
                                </div>
                                <div class="col-3">
                                    <div class="card p-4 shadow hand card-rounded bg-danger text-white">
                                        <div class="row">
                                            <i class="fal fa-trash" style="font-size:120%"></i>
                                        </div>
                                        <div class="row">
                                            ELIMINAR
                                        </div>
                                    </div>
                                </div>
                            </div>

                          
                        </div>
                        
                    
                    </div>
                </div>              
            </div>
            `
        },
        modalMenuAnimalCargada :()=>{
            return `
            <div class="modal fade" id="modalCargada" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog" role="document">
                    <div class="modal-content">
                       

                        <div class="modal-body p-4">
                           
                            <h5>Registrar Fecha de Embarazo (Montura)</h5>
                            <hr class="solid">
                                                    

                            <div class="row">
                               
                                <div class="col-xl-6 col-sm-12 col-lg-6 col-md-6">
                                    <div class="card p-4 shadow hand card-rounded">   
                                        <label>¿ESTÁ CARGADA? </label>
                                            <div class="row">
                                                <div class="col-6">
                                                    <label class="switch">
                                                        <input type="checkbox" id="settxtCargada">
                                                        <span class="slider round" ></span>
                                                    </label>
                                                </div>
                                                <div class="col-6" align="left">
                                                    <input type="date" id="settxtFechaCargada" class="form-control">  
                                                </div>
                                            </div>
                                            
      
                                    </div>
                                </div>
                              
                                
                            </div>
                            <div class="row">
                                    <div class="col-4">
                                    </div>
                                    <div class="col-4">
                                        <button class="btn btn-outline-secondary btn-circle shadow btn-xl" data-dismiss="modal" id="">
                                            X
                                        </button> 
                                    </div>
                                    <div class="col-4">
                                        <button class="btn btn-info btn-circle shadow btn-xl" id="btnGuardarEmbarazo">
                                            <i class="fal fa-save"></i>
                                        </button> 
                                    </div>
                            </div>
                        </div>
                        
                    
                    </div>
                </div>              
            </div>
            `
        },
        modalFiltro :()=>{
            return `
            <div class="modal fade  modal-with-scroll" id="modalFiltro" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-right" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <label class="modal-title text-info h3" id="">Datos para Filtrar</label>
                        </div>

                        <div class="modal-body p-4">

                            <div class="form-group">
                                <label>opcion</label>
                                <input id="txtFiltro1" type="checkbox" checked data-toggle="toggle" data-on="Machos" data-off="Hembras" data-onstyle="success" data-offstyle="danger">
                            </div>
                                                   
                         
                        
                            <br>                      

                          


                        </div>
                    </div>
                </div>             
            </div>
            
            `
           
        }, 
        botones:()=>{
            return `
            <div id="fixed-btn2">
                <div class="row">
                    <div class="col-4">
                        <button class="btn btn-outline-secondary waves-themed waves-effect shadow hand btn-circle btn-xl" id="btnFiltroF">
                            <i class="fal fa-paper-plane"></i>
                        </button>

                    </div>
                    <div class="col-4">
                       
                    </div>
                    <div class="col-4">
                        <button class="btn btn-success waves-themed waves-effect shadow hand btn-circle btn-xl" id="btnNuevo">
                            <i class="fal fa-plus"></i>
                        </button>
                    </div>
                </div>
                
            </div>
          
            `        
        }
    }

    root.innerHTML = view.body() + view.modalFiltro();
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
        //document.getElementById('setcmbCategoria').innerHTML = str;
        str='';
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


    let btnFiltroF = document.getElementById('btnFiltroF');
    btnFiltroF.addEventListener('click',()=>{
        $('#modalFiltro').modal('show');
    });

  
    let settxtCargada = document.getElementById('settxtCargada');
    settxtCargada.addEventListener('change',()=>{

        document.getElementById('settxtFechaCargada').style= "visibility:hidden";
             
        if(settxtCargada.checked==true){
            document.getElementById('settxtFechaCargada').style= "visibility:visible";
        }else{
            document.getElementById('settxtFechaCargada').style= "visibility:hidden";
        }
    });


    getListadoAnimales();

    funciones.slideAnimationTabs();
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
            str += getCardAnimal(r.CODIGO,r.NOMBRE,r.SEXO,r.DESRAZA,r.COLOR,r.COMPRA,r.FECHANACIMIENTO,r.CARGADA,r.DESCATEGORIA);
        })
        container.innerHTML = str;
    })
    .catch(()=>{
        container.innerHTML = 'No se pudieron cargar los datos...';
    })

    
};

function getCardAnimal(CODIGO,NOMBRE,SEXO,DESRAZA,COLOR,COMPRA,FECHANACIMIENTO,CARGADA,DESCATEGORIA){
    let icono = '';
    let str = '';

            if(SEXO=='MACHO'){icono='<i class="fal fa-male"></i>'}else{icono='<i class="fal fa-female"></i>'}
            str += `
                <div class="card p-3 shadow card-rounded col-sm-6 col-md-4 col-xl-3 col-lg-3 hand" style="font-size:90%; width:17rem;">
                    <div class="form-group"> 
                        
                        <label class="negrita">Código: ${CODIGO}</label>
                        <br>
                        <h5>${NOMBRE} -  ${icono}</h5>
                        <button class="btn btn-md btn-info shadow" onclick="getdata_animal('${CODIGO}','${NOMBRE}','${SEXO}','${DESRAZA}','${COLOR}')">
                            <i class="fal fa-edit"></i>
                        </button>
                    </div>
                    <div class="card border-secondary p-4 card-rounded bg-white text-secondary negrita">
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <label>Raza: ${DESRAZA}</label>
                                </div>     
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label>Sexo: ${SEXO}</label>
                                </div>
                            </div>
                        </div>
                        
                        <br class="solid">

                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <label>Color: ${COLOR}</label>
                                </div>     
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label>Compra: ${COMPRA}</label>
                                </div>
                            </div>
                        </div>

                        <br class="solid">

                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <label>Nacimiento: ${funciones.convertDate2(FECHANACIMIENTO)}</label>
                                </div>     
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label>Cargada: ${CARGADA}</label>
                                </div>
                                <button class="btn btn-md btn-warning shadow hand" onclick="getdata_cargada('${CODIGO}','${NOMBRE}','${CARGADA}','${SEXO}')">
                                    <i class="fal fa-link"></i>
                                </button>
                            </div>
                        </div>

                        
                        <div class="row bg-campesino text-white text-center">
                            <h5 class="col-12">${DESCATEGORIA}</label>
                        </div>

                    </div>
                    
                </div>
                    `
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


function getdata_animal(){

    $('#modalMenu').modal('show');

};


function getdata_cargada(codigo,nombre,cargada,sexo){

    if(sexo=='MACHO'){
        funciones.AvisoError('Este animal es un MACHO, por favor revise');
        return;
    }else{}

    $('#modalCargada').modal('show');

};