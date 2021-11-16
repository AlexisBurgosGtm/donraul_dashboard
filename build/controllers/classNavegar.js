let classNavegar = {
    login : async()=>{
        funciones.loadView('./DASHBOARD/views/login/viewLogin.html','root')
        .then(()=>{
          funciones.loadScript('./DASHBOARD/views/login/controller.js','root')
            .then(()=>{
              InicializarLogin();
            })
        })
    },
    usuarios: async()=>{
        funciones.loadScript('./DASHBOARD/views/login/viewUsuarios.js','root')
        .then(()=>{
            fcnIniciarVista();
        })
    },
    agotados: async()=>{
            funciones.loadScript('./DASHBOARD/views/agotados.js','root')
            .then(()=>{
                fcnIniciarVista();
            })
    },
    inventarios: async()=>{
        switch (GlobalSistema) {
            case "ISC":
                funciones.loadView('../DASHBOARD/views/isc/inventarios/index.html','root')
                .then(()=>{
                    // carga los estilos de la vista
                    funciones.loadScript('./DASHBOARD/views/isc/inventarios/controller.js','root')
                    .then(()=>{
                        fcnIniciarVista();
                    })
            
                })
                break;
            case "COMMUNITY":
                funciones.loadView('../DASHBOARD/views/isc/inventarios/index.html','root')
                .then(()=>{
                    // carga los estilos de la vista
                    funciones.loadScript('./DASHBOARD/views/isc/inventarios/controller.js','root')
                    .then(()=>{
                        fcnIniciarVista();
                    })
            
                })
                break;
            default:
                break;
        }

    },
    productos: async()=>{
        funciones.loadView('../DASHBOARD/views/isc/productos/index.html','root')
        .then(()=>{
            // carga los estilos de la vista
            funciones.loadScript('./DASHBOARD/views/isc/productos/controller.js','root')
            .then(()=>{
                fcnIniciarVista();
            })
    
        })
    },
    dashventas: async()=>{
        switch (GlobalSistema) {
            case "ISC":
                funciones.loadView('../DASHBOARD/views/isc/ventas/index.html','root')
            .then(()=>{
                // carga los estilos de la vista
                funciones.loadScript('./DASHBOARD/views/isc/ventas/controller.js','root')
                .then(()=>{
                    fcnIniciarVista();
                })        
            })
                break;
            case "COMMUNITY":
                funciones.loadView('../DASHBOARD/views/community/ventas/index.html','root')
                .then(()=>{
                    // carga los estilos de la vista
                    funciones.loadScript('./DASHBOARD/views/community/ventas/controller.js','root')
                    .then(()=>{
                        fcnIniciarVista();
                    })        
                })
                break;
            default:
                break;
        }
    },
    agenda: async()=>{
        funciones.loadView('../DASHBOARD/views/agenda/index.html','root')
        .then(async()=>{
            
            // carga los estilos de la vista
            funciones.loadScript('../libs/moment.js','root')
            funciones.loadCss('../DASHBOARD/views/agenda/fullcalendar.bundle.css','root')
            funciones.loadScript('../DASHBOARD/views/agenda/fullcalendar.bundle.js','root')
            .then(()=>{
                funciones.loadScript('../DASHBOARD/views/agenda/controller.js','root')
                .then(()=>{
                    fcnIniciarVista();
                })
            })
        })            
    },
    cortes: async()=>{
        switch (GlobalSistema) {
            case "ISC":
                funciones.loadView('../DASHBOARD/views/isc/alertas/index.html','root')
            .then(()=>{
                // carga los estilos de la vista
                funciones.loadScript('./DASHBOARD/views/isc/alertas/controller.js','root')
                .then(()=>{
                    fcnIniciarVista();
                })        
            })
                break;
            case "COMMUNITY":
                funciones.loadView('../DASHBOARD/views/community/cortes/index.html','root')
                .then(()=>{
                    // carga los estilos de la vista
                    funciones.loadScript('./DASHBOARD/views/community/cortes/controller.js','root')
                    .then(()=>{
                        fcnIniciarVista();
                    })        
                })
                break;
            default:
                break;
        }
    },
    appVentas: async()=>{
        funciones.loadScript('./VENTAS/ventas.js','root')
        .then(()=>{
            GlobalSelectedForm= 'VENTAS';
            iniciarVistaVentas('C/F','CONSUMIDOR FINAL','CIUDAD');
        })          
    },
    appCaja: async()=>{
        funciones.loadScript('./VENTAS/caja.js','root')
        .then(()=>{
            GlobalSelectedForm= 'CAJA';
            iniciarVistaCaja();
        })          
    },
    maparuta: async()=>{
        funciones.loadView('../DASHBOARD/views/isc/supervision/viewMapaRuta.html','root')
        .then(()=>{
            funciones.loadScript('./DASHBOARD/views/isc/supervision/controller.js','root')
            .then(()=>{
                IniciarVistaMapa();
            })
        })
    },
    appCotizaciones: async()=>{
        funciones.loadScript('./DASHBOARD/views/cotizaciones/cotizaciones.js','root')
        .then(()=>{
            GlobalSelectedForm= 'COTIZACIONES';
            iniciarVista('CF','CONSUMIDOR FINAL','CIUDAD');
        })          
    },
    finca: async()=>{
        funciones.loadView('../DASHBOARD/views/finca/viewFinca.html','root')
        .then(()=>{
            // carga los estilos de la vista
            funciones.loadScript('./DASHBOARD/views/finca/viewFinca.js','root')
            .then(()=>{
                fcnIniciarVista();
            })
    
        })
    }
}