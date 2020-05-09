let GlobalSistema = '';
let GlobalToken = '';

let GlobalUser = '';
let GlobalWaitElement = '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';
let GlobalLoader = `<div class="spinner-border text-danger" role="status"><span class="sr-only">Loading...</span></div>
                    <div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>
                    <div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>`;




let root = document.getElementById('root');
let rootMenu = document.getElementById('rootMenu');

let lbMenuTitulo = document.getElementById('lbMenuTitulo');
let rootMenuLateral = document.getElementById('rootMenuLateral');
const showMenuLateral =(titulo)=>{ $("#modalMenu").modal('show'); lbMenuTitulo.innerText = titulo;};
const hideMenuLateral =()=>{ $("#modalMenu").modal('hide'); lbMenuTitulo.innerText = '';};

let GlobalCodSucursal = '';

let GlobalCodUsuario = 0; //99999;
let GlobalUsuario = 'DONRAUL';
let GlobalNivelUser = 0;
let GlobalTipoUsuario ='';
let GlobalSelectedDia ='';

let GlobalEmpnit = '101792069';
let GlobalEmpNombre = 'DONRAUL';
let GlobalSelectedForm = '';

let map;
let GlobalGpsLat = 0;
let GlobalGpsLong = 0;
let GlobalSelectedId;
let GlobalSelectedCodigo;
let GlobalSelectedFecha;
let GlobalCoddoc = 'PD999';
let GlobalTotalDocumento = 0;
let GlobalTotalCostoDocumento = 0;
let GlobalCodBodega = 'B001';
let GlobalTipoCobro = 'TERMINAR';

let GlobalSelectedCodCliente;
let GlobalSelectedNomCliente;
let GlobalSelectedDirCliente;

// global vars para cantidad producto
let GlobalSelectedCodprod = '';
let GlobalSelectedDesprod = '';
let GlobalSelectedCodmedida = '';
let GlobalSelectedEquivale = 0;
let GlobalSelectedCantidad = 0;
let GlobalSelectedExento = 0;
let GlobalSelectedCosto = 0;
let GlobalSelectedPrecio = 0;
let GlobalSelectedModif = 0;
let GlobalSelectedPrecioMinimo = 0;

// global vars para cantidad producto

let GlobalSelectedStatus=0;
let GlobalSelectedCoddoc = '';
let GlobalSelectedCorrelativo = '';

let GlobalSelectedApp = '';

