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
                          ${view.listadoAnimales()}
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
                <div class="card-body" id="tblAnimales">
            
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
            <div class="modal fade  modal-with-scroll" id="ModalBusqueda" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-right" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <label class="modal-title text-danger h3" id="">Resultados de la Búsqueda</label>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i class="fal fa-times"></i></span>
                            </button>
                        </div>

                        <div class="modal-body">
                        <table class="table table-responsive table-striped table-hover">
                            <thead>
                                <tr>
                                    <td>Producto</td>
                                    <td>Precio</td>                         
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody id="tblResultadoBusqueda">
                            

                            </tbody>
                        </table>
                        </div>
                        
                    
                    </div>
                </div>
                <div class="shortcut-menu align-left">
                    <button class="btn btn-danger btn-sm" data-dismiss="modal">
                        <i class="fal fa-angle-double-left"></i>Atrás
                    </button>
                </div>
            </div>
            
            `
        }
    }

    root.innerHTML = view.body()
};


function addListeners(){


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
    <div class="card p-3 shadow">
        <div class="form-group">
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

};