function getView(){
    let view = {
        listado:()=>{
            return `
            <div class="form-group">
                <label>Tipo de Lista:</label>
                <select class="form-control col-6" id="cmbTipoListaPedidos">
                    <option value="AUT">AUTORIZACIONES</option>
                    <option value="O">PEDIDOS PENDIENTES DE FACTURAR</option>
                    <option value="I">PEDIDOS FACTURADOS</option>
                </select>
            </div>
            <label id="lbListaPedidosTotal">0.00</label>
            <table class="table table-responsive table-striped table-hover table-bordered" id="tblListaPedidos">
                
                                

                
            </table>
            `
        }
    }

    root.innerHTML = view.listado();
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


    await api.cajaPedidosVendedorAutorizar(GlobalCodSucursal,GlobalCodUsuario,'tblListaPedidos','lbListaPedidosTotal',cmbTipoListaPedidos.value)
    

};

async function getDetallePedido(fecha,coddoc,correlativo){
    funciones.Aviso(coddoc);
};

async function postAutorization(rowid){
    funciones.Confirmacion('¿Está seguro que desea Dar Autorización a este precio?')
    .then(async(value)=>{
        if(value==true){
            api.cajaAutorizarPrecio(rowid)
            .then(async()=>{
                funciones.Aviso('Precio aprobado exitosamente!!')
                socket.emit('solicitudes precioaprobada','');
                await api.cajaPedidosVendedorAutorizar(GlobalCodSucursal,GlobalCodUsuario,'tblListaPedidos','lbListaPedidosTotal',cmbTipoListaPedidos.value)
            })
            .catch(()=>{
                funciones.AvisoError('Error en la solicitud')
            })
            

        }
    })
}