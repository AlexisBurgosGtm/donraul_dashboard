function getView(){
    let view = {
        tabsCotizacion :()=>{
            return `
            <div class="panel-container show">
                <div class="panel-content">
                    <ul class="nav nav-pills nav-justified" role="tablist">
                        <li class="nav-item hidden"><a class="nav-link active" data-toggle="tab" href="#panelListado" id="btnTabListado">Historial</a></li>
                        <li class="nav-item hidden"><a class="nav-link" data-toggle="tab" href="#panelProductos" id="btnTabProductos">Productos</a></li>
                        <li class="nav-item hidden"><a class="nav-link" data-toggle="tab" href="#panelCliente" id="btnTabCliente">Cliente</a></li>
                    </ul>
                    <div class="tab-content py-3">

                        <div class="tab-pane fade active show" id="panelListado" role="tabpanel">
                            ${view.listadoCotizaciones()}
                        </div>
                        
                        <div class="tab-pane fade" id="panelProductos" role="tabpanel">
                            ${view.gridTempVenta()  
                                + view.modalBusquedaCliente() 
                                + view.modalNuevoCliente() 
                                + view.modalTerminar()}
                        </div>

                        <div class="tab-pane fade" id="panelCliente" role="tabpanel">
                            ${view.documento() + view.btnCobrar()}
                        </div>
   
                    </div>
                </div>
            </div>
            `
        },
        listadoCotizaciones: ()=>{
            return `
                    <div class="table-responsive">
                        <table class="table table-responsive table-striped">
                            <thead class="bg-trans-gradient text-white">
                                <tr>
                                    <td>FECHA</td>
                                    <td>CLIENTE</td>
                                    <td>IMPORTE</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody id="tblHistorial"></tbody>
                        </table>
                    </div>
                    <div id="fixed-btn2">
                        <button class="btn btn-success waves-themed waves-effect shadow hand btn-circle btn-xl" id="btnNuevaCotizacion">
                            <i class="fal fa-plus"></i>
                        </button>
                    </div>
            `
        },
        documento :()=>{
            return `
        <div class="row">

            <div class="col-12 card p-4">
                <div class="input-group">
                    <input id="txtNit" type="text" ref="txtNit" class="form-control" placeholder="Código del cliente.." aria-label="" aria-describedby="button-addon4" />
                    <div class="input-group-prepend">
                        <button class="btn btn-info waves-effect waves-themed" type="button" id="btnBusquedaClientes">
                            <i class="fal fa-search"></i>
                        </button>
                        <div class="card"></div>
                        <button class="btn btn-success waves-effect waves-themed" id="btnNuevoCliente">
                            +
                        </button>
                    </div>
                    
                </div>
                <input class="form-control" id="txtNombre" placeholder="Nombre de cliente..">
                <input class="form-control" id="txtDireccion" placeholder="Dirección cliente">
            </div>

        </div>
        <br>

        <div class="row">
            <div class="card p-4">
                <div class="input-group">
                        <select class="form-control input-sm" id="cmbCoddoc">
                            <option value="COTIZ">COTIZACION 1</option>
                            <option value="COTZ2">COTIZACION 2</option>
                            <option value="COTZ3">COTIZACION 3</option>
                            <option value="COTZ4">COTIZACION 4</option>
                            <option value="COTZ5">COTIZACION 5</option>
                            <option value="COTZ6">COTIZACION 6</option>
                            <option value="COTZ7">COTIZACION 7</option>
                            <option value="COTZ8">COTIZACION 8</option>
                            <option value="COTZ9">COTIZACION 9</option>
                            <option value="COT10">COTIZACION 10</option>
                        </select>
                        <div class="input-group-prepend">
                            <input type="text" class="form-control" value="0" id="txtCorrelativo" readonly="true">
                        </div>
                </div>
            </div>
        </div>
                
        <div class="row">
            <div class="card p-4">
                <div class="form-group">
                    <label>Fecha</label>
                    <input type="date" class="form-control bg-subtlelight pl-4 text-sm" id="txtFecha">
                </div>
            </div>
        </div>
        
        <br>
        
        <div class="row">
            <div class="card p-4">
                <div class="form-group">
                    <label>Creado por..</label>
                    <input type="text" class="form-control" id="cmbVendedor">
                </div>
            </div>              
        </div>

        <br>
        
        <div class="row">
            <div class="card p-4">
                <div class="form-group">
                    <label>Observaciones</label>
                    <textarea class="form-control" rows="4" id="txtObs"></textarea>
                </div>
            </div>
        </div>
       
            `
        },
        gridTempVenta :()=>{
            return `
        
            <div id="panel-2" class="panel col-12">

                <div class="panel-hdr text-right">
                    <h1 id="txtTotalVenta" class="text-danger"></h1>             
                </div>

                <div class="panel-container show">
                    <div class="panel-content">
                        <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8">
                            <div class="input-group">
                                <input id="txtBusqueda" type="text" ref="txtBusqueda" class="form-control shadow border-info" placeholder="Buscar código o descripción..." aria-label="" aria-describedby="button-addon4" />
                                <div class="input-group-prepend">
                                    <button class="btn btn-info waves-effect waves-themed shadow" type="button" id="btnBuscarProducto">
                                        <i class="fal fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-hover table-striped"><!--mt-5-->
                                <thead class="bg-trans-gradient text-white">
                                    <tr>
                                        <th class="">Producto</th>
                                        <th class="">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody id="tblGridTempVentas"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div id="fixed-btn2">
                    <div class="row">
                        <div class="col-4">
                            <button class="btn btn-outline-danger waves-themed waves-effect shadow hand btn-circle btn-xl" id="btnBajarProductos">
                                <i class="fal fa-sync"></i>
                            </button>    
                        </div>
                        <div class="col-4">
                            <button class="btn btn-secondary waves-themed waves-effect shadow hand btn-circle btn-xl" id="btnAtrasCotizacion">
                                <i class="fal fa-angle-left"></i>
                            </button>    
                        </div>
                        <div class="col-4">
                            <button class="btn btn-success waves-themed waves-effect shadow hand btn-circle btn-xl" id="btnFinalizarCotizacion">
                                <i class="fal fa-angle-right"></i>
                            </button>    
                        </div>
                    </div>
                    
                </div>

                <div id="containerModalesVentas"></div>

            </div>
          
            `
        },
        gridTempVentaModalBusquedaProductos :()=>{
            return `
        <div class="row">
            <div id="panel-2" class="panel col-12">


                <div class="panel-hdr">
                    <h2 id="txtTotalVenta" class="text-danger"></h2>
                    <div class="panel-toolbar">
                                               
                        <button class="btn btn-warning" data-action="panel-fullscreen" data-toggle="tooltip" data-offset="0,10" data-original-title="Fullscreen">
                            <i class="fal fa-angle-double-up"></i>
                        </button>
                    </div>
                </div>
                <div class="panel-container show">
                    <div class="panel-content">
                        <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8">
                            <div class="input-group">
                                <select class="form-control col-3 shadow border-info" id="cmbTipoPrecio">
                                    <option value="P">DET</option>
                                    <option value="C">PreB</option>
                                    <option value="B">PreC</option>
                                    <option value="A">MAY</option>
                                    <option value="K">CAMBIO</option>
                                </select>
                                <input id="txtBusqueda" type="text" ref="txtBusqueda" class="form-control col-7  shadow border-info" placeholder="Buscar código o descripción..." aria-label="" aria-describedby="button-addon4" />
                                <div class="input-group-prepend">
                                    <button class="btn btn-info waves-effect waves-themed shadow" type="button" id="btnBuscarProducto">
                                        <i class="fal fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-hover table-striped"><!--mt-5-->
                                <thead>
                                    <tr>
                                        <th class="border-top-0 table-scale-border-bottom fw-700">Producto</th>
                                        <th class="text-right border-top-0 table-scale-border-bottom fw-700">Medida</th>
                                        <th class="text-center border-top-0 table-scale-border-bottom fw-700">Cant.</th>
                                        <th class="text-right border-top-0 table-scale-border-bottom fw-700">Subtotal</th>
                                        <th class="text-center border-top-0 table-scale-border-bottom fw-700"></th>
                                    </tr>
                                </thead>
                                <tbody id="tblGridTempVentas"></tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="modal fade modal-with-scroll" id="ModalBusqueda" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

                <div class="modal fade  modal-with-scroll" id="ModalCantidadProducto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-right" role="document">
                        <div class="modal-content">
                            <br><br><br><br><br>
                            <div class="modal-header">
                                <label class="modal-title" id="txtDesProducto">Azucar don Justo Cabal Kilo</label>
                            </div>
                            <div class="modal-body" align="right">
                                <div class="col-8">
                                    <div class="row">
                                        <b id="txtCodMedida">UNIDAD</b>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="input-group">  
                                                <div class="input-group-prepend">
                                                    <button class="btn btn-md btn-icon btn-round btn-info" id="btnCantidadDown">
                                                        -
                                                    </button>
                                                </div>
                                    
                                                <input type="number" class="text-center form-control" id="txtCantidad" value="1">    
                                    
                                                <div class="input-group-append">
                                                    <button class="btn btn-md btn-icon btn-round btn-info" id="btnCantidadUp">
                                                        +
                                                    </button>    
                                                </div>
                                            </div>                            
                                        </div>                              
                                    </div>
                                    <div class="col-12">
                                        <label>Precio: </label>
                                        <label class="text-success" id="txtPrecioProducto">Q500</label>
                                        <br>
                                        <label>Subtotal:</label>
                                        <label class="text-danger" id="txtSubTotal">Q500</label>
                                    </div>
                                    <br>
                                    <div class="">
                                        <button type="button" class="btn btn-outline-secondary btn-round" data-dismiss="modal" id="btnCancelarModalProducto">
                                            <i class="fal fa-ban"></i>Cancelar
                                        </button>
                                        <button type="button" class="btn btn-primary btn-round" id="btnAgregarProducto">
                                            <i class="fal fa-check"></i>Agregar
                                        </button>
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
        btnCobrar :()=>{
            return `
            <div id="fixed-btn2">
                <button class="btn btn-outline-danger btn-lg waves-themed waves-effect shadow" id="btnCobrar">
                    <i class="fal fa-search"></i>
                    COBRAR
                </button>
            </div>
            `
        },
        modalBusquedaProductos :()=>{
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
        },
        modalBusquedaCliente :()=>{
            return `
            <div class="modal fade  modal-with-scroll" id="ModalBusquedaCliente" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-left" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <label class="modal-title text-danger h3" id="">Búsqueda de Clientes</label>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i class="fal fa-times"></i></span>
                            </button>
                        </div>

                        <div class="modal-body">
                            <div class="input-group">
                                    <input id="txtBusquedaCliente" type="text" ref="txtBusquedaCliente" class="form-control" placeholder="Buscar por nombre de cliente..." aria-label="" aria-describedby="button-addon4" />
                                    <div class="input-group-prepend">
                                        <button class="btn btn-info waves-effect waves-themed" type="button" id="btnBuscarCliente">
                                            <i class="fal fa-search"></i>
                                        </button>
                                    </div>
                            </div>
                        <table class="table table-responsive table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <td>Nombre</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody id="tblResultadoBusquedaCliente">
                            

                            </tbody>
                        </table>
                        </div>

                    
                    </div>
                </div>
            </div>
            `
        },
        modalNuevoCliente :()=>{
            return `
            <div class="modal fade" id="ModalNuevoCliente" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <label class="modal-title text-danger h3" id="">Datos del Cliente</label>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i class="fal fa-times"></i></span>
                            </button>
                        </div>
            
                        <div class="modal-body">
                            <form class="col-12" id="formNuevoCliente">
                                <div class="form-group col-6">
                                    <label>Código/NIT:</label>
                                    <input type="text" class="form-control" id='txtClienteNit' required='true' readonly="true">
                                </div>

                                <div class="row">
                                    <div class="form-group col-6">
                                        <label>Nombre Cliente:</label>
                                        <input type="text" class="form-control" id='txtClienteNombre' required='true'>
                                    </div>                               
                                    <div class="form-group col-6">
                                        <label>Nombre para Factura:</label>
                                        <input type="text" class="form-control" id='txtClienteNombreFac' required='true'>
                                    </div>                               
                                </div>
                                
                                <div class="form-group">
                                    <label>Dirección:</label>
                                    <input type="text" class="form-control" id='txtClienteDireccion' required='true'>
                                </div>

                                <div class="row">
                                    <div class="form-group col-6">
                                        <label>Teléfono:</label>
                                        <div class="row">
                                            <select class="form-control col-3">
                                                <option value="502">+502</option>
                                            </select>
                                            <input type="number" class="form-control col-9" id='txtClienteTelefono'>    
                                        </div>
                                    </div>
                                    <div class="form-group col-6">
                                        <label>Email:</label>
                                        <input type="email" class="form-control" id='txtClienteEmail'>
                                    </div>                               
                                </div>

                                <div class="row">
                                    <div class="form-group col-7">
                                        <label>Municipio:</label>
                                        <select class="form-control" id="cmbClienteMunicipio">
                                            <option value="01">GUATEMALA</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-5">
                                        <label>Departamento:</label>
                                        <select class="form-control" id="cmbClienteDepartamento">
                                            <option value="01">GUATEMALA</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group col-6">
                                    <label>Tipo de Precio:</label>
                                    <select class="form-control" id="cmbClienteTipoPrecio">
                                        
                                    </select>
                                </div>

                                <div class="form-group table-scale-border-top border-left-0 border-right-0 border-bottom-0 text-right">
                                    <br>
                                    <button class="btn btn-warning btn-round btn-lg" data-dismiss="modal" id="btnCancelarCliente">
                                        CANCELAR
                                    </button>
                                    <button class="btn btn-transparent"></button>
                                    <input type="submit" class="btn btn-primary btn-round btn-lg" value="GUARDAR">
                                        
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
            `
        },
        modalTerminar :()=>{
            return `
                <div class="modal fade" id="ModalFinalizarPedido" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <label class="modal-title text-danger h3" id="">Detalle de la Entrega</label>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i class="fal fa-times"></i></span>
                                </button>
                            </div>
                
                            <div class="modal-body shadow">
                                    <div class="">            
                                        
                                        <div class="form-group">
                                            <label>Fecha Entrega:</label>
                                            <input type="date" class="form-control" id="txtEntregaFecha">
                                        </div>

                                        <div class="form-group">
                                            <label>Forma de Pago:</label>
                                            <select id="cmbEntregaConcre" class="form-control">
                                                <option value="CONTADO">CONTADO</option>
                                                <option value="CREDITO">CREDITO</option>
                                            </select>
                                        </div>

                                        <div class="form-group">
                                            <label>Observaciones</label>
                                            <textarea rows="4" cols="80" class="form-control" id="txtEntregaObs" placeholder="Escriba aqui sus observaciones..."></textarea>
                                        </div>                                                              
                                            
                                    </div>

                                    <div class="row">
                                        <label class="text-white" id="lbDocLat">0</label>
                                        <label class="text-white" id="lbDocLong">0</label class="text-white">
                                    </div>
                                    
                                    <br>
            
                                    <div class="row">
                                        <div class="col-5">
                                            <button class="btn btn-secondary btn-lg  btn-pills btn-block waves-effect waves-themed" data-dismiss="modal" id="btnEntregaCancelar">
                                                <i class="fal fa-times mr-1"></i>
                                                Cancelar
                                            </button>                                
                                        </div>
            
                                        <div class="col-1"></div>
            
                                        <div class="col-5">
                                            <button class="btn btn-success btn-lg btn-pills btn-block waves-effect waves-themed" id="btnFinalizarPedido">
                                                <i class="fal fa-check mr-1"></i>Finalizar
                                            </button>
                                        </div>
                                        
                                        
                                    </div>
                            
                            </div>
                        
                        </div>
                    </div>
                </div>`
        },
        modalCantidadProducto:()=>{
            return `
            <div class="modal fade" id="ModalCantidadProducto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-right" role="document">
                    <div class="modal-content">
                        <br><br><br><br><br>
                        <div class="modal-header">
                            <label class="modal-title" id="txtDesProducto">Azucar don Justo Cabal Kilo</label>
                        </div>
                        <div class="modal-body" align="right">
                            <div class="col-8">
                                <div class="row">
                                    <b id="txtCodMedida">UNIDAD</b>
                                </div>
                                
                                <div class="form-group">
                                    <div class="row">
                                        <div class="input-group">
                                
                                            <div class="input-group-prepend">
                                                <button class="btn btn-md btn-icon btn-round btn-info" id="btnCantidadDown">
                                                    -
                                                </button>
                                            </div>
                                
                                            <input type="number" class="text-center form-control" id="txtCantidad" value="1">    
                                
                                            <div class="input-group-append">
                                                <button class="btn btn-md btn-icon btn-round btn-info" id="btnCantidadUp">
                                                    +
                                                </button>    
                                            </div>
                                        </div>                            
                                    </div>                              
                                </div>

                                <div class="col-12">
                                    <label>Precio: </label>
                                    <label class="text-success" id="txtPrecioProducto">Q500</label>
                                    <br>
                                    <label>Subtotal:</label>
                                    <label class="text-danger" id="txtSubTotal">Q500</label>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-6">
                                        <button type="button" class="btn btn-outline-secondary btn-round" data-dismiss="modal" id="btnCancelarModalProducto">
                                            <i class="fal fa-ban"></i>Cancelar
                                        </button>
                                    </div>
                                    <div class="col-6">
                                        <button type="button" class="btn btn-primary btn-round" id="btnAgregarProducto">
                                            <i class="fal fa-check"></i>Agregar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            `
        },
        modalCambiarCantidadProducto :()=>{
            return `
                <div class="modal fade" id="modalCambiarCantidadProducto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-md" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <label class="modal-title text-info h3" id="">Cambiar cantidad de producto</label>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i class="fal fa-times"></i></span>
                                </button>
                            </div>
                
                            <div class="modal-body shadow">
                                    <div class="">            
                                        
                                        <div class="form-group">
                                            <label>Nueva cantidad:</label>
                                            <input type="number" class="form-control border-info shadow col-10" id="txtCantNuevaCant">
                                        </div>                                                             
                                            
                                    </div>
                                    
                                    <br>
            
                                    <div class="row">
                                        <div class="col-5">
                                            <button class="btn btn-secondary btn-lg  btn-pills btn-block waves-effect waves-themed" data-dismiss="modal" id="">
                                                <i class="fal fa-times mr-1"></i>
                                                Cancelar
                                            </button>                                
                                        </div>
            
                                        <div class="col-1"></div>
            
                                        <div class="col-5">
                                            <button class="btn btn-success btn-lg btn-pills btn-block waves-effect waves-themed" id="btnCantGuardar">
                                                <i class="fal fa-check mr-1"></i>Aceptar
                                            </button>
                                        </div>
                                        
                                        
                                    </div>
                            
                            </div>
                        
                        </div>
                    </div>
                </div>`
        }
    }

  
    root.innerHTML = view.tabsCotizacion() /*view.encabezadoClienteDocumento() 
                + view.gridTempVenta() 
                + view.btnCobrar() 
                + view.modalBusquedaCliente() 
                + view.modalNuevoCliente() 
                + view.modalTerminar(); 
                */

    let containerModalesVentas = document.getElementById('containerModalesVentas');
    containerModalesVentas.innerHTML = view.modalBusquedaProductos() 
                                        + view.modalCantidadProducto()
                                        + view.modalCambiarCantidadProducto();

};

async function iniciarVista(nit,nombre,direccion){
    //inicializa la vista
    getView();

    let txtFecha = document.getElementById('txtFecha');txtFecha.value = funciones.getFecha();
    let txtEntregaFecha = document.getElementById('txtEntregaFecha');txtEntregaFecha.value = funciones.getFecha();

    // listener para el nit
    let txtNit = document.getElementById('txtNit');
    txtNit.addEventListener('keydown',(e)=>{
        if(e.code=='Enter'){
            fcnBuscarCliente('txtNit','txtNombre','txtDireccion');    
        }
        if(e.code=='NumpadEnter'){
            fcnBuscarCliente('txtNit','txtNombre','txtDireccion');    
        }
    });

    document.getElementById('btnBuscarCliente').addEventListener('click',()=>{
        //fcnBuscarCliente('txtNit','txtNombre','txtDireccion');    
    });

    document.getElementById('txtBusqueda').addEventListener('keyup',(e)=>{
        if(e.code=='Enter'){
            fcnBusquedaProducto('txtBusqueda','tblResultadoBusqueda','cmbTipoPrecio');
            $('#ModalBusqueda').modal('show');
        }
        if(e.code=='NumpadEnter'){
            fcnBusquedaProducto('txtBusqueda','tblResultadoBusqueda','cmbTipoPrecio');
            $('#ModalBusqueda').modal('show');
        }
    });

    document.getElementById('btnBuscarProducto').addEventListener('click',()=>{
        fcnBusquedaProducto('txtBusqueda','tblResultadoBusqueda','cmbTipoPrecio');
        $('#ModalBusqueda').modal('show');
    });

    let btnCobrar = document.getElementById('btnCobrar');
    btnCobrar.addEventListener('click',()=>{
       
        
        if(btnCobrar.innerText=='Terminar'){
            funciones.AvisoError('No puede finalizar un pedido sin productos')
        }else{
           if(txtNit.value==''){
               funciones.AvisoError('Especifique el cliente a quien se carga la venta');
           }else{
               funciones.ObtenerUbicacion('lbDocLat','lbDocLong')
                switch (GlobalTipoCobro) {
                    case 'COBRO':
                    
                        break;
                    case 'TERMINAR':
                        $('#ModalFinalizarPedido').modal('show');   
                        break;
            
                    default:
                        break;
                }                 
           }
       }
       
    });

    let cmbCoddoc = document.getElementById('cmbCoddoc');
    //classTipoDocumentos.comboboxTipodoc('PED','cmbCoddoc');
    cmbCoddoc.value = GlobalCoddoc;

    //cmbCoddoc.addEventListener('change',async ()=>{
      // await classTipoDocumentos.fcnCorrelativoDocumento('PED',cmbCoddoc.value,'txtCorrelativo');
    //});

    let cmbVendedor = document.getElementById('cmbVendedor');

    let btnFinalizarPedido = document.getElementById('btnFinalizarPedido');
    btnFinalizarPedido.addEventListener('click',async ()=>{
        fcnFinalizarPedido();
    });


    let btnBusquedaClientes = document.getElementById('btnBusquedaClientes');
    btnBusquedaClientes.addEventListener('click',()=>{
        $('#ModalBusquedaCliente').modal('show');
    });
    
    let txtBusquedaCliente = document.getElementById('txtBusquedaCliente');
    txtBusquedaCliente.addEventListener('keyup',(e)=>{
        if(e.code=='Enter'){
            fcnBusquedaCliente('txtBusquedaCliente','tblResultadoBusquedaCliente');
        }
        if(e.code=='NumpadEnter'){
            fcnBusquedaCliente('txtBusquedaCliente','tblResultadoBusquedaCliente');
        }
    });

    document.getElementById('btnBuscarCliente').addEventListener('click',()=>{
        fcnBusquedaCliente('txtBusquedaCliente','tblResultadoBusquedaCliente');
    });
    document.getElementById('btnNuevoCliente').addEventListener('click',()=>{
        //$('#ModalNuevoCliente').modal('show');
        if(txtNit.value!==''){
            fcnBuscarCliente('txtNit','txtNombre','txtDireccion');
        }else{
            funciones.AvisoError('Escriba el NIT o código de cliente para comprobar');
        };
        
    })

     
    // EVENTOS DE LOS BOTONES
    document.body.addEventListener('keyup',(e)=>{
        if(GlobalSelectedForm=='VENTAS'){
            switch (e.keyCode) {
                case 118: //f7
                    btnCobrar.click();
                    break;
                case 113: //f2
                    btnBusquedaClientes.click();
                    //createNotification('hola mundo');
                default:
                    break;
            }    
        }
    });

    // carga el grid
   
    
    //await classTipoDocumentos.fcnCorrelativoDocumento('PED',cmbCoddoc.value,'txtCorrelativo');
    await fcnCargarGridTempVentas('tblGridTempVentas');

    cmbVendedor.value = GlobalCodUsuario;

    //fcnCargarComboTipoPrecio();
  
    // inicializa la calculadora de cantidad
    //iniciarModalCantidad();
    addEventsModalCambioCantidad();
    fcnIniciarModalCantidadProductos();

    //carga los datos del cliente
    document.getElementById('txtNit').value = nit;
    document.getElementById('txtNombre').value = nombre;
    document.getElementById('txtDireccion').value = direccion;
    

    //METODOS NUEVOS 
    let btnNuevaCotizacion = document.getElementById('btnNuevaCotizacion');
    btnNuevaCotizacion.addEventListener('click',()=>{
        document.getElementById('btnTabProductos').click();
    });

    let btnAtrasCotizacion = document.getElementById('btnAtrasCotizacion');
    btnAtrasCotizacion.addEventListener('click',()=>{
        document.getElementById('btnTabListado').click();
    });

    let btnFinalizarCotizacion = document.getElementById('btnFinalizarCotizacion');
    btnFinalizarCotizacion.addEventListener('click',()=>{
        document.getElementById('btnTabCliente').click();
    })

    getListadoCotizaciones('tblHistorial',2021,8)

    
    let btnBajarProductos = document.getElementById('btnBajarProductos');
    btnBajarProductos.addEventListener('click',()=>{
       console.log('Deberia estar girando...')
       
       btnBajarProductos.disabled = true;
       document.getElementById('btnBajarProductos').innerHTML = '<i class="fal fa-sync fa-spin"></i>';
        //actulización de productos     
     
            downloadProductosTodos()
            .then(()=>{
                btnBajarProductos.innerHTML = '<i class="fal fa-sync"></i>';
                btnBajarProductos.disabled = false;
                funciones.Aviso('Catálogo de productos actualizado exitosamente!!')
            })
            .catch(()=>{
                btnBajarProductos.innerHTML = '<i class="fal fa-sync"></i>';
                btnBajarProductos.disabled = false;
                funciones.AvisoError('No se pudieron descargar los productos, revise su conexión a internet')
            });
   
       
    })


    funciones.slideAnimationTabs();
    
};

function addEventsModalCambioCantidad(){
 

    document.getElementById('btnCantGuardar').addEventListener('click',()=>{
        let nuevacantidad = Number(document.getElementById('txtCantNuevaCant').value);
        if(nuevacantidad>0){
            fcnUpdateTempRow(GlobalSelectedId,nuevacantidad)
            .then(()=>{
                $('#modalCambiarCantidadProducto').modal('hide');
            })
        }else{
            funciones.AvisoError('Escriba una cantidad válida')
        }  
    }) 

};

function fcnIniciarModalCantidadProductos(){

        
    let btnAgregarProducto = document.getElementById('btnAgregarProducto'); //boton agregar 
    let txtCantidad = document.getElementById('txtCantidad'); //input
    let btnCantidadUp = document.getElementById('btnCantidadUp');
    let btnCantidadDown = document.getElementById('btnCantidadDown');
    let txtSubTotal = document.getElementById('txtSubTotal'); //label

    btnAgregarProducto.addEventListener('click',()=>{
        GlobalSelectedCantidad = Number(txtCantidad.value);
        let totalunidades = (Number(GlobalSelectedEquivale) * Number(GlobalSelectedCantidad));
        let totalexento = GlobalSelectedCantidad * GlobalSelectedExento;

        
        
        fcnAgregarProductoVenta(GlobalSelectedCodprod,GlobalSelectedDesprod,GlobalSelectedCodmedida,GlobalSelectedCantidad,GlobalSelectedEquivale,totalunidades,GlobalSelectedCosto,GlobalSelectedPrecio,totalexento);
        
        
    });

    txtCantidad.addEventListener('click',()=>{txtCantidad.value =''});

    btnCantidadUp.addEventListener('click',()=>{
        let cant = parseInt(txtCantidad.value);
        txtCantidad.value = cant + 1;

        let _SubTotal = parseFloat(GlobalSelectedPrecio) * parseFloat(txtCantidad.value);
        //_SubTotalCosto = parseFloat(_Costo) * parseFloat(txtCantidad.value);
        txtSubTotal.innerHTML = funciones.setMoneda(_SubTotal,'Q');
        
    })

    btnCantidadDown.addEventListener('click',()=>{
        if (parseInt(txtCantidad.value)==1){

        }else{
        let cant = parseInt(txtCantidad.value);
        txtCantidad.value = cant - 1;

        let _SubTotal = parseFloat(GlobalSelectedPrecio) * parseFloat(txtCantidad.value);
        //s_SubTotalCosto = parseFloat(_Costo) * parseFloat(txtCantidad.value);
        txtSubTotal.innerHTML = funciones.setMoneda(_SubTotal,'Q');
        }
        
    })

};

function fcnBusquedaProducto(idFiltro,idTablaResultado,idTipoPrecio){
    
    //let cmbTipoPrecio = document.getElementById(idTipoPrecio);

    let filtro = document.getElementById(idFiltro).value;
    
    let tabla = document.getElementById(idTablaResultado);
    tabla.innerHTML = GlobalLoader;


    let str = ""; 

    selectProducto(filtro)
    .then((response) => {
        const data = response;
        //con esta variable determino el tipo de precio a usar            
        let pre = 0;
            
            data.map((rows)=>{
                let exist = Number(rows.EXISTENCIA)/Number(rows.EQUIVALE); let strC = '';
                if(Number(rows.EXISTENCIA<=0)){strC='bg-danger text-white'}else{strC='bg-success text-white'};
                let totalexento = 0;
                if (rows.EXENTO==1){totalexento=Number(rows.PRECIO)}
             
                pre = Number(rows.PRECIO);
                str += `<tr id="${rows.CODPROD}" onclick="getDataMedidaProducto('${rows.CODPROD}','${funciones.quitarCaracteres(rows.DESPROD,'"'," plg",true)}','${rows.CODMEDIDA}',1,${rows.EQUIVALE},${rows.EQUIVALE},${rows.COSTO},${pre},${totalexento},${Number(rows.EXISTENCIA)});" class="border-bottom">
                <td >
                    ${funciones.quitarCaracteres(rows.DESPROD,'"'," pulg",true)}
                    <br>
                    <small class="text-danger"><b>${rows.CODPROD}</b></small><small class="text-info">//Escala:${rows.DESPROD3}</small>
                    <br>
                    <b class"bg-danger text-white">${rows.CODMEDIDA}</b>
                    <small>(${rows.EQUIVALE})</small>
                </td>
                <td>${funciones.setMoneda(pre || 0,'Q ')}
                    <br>
                    <small class="${strC}">E:${funciones.setMoneda(exist,'')}</small>
                </td>
                
                <td>
                    <button class="btn btn-sm btn-success btn-circle text-white" 
                    onclick="getDataMedidaProducto('${rows.CODPROD}','${funciones.quitarCaracteres(rows.DESPROD,'"'," plg",true)}','${rows.CODMEDIDA}',1,${rows.EQUIVALE},${rows.EQUIVALE},${rows.COSTO},${pre},${totalexento},${Number(rows.EXISTENCIA)});">
                        +
                    </button>
                <td>
                
            </tr>`
            })
            tabla.innerHTML= str;
        
    }, (error) => {
        console.log(error);
    })
    .catch((error)=>{
        funciones.AvisoError(error);
    })

};

//gestiona la apertura de la cantidad
function getDataMedidaProducto(codprod,desprod,codmedida,cantidad,equivale,totalunidades,costo,precio,exento,existencia){
    console.log('')
    if(parseInt(existencia)>0){
    }else{
        funciones.showToast('Producto SIN EXISTENCIA')
    }

        GlobalSelectedCodprod = codprod;
        GlobalSelectedDesprod = desprod;
        GlobalSelectedCodmedida = codmedida;
        GlobalSelectedEquivale = parseInt(equivale);
        GlobalSelectedCosto = parseFloat(costo);
        GlobalSelectedPrecio = parseFloat(precio);
        
        GlobalSelectedExento = parseInt(exento);
        GlobalSelectedExistencia = parseInt(existencia);
    
        //modal para la cantidad del producto
        document.getElementById('txtDesProducto').innerText = desprod; //label
        document.getElementById('txtCodMedida').innerText = codmedida; //label
        document.getElementById('txtPrecioProducto').innerText = funciones.setMoneda(precio,'Q'); //label
        document.getElementById('txtSubTotal').innerText = funciones.setMoneda(precio,'Q'); //label
            
        document.getElementById('txtCantidad').value = 1;
    
        $("#ModalCantidadProducto").modal('show');    
  


};

//GRID TEMP VENTAS

// agrega el producto a temp_ventas
async function fcnAgregarProductoVenta(codprod,desprod,codmedida,cantidad,equivale,totalunidades,costo,precio,exento){
   
    //if(Number(GlobalSelectedExistencia)<=Number(totalunidades)){
        //funciones.AvisoError('No pude agregar una cantidad mayor a la existencia');
        //return;
    //};

    console.log('intentando agregar producto')
    document.getElementById('btnAgregarProducto').innerHTML = GlobalLoader;
    document.getElementById('btnAgregarProducto').disabled = true;

    //document.getElementById('tblResultadoBusqueda').innerHTML = '';
    //let cmbTipoPrecio = document.getElementById('cmbTipoPrecio');
        let totalcosto = Number(costo) * Number(cantidad);
        let totalprecio = Number(precio) * Number(cantidad);
        console.log('intenta agregar la fila')
        let coddoc = document.getElementById('cmbCoddoc').value;
        try {        
                var data = {
                    EMPNIT:GlobalEmpnit,  
                    CODSUCURSAL:GlobalCodSucursal,
                    CODDOC:coddoc,     
                    CODPROD:codprod,
                    DESPROD:desprod,
                    CODMEDIDA:codmedida,
                    CANTIDAD:cantidad,
                    EQUIVALE:equivale,
                    TOTALUNIDADES:totalunidades,
                    COSTO:costo,
                    PRECIO:precio,
                    TOTALCOSTO:totalcosto,
                    TOTALPRECIO:totalprecio,
                    EXENTO:exento,
                    USUARIO:GlobalUsuario,
                    TIPOPRECIO:'P'
                };

                insertTempVentas(data)
                .then(()=>{                    
      
                        $('#ModalCantidadProducto').modal('hide') //MARCADOR
                        funciones.showToast('Agregado: ' + desprod);
                        
                        fcnCargarGridTempVentas('tblGridTempVentas');
                        
                        document.getElementById('btnAgregarProducto').innerHTML  = `<i class="fal fa-check"></i>Agregar`;
                        document.getElementById('btnAgregarProducto').disabled = false;
                        let txbusqueda = document.getElementById('txtBusqueda');
                        txbusqueda.value = '';
                        
                  })
                  .catch(
                      ()=>{
                        document.getElementById('btnAgregarProducto').innerHTML  = `<i class="fal fa-check"></i>Agregar`;
                        document.getElementById('btnAgregarProducto').disabled = false;
                        funciones.AvisoError('No se pudo agregar este producto a la venta actual');
                      }
                  )
        
        } catch (error) {
            console.log('error al agregar producto.. ')
            console.log(error)
            document.getElementById('btnAgregarProducto').innerHTML  = `<i class="fal fa-check"></i>Agregar`;
            document.getElementById('btnAgregarProducto').disabled = false;
        }
   

};

function fcnEliminarItem(id){
    funciones.Confirmacion('¿Está seguro que desea quitar este item?')
    .then((value)=>{
        if(value==true){
                deleteItemVenta(id)
                  .then(()=>{                       
                        //document.getElementById(id.toString()).remove();
                        funciones.showToast('item eliminado');
                        fcnCargarGridTempVentas('tblGridTempVentas');
                  })
                  .catch(
                      ()=>{
                        funciones.AvisoError('No se pudo remover este producto a la venta actual');
                      }
                  )
        }        
    })
    
};

async function fcnCargarGridTempVentas(idContenedor){
    
    let tabla = document.getElementById(idContenedor);
    tabla.innerHTML = GlobalLoader;

    let varTotalVenta = 0; let varTotalCosto = 0;

    let btnCobrarTotal = document.getElementById('btnCobrar')
    btnCobrarTotal.innerText =  'Terminar';
   
    let coddoc = document.getElementById('cmbCoddoc').value;
    
    let containerTotalVenta = document.getElementById('txtTotalVenta');
    containerTotalVenta.innerHTML = '0';

    try {
        selectTempventas(GlobalUsuario)
        .then((response)=>{
            let idcant = 0;
            let data = response.map((rows)=>{
                idcant = idcant + 1;
                varTotalVenta = varTotalVenta + Number(rows.TOTALPRECIO);
                varTotalCosto = varTotalCosto + Number(rows.TOTALCOSTO);
                return `<tr id="${rows.ID.toString()}" class="border-bottom" ondblclick="funciones.hablar('${rows.DESPROD}')">
                            <td class="text-left">
                                ${rows.DESPROD}
                                <br>
                                <small class="text-danger"><b>${rows.CODPROD} (${rows.EQUIVALE} item)</b></small>
                                <br>
                                    <small>
                                        Cant:<b class="text-danger h4" id=${idcant}>${rows.CANTIDAD}</b>  ${rows.CODMEDIDA}  ||  Precio:<b>${funciones.setMoneda(rows.PRECIO,'Q')}</b>
                                    </small>
                                <br>
                                <div class="row">
                                    <div class="col-4"></div>
                                    <div class="col-4 " align="right">
                                        <button class="btn btn-secondary btn-sm btn-circle" onClick="fcnCambiarCantidad(${rows.ID},${rows.CANTIDAD});">
                                            <i class="fal fa-edit"></i>
                                        </button>    
                                    </div>
                                    <div class="col-4 text-right" align="right">
                                        <button class="btn btn-sm btn-danger btn-circle" onclick="fcnEliminarItem(${rows.ID});">
                                            <i class="fal fa-trash"></i>
                                        </button>    
                                    </div>
                                </div>
                            </td>
                                                        
                            <td class="text-right" id=${'S'+idcant}>${funciones.setMoneda(rows.TOTALPRECIO,'Q')}</td>
                            
                        </tr>`
           }).join('\n');
           tabla.innerHTML = data;
           GlobalTotalDocumento = varTotalVenta;
           GlobalTotalCostoDocumento = varTotalCosto;
           containerTotalVenta.innerHTML = `${funciones.setMoneda(GlobalTotalDocumento,'Q ')}`;
           btnCobrarTotal.innerHTML = '<h1>Terminar : ' + funciones.setMoneda(GlobalTotalDocumento,'Q ') + '</h1>';
        })
    } catch (error) {
        console.log('NO SE LOGRO CARGAR LA LISTA ' + error);
        tabla.innerHTML = 'No se logró cargar la lista...';
        containerTotalVenta.innerHTML = '0';
        btnCobrarTotal.innerText =  'Terminar';
    }
};

async function fcnUpdateTempRow(id,cantidad){
    
    return new Promise((resolve, reject) => {
            //OBTIENE LOS DATOS DE LA ROW    
            selectDataRowVenta(id,cantidad)
            .then(()=>{
                fcnCargarGridTempVentas('tblGridTempVentas');
                resolve();
            })
            .catch(()=>{
                funciones.AvisoError('No se logró Eliminar la lista de productos agregados');
                reject();
            })

        });
};

async function fcnCambiarCantidad(id,cantidad){
    
    GlobalSelectedId = id;
    //$('#ModalCantidad').modal('show');
    document.getElementById('txtCantNuevaCant').value = cantidad;
    $('#modalCambiarCantidadProducto').modal('show');
    
};


//CLIENTE
async function fcnBuscarCliente(idNit,idNombre,idDireccion){
    
    let nit = document.getElementById(idNit);
    let nombre = document.getElementById(idNombre);
    let direccion = document.getElementById(idDireccion);

    axios.get('/ventas/buscarcliente?empnit=' + GlobalEmpnit + '&nit=' + nit.value  + '&app=' + GlobalSistema)
    .then((response) => {
        const data = response.data;
        if (data.rowsAffected[0]==0){
            funciones.AvisoError('No existe un cliente con este código')
            nit.value = '';
            nombre.value = '';
            direccion.value = '';
        }else{
            data.recordset.map((rows)=>{
                GlobalSelectedCodCliente= nit.value;
                nombre.value = rows.NOMCLIENTE;
                direccion.value = rows.DIRCLIENTE;
            });
        }
        
                
    }, (error) => {
        console.log(error);
    });
};

async function fcnBusquedaCliente(idFiltro,idTablaResultado){
    
    let filtro = document.getElementById(idFiltro).value;
    let tabla = document.getElementById(idTablaResultado);
    tabla.innerHTML = GlobalLoader;


    let str = ""; 
    axios.get('/clientes/buscarcliente?empnit=' + GlobalEmpnit + '&filtro=' + filtro + '&app=' + GlobalSistema)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            str += `<tr id="${rows.CODCLIE}">
                        <td>
                            ${rows.NOMCLIE}
                            <br>
                            <small class="bg-warning">Código: ${rows.CODCLIE} / Nit: ${rows.NIT}</small>
                            <br>
                            <small>${rows.DIRCLIE},${rows.DESMUNICIPIO}</small>
                        </td>
                        
                        <td>
                            <button class="btn btn-sm btn-success btn-circle text-white" 
                            onclick="fcnAgregarClienteVenta('${rows.CODCLIE}','${rows.NIT}','${rows.NOMCLIE}','${rows.DIRCLIE}')">
                                +
                            </button>
                        <td>
                    </tr>`
        })
        tabla.innerHTML= str;
        
    }, (error) => {
        console.log(error);
    });

};

async function fcnAgregarClienteVenta(codigo,nit,nombre,direccion){
    GlobalSelectedCodCliente = codigo;
    document.getElementById('tblResultadoBusquedaCliente').innerHTML = '';
    document.getElementById('txtNit').value = codigo; //nit;
    document.getElementById('txtNombre').value = nombre;
    document.getElementById('txtDireccion').value = direccion;
    $('#ModalBusquedaCliente').modal('hide');  
};

async function fcnGuardarNuevoCliente(form){
    
    let nit = form[0].value;
    let nomclie = form[1].value;
    let nomfac = form[2].value;
    let dirclie = form[3].value;
    let codpais = form[4].value;
    let telclie = form[5].value;
    let emailclie = form[6].value;
    let codmunicipio = form[7].value;
    let coddepto = form[8].value;
    let tipoprecio = form[9].value;

    let codven = document.getElementById('cmbVendedor').value;

    // OBTIENE LA LATITUD Y LONGITUD DEL CLIENTE
    let lat = ''; let long = '';
    try {navigator.geolocation.getCurrentPosition(function (location) {lat = location.coords.latitude.toString();long = location.coords.longitude.toString(); })
    } catch (error) {lat = '0'; long = '0'; };
    
    // FECHA DE CREACION DEL CLIENTE
    let f = funciones.getFecha();

    axios.post('/clientes/clientenuevo', {
        app:GlobalSistema,
        empnit: GlobalEmpnit,
        codclie:nit,
        nitclie:nit,
        nomclie:nomclie,
        nomfac:nomfac,
        dirclie:dirclie,
        coddepto:coddepto,
        codmunicipio:codmunicipio,
        codpais:codpais,
        telclie:telclie,
        emailclie:emailclie,
        codbodega:GlobalCodBodega,
        tipoprecio:tipoprecio,
        lat:lat,
        long:long,
        codven:codven,
        fecha:f        
    })
    .then((response) => {
        const data = response.data;
        if (data.rowsAffected[0]==0){
            funciones.AvisoError('No se logró Guardar el nuevo cliente');
        }else{
            funciones.Aviso('Nuevo Cliente Agregado Exitosamente !!')
            document.getElementById('txtNit').value = nit;
            document.getElementById('txtNombre').value = nomclie;
            document.getElementById('txtDireccion').value = dirclie;
            document.getElementById('btnCancelarCliente').click();
        }
    }, (error) => {
        funciones.AvisoError('No se logró Guardar el nuevo cliente');
        console.log(error);
    });


};


//FINALIZAR PEDIDO
async function fcnFinalizarPedido(){
    
    if(Number(GlobalTotalDocumento)<Number(GlobalVentaMinima)){
        funciones.AvisoError('Pedido menor al mínimo de venta');
        funciones.hablar('Advertencia. Este pedido es menor al mínimo de venta permitido');
        //socket.emit('avisos','venta menor al minimo', `El vendedor ${GlobalUsuario} ha intentado ingresar un pedido de ${funciones.setMoneda(GlobalTotalDocumento,'Q')}`);
    };

    let codcliente = GlobalSelectedCodCliente;
    let ClienteNombre = document.getElementById('txtNombre').value;
    let dirclie = document.getElementById('txtDireccion').value; // CAMPO DIR_ENTREGA
    let obs = document.getElementById('txtEntregaObs').value; 
    let direntrega = "SN"; //document.getElementById('txtEntregaDireccion').value; //CAMPO MATSOLI
    let codbodega = GlobalCodBodega;
    let cmbTipoEntrega = document.getElementById('cmbEntregaConcre').value; //campo TRANSPORTE


    let txtFecha = new Date(document.getElementById('txtFecha').value);
    let anio = txtFecha.getFullYear();
    let mes = txtFecha.getUTCMonth()+1;
    let d = txtFecha.getUTCDate() 
    let fecha = anio + '-' + mes + '-' + d; // CAMPO DOC_FECHA
    let dia = d;

    
    let fe = new Date(document.getElementById('txtEntregaFecha').value);
    let ae = fe.getFullYear();
    let me = fe.getUTCMonth()+1;
    let de = fe.getUTCDate() 
    let fechaentrega = ae + '-' + me + '-' + de;  // CAMPO DOC_FECHAENT

    let coddoc = document.getElementById('cmbCoddoc').value;//GlobalCoddoc;
    let correlativo = document.getElementById('txtCorrelativo').value;

    let cmbVendedor = document.getElementById('cmbVendedor');

    let nit = document.getElementById('txtNit').value;

    let latdoc = document.getElementById('lbDocLat').innerText;
    let longdoc = document.getElementById('lbDocLong').innerText;

    funciones.Confirmacion('¿Está seguro que desea Finalizar este Pedido')
    .then((value)=>{
        if(value==true){
            setLog(`<label class="text-danger">Creando el pedido a enviar...</label>`,'rootWait');
            $('#modalWait').modal('show');
            
            //document.getElementById('btnFinalizarPedido').innerHTML = GlobalLoader;
           
            gettempDocproductos(GlobalUsuario)
            .then((response)=>{
                
                setLog(`<label class="text-info">Pedido creado, enviado pedido...</label>`,'rootWait');
                //,,obs,usuario,codven
                axios.post('/ventas/insertventa', {
                    jsondocproductos:JSON.stringify(response),
                    codsucursal:GlobalCodSucursal,
                    empnit: GlobalEmpnit,
                    coddoc:coddoc,
                    correl: correlativo,
                    anio:anio,
                    mes:mes,
                    dia:dia,
                    fecha:fecha,
                    fechaentrega:fechaentrega,
                    formaentrega:cmbTipoEntrega,
                    codbodega:codbodega,
                    codcliente: codcliente,
                    nomclie:ClienteNombre,
                    totalcosto:GlobalTotalCostoDocumento,
                    totalprecio:GlobalTotalDocumento,
                    nitclie:nit,
                    dirclie:dirclie,
                    obs:obs,
                    direntrega:direntrega,
                    usuario:GlobalUsuario,
                    codven:cmbVendedor.value,
                    lat:latdoc,
                    long:longdoc
                })
                .then(async(response) => {
                    const data = response.data;
                    if (data.rowsAffected[0]==0){
                        
                     
                        funciones.AvisoError('No se logró Enviar este pedido, se intentará guardarlo en el teléfono');
                        
                        //guarda el pedido localmente
                        var datospedido = {
                            CODSUCURSAL:GlobalCodSucursal,
                            EMPNIT: GlobalEmpnit,
                            CODDOC:coddoc,
                            ANIO:anio,
                            MES:mes,
                            DIA:dia,
                            FECHA:fecha,
                            FECHAENTREGA:fechaentrega,
                            FORMAENTREGA:cmbTipoEntrega,
                            CODCLIE: codcliente,
                            NOMCLIE:ClienteNombre,
                            TOTALCOSTO:GlobalTotalCostoDocumento,
                            TOTALPRECIO:GlobalTotalDocumento,
                            NITCLIE:nit,
                            DIRCLIE:dirclie,
                            OBS:obs,
                            DIRENTREGA:direntrega,
                            USUARIO:GlobalUsuario,
                            CODVEN:Number(cmbVendedor.value),
                            LAT:latdoc,
                            LONG:longdoc,
                            JSONPRODUCTOS:JSON.stringify(response)
                        };
        
                        insertVenta(datospedido)
                        .then(async()=>{
                            funciones.Aviso('El pedido será guardado localmente, recuerde enviarlo');
                           
                            document.getElementById('btnEntregaCancelar').click();
                                                                           
                            //actualiza la ubicación del empleado
                            await classEmpleados.updateMyLocation();
                            
                            //actualiza la última venta del cliente
                            apigen.updateClientesLastSale(nit,'VENTA');
                            
                            //elimina el temp ventas asociado al empleado
                            deleteTempVenta(GlobalUsuario)
    
                            $('#modalWait').modal('hide');

                            //prepara todo para un nuevo pedido
                            fcnNuevoPedido();
                        })
                        .catch(()=>{
                            funciones.AvisoError('No se pudo guardar este pedido')
                            $('#modalWait').modal('hide');
                        })

                    }else{
                        

                        funciones.Aviso('Pedido Generado Exitosamente !!!')
                       
                        document.getElementById('btnEntregaCancelar').click();
                                               
                        //actualiza la ubicación del empleado
                        await classEmpleados.updateMyLocation();
                        
                        //actualiza la última venta del cliente
                        apigen.updateClientesLastSale(nit,'VENTA');
                        //elimina el temp ventas asociado al empleado
                        deleteTempVenta(GlobalUsuario)

                        $('#modalWait').modal('hide');
                        //prepara todo para un nuevo pedido
                        fcnNuevoPedido();
                    }
                }, (error) => {
                    console.log(error);
                   
                    funciones.AvisoError('Ha ocurrido un error y no se pudo enviar, se intentará guardar en el teléfono');
                    //$('#modalWait').modal('hide');
                    
                                         //guarda el pedido localmente
                                         var datospedido = {
                                            CODSUCURSAL:GlobalCodSucursal,
                                            EMPNIT: GlobalEmpnit,
                                            CODDOC:coddoc,
                                            ANIO:anio,
                                            MES:mes,
                                            DIA:dia,
                                            FECHA:fecha,
                                            FECHAENTREGA:fechaentrega,
                                            FORMAENTREGA:cmbTipoEntrega,
                                            CODCLIE: codcliente,
                                            NOMCLIE:ClienteNombre,
                                            TOTALCOSTO:GlobalTotalCostoDocumento,
                                            TOTALPRECIO:GlobalTotalDocumento,
                                            NITCLIE:nit,
                                            DIRCLIE:dirclie,
                                            OBS:obs,
                                            DIRENTREGA:direntrega,
                                            USUARIO:GlobalUsuario,
                                            CODVEN:Number(cmbVendedor.value),
                                            LAT:latdoc,
                                            LONG:longdoc,
                                            JSONPRODUCTOS:JSON.stringify(response)
                                        };
                        
                                        insertVenta(datospedido)
                                        .then(async()=>{
                                            funciones.Aviso('El pedido será guardado localmente, recuerde enviarlo');
                                            
                                            document.getElementById('btnEntregaCancelar').click();
                                               
                                            //actualiza la ubicación del empleado
                                            await classEmpleados.updateMyLocation();
                                            
                                            //actualiza la última venta del cliente
                                            apigen.updateClientesLastSale(nit,'VENTA');
                                            //elimina el temp ventas asociado al empleado
                                            deleteTempVenta(GlobalUsuario)
                                           
                                            $('#modalWait').modal('hide');
                                            //prepara todo para un nuevo pedido
                                            fcnNuevoPedido();
                                        })
                                        .catch(()=>{
                                            funciones.AvisoError('No se pudo guardar este pedido')
                                        }) 
                                    });        

            })
            .catch((error)=>{
                //$('#modalWait').modal('hide');
                funciones.AvisoError('No pude crear la tabla de productos del pedido ' + error);
                $('#modalWait').modal('hide');
                //document.getElementById('btnFinalizarPedido').innerHTML = '<i class="fal fa-check mr-1"></i>Finalizar';
            })

             
         

        }
    })
};

async function fcnEliminarTempVentas(usuario){
    let coddoc = document.getElementById('cmbCoddoc').value;
    axios.post('/ventas/tempVentastodos', {
        empnit: GlobalEmpnit,
        usuario:usuario,
        coddoc:coddoc,
        app:GlobalSistema
    })
    .then((response) => {
        const data = response.data;
        if (data.rowsAffected[0]==0){
            funciones.AvisoError('No se logró Eliminar la lista de productos agregados');
        }else{
            
        }
    }, (error) => {
        console.log(error);
    });
};

async function fcnNuevoPedido(){
    
    classNavegar.inicio(GlobalTipoUsuario);
    
};



async function fcnGetMunicipios(idContainer){
    let container = document.getElementById(idContainer);
    container.innerHTML = GlobalLoader;

    let str = ""; 
    axios.get('/clientes/municipios?empnit=' + GlobalEmpnit + '&app=' + GlobalSistema)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            str += `<option value='${rows.CODMUNICIPIO}'>${rows.DESMUNICIPIO}</option>`
        })
        container.innerHTML= str;
        
    }, (error) => {
        console.log(error);
        container.innerHTML = '';
    });
};

async function fcnGetDepartamentos(idContainer){
    let container = document.getElementById(idContainer);
    container.innerHTML = GlobalLoader;

    let str = ""; 
    axios.get('/clientes/departamentos?empnit=' + GlobalEmpnit + '&app=' + GlobalSistema)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            str += `<option value='${rows.CODDEPTO}'>${rows.DESDEPTO}</option>`
        })
        container.innerHTML= str;
        
    }, (error) => {
        console.log(error);
        container.innerHTML = '';
    });
};

async function fcnCargarComboTipoPrecio(){
   let cmbp = document.getElementById('cmbClienteTipoPrecio');
   if(GlobalSistema=='ISC'){
    cmbp.innerHTML =`<option value="P">PÚBLICO</option>
                     <option value="M">MAYORISTA</option>`;
   }else{
    cmbp.innerHTML =`<option value="P">PÚBLICO</option>
                     <option value="C">MAYORISTA C</option>
                     <option value="B">MAYORISTA B</option>
                     <option value="A">MAYORISTA A</option>`;
   }
   
};



//COTIZACIONES
function getListadoCotizaciones(idContenedor,anio,mes){
    
    let container = document.getElementById(idContenedor);
    container.innerHTML = GlobalLoader;
            
    let strdata = ''; 

    axios.post('/cotizaciones/listado', {
        anio:anio,
        mes:mes
    })
    .then((response) => {
        const data = response.data.recordset;
        
        data.map((rows)=>{                    
                    strdata = strdata + `
                <tr class='border-bottom border-info'>
                    <td>${rows.FECHA.replace('T00:00:00.000Z','')}
                        <br>
                        <small>Doc: ${rows.CODDOC}-${rows.CORRELATIVO}</small>
                    </td>
                    <td>${rows.CLIENTE}
                        <br>
                        <small>${rows.DIRECCION}</small>
                        <br>
                        <small class="negrita text-secondary">TEL: ${rows.TELEFONO} / Email:${rows.EMAIL}</small>
                        <br>
                        <small>Obs:${rows.OBS}</small>
                    </td>
                    <td>${funciones.setMoneda(rows.TOTALPRECIO,'Q')}
                        <br>
                        <small>Flete:${funciones.setMoneda(rows.FLETE,'Q')}</small>
                    
                    </td>
                    <td>
                        <button class="btn btn-info btn-sm btn-circle" onclick="">
                            <i class="fal fa-list"></i>
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
    
    
}
