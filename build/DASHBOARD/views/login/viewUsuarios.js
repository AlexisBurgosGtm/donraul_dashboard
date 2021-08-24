function getView(){
    let view = {
        contenedor:()=>{
            return `
            <div class="card col-12 p-4">
                <div class="card-header">
                    <h3>Gestión de Usuarios</h3>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-responsive table-striped table-hover">
                            <thead class="bg-trans-gradient text-white">
                                <tr>
                                    <td>USUARIO</td>
                                    <td>CLAVE</td>
                                    <td>NIVEL</td>
                                    <td>SERIE</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                            
                            </tbody>
                        </table>
                    </div>

                    <div id="fixed-btn2">
                        <button class="btn btn-success waves-themed waves-effect shadow hand btn-circle btn-xl" id="btnNuevo">
                            <i class="fal fa-plus"></i>
                        </button>
                    </div>

                </div>
            </div>
            ${view.modalNuevoUsuario()}
            `
        },
        detalle:()=>{
            return ``
        },
        modalNuevoUsuario:()=>{
            return `
            <div class="modal fade  modal-with-scroll" id="ModalNuevo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-right" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <label class="modal-title text-info h3" id="">Datos del Usuario</label>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i class="fal fa-times"></i></span>
                            </button>
                        </div>

                        <div class="modal-body">
                            <div class="form-group">
                                <label class="negrita">Usuario</label>
                                <input type="text" class="form-control" id="txtUsuario">
                            </div>
                            <div class="form-group">
                                <label class="negrita">Contraseña</label>
                                <input type="text" class="form-control" id="txtPass">
                            </div>
                            <div class="form-group">
                                <label class="negrita">Tipo</label>
                                <select class="form-control" id="cmbNivel">
                                    <option value="GERENCIA">GERENCIA</option>
                                    <option value="COTIZACION">COTIZACIONES</option>
                                    <option value="VENTAS">VENTAS</option>
                                    <option value="CONTABILIDAD">CONTABILIDAD</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="negrita">SERIE</label>
                                <select class="form-control" id="cmbCoddoc">
                                    <option value="COTIZ">COTIZACION 1</option>
                                    <option value="COTZ2">COTIZACION 2</option>
                                    <option value="COTZ3">COTIZACION 3</option>
                                    <option value="COTZ4">COTIZACION 4</option>
                                    <option value="COTZ5">COTIZACION 5</option>
                                    <option value="COTZ6">COTIZACION 6</option>
                                    <option value="COTZ7">COTIZACION 7</option>
                                    <option value="COTZ8">COTIZACION 8</option>
                                    <option value="COTZ9">COTIZACION 9</option>
                                </select>
                            </div>

                        </div>       
                    
                    </div>
                </div>
                <div class="shortcut-menu align-left">
                    <button class="btn btn-secondary" data-dismiss="modal">
                        <i class="fal fa-angle-double-left"></i>Cancelar
                    </button>
                    <button class="btn btn-info">
                        <i class="fal fa-save"></i>Guardar
                    </button>
                </div>
            </div>
            `
        }
    }

    root.innerHTML = view.contenedor();

};

function addListeners(){
    
    let btnNuevo = document.getElementById('btnNuevo');
    btnNuevo.addEventListener('click', ()=>{
        $("#ModalNuevo").modal('show');
    });

    getListado();

};

function fcnIniciarVista(){
    getview();
    addlisteners();

};


function getListado(idContenedor){

    let container = document.getElementById(idContenedor);
    container.innerHTML = GlobalLoader;
            
    let strdata = ''; 

    axios.post('/usuarios/listado')
    .then((response) => {
        const data = response.data.recordset;
        
        data.map((rows)=>{                    
                    strdata = strdata + `
                <tr class='border-bottom border-info'>
                    <td>${rows.USUARIO}</td>
                    <td>${rows.CLAVE}</td>
                    <td>${rows.APP}</td>
                    <td>${rows.CODDOC}</td>
                    <td>
                        <button class="btn btn-danger btn-sm btn-circle" onclick="deleteUsuario('${rows.USUARIO}','${rows.CLAVE}')">
                            <i class="fal fa-trash"></i>
                        </button>
                    </td>
                </tr>`      
        })
        container.innerHTML = strdata;
    }, (error) => {
        funciones.AvisoError('Error en la solicitud');
        strdata = '';
        container.innerHTML = 'No se pudo cargar la lista';
    });

};


function deleteUsuario(user,clave){

    

};