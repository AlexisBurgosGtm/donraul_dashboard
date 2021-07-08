function getView(){
    let view = {
        encabezadoClienteDocumento :()=>{
            return `
        <div class="row">
            
            <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <div id="panel-2" class="panel col-12">
                    <div class="panel-hdr">
                        <h2>Datos del Cliente</h2>
                        <div class="panel-toolbar">
                            <button class="btn btn-panel" data-action="panel-collapse" data-toggle="tooltip" data-offset="0,10" data-original-title="Collapse"></button>                           
                        </div>
                    </div>
                    <div class="panel-container">
                        <div class="panel-content">
                            <div class="">
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
                    </div>
                </div>
            </div>
            
            <div class="hidden-md-down col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <div id="panel-3" class="panel col-12">
                    <div class="panel-hdr">
                        <h2>Datos del Documento</h2>
                        <div class="panel-toolbar">
                            <button class="btn btn-panel" data-action="panel-collapse" data-toggle="tooltip" data-offset="0,10" data-original-title="Collapse"></button>
                            <button class="btn btn-panel" data-action="panel-fullscreen" data-toggle="tooltip" data-offset="0,10" data-original-title="Fullscreen"></button>
                            
                        </div>
                    </div>
                    <div class="panel-container collapse"> <!--show-->
                        <div class="panel-content">
                            <div class="row">
                                <div class="col-6">
                                    <input type="text" class="form-control input-sm" id="cmbCoddoc">
                                    
                                </div>
                                <div class="col-6">
                                    <input type="text" class="form-control" value="0" id="txtCorrelativo" readonly="true">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    Fecha: <input type="date" class="form-control bg-subtlelight pl-4 text-sm" id="txtFecha">
                                </div>
                                <div class="col-6">
                                    Vendedor:
                                    <input type="text" class="form-control" id="cmbVendedor">
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
            `
            //<select class="form-control input-sm" id="cmbCoddoc"></select>
            //<select class="form-control" id="cmbVendedor"></select>
        },
        gridTempVenta :()=>{
            return `
        <div class="row">
            <div id="panel-2" class="panel col-12">
                <div class="panel-hdr">
                    <h2 id="txtTotalVenta" class="text-danger"></h2>
                    <div class="panel-toolbar">
                        <button class="btn btn-warning" data-action="panel-fullscreen" data-toggle="tooltip" data-offset="0,10" data-original-title="Fullscreen">Ampliar</button>
                    </div>
                </div>
                <div class="panel-container show">

                    <div class="panel-content">
                        <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8">
                            <div class="input-group">
                                <select class="form-control col-1 hidden" id="cmbTipoPrecio" disabled>
                                    <option value="P">DET</option>
                                    <option value="C">MayC</option>
                                    <option value="B">MayB</option>
                                    <option value="A">MayA</option>
                                    <option value="K">CAMBIO</option>
                                </select>
                                <input id="txtBusqueda" type="text" ref="txtBusqueda" class="form-control col-12 border-warning shadow" placeholder="Buscar código o descripción..." aria-label="" aria-describedby="button-addon4" />
                                <div class="input-group-prepend">
                                    <button class="btn btn-info waves-effect waves-themed" type="button" id="btnBuscarProducto">
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

                <!-- modal de busqueda de productos -->
                <div class="modal fade" id="ModalBusqueda" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                </div>
                <!-- --------------- -->

                <!-- modal cantidad producto buscado -->
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
                                    <div class="">
                                        <button type="button" class="btn btn-secondary btn-round" data-dismiss="modal" id="btnCancelarModalProducto">
                                            <i class="now-ui-icons ui-1_simple-remove"></i>Cancelar
                                        </button>
                                        <button type="button" class="btn btn-primary btn-round" data-dismiss="modal" id="btnAgregarProducto">
                                            <i class="now-ui-icons ui-1_simple-add"></i>Agregar
                                        </button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- --------------- -->

                <!-- modal editar precio -->
                <div class="modal fade" id="ModalPrecio" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <label class="modal-title text-danger h3" id="">Cambio de Precio</label>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i class="fal fa-times"></i></span>
                                </button>
                            </div>

                            <div class="modal-body">

                                <div class="row">
                                    <div class="col-2 text-right" >
                                        <h1 class="fw-700">Q</h1>
                                    </div>
                                    <div class="col-5 text-left">
                                        <input type="number" class="form-control" id="txtNuevoPrecio">
                                    </div>
                                    <div class="col-5 text-right">
                                        <h1 class="fw-700 text-danger" id="lbPrecioMinimo">Q 0.00</h1>
                                    </div>
                                </div>

                                <div class="row">
                                    <br>
                                    <br>
                                </div>

                                <div class="row">
                                    <div class="form-group col-8">
                                        <label>Explique el motivo del cambio de precios:</label>
                                        <textarea rows="3" cols="80" class="form-control" id="txtObsNuevoPrecio" placeholder="Escriba el motivo..."></textarea>
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <br>
                                    <br>
                                </div>

                                <div class="row">
                                    <div class="col-6">
                                        <button class="btn btn-outline-danger btn-lg btn-pills" data-dismiss="modal">
                                            <i class="fal fa-times"></i>
                                            Cancelar
                                        </button>
                                    </div>
                                    
                                    <div class="col-6">
                                        <button class="btn btn-outline-success btn-lg btn-pills" id="btnPrecioAceptar">
                                            <i class="fal fa-angle-right"></i>    
                                            Solicitar
                                        </button>
                                    </div>
                                </div>
                            
                            </div>
                            
                        </div>
                    </div>
                </div>
                <!-- ------------------  -->
                
                <!-- modal para la calculadora edita cantidad -->
                <div class="modal fade" id="ModalCantidad" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <label class="modal-title text-danger h3" id="">Nueva Cantidad</label>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i class="fal fa-times"></i></span>
                                </button>
                            </div>

                            <div class="modal-body">

                                <div class="row">
                                    <div class="col-2">
                                        <h1 class="text-danger fw-700">Cant:</h1>
                                    </div>
                                    <div class="col-8 text-center">
                                        <h1 class="text-danger fw-700" id="lbCalcTotal">0</h1>
                                    </div>
                                    <div class="col-2"></div>
                                </div>
                                
                                <br>

                                <div class="row">
                                    <div class="col-4">
                                        <button class="btn btn-xl btn-circle btn-info" id="btnCalc1">1</button>
                                    </div>
                                    <div class="col-4">
                                        <button class="btn btn-xl btn-circle btn-info" id="btnCalc2">2</button>
                                    </div>
                                    <div class="col-4">
                                        <button class="btn btn-xl btn-circle btn-info" id="btnCalc3">3</button>
                                    </div>
                                </div>
                                
                                <br>

                                <div class="row">
                                    <div class="col-4">
                                        <button class="btn btn-xl btn-circle btn-info" id="btnCalc4">4</button>
                                    </div>
                                    <div class="col-4">
                                        <button class="btn btn-xl btn-circle btn-info" id="btnCalc5">5</button>
                                    </div>
                                    <div class="col-4">
                                        <button class="btn btn-xl btn-circle btn-info" id="btnCalc6">6</button>
                                    </div>
                                </div>
                                
                                <br>

                                <div class="row">
                                    <div class="col-4">
                                        <button class="btn btn-xl btn-circle btn-info" id="btnCalc7">7</button>
                                    </div>
                                    <div class="col-4">
                                        <button class="btn btn-xl btn-circle btn-info" id="btnCalc8">8</button>
                                    </div>
                                    <div class="col-4">
                                        <button class="btn btn-xl btn-circle btn-info" id="btnCalc9">9</button>
                                    </div>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-4">
                                
                                    </div>
                                    <div class="col-4">
                                        <button class="btn btn-xl btn-circle btn-info" id="btnCalc0">0</button>
                                    </div>
                                    <div class="col-4">
                                
                                    </div>
                                </div>

                                <br><br><br>

                                <div class="row">
                                    <div class="col-4">
                                        <button class="btn btn-danger btn-lg" data-dismiss="modal">Cancelar</button>
                                    </div>
                                    <div class="col-4">
                                        <button class="btn btn-primary btn-lg" id="btnCalcLimpiar">Limpiar</button>
                                    </div>
                                    <div class="col-4">
                                        <button class="btn btn-success btn-lg" data-dismiss="modal" id="btnCalcAceptar">Aceptar</button>
                                    </div>
                                </div>
                            
                            </div>
                            
                        </div>
                    </div>
                </div>
                <!-- ------------------  -->

            </div>
        </div>  
            `
        },
        btnCobrar :()=>{
            return `
            <div id="fixed-btn3">
                <button class="btn btn-outline-dark btn-pills waves-effect waves-themed" id="btnListaPedidos">
                    <i class="fal fa-list"></i>
                    LISTA
                </button>
            </div>
            <div id="fixed-btn2">
                <button class="btn btn-outline-danger btn-pills waves-effect waves-themed" id="btnCobrar">
                    <i class="fal fa-search"></i>
                    COBRAR
                </button>
            </div>
            `
        },
        modalBusquedaProductos :()=>{
            return `
            <div class="modal fade" id="ModalBusqueda" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            </div>
            `
        },
        modalBusquedaCliente :()=>{
            return `
            <div class="modal fade" id="ModalBusquedaCliente" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
        modalCobro :()=>{
            return `
        <div class="modal fade" id="ModalCobro" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <label class="modal-title text-danger h3" id="">Datos del Cobro</label>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i class="fal fa-times"></i></span>
                        </button>
                    </div>
        
                    <div class="modal-body">
                                <div class="row">
                                    <div class="col-sm-5 ml-sm-auto">
                                            <div class="form-group">
                                                <label>Pagado Efectivo:</label>
                                                <input type="number" class="form-control" id='txtPagadoEfectivo'>
                                            </div>
                                            <div class="form-group">
                                                <label>Pagado Tarjeta:</label>
                                                <input type="number" class="form-control" id='txtPagadoTarjeta' value=0>
                                            </div>                              
                                            
                                            <div class="form-group table-scale-border-top border-left-0 border-right-0 border-bottom-0">
                                                <br>
                                                    <label>Total Descuento:</label>
                                                    <input type="number" class="form-control" id='txtDescuento' value=0>
                                            </div>
                                                                           
                                    </div>
                                    <div class="col-sm-6 ml-sm-auto">
                                        <table class="table table-clean">
                                            <tbody>
                                                <tr>
                                                    <td class="text-left">
                                                        <strong>TOTAL VENTA</strong>
                                                    </td>
                                                    <td class="text-right h6" id="txtTotalVentaCobro">Q0.00</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-left">
                                                        <strong>Descuento</strong>
                                                    </td>
                                                    <td class="text-right" id="txtTotalDescuento">Q0.00</td>
                                                </tr>
                                                
                                                <tr class="table-scale-border-top border-left-0 border-right-0 border-bottom-0">
                                                    <td class="text-left keep-print-font">
                                                        <h4 class="m-0 fw-700 h2 keep-print-font color-primary-700">Total a Pagar</h4>
                                                    </td>
                                                    <td class="text-right keep-print-font">
                                                        <h4 class="m-0 fw-700 h2 keep-print-font" id="txtTotalAPagar">Q 0.00</h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-left">
                                                        <strong>Pagado</strong>
                                                    </td>
                                                    <td class="text-right">
                                                        <strong id="txtTotalPagado">Q0.00</strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-left keep-print-font">
                                                        <h4 class="m-0 fw-700 h2 keep-print-font color-primary-700">Vuelto</h4>
                                                    </td>
                                                    <td class="text-right keep-print-font">
                                                        <h4 class="m-0 fw-700 h2 keep-print-font text-danger" id="txtVuelto">Q 0.00</h4>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="row">
                                    <button class="btn btn-info btn-lg btn-round form-control" id="btnCobrarVenta">Cobrar</button>
                                </div>
                     
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
                
                            <div class="modal-body">
                                    <div class="row">
                                            <div class="col-sm-6 ml-sm-auto">
                                                <div class="form-group">
                                                    <label>Entregar en:</label>
                                                    <select class="form-control" id="cmbEntregaTipo">
                                                        <option value="TIENDA">TIENDA</option>
                                                        <option value="DOMICILIO">DOMICILIO</option>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label>Dirección de Entrega:</label>
                                                    <textarea rows="4" cols="80" class="form-control" id="txtEntregaDireccion" placeholder="Escriba aqui a dirección de entrega..."></textarea>
                                                </div>
                                                
                                            </div>
            
                                            <div class="col-sm-6 ml-sm-auto">
                                                <div class="form-group">
                                                    <label>Fecha Entrega:</label>
                                                    <input type="date" class="form-control" id="txtEntregaFecha">
                                                </div>
                                                <div class="form-group">
                                                    <label>Observaciones</label>
                                                    <textarea rows="4" cols="80" class="form-control" id="txtEntregaObs" placeholder="Escriba aqui sus observaciones..."></textarea>
                                                </div>                                                              
                                            </div>
                                    </div>
                                    <div class="row">
                                        <label class="text-white" id="lbDocLat">0</label>
                                        <label class="text-white" id="lbDocLong">0</label class="text-white">
                                    </div>


                                    <hr class="solid">
                                    <div class="row">
                                        <div class="form-group">
                                            <label>Escriba un número al cual se enviará el pedido por whatsapp</label>
                                            <input type="number" class="form-control" id="txtNumero" value="46516685">
                                        </div>

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
                                                <i class="fal fa-check mr-1"></i>
                                                Finalizar
                                            </button>
                                        </div>
                                        
                                        
                                    </div>
                            
                            </div>
                        
                        </div>
                    </div>
                </div>`
        },
        modalCantidadCambioPrecio :()=>{
            return `
            <div class="modal fade" id="ModalPrecio" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <label class="modal-title text-danger h3" id="">Cambio de Precio</label>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i class="fal fa-times"></i></span>
                            </button>
                        </div>

                        <div class="modal-body">

                            <div class="row">
                                <div class="col-2 text-right" >
                                    <h1 class="fw-700">Q</h1>
                                </div>
                                <div class="col-5 text-left">
                                    <input type="number" class="form-control" id="txtNuevoPrecio">
                                </div>
                                <div class="col-5 text-right">
                                    <h1 class="fw-700 text-danger" id="lbPrecioMinimo">Q 0.00</h1>
                                </div>
                            </div>

                            <div class="row">
                                <br>
                                <br>
                            </div>

                            <div class="row">
                                <div class="form-group col-8">
                                    <label>Explique el motivo del cambio de precios:</label>
                                    <textarea rows="3" cols="80" class="form-control" id="txtObsNuevoPrecio" placeholder="Escriba el motivo..."></textarea>
                                </div>
                            </div>
                            
                            <div class="row">
                                <br>
                                <br>
                            </div>

                            <div class="row">
                                <div class="col-6">
                                    <button class="btn btn-outline-danger btn-lg btn-pills" data-dismiss="modal">
                                        <i class="fal fa-times"></i>
                                        Cancelar
                                    </button>
                                </div>
                                
                                <div class="col-6">
                                    <button class="btn btn-outline-success btn-lg btn-pills" id="btnPrecioAceptar">
                                        <i class="fal fa-angle-right"></i>    
                                        Solicitar
                                    </button>
                                </div>
                            </div>
                        
                        </div>
                        
                    </div>
                </div>
            </div>
            `
        },
        modalCantidadCalculadora :()=>{
            return `
            <div class="modal fade" id="ModalCantidad" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <label class="modal-title text-danger h3" id="">Nueva Cantidad</label>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i class="fal fa-times"></i></span>
                            </button>
                        </div>

                        <div class="modal-body">

                            <div class="row">
                                <div class="col-2">
                                    <h1 class="text-danger fw-700">Cant:</h1>
                                </div>
                                <div class="col-8 text-center">
                                    <h1 class="text-danger fw-700" id="lbCalcTotal">0</h1>
                                </div>
                                <div class="col-2"></div>
                            </div>
                            
                            <br>

                            <div class="row">
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc1">1</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc2">2</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc3">3</button>
                                </div>
                            </div>
                            
                            <br>

                            <div class="row">
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc4">4</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc5">5</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc6">6</button>
                                </div>
                            </div>
                            
                            <br>

                            <div class="row">
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc7">7</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc8">8</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc9">9</button>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-4">
                            
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-xl btn-circle btn-info" id="btnCalc0">0</button>
                                </div>
                                <div class="col-4">
                            
                                </div>
                            </div>

                            <br><br><br>

                            <div class="row">
                                <div class="col-4">
                                    <button class="btn btn-danger btn-lg" data-dismiss="modal">Cancelar</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-primary btn-lg" id="btnCalcLimpiar">Limpiar</button>
                                </div>
                                <div class="col-4">
                                    <button class="btn btn-success btn-lg" data-dismiss="modal" id="btnCalcAceptar">Aceptar</button>
                                </div>
                            </div>
                        
                        </div>
                        
                    </div>
                </div>
            </div>
            `
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
                                <div class="">
                                    <button type="button" class="btn btn-secondary btn-round" data-dismiss="modal" id="btnCancelarModalProducto">
                                        <i class="now-ui-icons ui-1_simple-remove"></i>Cancelar
                                    </button>
                                    <button type="button" class="btn btn-primary btn-round" data-dismiss="modal" id="btnAgregarProducto">
                                        <i class="now-ui-icons ui-1_simple-add"></i>Agregar
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            `
        },
        modalListaPedidos :()=>{
            return `
            <div class="modal fade" id="ModalListaPedidos" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-left" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <label class="modal-title text-danger h3" id="">Listado de Ventas Realizadas</label>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i class="fal fa-times"></i></span>
                            </button>
                        </div>

                        <div class="modal-body">

                            <div class="form-group">
                                <label>Tipo de Lista:</label>
                                <select class="form-control col-6" id="cmbTipoListaPedidos">
                                    <option value="O">Pendientes</option>
                                    <option value="I">Facturados</option>
                                </select>
                            </div>
                            <label id="lbListaPedidosTotal" class="text-danger">0.00</label>
                            <table class="table table-responsive table-striped table-hover table-bordered"   id="tblListaPedidos">
                                
                                
                            </table>

                        </div>

                    
                    </div>
                </div>
            </div>
            `
        },
        modaldetallepedido: ()=>{
            return `
            <div class="modal fade" id="ModalDetallePedido" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-left" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <label class="modal-title text-danger h3" id="">Detalle del Pedido</label>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i class="fal fa-times"></i></span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <h3 class="text-danger text-right" id="lbTotalDetallePedido"></h3>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-responsive table-hover table-striped table-bordered">
                                    <thead class="bg-trans-gradient text-white">
                                        <tr>
                                            <td>Producto</td>
                                            <td>Medida</td>
                                            <td>Cant</td>
                                            <td>Precio</td>
                                            <td>Subtotal</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody id="tblDetallePedido"></tbody>
                                    
                                </table>
                            </div>
                            
                        </div>                    
                    </div>
                </div>
            </div>
            `
        }
    }

    //+ view.cajabusquedaproducto()  antes de gridtempventas
    root.innerHTML = view.encabezadoClienteDocumento() 
                + view.gridTempVenta() 
                + view.btnCobrar() 
                + view.modalListaPedidos() + view.modaldetallepedido()
                //+ view.modalBusquedaProductos() + view.modalCantidadProducto()
                + view.modalBusquedaCliente() 
                + view.modalCobro() 
                + view.modalNuevoCliente() 
                + view.modalTerminar() 
                //+ view.modalCantidadCalculadora()
                //+ view.modalCantidadCambioPrecio();

};

