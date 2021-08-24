function InicializarLogin(){
    //funciones.loadCss('./css/page-login.css','root');
    btnIniciar.addEventListener('click',()=>{
        fcnLogin('txtUsuario','txtPass','cmbApp')
    })
    
    btnMenuPrincipal.style = "visibility:hidden";
}

async function fcnLogin(idUser,idPass,idApp){
    let usuario = document.getElementById(idUser).value;
    let pass = document.getElementById(idPass).value;
    let App = document.getElementById(idApp).value;

    document.getElementById('btnIniciar').innerHTML = GlobalLoader;
    document.getElementById('btnIniciar').disabled = true;
    
    axios.post('/usuarios/login', {
        usuario: usuario,
        pass: pass,
        app: App
    })
    .then((response) => {
        const data = response.data;    
    
            if(response.data.rowsAffected[0]==1){
                data.recordset.map((rows)=>{
                    if(rows.USUARIO==usuario){
                        GlobalToken=rows.TOKEN;
                        GlobalUser = rows.USUARIO;
                        GlobalUsuario = rows.USUARIO;
                        GlobalSistema = rows.SISTEMA;
                        GlobalCoddoc = rows.CODDOC;
                        fcnIniciar(App);
                    }else{
                        
                        funciones.AvisoError('Usuario y/o contraseña incorrectas');   
                        document.getElementById('btnIniciar').disabled = false; 
                        document.getElementById('btnIniciar').innerHTML = `<i class="fal fa-unlock"></i>Iniciar`;
                        
                    }
                })
            }else{
                GlobalToken = ""
                GlobalUser = '';
                GlobalUsuario = '';
                GlobalSistema = '';
                GlobalCoddoc= '';
                funciones.AvisoError('Usuario o Contraseña incorrectos')
                document.getElementById('btnIniciar').disabled = false;
                document.getElementById('btnIniciar').innerHTML = `<i class="fal fa-unlock"></i>Iniciar`;
                
            }

           
 
    }, (error) => {
        console.log(error);
        document.getElementById('btnIniciar').disabled = false;
    });

}

async function fcnIniciar(application){
    
    switch (application) {
        case 'GERENCIA':
            btnMenuInventarios.style = "visibility:visible";
            btnMenuVentas.style = "visibility:visible";
            btnMenuProductos.style = "visibility:visible";
            btnMenuCortes.style = "visibility:visible";
            btnMenuCortes.style = "visibility:visible";
            btnMenuMapa.style = "visibility:visible";
            btnMenuAgotados.style = "visibility:visible";
            btnMenuPrincipal.style = "visibility:visible";
            btnMenuCotizaciones.style = "visibility:visible";
            btnMenuUsuarios.style = "visibility:visible";
            
            classNavegar.dashventas();
            
            break;

        case 'AGENDA':
            classNavegar.agenda();

            break;
        case 'VENTAS':
            classNavegar.appVentas();  
            
            break;
        case 'OFICINA':
            classNavegar.appCaja();  
                break;
        case 'COTIZACION':
            classNavegar.appCotizaciones(); 
    
        default:
            break;
    }



}