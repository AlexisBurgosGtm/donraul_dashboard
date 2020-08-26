function getView(){
    let view = {
        listado:()=>{
            return `
            <div class="form-group oculto-impresion">
                <label>Tipo de Lista:</label>
                <select class="form-control col-6" id="cmbTipoListaPedidos">
                    <option value="AUT">AUTORIZACIONES</option>
                    <option value="O">PEDIDOS PENDIENTES DE FACTURAR</option>
                    <option value="I">PEDIDOS FACTURADOS</option>
                    <option value="A">PEDIDOS ANULADOS</option>
                </select>
            </div>
            <label id="lbListaPedidosTotal" class="oculto-impresion">0.00</label>
            <table class="table table-responsive table-striped table-hover table-bordered oculto-impresion col-12" id="tblListaPedidos">
                
                                

                
            </table>
            `
        },
        modaldetallepedido: ()=>{
            return `
            <div class="modal fade" id="ModalDetallePedido" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-right" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <label class="modal-title text-danger h3 oculto-impresion" id="">Detalle del Pedido</label>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i class="fal fa-times"></i></span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                            
                                <div class="col-6">
                                    <h3 class="text-danger">Datos del Cliente</h3>
                                    <div class="form-group">
                                        <label>NIT:</label>
                                        <h5 id="lbPedidoNitclie">CF</h5>
                                    </div>
                                    <div class="form-group">
                                        <label>Cliente:</label>
                                        <h5 id="lbPedidoNomclie">Consumidor Final</h5>
                                    </div>
                                    <div class="form-group">
                                        <label>Dirección:</label>
                                        <h5 id="lbPedidoDirclie">Ciudad</h5>
                                    </div>
                                    
                                </div>
                                <div class="col-6">
                                    <h3 class="text-danger">Datos de la Entrega</h3>
                                    <div class="form-group">
                                        <label>Fecha Entrega:</label>
                                        <h5 id="lbPedidoFechentrega"></h5>
                                    </div>
                                    <div class="form-group">
                                        <label>Dejar en:</label>
                                        <h5 id="lbPedidoDirentrega"></h5>
                                    </div>
                                    <div class="form-group">
                                        <label>Observaciones:</label>
                                        <h5 id="lbPedidoObs">SN</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <button class="btn btn-md btn-warning btn-pills" onclick="window.print();">
                                        <i class="fal fa-print"></i>
                                        Imprimir
                                    </button>
                                    <button class="btn btn-md btn-info btn-pills" id="btnPedidoFacturado">
                                        <i class="fal fa-bill"></i>
                                        Facturado
                                    </button>
                                    <button class="btn btn-md btn-danger btn-pills" id="btnPedidoAnulado">
                                        <i class="fal fa-lock"></i>
                                        Anulado
                                    </button>
                                </div>
                                <div class="col-6">
                                    <h1 class="text-danger" id="lbTotalDetallePedido">Q0.00</h1>
                                </div>
                                
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

    root.innerHTML = view.listado() + view.modaldetallepedido();
};

async function iniciarVistaCaja(){

    getView();

    let cmbTipoListaPedidos = document.getElementById('cmbTipoListaPedidos');
    cmbTipoListaPedidos.addEventListener('change',async()=>{
        if(cmbTipoListaPedidos.value=='AUT'){
            await api.cajaPedidosVendedorAutorizar(GlobalCodSucursal,GlobalCodUsuario,'tblListaPedidos','lbListaPedidosTotal',cmbTipoListaPedidos.value);
        }else{
            await api.cajaPedidosVendedor(GlobalCodSucursal,GlobalCodUsuario,'tblListaPedidos','lbListaPedidosTotal',cmbTipoListaPedidos.value);
        }
        
        
    });

    let btnPedidoFacturado = document.getElementById('btnPedidoFacturado');
    btnPedidoFacturado.addEventListener('click', async ()=>{
        funciones.Confirmacion('¿Está seguro que desea marcar este pedido como FACTURADO?')
        .then((value)=>{
            if(value==true){

                api.cajaFacturarPedido(GlobalSelectedCoddoc,GlobalSelectedCorrelativo)
                .then(async()=>{
                    await api.cajaPedidosVendedor(GlobalCodSucursal,GlobalCodUsuario,'tblListaPedidos','lbListaPedidosTotal',cmbTipoListaPedidos.value);
                    funciones.Aviso('Pedido Marcado como Facturado!!')
                    $('#ModalDetallePedido').modal('hide');
                })    
                .catch(()=>{
                    funciones.AvisoError('Ha ocurrido un error')
                })    
            }
        })
    });

    let btnPedidoAnulado = document.getElementById('btnPedidoAnulado');
    btnPedidoAnulado.addEventListener('click', async ()=>{
        funciones.Confirmacion('¿Está seguro que desea Anular este Pedido?')
        .then((value)=>{
            if(value==true){
                api.cajaBloquearPedido(GlobalSelectedCoddoc,GlobalSelectedCorrelativo)
                .then(async()=>{
                    await api.cajaPedidosVendedor(GlobalCodSucursal,GlobalCodUsuario,'tblListaPedidos','lbListaPedidosTotal',cmbTipoListaPedidos.value);
                    funciones.Aviso('Pedido Anulado Exitosamente!!')
                    $('#ModalDetallePedido').modal('hide');
                })    
                .catch(()=>{
                    funciones.AvisoError('Ha ocurrido un error')
                })    
            }
        })
        
    })


    await api.cajaPedidosVendedorAutorizar(GlobalCodSucursal,GlobalCodUsuario,'tblListaPedidos','lbListaPedidosTotal',cmbTipoListaPedidos.value)
    

};

async function getDetallePedido(fecha,coddoc,correlativo,nit,cliente,direccion,direntrega,obs,fechaentrega){
    GlobalSelectedFecha = fecha;
    GlobalSelectedCoddoc = coddoc;
    GlobalSelectedCorrelativo = correlativo;
    document.getElementById('lbPedidoNitclie').innerText = nit;
    document.getElementById('lbPedidoNomclie').innerText = cliente;
    document.getElementById('lbPedidoDirclie').innerText = direccion;
    document.getElementById('lbPedidoDirentrega').innerText = direntrega;
    document.getElementById('lbPedidoObs').innerText = obs;
    document.getElementById('lbPedidoFechentrega').innerText = fechaentrega;

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

                    await api.cajaPedidosVendedor(GlobalCodSucursal,GlobalCodUsuario,'tblListaPedidos','lbListaPedidosTotal',cmbTipoListaPedidos.value);
                
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

async function postAutorization(rowid,desprod,preciosolicitado){
    funciones.Confirmacion('¿Está seguro que desea AUTORIZAR este precio?')
    .then(async(value)=>{
        if(value==true){
            api.cajaAutorizarPrecio(rowid)
            .then(async()=>{
                funciones.Aviso('Precio aprobado exitosamente!!')
                socket.emit('solicitudes precioaprobada',`Precio de ${funciones.setMoneda(preciosolicitado,'Q')} para ${desprod} fué aprobado!!`);
                await api.cajaPedidosVendedorAutorizar(GlobalCodSucursal,GlobalCodUsuario,'tblListaPedidos','lbListaPedidosTotal',cmbTipoListaPedidos.value)
            })
            .catch(()=>{
                funciones.AvisoError('Error en la solicitud')
            })
            

        }
    })
};

async function postDenegar(rowid,desprod,preciosolicitado){
    funciones.Confirmacion('¿Está seguro de DENEGAR el precio solicitado?')
    .then(async(value)=>{
        if(value==true){
            api.cajaDenegarPrecio(rowid)
            .then(async()=>{
                funciones.Aviso('Precio aprobado exitosamente!!')
                socket.emit('solicitudes preciodenegado',`Precio de ${funciones.setMoneda(preciosolicitado,'Q')} para ${desprod}, no ha sido autorizado`);
                await api.cajaPedidosVendedorAutorizar(GlobalCodSucursal,GlobalCodUsuario,'tblListaPedidos','lbListaPedidosTotal',cmbTipoListaPedidos.value)
            })
            .catch(()=>{
                funciones.AvisoError('Error en la solicitud')
            })
            

        }
    })
};