async function iniciarVistaVentas(nit,nombre,direccion){
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
                        $('#ModalCobro').modal('show');
                        document.getElementById('txtPagadoEfectivo').value=GlobalTotalDocumento;
                        document.getElementById('txtTotalPagado').innerText=GlobalTotalDocumento;
                        document.getElementById('txtTotalAPagar').innerText=funciones.setMoneda(GlobalTotalDocumento,'Q ');

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

    let btnListaPedidos = document.getElementById('btnListaPedidos');
    btnListaPedidos.addEventListener('click',async ()=>{
        let cmbTipoListaPedidos = document.getElementById('cmbTipoListaPedidos');
        await api.cajaPedidosVendedor(GlobalCodSucursal,GlobalCodUsuario,'tblListaPedidos','lbListaPedidosTotal',cmbTipoListaPedidos.value)
        $('#ModalListaPedidos').modal('show');
    })

    let cmbTipoListaPedidos = document.getElementById('cmbTipoListaPedidos');
    cmbTipoListaPedidos.addEventListener('change',async()=>{
        
        await api.cajaPedidosVendedor(GlobalCodSucursal,GlobalCodUsuario,'tblListaPedidos','lbListaPedidosTotal',cmbTipoListaPedidos.value)
    });


    let cmbCoddoc = document.getElementById('cmbCoddoc');
    //classTipoDocumentos.comboboxTipodoc('PED','cmbCoddoc');
    cmbCoddoc.value = GlobalCoddoc;

    cmbCoddoc.addEventListener('change',async ()=>{
       await classTipoDocumentos.fcnCorrelativoDocumento('PED',cmbCoddoc.value,'txtCorrelativo');
    });

    let cmbVendedor = document.getElementById('cmbVendedor');

    let btnFinalizarPedido = document.getElementById('btnFinalizarPedido');
    btnFinalizarPedido.addEventListener('click',async ()=>{
        fcnFinalizarPedido();
    });

    //BUSQUEDA CLIENTES
    let frmNuevoCliente = document.getElementById('formNuevoCliente');
    frmNuevoCliente.addEventListener('submit',(e)=>{
        e.preventDefault();
        funciones.Confirmacion('¿Está seguro que desea guardar este cliente?')
        .then((value)=>{
            if(value==true){
                fcnGuardarNuevoCliente(frmNuevoCliente);
            }
        })

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
    await classTipoDocumentos.fcnCorrelativoDocumento('PED',cmbCoddoc.value,'txtCorrelativo');
    await fcnCargarGridTempVentas('tblGridTempVentas');
    await fcnCargarTotal('txtTotalVenta','txtTotalVentaCobro');

    cmbVendedor.value = GlobalCodUsuario;
    

    fcnCargarComboTipoPrecio();

    let txtPagadoEfectivo = document.getElementById('txtPagadoEfectivo');
    let txtVuelto = document.getElementById('txtVuelto');
    txtPagadoEfectivo.addEventListener('keyup',(e)=>{
        let txtTotalPagado = document.getElementById('txtTotalPagado');
        txtTotalPagado.innerText = funciones.setMoneda(txtPagadoEfectivo.value,'Q ');
        let vuelto = Number(txtPagadoEfectivo.value) - Number(GlobalTotalDocumento);
        txtVuelto.innerText = funciones.setMoneda(vuelto,'Q ');
    });

    
    let btnCobrarVenta = document.getElementById('btnCobrarVenta');
    btnCobrarVenta.addEventListener('click',async ()=>{
        
        fcnFinalizarPedido();
      
    });

    // inicializa la calculadora de cantidad
    iniciarModalCantidad();

    //carga los datos del cliente
    document.getElementById('txtNit').value = nit;
    document.getElementById('txtNombre').value = nombre;
    document.getElementById('txtDireccion').value = direccion;
    

    fcnIniciarModalCantidadProductos();

    // MODAL EDICION PRECIO MINIMO
     let btnPrecioAceptar = document.getElementById('btnPrecioAceptar'); 
     let txtNuevoPrecio = document.getElementById('txtNuevoPrecio');
     let txtObsNuevoPrecio = document.getElementById('txtObsNuevoPrecio');
     btnPrecioAceptar.addEventListener('click',()=>{
         
        let PMin = Number(GlobalSelectedPrecioMinimo);
        let PNuevo =Number(txtNuevoPrecio.value);

        
        if(PNuevo < PMin){ //SI EL PRECIO ES MENOR AL MÍNIMO SOLICITA LA AUTORIZACIÓN, DE LO CONTRARIO SOLO ACTUALIZA EL PRECIO
            //funciones.AvisoError('No puede Vender a un precio menor al mínimo')
            //}else{
            if(txtObsNuevoPrecio.value==''){
                funciones.AvisoError('Debe escribir una razón para solicitar el cambio de precios')
            }else{
                fcnUpdateTempRowPrecioAutorizacion(GlobalSelectedId,txtNuevoPrecio.value,txtObsNuevoPrecio.value);
                $('#ModalPrecio').modal('hide');
            };

        }else{
            fcnUpdateTempRowPrecio(GlobalSelectedId,txtNuevoPrecio.value,txtObsNuevoPrecio.value);
            $('#ModalPrecio').modal('hide');
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
        fcnAgregarProductoVenta(GlobalSelectedCodprod,GlobalSelectedDesprod,GlobalSelectedCodmedida,GlobalSelectedCantidad,GlobalSelectedEquivale,totalunidades,GlobalSelectedCosto,GlobalSelectedPrecio,totalexento,GlobalSelectedPrecioMinimo);

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

function iniciarModalCantidad(){
  
    let total = document.getElementById('lbCalcTotal');
    total.innerText = "";
    let btnCalcAceptar = document.getElementById('btnCalcAceptar');
    let btnCalcLimpiar = document.getElementById('btnCalcLimpiar');
    let b0 = document.getElementById('btnCalc0');
    let b1 = document.getElementById('btnCalc1');
    let b2 = document.getElementById('btnCalc2');
    let b3 = document.getElementById('btnCalc3');
    let b4 = document.getElementById('btnCalc4');
    let b5 = document.getElementById('btnCalc5');
    let b6 = document.getElementById('btnCalc6');
    let b7 = document.getElementById('btnCalc7');
    let b8 = document.getElementById('btnCalc8');
    let b9 = document.getElementById('btnCalc9');

    b0.addEventListener('click',()=>{total.innerText = total.innerText + "0"})
    b1.addEventListener('click',()=>{total.innerText = total.innerText + "1"})
    b2.addEventListener('click',()=>{total.innerText = total.innerText + "2"})
    b3.addEventListener('click',()=>{total.innerText = total.innerText + "3"})
    b4.addEventListener('click',()=>{total.innerText = total.innerText + "4"})
    b5.addEventListener('click',()=>{total.innerText = total.innerText + "5"})
    b6.addEventListener('click',()=>{total.innerText = total.innerText + "6"})
    b7.addEventListener('click',()=>{total.innerText = total.innerText + "7"})
    b8.addEventListener('click',()=>{total.innerText = total.innerText + "8"})
    b9.addEventListener('click',()=>{total.innerText = total.innerText + "9"})
    btnCalcLimpiar.addEventListener('click',()=>{total.innerText = ""})

    btnCalcAceptar.addEventListener('click',async ()=>{
        let n = Number(total.innerText);
        fcnUpdateTempRow(GlobalSelectedId,n)
        .then(async()=>{
            //await fcnCargarTotal('txtTotalVenta','txtTotalVentaCobro');      
            await fcnCargarGridTempVentas('tblGridTempVentas');
        })
        total.innerText = "";
    })

};

async function fcnBusquedaProducto(idFiltro,idTablaResultado,idTipoPrecio){
    
    let cmbTipoPrecio = document.getElementById(idTipoPrecio);

    let filtro = document.getElementById(idFiltro).value;
    let tabla = document.getElementById(idTablaResultado);
    tabla.innerHTML = GlobalLoader;


    let str = ""; 
    axios.get('/ventas/buscarproducto?empnit=' + GlobalEmpnit + '&filtro=' + filtro + '&app=' + GlobalSistema + '&tipoprecio=' + cmbTipoPrecio.value)
    
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            let exist = Number(rows.EXISTENCIA)/Number(rows.EQUIVALE); let strC = '';
            if(Number(rows.EXISTENCIA<=0)){strC='bg-danger text-white'}else{strC='bg-success text-white'};
            let totalexento = 0;
            if (rows.EXENTO==1){totalexento=Number(rows.PRECIO)}
            str += `<tr id="${rows.CODPROD}" class="border-bottom"
             onclick="getDataMedidaProducto('${rows.CODPROD}','${funciones.quitarCaracteres(rows.DESPROD,'"'," plg",true)}','${rows.CODMEDIDA}',1,${rows.EQUIVALE},${rows.EQUIVALE},${rows.COSTO},${rows.PRECIO},${totalexento},${rows.DESCUENTO});">
            <td>
                ${funciones.quitarCaracteres(rows.DESPROD,'"'," pulg",true)}
                <br>
                <small class="text-danger"><b>${rows.CODPROD}</b></small>
                <br>
                <b class"bg-danger text-white">${rows.CODMEDIDA}</b>
                <small>(${rows.EQUIVALE})</small>
            </td>
            <td>${funciones.setMoneda(rows.PRECIO || 0,'Q ')}
                <br>
                <small class="${strC}">E:${funciones.setMoneda(exist,'')}</small>
            </td>
            
        </tr>`
        })
        /*
        <td>
                <button class="btn btn-sm btn-success btn-circle text-white" >
                    +
                </button>
            <td>
        */
        tabla.innerHTML= str;
        
    }, (error) => {
        console.log(error);
    });

};

async function getDetallePedido(fecha,coddoc,correlativo){
    console.log('obteniendo el detalle del pedido ' + coddoc + correlativo)
    GlobalSelectedFecha = fecha;
    $('#ModalDetallePedido').modal('show');
    await api.cajaDetallePedido(fecha,coddoc,correlativo,'tblDetallePedido','lbTotalDetallePedido')  
};

function deleteProductoPedido(idRow,coddoc,correlativo,totalprecio,totalcosto){
    let cmbTipoListaPedidos = document.getElementById('cmbTipoListaPedidos'); 
    if(cmbTipoListaPedidos.value=='I'){
        funciones.AvisoError('No se puede eliminar un item de un Pedido ya Facturado')
    }else{

        funciones.Confirmacion('¿Está seguro que desea Quitar este Producto en este Pedido?')
        .then((value)=>{
            if(value==true){

                api.cajaQuitarRowPedido(idRow,coddoc,correlativo,totalprecio,totalcosto)
                .then(async()=>{
                
                
                    await api.cajaDetallePedido(GlobalSelectedFecha,coddoc,correlativo,'tblDetallePedido','lbTotalDetallePedido')
                
                  
                    await api.cajaPedidosVendedor(GlobalCodSucursal,GlobalCodUsuario,'tblListaPedidos','lbListaPedidosTotal',cmbTipoListaPedidos.value)
                
                    funciones.Aviso('Item removido exitosamente !!')
                })
                .catch((error)=>{
                    console.log(error)
                    funciones.AvisoError('No se pudo remover el item')
                })
            }
        })    

    }
    
};

//gestiona la apertura de la cantidad
function getDataMedidaProducto(codprod,desprod,codmedida,cantidad,equivale,totalunidades,costo,precio,exento,descuento){

    GlobalSelectedCodprod = codprod;
    GlobalSelectedDesprod = desprod;
    GlobalSelectedCodmedida = codmedida;
    GlobalSelectedEquivale = parseInt(equivale);
    GlobalSelectedCosto = parseFloat(costo);
    GlobalSelectedPrecio = parseFloat(precio);
    console.log('total exento: ' +  exento)
    GlobalSelectedExento = parseInt(exento);
    GlobalSelectedPrecioMinimo = descuento;
    

    //modal para la cantidad del producto
    document.getElementById('txtDesProducto').innerText = desprod; //label
    document.getElementById('txtCodMedida').innerText = codmedida; //label
    document.getElementById('txtPrecioProducto').innerText = funciones.setMoneda(precio,'Q'); //label
    document.getElementById('txtSubTotal').innerText = funciones.setMoneda(precio,'Q'); //label
        
    document.getElementById('txtCantidad').value = 1;

    $("#ModalCantidadProducto").modal('show');


};

// agrega el producto a temp_ventas
async function fcnAgregarProductoVenta(codprod,desprod,codmedida,cantidad,equivale,totalunidades,costo,precio,exento,descuento){
    
    document.getElementById('tblResultadoBusqueda').innerHTML = '';
    let cmbTipoPrecio = document.getElementById('cmbTipoPrecio');
        let totalcosto = Number(costo) * Number(cantidad);
        let totalprecio = Number(precio) * Number(cantidad);
        console.log('intenta agregar la fila')
        let coddoc = document.getElementById('cmbCoddoc').value;
        try {        
            
                var data =JSON.stringify({
                    empnit:GlobalEmpnit,
                    token:GlobalToken,
                    coddoc:coddoc,
                    codprod:codprod,
                    desprod:desprod,
                    codmedida:codmedida,
                    cantidad:cantidad,
                    equivale:equivale,
                    totalunidades:totalunidades,
                    costo:costo,
                    precio:precio,
                    totalcosto:totalcosto,
                    totalprecio:totalprecio,
                    descuento:descuento,
                    exento:exento,
                    usuario:GlobalUsuario,
                    app:GlobalSistema,
                    tipoprecio:cmbTipoPrecio.value
                });

                var peticion = new Request('/ventas/tempventas', {
                    method: 'POST',
                    headers: new Headers({
                       'Content-Type': 'application/json'
                    }),
                    body: data
                  });
            
                  await fetch(peticion)
                  
                  .then(async function(res) {
                    console.log('Estado: ', res.status);
                    if (res.status==200)
                    {
                        //socket.emit('productos nuevo', document.getElementById('desprod').value || 'sn');
                        $('#ModalBusqueda').modal('hide')
                        await fcnCargarGridTempVentas('tblGridTempVentas');
                        await fcnCargarTotal('txtTotalVenta','txtTotalVentaCobro');

                        let txbusqueda = document.getElementById('txtBusqueda');
                        txbusqueda.value = '';
                        //txbusqueda.focus();
                    }
                  })
                  .catch(
                      ()=>{
                        funciones.AvisoError('No se pudo agregar este producto a la venta actual');
                      }
                  )
        
                } catch (error) {
          
                }
                

};

async function fcnBuscarCliente(idNit,idNombre,idDireccion){
    
    let nit = document.getElementById(idNit);
    let nombre = document.getElementById(idNombre);
    let direccion = document.getElementById(idDireccion);

    axios.get('/ventas/buscarcliente?empnit=' + GlobalEmpnit + '&nit=' + nit.value  + '&app=' + GlobalSistema)
    .then((response) => {
        const data = response.data;
        if (data.rowsAffected[0]==0){
            funciones.GetDataNit(idNit,txtClienteNombre,txtClienteDireccion)
            //funciones.GetDataNit(idNit,idNombre,idDireccion)
            .then((json)=>{
                console.log('resulta de json: ' + json);
                if(json.resultado==true){

                    document.getElementById('txtNombre').value = json.descripcion;
                    document.getElementById('txtDireccion').value = json.direcciones.direccion;

                }else{
                    funciones.AvisoError('NIT no encontrado en SAT o en clientes de la empresa')
                };

            })
            .catch(()=>{
                $('#ModalNuevoCliente').modal('show');
                document.getElementById('txtClienteNit').value = nit.value;
                document.getElementById('txtNombre').value = '';
                document.getElementById('txtDireccion').value = '';

                document.getElementById('txtClienteNombre').focus();
            })
        }else{
            data.recordset.map((rows)=>{
                nombre.value = rows.NOMCLIENTE;
                direccion.value = rows.DIRCLIENTE;
            })
        }
        /*
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
        */
                
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
                            <small>${rows.DIRCLIE}</small>
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

function fcnEliminarItem(id){
    funciones.Confirmacion('¿Está seguro que desea Quitar este item?')
    .then(async(value)=>{
        if(value==true){

            try {        
                var data =JSON.stringify({
                    id:id
                });
    
                var peticion = new Request('/ventas/tempventas', {
                    method: 'DELETE',
                    headers: new Headers({
                       'Content-Type': 'application/json'
                    }),
                    body: data
                  });
            
                  await fetch(peticion)
                  
                  .then(async function(res) {
                    console.log('Estado: ', res.status);
                    if (res.status==200)
                    {
                        console.log(id.toString());
                        document.getElementById(id.toString()).remove();
                        //await fcnCargarGridTempVentas('tblGridTempVentas');
                        await fcnCargarTotal('txtTotalVenta','txtTotalVentaCobro');
                    }
                  })
                  .catch(
                      ()=>{
                        funciones.AvisoError('No se pudo remover este producto a la venta actual');
                      }
                  )
        
            } catch (error) {
    
            }

        }
    })
        
};

async function fcnCargarGridTempVentas(idContenedor){
    let tabla = document.getElementById(idContenedor);

    tabla.innerHTML = GlobalLoader;
    let coddoc = document.getElementById('cmbCoddoc').value;
    let strClass = '';

    GlobalSelectedString = '';
    GlobalSelectedString = `Pedido a nombre de ${document.getElementById('txtNombre')} \n`
    let total = 0;

    try {
        
        const response = await fetch('/ventas/tempventas?empnit=' + GlobalEmpnit + '&coddoc=' + coddoc + '&usuario=' + GlobalUsuario +  '&app=' + GlobalSistema)
        const json = await response.json();
        let idcant = 0;
        let data = json.recordset.map((rows)=>{
            switch (rows.PMODIF.toString()) {
                case '0':
                    strClass=''
                    break;
                case '1':
                    strClass='bg-info text-white'
                    break;
                case '2':
                    strClass='bg-danger text-white'
                    break;

            }
            total = total + Number(rows.TOTALPRECIO);
            idcant = idcant + 1;
            GlobalSelectedString = GlobalSelectedString + `
                * ${rows.CODPROD} - ${rows.DESPROD}, CANTIDAD ${rows.CANTIDAD} - ${rows.CODMEDIDA}, SUBT:${funciones.setMoneda(rows.TOTALPRECIO,'Q')} \n
            `
            return `<tr  id="${rows.ID.toString()}">
                        <td class="text-left">
                            ${rows.DESPROD}
                            <br>
                            <small class="text-danger"><b>${rows.CODPROD}</b></small>

                        </td>
                        <td class="text-right">
                            <button class="btn btn-outline-success btn-xs btn-icon rounded-circle" onClick="fcnCambiarPrecio(${rows.ID},${rows.PRECIO},${rows.DESCUENTO});">$</button>    
                            ${rows.CODMEDIDA}

                            <br>
                            <small>${rows.EQUIVALE} item</small>
                            <br>
                            <small><b class="${strClass}">${funciones.setMoneda(rows.PRECIO,'Q')}</b></small>
                        </td>


                        <td class="text-center">
                            <button class="btn btn-outline-secondary btn-xs btn-icon rounded-circle" onClick="fcnCambiarCantidad(${rows.ID});">+</button>
                            <b class="text-danger h4" id=${idcant}>${rows.CANTIDAD}</b>
                            
                        </td>
                        <td class="text-right" id=${'S'+idcant}>${funciones.setMoneda(rows.TOTALPRECIO,'Q')}</td>
                        <td>
                            <button class="btn btn-sm btn-danger btn-circle text-white" onclick="fcnEliminarItem(${rows.ID});">
                                x
                            </button>
                        <td>
                    </tr>`
       }).join('\n');
       
       tabla.innerHTML = data;
      GlobalSelectedString = GlobalSelectedString + `----------------------\n Total: ${funciones.setMoneda(total,'Q')}`
    } catch (error) {
        console.log('NO SE LOGRO CARGAR LA LISTA ' + error);
        tabla.innerHTML = 'No se logró cargar la lista...';
    }
};

async function fcnCambiarPrecio(id,precio,preciomin){
    document.getElementById('txtNuevoPrecio').value=precio;
    document.getElementById('lbPrecioMinimo').innerText = funciones.setMoneda(preciomin,'Q');
    GlobalSelectedPrecioMinimo = preciomin;

    GlobalSelectedId = id;
    $('#ModalPrecio').modal('show');
    
};

async function fcnCambiarCantidad(id){
    
    GlobalSelectedId = id;
    $('#ModalCantidad').modal('show');
    
};

async function fcnCargarTotal(idContenedor,idContenedor2){
    let container = document.getElementById(idContenedor);
    let container2 = document.getElementById(idContenedor2);
    
    let btnCobrarTotal = document.getElementById('btnCobrar')
    //btnCobrarTotal.innerText =  'Cobrar : Q 0.00'
    btnCobrarTotal.innerText =  'Terminar'

    container.innerHTML = '0'
    container2.innerHTML = '0'

    try {
        
        const response = await fetch('/ventas/tempventastotal?empnit=' + GlobalEmpnit + '&usuario=' + GlobalUsuario  + '&app=' + GlobalSistema)
        const json = await response.json();
       
        let data = json.recordset.map((rows)=>{
            GlobalTotalDocumento = Number(rows.TOTALPRECIO);
            GlobalTotalCostoDocumento = Number(rows.TOTALCOSTO);
            GlobalSelectedModif = Number(rows.MODIF);
            return `${funciones.setMoneda(rows.TOTALPRECIO,'Q ')}`
       }).join('\n');
       
       container.innerText = data;
       container2.innerText = data;
       btnCobrarTotal.innerHTML = '<h1>Terminar : ' + data + '</h1>';
       //btnCobrarTotal.innerHTML = '<h1>Cobrar : ' + data + '</h1>';
    } catch (error) {
        //console.log('NO SE LOGRO CARGAR LA LISTA ' + error);

    }

    if(container.innerHTML=='0'){
    }else{
        socket.emit('ordenes escribiendo', 'Se está generando una nueva orden',GlobalSelectedForm)
    }
};

async function fcnFinalizarPedido(){
    
    let codcliente = GlobalSelectedCodCliente;
    let ClienteNombre = document.getElementById('txtNombre').value;
    let dirclie = document.getElementById('txtDireccion').value; // CAMPO DIR_ENTREGA
    let obs = document.getElementById('txtEntregaObs').value; 
    let direntrega = document.getElementById('txtEntregaDireccion').value; //CAMPO MATSOLI
    let codbodega = GlobalCodBodega;
    let cmbTipoEntrega = document.getElementById('cmbEntregaTipo').value; //campo TRANSPORTE



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
            if(GlobalSelectedModif==0){
                console.log('...prosigo con la venta')
            }else{
                funciones.AvisoError('Debe solicitar autorización del cambio de precios para poder continuar')
                console.log('hay autorizaciones pendientes y no se puede continuar')
                return false;
            }
            //,,obs,usuario,codven
            axios.post('/ventas/documentos', {
                app: GlobalSistema,
                empnit: GlobalEmpnit,
                coddoc:coddoc,
                correlativo: correlativo,
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
                    funciones.AvisoError('No se logró Guardar este pedido');
                }else{

                    funciones.Aviso('Pedido Generado Exitosamente !!!')
                    document.getElementById('btnEntregaCancelar').click();
                    $('#ModalCobro').modal('hide');
        
                    //socket.emit('ordenes nueva',`Nueva Orden a nombre de ${ClienteNombre} por valor de ${GlobalTotalDocumento} quetzales`, GlobalSelectedForm);
                    socket.emit('ventas nueva',GlobalCodSucursal, GlobalSelectedForm);
                    //actualiza la ubicación del empleado
                    await classEmpleados.updateMyLocation();
                    //actualiza la última venta del cliente
                    //api.updateClientesLastSale(nit,'VENTA');

                    //elimina el temp ventas asociado al empleado
                    fcnEliminarTempVentas(GlobalUsuario);

                    //intenta enviar pedido por whatsaap
                    let whatsapp = document.getElementById('txtNumerow').value;
                    await sendPedidowhatsapp(coddoc,correlativo,whatsapp);

                    //prepara todo para un nuevo pedido
                    fcnNuevoPedido();
                }
            }, (error) => {
                console.log(error);
            });           
            
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
    
   // carga el grid
   await classTipoDocumentos.fcnCorrelativoDocumento('PED',cmbCoddoc.value,'txtCorrelativo');
   await fcnCargarGridTempVentas('tblGridTempVentas');
   await fcnCargarTotal('txtTotalVenta','txtTotalVentaCobro');
    
};

async function fcnUpdateTempRow(id,cantidad){
    
    let costo = 0; let precio = 0; let equivale = 0; let exento = 0;
    
    return new Promise((resolve, reject) => {
    //inicia la promesa    
            axios.post('/ventas/tempVentasRow', {
                id:id,
                app: GlobalSistema
            })
            .then((response) => {
                const data = response.data;
                
                data.recordset.map((rows)=>{
                    costo = rows.COSTO;
                    precio = rows.PRECIO;
                    equivale = rows.EQUIVALE;
                    exento = rows.EXENTO;
                })
                let totalcosto = Number(costo) * Number(cantidad);
                let totalprecio = Number(precio) * Number(cantidad);
                let totalexento = Number(exento) * Number(cantidad);
                let totalunidades = Number(equivale) * Number(cantidad);
                    axios.put('/ventas/tempVentasRow', {
                        app: GlobalSistema,
                        id:id,
                        totalcosto:totalcosto,
                        totalprecio:totalprecio,
                        cantidad:cantidad,
                        totalunidades: totalunidades,
                        exento:totalexento
                    })
                    .then(async(re) => {
                        const data2 = re.data;
                        if (data2.rowsAffected[0]==0){
                            funciones.AvisoError('No se logró Eliminar la lista de productos agregados');
                            reject();
                        }else{
                            await fcnCargarTotal('txtTotalVenta','txtTotalVentaCobro');
                            resolve();
                        }
                    }, (error) => {
                        console.log(error);
                    });  
            }, (error) => {
                console.log(error);
                reject();
            });  
    
    //finaliza la promesa
            
        }, (error) => {
            console.log(error);
            reject();
        });
    
};

// actualiza el precio según el precio nuevo en el row seleccionado
async function fcnUpdateTempRowPrecio(id,precio,obs){
    
    let costo = 0; let cantidad = 0; let equivale = 0; let exento = 0;
    let prod ='';
    return new Promise((resolve, reject) => {
    //inicia la promesa    
            axios.post('/ventas/tempVentasRow', {
                id:id,
                app: GlobalSistema
            })
            .then((response) => {
                const data = response.data;
                
                data.recordset.map((rows)=>{
                    cantidad = rows.CANTIDAD;
                    equivale = rows.EQUIVALE;
                    exento = rows.EXENTO;
                    prod = rows.DESPROD;
                })
                
                let totalprecio = Number(precio) * Number(cantidad);
                let totalexento = Number(exento) * Number(cantidad);
                                
                    axios.put('/ventas/tempVentasRowPrecio', {
                        app: GlobalSistema,
                        id:id,
                        precio:precio,
                        totalprecio:totalprecio,
                        exento:totalexento,
                        obs:obs
                    })
                    .then(async(re) => {
                        const data2 = re.data;
                        if (data2.rowsAffected[0]==0){
                            funciones.AvisoError('No se logró actualizar el precio');
                            reject();
                        }else{
                            socket.emit('solicitudes precio', `Precio cambiado a ${funciones.setMoneda(precio,'Q')} en producto ${prod}`)
                            await fcnCargarGridTempVentas('tblGridTempVentas');
                            await fcnCargarTotal('txtTotalVenta','txtTotalVentaCobro');
                            resolve();
                        }
                    }, (error) => {
                        console.log(error);
                    });  
            }, (error) => {
                console.log(error);
                reject();
            });  
    
    //finaliza la promesa
            
        }, (error) => {
            console.log(error);
            reject();
        });
    
};

// actualiza el precio según el precio nuevo en el row seleccionado con autorización
async function fcnUpdateTempRowPrecioAutorizacion(id,precio,obs){
    
    let costo = 0; let cantidad = 0; let equivale = 0; let exento = 0;
    let prod ='';
    return new Promise((resolve, reject) => {
    //inicia la promesa    
            axios.post('/ventas/tempVentasRow', {
                id:id,
                app: GlobalSistema
            })
            .then((response) => {
                const data = response.data;
                
                data.recordset.map((rows)=>{
                    cantidad = rows.CANTIDAD;
                    equivale = rows.EQUIVALE;
                    exento = rows.EXENTO;
                    prod = rows.DESPROD;
                })
                
                let totalprecio = Number(precio) * Number(cantidad);
                let totalexento = Number(exento) * Number(cantidad);
                                
                    axios.put('/ventas/tempVentasRowPrecioAutorizacion', {
                        app: GlobalSistema,
                        id:id,
                        precio:precio,
                        totalprecio:totalprecio,
                        exento:totalexento,
                        obs:obs
                    })
                    .then(async(re) => {
                        const data2 = re.data;
                        if (data2.rowsAffected[0]==0){
                            funciones.AvisoError('No se logró actualizar el precio');
                            reject();
                        }else{
                            socket.emit('solicitudes precio', `Precio cambiado a ${funciones.setMoneda(precio,'Q')} en producto ${prod}`)
                            await fcnCargarGridTempVentas('tblGridTempVentas');
                            await fcnCargarTotal('txtTotalVenta','txtTotalVentaCobro');
                            resolve();
                        }
                    }, (error) => {
                        console.log(error);
                    });  
            }, (error) => {
                console.log(error);
                reject();
            });  
    
    //finaliza la promesa
            
        }, (error) => {
            console.log(error);
            reject();
        });
    
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


function sendPedidowhatsapp(coddoc,correlativo,numero){

    funciones.Aviso('Proceso de envio por whatsapp');     
    window.open('https://api.whatsapp.com/send?phone='+numero+'&text='+ GlobalSelectedString);    
   
    GlobalSelectedString = '';
}