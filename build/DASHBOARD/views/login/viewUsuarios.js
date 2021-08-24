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
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody id="tblListado">
                            
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
            ${view.modalEditarUsuario()}
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
                    
                    <button class="btn btn-secondary btn-lg" data-dismiss="modal">
                        <i class="fal fa-angle-double-left"></i>Cancelar
                    </button>

                    <button class="btn btn-success btn-lg" id="btnGuardar">
                        <i class="fal fa-save"></i>Guardar
                    </button>

                </div>
            </div>
            `
        },
        modalEditarUsuario:()=>{
            return `
            <div class="modal fade  modal-with-scroll" id="ModalEditar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-right" role="document">
                    <div class="modal-content">
                        <div class="modal-header bg-info text-white">
                            <label class="modal-title text-info h3" id="">Editar Usuario</label>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i class="fal fa-times"></i></span>
                            </button>
                        </div>

                        <div class="modal-body">
                            <div class="form-group">
                                <label class="negrita">Usuario</label>
                                <input type="text" class="form-control" id="txtUsuarioE">
                            </div>
                            <div class="form-group">
                                <label class="negrita">Contraseña</label>
                                <input type="text" class="form-control" id="txtPassE">
                            </div>
                            <div class="form-group">
                                <label class="negrita">Tipo</label>
                                <select class="form-control" id="cmbNivelE">
                                    <option value="GERENCIA">GERENCIA</option>
                                    <option value="COTIZACION">COTIZACIONES</option>
                                    <option value="VENTAS">VENTAS</option>
                                    <option value="CONTABILIDAD">CONTABILIDAD</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="negrita">SERIE</label>
                                <select class="form-control" id="cmbCoddocE">
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
                    
                    <button class="btn btn-secondary btn-lg" data-dismiss="modal">
                        <i class="fal fa-angle-double-left"></i>Cancelar
                    </button>

                    <button class="btn btn-info btn-lg" id="btnEditar">
                        <i class="fal fa-save"></i>Actualizar
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
        cleanUserData();
        $("#ModalNuevo").modal('show');
    });

    getListado('tblListado');

    let btnGuardar = document.getElementById('btnGuardar');
    btnGuardar.addEventListener('click', ()=>{
        funciones.Confirmacion('¿Está seguro que desea Guardar este Nuevo Usuario?')
        .then((value)=>{
            if(value==true){

                let usuario = document.getElementById('txtUsuario').value;
                let clave = document.getElementById('txtPass').value;
                let nivel = document.getElementById('cmbNivel').value;
                let coddoc = document.getElementById('cmbCoddoc').value;

                btnGuardar.innerHTML = '<i class="fal fa-save fa-spin"></i>';
                btnGuardar.disable = true;

                insertUsuario(usuario,clave,nivel,coddoc)
                .then(() => {
                    funciones.Aviso('Usuario Creado Exitosamente!!');
                    getListado('tblListado');

                    btnGuardar.innerHTML = '<i class="fal fa-save"></i>Guardar';
                    btnGuardar.disable = false;

                    $("#ModalNuevo").modal('hide');

                    cleanUserData();

                })
                .catch(() => {
                    funciones.AvisoError('No se pudo crear este usuario')
                })

            }
        })
    });

    let btnEditar = document.getElementById('btnEditar');
    btnEditar.addEventListener('click', ()=>{
        funciones.Confirmacion('¿Está seguro que desea Editar este Usuario?')
        .then((value)=>{
            if(value==true){

                let usuario = document.getElementById('txtUsuarioE').value;
                let clave = document.getElementById('txtPassE').value;
                let nivel = document.getElementById('cmbNivelE').value;
                let coddoc = document.getElementById('cmbCoddocE').value;

                btnEditar.innerHTML = '<i class="fal fa-save fa-spin"></i>';
                btnEditar.disable = true;

                editUsuario(usuario,clave,nivel,coddoc)
                .then(() => {
                    funciones.Aviso('Usuario Actualizado Exitosamente!!');
                    getListado('tblListado');

                    btnEditar.innerHTML = '<i class="fal fa-save"></i>Actualizar';
                    btnEditar.disable = false;

                    $("#ModalEditar").modal('hide');

                    //cleanUserData();

                })
                .catch(() => {
                    funciones.AvisoError('No se pudo actualizar este usuario')
                })

            }
        })
    });


};

function fcnIniciarVista(){
    getView();
    addListeners();

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
                        <button class="btn btn-info btn-sm btn-circle" onclick="editUsuarioSeleccionado(${rows.ID},'${rows.USUARIO}','${rows.CLAVE}','${rows.APP}','${rows.CODDOC}')">
                            <i class="fal fa-edit"></i>
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-danger btn-sm btn-circle" onclick="deleteUsuarioSeleccionado(${rows.ID})" id="btn${rows.ID}">
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

function deleteUsuarioSeleccionado(id){
    funciones.Confirmacion('¿Está Seguro que desea ELIMINAR este usuario?')
    .then((value)=>{
        if(value==true){

            let boton = document.getElementById('btn' + id.toString());
            boton.innerHTML = '<i class="fal fa-trash fa-spin"></i>'; boton.disabled = true;

            deleteUsuario(id)
            .then(()=>{
                funciones.Aviso('Usuario eliminado exitosamente');
                getListado('tblListado');
                boton.innerHTML = '<i class="fal fa-trash"></i>'; boton.disabled = false;
            })
            .catch((err)=>{
                funciones.AvisoError('No se pudo eliminar este usuario')
                boton.innerHTML = '<i class="fal fa-trash"></i>'; boton.disabled = false;
            })
        }
    })
};

function deleteUsuario(id){
    
        return new Promise((resolve, reject)=>{
            axios.post('/usuarios/delete', {
                id:id
            })
            .then((response) => {
                const data = response.data;
                if (data.rowsAffected[0]==0){
                    reject();
                }else{
                    resolve();
                }
            }, (error) => {
                console.log(error);
                reject();
            });
    
        })

};

function insertUsuario(usuario,clave,nivel,coddoc){
    return new Promise((resolve, reject)=>{
        axios.post('/usuarios/insert', {
            usuario:usuario,
            clave:clave,
            coddoc:coddoc,
            nivel:nivel
        })
        .then((response) => {
            const data = response.data;
            if (data.rowsAffected[0]==0){
                reject();
            }else{
                resolve();
            }
        }, (error) => {
            console.log(error);
            reject();
        });

    })

};

function cleanUserData(){
  document.getElementById('txtUsuario').value = '';  
  document.getElementById('txtPass').value = '';

};


function editUsuarioSeleccionado(id,usuario,clave,nivel,coddoc){

    GlobalSelectedId = Number(id);
    document.getElementById('txtUsuarioE').value = usuario;  
    document.getElementById('txtPassE').value = clave;
    document.getElementById('cmbNivelE').value = nivel;
    document.getElementById('cmbCoddocE').value = coddoc;

    $("#ModalEditar").modal('show');


};


function editUsuario(usuario,clave,nivel,coddoc){
    return new Promise((resolve, reject)=>{
        axios.post('/usuarios/edit', {
            usuario:usuario,
            clave:clave,
            coddoc:coddoc,
            nivel:nivel,
            id:GlobalSelectedId
        })
        .then((response) => {
            const data = response.data;
            if (data.rowsAffected[0]==0){
                reject();
            }else{
                resolve();
            }
        }, (error) => {
            console.log(error);
            reject();
        });

    })

};