var socket = io();

let btnMenuInventarios = document.getElementById('btnMenuInventarios');
let btnMenuVentas = document.getElementById('btnMenuVentas');
let btnMenuProductos = document.getElementById('btnMenuProductos');
let btnMenuCortes = document.getElementById('btnMenuCortes');
let btnMapa = document.getElementById('btnMenuMapa');
let btnMenuAgotados = document.getElementById('btnMenuAgotados');
let btnMenuCotizaciones = document.getElementById('btnMenuCotizaciones');
let btnMenuUsuarios = document.getElementById('btnMenuUsuarios');

btnMenuInventarios.style = "visibility:hidden";
btnMenuVentas.style = "visibility:hidden";
btnMenuProductos.style = "visibility:hidden";
btnMenuCortes.style = "visibility:hidden";
btnMenuMapa.style = "visibility:hidden";
btnMenuAgotados.style = "visibility:hidden";
btnMenuCotizaciones.style = "visibility:hidden";
btnMenuUsuarios.style = "visibility:hidden";

let btnMenuPrincipal = document.getElementById('btnMenuPrincipal');
btnMenuPrincipal.addEventListener('click',()=>{
  $('#modalMenuPrincipal').modal('show');
})

function InicializarBotonesMenu(){

        //SOLICITA PERMISO PARA NOTIFICACIONES  
        InicializarServiceWorkerNotif();
       
          // CARGA EL LOGIN
          classNavegar.login();

          // LISTENER DE INVENTARIOS  
          btnMenuInventarios.addEventListener('click',()=>{
            classNavegar.inventarios();
          });
          // LISTENER DE VENTAS
          btnMenuVentas.addEventListener('click',()=>{
            classNavegar.dashventas();
          });
          // LISTENER DE ANALISIS DE PRODUCTOS
          btnMenuProductos.addEventListener('click',()=>{
            classNavegar.productos();
          });
          // LISTENER DE CORTES
          btnMenuCortes.addEventListener('click',()=>{
            classNavegar.cortes();
          })
          // LISTENER DE MAPAS
          btnMenuMapa.addEventListener('click',()=>{
            classNavegar.maparuta();
          })

          btnMenuAgotados.addEventListener('click',()=>{
            classNavegar.agotados();
          })

          btnMenuCotizaciones.addEventListener('click',()=>{
            classNavegar.appCotizaciones();
          });

          btnMenuUsuarios.addEventListener('click',()=>{
            classNavegar.usuarios();
          });
                            
}

function InicializarServiceWorkerNotif(){
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () =>
   navigator.serviceWorker.register('sw.js')
    .then(registration => console.log('Service Worker registered'))
    .catch(err => 'SW registration failed'));
  };
  
  requestPermission();
}

if ('Notification' in window) {};

function requestPermission() {
  if (!('Notification' in window)) {
    //alert('Notification API not supported!');
    return;
  }
  
  Notification.requestPermission(function (result) {
    //$status.innerText = result;
  });
}


InicializarBotonesMenu();

// socket handler

socket.on('ventas nueva', async function(msg){
  if(GlobalSelectedForm=='CAJA'){
    try {
      let cmbTipoListaPedidos = document.getElementById('cmbTipoListaPedidos');
      if(cmbTipoListaPedidos.value=='AUT'){
      
      }else{
        await api.cajaPedidosVendedor(GlobalCodSucursal,GlobalCodUsuario,'tblListaPedidos','lbListaPedidosTotal',cmbTipoListaPedidos.value);
      }
    } catch (error) {
      
    }
  }
});

socket.on('solicitudes precio', async function(msg){
    
  if(GlobalSelectedForm=='CAJA'){
    try {
      funciones.NotificacionPersistent(msg,"Cambio de Precios");
      
    } catch (error) {
    
    };
    
    try {
      await api.cajaPedidosVendedorAutorizar(GlobalCodSucursal,GlobalCodUsuario,'tblListaPedidos','lbListaPedidosTotal',cmbTipoListaPedidos.value)
    } catch (error) {
      
    }
  }
  
});

socket.on('solicitudes precioaprobada', async function(msg){
  if(GlobalSelectedForm=='VENTAS'){

    try {
      funciones.NotificacionPersistent('Precio Autorizado', msg);
      await fcnCargarGridTempVentas('tblGridTempVentas');
      await fcnCargarTotal('txtTotalVenta','txtTotalVentaCobro');

    } catch (error) {
      
    }

  }
});

socket.on('solicitudes preciodenegado', async function(msg){
  if(GlobalSelectedForm=='VENTAS'){

    try {
      funciones.NotificacionPersistent('Precio Denegado', msg);
      funciones.AvisoError('Precio Denegado : ' + msg);
      await fcnCargarGridTempVentas('tblGridTempVentas');
      await fcnCargarTotal('txtTotalVenta','txtTotalVentaCobro');
      
    } catch (error) {
      
    }

  }
});
