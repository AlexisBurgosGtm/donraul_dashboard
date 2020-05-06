function getView(){
    let view = {
        listado:()=>{
            return `
            <div class="form-group">
                <label>Tipo de Lista:</label>
                <select class="form-control col-6" id="cmbTipoListaPedidos">
                    <option value="O">Pendientes</option>
                    <option value="I">Entregados</option>
                </select>
            </div>
            <label id="lbListaPedidosTotal">0.00</label>
            <table class="table table-responsive table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <td>Cliente / Documento</td>
                        <td>Importe</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody id="tblListaPedidos">
                                

                </tbody>
            </table>
            `
        }
    }

    root.innerHTML = view.listado();
};

function iniciarVistaCaja(){

    getView();

    let cmbTipoListaPedidos = document.getElementById('cmbTipoListaPedidos');
    cmbTipoListaPedidos.addEventListener('change',async()=>{
        
        await api.cajaPedidosVendedor(GlobalCodSucursal,GlobalCodUsuario,'tblListaPedidos','lbListaPedidosTotal',cmbTipoListaPedidos.value)
    });

};

async function getDetallePedido(fecha,coddoc,correlativo){
    funciones.Aviso(coddoc);
};