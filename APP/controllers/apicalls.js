let api = {
    cajaPedidosVendedor: async(sucursal,codven,idContenedor,idLbTotal,st)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';
        
       
        let strdata = '';
        let totalpedidos = 0;
        let strApicall= '';
        let strHeader = '';
        switch (st) {
            case "O":
                strApicall = '/ventas/pedidospendientes';
                strHeader=`<thead class="bg-warning text-white">
                                <tr>
                                    <td>Documento</td>
                                    <td>Cliente</td>
                                    <td>Importe</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>`
                break;
            case "I":
                strApicall = '/ventas/pedidosgenerados';
                strHeader=`<thead class="bg-success text-white">
                                <tr>
                                    <td>Documento</td>
                                    <td>Cliente</td>
                                    <td>Importe</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>`
                break;
            case "A":
                strApicall = '/ventas/pedidosbloqueados';
                strHeader=`<thead class="bg-danger text-white">
                                <tr>
                                    <td>Documento</td>
                                    <td>Cliente</td>
                                    <td>Importe</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>`
                break;
        
            default:
                break;
        }
        axios.post(strApicall, {
            app:GlobalSistema,
            sucursal: sucursal,
            codven:codven
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            let strClassStatus = '';
            let strClassRowSt = '';
            data.map((rows)=>{
                    if(rows.ST=='A'){strClassStatus='bg-danger text-white'}else{strClassStatus='bg-info text-white'}
                    if(rows.ST=='A'){strClassRowSt='bg-danger text-white'}else{strClassRowSt=''}
                    total = total + Number(rows.IMPORTE);
                    totalpedidos = totalpedidos + 1;
                    let f = rows.FECHA.toString().replace('T00:00:00.000Z','');
                    strdata = strdata + `
                            <tr>
                                <td>
                                    ${rows.CODDOC + '-' + rows.CORRELATIVO}
                                    <br>
                                    <small>${f}</small>
                                    <br>
                                    <small class="text-danger">Entregar:${rows.FECHAENTREGA.toString().replace('T00:00:00.000Z','')}</small>
                                </td>
                                <td class="${strClassRowSt}">${rows.NOMCLIE}
                                    <br>
                                    <small>${rows.DIRCLIE + ',' + rows.DESMUNI}</small>
                                    <br>
                                    <small class="text-white bg-secondary">
                                        ${funciones.quitarCaracteres(rows.OBS,'"'," pulg",true)}
                                    </small>
                                </td>
                                <td>
                                    ${funciones.setMoneda(rows.IMPORTE,'Q')}
                                </td>
                                
                                <td>
                                    <button class="btn btn-info btn-sm btn-circle" onclick="getDetallePedido('${f}','${rows.CODDOC}','${rows.CORRELATIVO}','${rows.NITCLIE}','${rows.NOMCLIE}','${rows.DIRCLIE}','${rows.DIRENTREGA.replace(/(\r\n|\n|\r)/gm, "")}','${funciones.quitarCaracteres(rows.OBS,'"'," pulg",true)}','${rows.FECHAENTREGA.toString().replace('T00:00:00.000Z','')}')">
                                        +
                                    </button>
                                </td>
                            </tr>`
            })
            container.innerHTML = strHeader + strdata + '</tbody>';
            lbTotal.innerText = `${funciones.setMoneda(total,'Q ')} - Peds:${totalpedidos} - Prom:${funciones.setMoneda((Number(total)/Number(totalpedidos)),'Q')}`;
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
           
    },//método en uso
    cajaPedidosVendedorAutorizar: async(sucursal,codven,idContenedor,idLbTotal,st)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';
        
       
        let strdata = '';
        let totalpedidos = 0;
        let strApicall= '';
        let strHeader = '';
        
                strApicall = '/ventas/pedidosautorizar';
                strHeader=`<thead class="bg-trans-gradient text-white">
                                <tr>
                                    <td>Motivo</td>
                                    <td>Producto</td>
                                    <td>Precio</td>
                                    <td>Importe</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>`
        
        
        axios.post(strApicall, {
            app:GlobalSistema,
            sucursal: sucursal,
            codven:codven
        })
        .then((response) => {
            const data = response.data.recordset;
            
            data.map((rows)=>{
                
                let strC = '';
                let c = Number(rows.COSTO);
                let pm = Number(rows.PRECIO);

                if(c > pm){
                    strC = 'bg-danger text-white';
                };
                    strdata = strdata + `
                            <tr class="border-bottom">
                                <td>
                                    ${rows.OBS}
                                </td>
                                <td class="${strC}">${rows.DESPROD}
                                    <br>
                                    <small>${rows.CODMEDIDA} CANT: ${rows.CANTIDAD}</small>
                                </td>
                                <td>
                                    Solicitado: <br>
                                    <b class="text-danger">${funciones.setMoneda(rows.PRECIO,'Q')}</b>
                                    <br>
                                    Mínimo: <br>
                                    <b class="text-success">${funciones.setMoneda(rows.DESCUENTO,'Q')}</b>
                                    <br>
                                    Costo: <br>
                                    <b class="text-white bg-danger">${funciones.setMoneda(rows.COSTO,'Q')}</b>
                                </td>
                                <td>
                                    <b>${funciones.setMoneda(rows.TOTALPRECIO,'Q')}</b>
                                </td>
                                
                                <td>
                                    <button class="btn btn-info btn-md" onclick="postAutorization(${rows.ID},'${rows.DESPROD}',${rows.PRECIO},${rows.COSTO})">
                                        <i class="fal fa-unlock"></i>    
                                        Autorizar
                                    </button>
                                </td>
                                <td>
                                    <button class="btn btn-danger btn-md" onclick="postDenegar(${rows.ID},'${rows.DESPROD}',${rows.PRECIO})">
                                        <i class="fal fa-lock"></i>
                                        Denegar    
                                    </button>
                                </td>
                            </tr>`
            })
            container.innerHTML = strHeader + strdata + '</tbody>';
            
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            
        });
           
    },//método en uso
    cajaAutorizarPrecio: async(id)=>{
        
        return new Promise((resolve,reject)=>{
            axios.put('/ventas/autorizarprecio',{
                id:id
            })
            .then((response) => {
                
               resolve();             
            }, (error) => {
                
                reject();
            });


        })
    },//metodo en uso
    cajaDenegarPrecio: async(id)=>{
        
        return new Promise((resolve,reject)=>{
            axios.put('/ventas/denegarprecio',{
                id:id
            })
            .then((response) => {
                
               resolve();             
            }, (error) => {
                
                reject();
            });


        })
    },//metodo en uso
    cajaDetallePedido: async(fecha,coddoc,correlativo,idContenedor,idLbTotal)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';
        
        let strdata = '';

        GlobalSelectedCoddoc = coddoc;
        GlobalSelectedCorrelativo = correlativo;

        axios.post('/ventas/detallepedido', {
            sucursal: GlobalCodSucursal,
            fecha:fecha,
            coddoc:coddoc,
            correlativo:correlativo
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    total = total + Number(rows.IMPORTE);
                    strdata = strdata + `
                            <tr id='${rows.DOC_ITEM}'>
                                <td>${rows.DESPROD}
                                    <br>
                                    <small class="text-danger">${rows.CODPROD}</small>
                                </td>
                                <td>${rows.CODMEDIDA}</td>
                                <td>${rows.CANTIDAD}</td>
                                <td>${funciones.setMoneda(rows.PRECIO,'Q')}</td>
                                <td>${funciones.setMoneda(rows.IMPORTE,'Q')}</td>
                                <td>
                                    <button class="btn btn-danger btn-md btn-circle"
                                     onclick="deleteProductoPedido('${rows.DOC_ITEM}','${GlobalSelectedCoddoc}','${GlobalSelectedCorrelativo}',${rows.IMPORTE},${rows.TOTALCOSTO})">
                                        x
                                    </button>
                                </td>
                            </tr>
                            `
            })
            container.innerHTML = strdata;
            lbTotal.innerText = `Total Pedido:  ${funciones.setMoneda(total,'Q')}`;
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q0.00';
        });
           
    },//metodo en uso
    cajaQuitarRowPedido: async(item,coddoc,correlativo,totalprecio,totalcosto)=>{
        console.log(item)
        console.log(coddoc)
        console.log(correlativo)
        console.log(totalprecio)
        console.log(totalcosto)

        return new Promise((resolve,reject)=>{
            axios.put('/ventas/pedidoquitaritem',{
                sucursal:GlobalCodSucursal,
                coddoc:coddoc,
                correlativo:correlativo,
                item:item,
                totalprecio:totalprecio,
                totalcosto:totalcosto
            })
            .then((response) => {
                
               resolve();             
            }, (error) => {
                console.log(error);        
                reject(error);
            });


        })
    }, //metodo en uso
    cajaBloquearPedido: async(coddoc,correlativo)=>{
        
        return new Promise((resolve,reject)=>{
            axios.put('/ventas/pedidobloquear',{
                coddoc:coddoc,
                correlativo:correlativo
            })
            .then((response) => {
                
               resolve();             
            }, (error) => {
                
                reject();
            });


        })
    },//metodo en uso
    cajaFacturarPedido: async(coddoc,correlativo)=>{
        
        return new Promise((resolve,reject)=>{
            axios.put('/ventas/pedidofacturado',{
                coddoc:coddoc,
                correlativo:correlativo
            })
            .then((response) => {
                
               resolve();             
            }, (error) => {
                
                reject();
            });


        })
    },//metodo en uso
    cajaPedidosVendedor2: async(sucursal,codven,idContenedor,idLbTotal,st)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';
        
       
        let strdata = '';
        let totalpedidos = 0;
        let strApicall= '';

        switch (st) {
            case "O":
                strApicall = '/ventas/pedidospendientes';
                break;
            case "I":
                strApicall = '/ventas/pedidosgenerados';
                break;
            case "A":
                strApicall = '/ventas/pedidosbloqueados';
                break;
        
            default:
                break;
        }
        axios.post(strApicall, {
            app:GlobalSistema,
            sucursal: sucursal,
            codven:codven
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            let strClassStatus = '';
            let strClassRowSt = '';
            data.map((rows)=>{
                    if(rows.ST=='A'){strClassStatus='bg-danger text-white'}else{strClassStatus='bg-info text-white'}
                    if(rows.ST=='A'){strClassRowSt='bg-danger text-white'}else{strClassRowSt=''}
                    total = total + Number(rows.IMPORTE);
                    totalpedidos = totalpedidos + 1;
                    let f = rows.FECHA.toString().replace('T00:00:00.000Z','');
                    strdata = strdata + `
                            <tr>
                                <td>${f}</td>
                                <td>
                                    ${rows.CODDOC + '-' + rows.CORRELATIVO}
                                    <br>
                                    <small class="${strClassStatus}">Status:${rows.ST}</small>
                                </td>
                                <td class="${strClassRowSt}">${rows.NOMCLIE}
                                    <br>
                                    <small>${rows.DIRCLIE + ',' + rows.DESMUNI}</small>
                                    <br>
                                    <small class="text-white bg-secondary">${rows.OBS}</small>
                                </td>
                                <td>
                                    ${funciones.setMoneda(rows.IMPORTE,'Q')}
                                </td>
                                
                                <td>
                                    <button class="btn btn-info btn-sm btn-circle" onclick="getDetallePedido('${f}','${rows.CODDOC}','${rows.CORRELATIVO}')">
                                        +
                                    </button>
                                </td>
                            </tr>`
            })
            container.innerHTML = strdata;
            lbTotal.innerText = `${funciones.setMoneda(total,'Q ')} - Peds:${totalpedidos} - Prom:${funciones.setMoneda((Number(total)/Number(totalpedidos)),'Q')}`;
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
           
    },
    empleadosLogin : (sucursal,user,pass)=>{

        axios.post('/empleados/login', {
            app:GlobalSistema,
            codsucursal: sucursal,
            user:user,
            pass:pass       
        })
        .then((response) => {
            const data = response.data.recordset;
            if(response.data.rowsAffected[0]==1){
                data.map((rows)=>{
                    if(rows.USUARIO==user){
                        GlobalCodUsuario = rows.CODIGO;
                        GlobalUsuario = rows.USUARIO;
                        GlobalTipoUsuario = rows.TIPO;
                        GlobalCoddoc= rows.CODDOC;
                        GlobalCodSucursal = sucursal;
                        GlobalSistema = sucursal;
                        
                        classNavegar.inicio(GlobalTipoUsuario);        
                    }        
                })
            }else{
                GlobalCodUsuario = 9999
                GlobalUsuario = '';
                GlobalTipoUsuario = '';
                GlobalCoddoc= '';
                funciones.AvisoError('Usuario o Contraseña incorrectos, intente seleccionando la sucursal a la que pertenece')
            }
            
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
        });

    },
    clientesAjenosVendedor: async(sucursal,filtro,idContenedor)=>{
    
        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
                
        let strdata = ''; 

        axios.post('/clientes/listaajenosvendedor', {
            app:GlobalSistema,
            sucursal: sucursal,
            filtro: filtro
        })
        .then((response) => {
            const data = response.data.recordset;
            
            data.map((rows)=>{                    
                        strdata = strdata + `<tr class=''>
                        <td>${rows.NOMCLIE}
                            <br>
                            <small>Cod: ${rows.CODIGO}</small>
                        </td>
                        <td>${rows.DIRCLIE}
                            <br>
                            <small>${rows.DESMUNI}</small>
                        </td>
                        <td>
                            <button class="btn btn-info btn-sm btn-circle" onclick="getMenuCliente('${rows.CODIGO}','${rows.NOMCLIE}','${rows.DIRCLIE}','${rows.TELEFONO}','${rows.LAT}','${rows.LONG}','${rows.NIT}');">
                                +
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
        
        
    },
    pedidosVendedor: async(sucursal,codven,fecha,idContenedor,idLbTotal)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';

        let tableheader = `<table class="table table-responsive table-hover table-striped table-bordered">
                            <thead class="bg-trans-gradient text-white">
                                <tr>
                                    <td>Documento</td>
                                    <td>Cliente</td>
                                    <td>Importe</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody id="tblListaPedidos">`;
        let tablefoooter ='</tbody></table>';

        let strdata = '';
        let totalpedidos = 0;
        axios.post('/ventas/listapedidos', {
            app:GlobalSistema,
            sucursal: sucursal,
            codven:codven,
            fecha:fecha   
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    total = total + Number(rows.IMPORTE);
                    totalpedidos = totalpedidos + 1;
                    strdata = strdata + `<tr>
                                <td>
                                    ${rows.CODDOC + '-' + rows.CORRELATIVO}
                                </td>
                                <td>${rows.NOMCLIE}
                                    <br>
                                    <small>${rows.DIRCLIE + ', ' + rows.DESMUNI}</small>
                                    <br>
                                    <small class="text-white bg-secondary">${rows.OBS}</small>
                                </td>
                                <td>
                                    ${funciones.setMoneda(rows.IMPORTE,'Q')}
                                </td>
                                <td>
                                    <button class="btn btn-info btn-sm btn-circle"
                                    onclick="getDetallePedido('${rows.FECHA.toString().replace('T00:00:00.000Z','')}','${rows.CODDOC}','${rows.CORRELATIVO}');">
                                        +
                                    </button>
                                </td>
                            </tr>`
            })
            container.innerHTML = tableheader + strdata + tablefoooter;
            lbTotal.innerText = `${funciones.setMoneda(total,'Q ')} - Pedidos: ${totalpedidos} - Promedio:${funciones.setMoneda((Number(total)/Number(totalpedidos)),'Q')}`;
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
           
    },
    preciosListado: async(sucursal,idContenedor)=>{
        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let strdata = '';
        let tbl = `     <table class="table table-responsive table-hover table-striped"  id="tblPrecios">
                            <thead class="bg-trans-gradient text-white">
                                <tr>
                                    <td>Producto</td>
                                    <td>Medida</td>
                                    <td>Equivale</td>
                                    <td>Público</td>
                                    <td>Mayorista C</td>
                                    <td>Mayorista B</td>
                                    <td>Mayorista A</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody></tbody>`;

        let tblfoot = `</tbody></table>`;

        axios.post('/productos/listaprecios', {
            sucursal: sucursal
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    
                    strdata = strdata + `<tr>
                                            <td>
                                                ${rows.DESPROD}
                                                <br>
                                                <small><b>${rows.CODPROD}</b></small>
                                            </td>
                                            <td>${rows.CODMEDIDA}</td>
                                            <td>${rows.EQUIVALE}</td>
                                            <td>${funciones.setMoneda(rows.PUBLICO,'Q')}</td>
                                            <td>${funciones.setMoneda(rows.MAYOREOC,'Q')}</td>
                                            <td>${funciones.setMoneda(rows.MAYOREOB,'Q')}</td>
                                            <td>${funciones.setMoneda(rows.MAYOREOA,'Q')}</td>
                                        </tr>`
            })
            container.innerHTML = tbl + strdata + tblfoot;
        
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
        });


    },
    reporteDiaMarcas: async(sucursal,codven,fecha,idContenedor,idLbTotal)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';

        let strdata = '';
        let tbl = `<table class="table table-responsive table-hover table-striped table-bordered">
                    <thead class="bg-trans-gradient text-white"><tr>
                        <td>Marca</td>
                        <td>Importe</td></tr>
                    <tbody>`;

        let tblfoot = `</tbody></table>`;

        axios.post('/ventas/reportemarcasdia', {
            app:GlobalSistema,
            sucursal: sucursal,
            codven:codven,
            fecha:fecha
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    total = total + Number(rows.TOTALPRECIO);
                    strdata = strdata + `<tr>
                                            <td>
                                                ${rows.DESMARCA}
                                            </td>
                                            <td>
                                                ${funciones.setMoneda(rows.TOTALPRECIO,'Q')}
                                            </td>
                                        </tr>`
            })
            container.innerHTML = tbl + strdata + tblfoot;
            lbTotal.innerText = funciones.setMoneda(total,'Q ');
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
           
    },
    reporteDiaProductos: async(sucursal,codven,fecha,idContenedor,idLbTotal)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';

        let strdata = '';
        let tbl = `<table class="table table-responsive table-hover table-striped table-bordered">
                    <thead class="bg-trans-gradient text-white"><tr>
                        <td>Producto</td>
                        <td>Unidades</td>
                        <td>Importe</td>
                        </tr>
                    <tbody>`;

        let tblfoot = `</tbody></table>`;

        axios.post('/ventas/reporteproductosdia', {
            app:GlobalSistema,
            sucursal: sucursal,
            codven:codven,
            fecha:fecha   
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    total = total + Number(rows.TOTALPRECIO);
                    strdata = strdata + `<tr>
                                            <td>
                                                ${rows.DESPROD}
                                                <br>
                                                <small class="text-danger">${rows.CODPROD}</small>
                                            </td>
                                            <td>${rows.TOTALUNIDADES}</td>
                                            <td>
                                                ${funciones.setMoneda(rows.TOTALPRECIO,'Q')}
                                            </td>
                                        </tr>`
            })
            container.innerHTML = tbl + strdata + tblfoot;
            lbTotal.innerText = funciones.setMoneda(total,'Q ');
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
           
    },
    reporteDinero: async(sucursal,codven,anio,mes,idContenedor,idLbTotal)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';

        let strdata = '';
        let tbl = `<table class="table-responsive table-hover table-striped">
                    <thead class="bg-trans-gradient text-white"><tr>
                        <td>Fecha</td>
                        <td>Pedidos</td>
                        <td>Importe</td></tr>
                    <tbody>`;

        let tblfoot = `</tbody></table>`;

        axios.post('/ventas/reportedinero', {
            app:GlobalSistema,
            sucursal: sucursal,
            codven:codven,
            anio:anio,
            mes:mes   
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0; let pedidos = 0;
            data.map((rows)=>{
                    total = total + Number(rows.TOTALVENTA);
                    pedidos = pedidos + Number(rows.PEDIDOS);
                    strdata = strdata + `<tr>
                                            <td>
                                                ${rows.FECHA.toString().replace('T00:00:00.000Z','')}
                                            </td>
                                            <td>${rows.PEDIDOS}</td>
                                            <td>
                                                ${funciones.setMoneda(rows.TOTALVENTA,'Q')}
                                            </td>
                                        </tr>`
            })
            container.innerHTML = tbl + strdata + tblfoot;
            lbTotal.innerText = funciones.setMoneda(total,'Q ') + ' Pedidos: ' + pedidos.toString();
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
           
    },
    reporteProductos: async(sucursal,codven,anio,mes,idContenedor,idLbTotal)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';

        let strdata = '';
        let tbl = `<table class="table-responsive table-hover table-striped">
                    <thead class="bg-trans-gradient text-white"><tr>
                        <td>Producto</td>
                        <td>Unidades</td>
                        <td>Importe</td>
                        </tr>
                    <tbody>`;

        let tblfoot = `</tbody></table>`;

        axios.post('/ventas/reporteproductos', {
            app:GlobalSistema,
            sucursal: sucursal,
            codven:codven,
            anio:anio,
            mes:mes   
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    total = total + Number(rows.TOTALPRECIO);
                    strdata = strdata + `<tr>
                                            <td>
                                                ${rows.DESPROD}
                                                <br>
                                                <small class="text-danger">${rows.CODPROD}</small>
                                            </td>
                                            <td>${rows.TOTALUNIDADES}</td>
                                            <td>
                                                ${funciones.setMoneda(rows.TOTALPRECIO,'Q')}
                                            </td>
                                        </tr>`
            })
            container.innerHTML = tbl + strdata + tblfoot;
            lbTotal.innerText = funciones.setMoneda(total,'Q ');
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
           
    },
    reporteMarcas: async(sucursal,codven,anio,mes,idContenedor,idLbTotal)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';

        let strdata = '';
        let tbl = `<table class="table-responsive table-hover table-striped">
                    <thead class="bg-trans-gradient text-white"><tr>
                        <td>Marca</td>
                        <td>Importe</td></tr>
                    <tbody>`;

        let tblfoot = `</tbody></table>`;

        axios.post('/ventas/reportemarcas', {
            app:GlobalSistema,
            sucursal: sucursal,
            codven:codven,
            anio:anio,
            mes:mes   
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    total = total + Number(rows.TOTALPRECIO);
                    strdata = strdata + `<tr>
                                            <td>
                                                ${rows.DESMARCA}
                                            </td>
                                            <td>
                                                ${funciones.setMoneda(rows.TOTALPRECIO,'Q')}
                                            </td>
                                        </tr>`
            })
            container.innerHTML = tbl + strdata + tblfoot;
            lbTotal.innerText = funciones.setMoneda(total,'Q ');
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
           
    },
    reporteLocaciones: async(sucursal,codven,anio,mes,idContenedor,idLbTotal)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';

        let tbl = `<div class="mapcontainer" id="mapcontainer"></div>`;        
        
        container.innerHTML = tbl;
        
        let mapcargado = 0;

        axios.post('/ventas/reportelocaciones', {
            app:GlobalSistema,
            sucursal: sucursal,
            codven:codven,
            anio:anio,
            mes:mes   
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                total = total + Number(rows.TOTALVENTA);
                    if(mapcargado==0){
                        map = Lmap(rows.LAT, rows.LONG, rows.CLIENTE, rows.TOTALVENTA);
                        mapcargado = 1;
                    }else{
                        L.marker([rows.LAT, rows.LONG])
                        .addTo(map)
                        .bindPopup(rows.CLIENTE + ' - '  + rows.TOTALVENTA)   
                    }
            })
            //container.innerHTML = tbl;
            lbTotal.innerText = funciones.setMoneda(total,'Q ');
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
           
    },
    noticiaslistado : (sucursal,user,idContenedor)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;

        let str = '';

        axios.get('/noticias/listado', {
            sucursal: sucursal,
            user:user
        })
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                let classprioridad ='';
                switch (rows.PRIORIDAD) {
                    case 'ALTA':
                        classprioridad = 'bg-danger';
                        break;
                    case 'MEDIA':
                        classprioridad = 'bg-warning';
                        break;
                    case 'BAJA':
                        classprioridad = 'bg-info';
                         break;               
                    default:
                        break;
                }
                str = str + `
                        <div class="card">
                            <div class="card-header ${classprioridad}">
                                <label class="text-white">${rows.FECHA.toString().replace('T00:00:00.000Z','')}</label>
                            </div>
                            <div class="card-body">
                                <label>${rows.NOTICIA}</label>
                            </div>
                            <div class="card-footer text-right">
                                <label><i>${rows.USUARIO}</i></label>
                            </div>
                        </div>`        
            })
            container.innerHTML = str;

        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            container.innerHTML = 'No se pudo cargar la lista';
        });

    },
    tblVendedores : (sucursal,idContainer)=>{
        let container = document.getElementById(idContainer);
        container.innerHTML = GlobalLoader;
        
        let strHead = `<div class="table-responsive">
                            <table class="table table-responsive table-striped table-hover table-bordered">
                                <thead class=" bg-trans-gradient text-white">
                                    <tr>
                                        <td>Vendedor</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>`
        let str = '';

        axios.post('/empleados/vendedores', {
            sucursal: sucursal,
            user:GlobalUsuario
        })
        .then((response) => {
            //style="width: 15rem;"
            const data = response.data.recordset;
            data.map((rows)=>{
                str = str + `
                        <div class="card col-sm-12 col-md-3 col-lg-3 col-xl-3" >
                            <div class="card-header bg-trans-gradient text-white text-center">
                                <h5 class="text-center">${rows.NOMBRE}</h5>
                            </div>        
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Teléfono:</label>
                                            <h5 class="text-info">
                                                <a href="https://api.whatsapp.com/send?phone=502${rows.TELEFONO}&text=${rows.NOMBRE.replace(' ','%20')}" target="blank">${rows.TELEFONO}</a>
                                            </h5>        
                                        </div>    
                                    </div>
                                    <div class="col-6" align="right">
                                        <button class="btn btn-info btn-circle btn-lg" onclick="getGerenciaVendedorLogro(${rows.CODIGO},'${rows.NOMBRE}');">
                                        +
                                        </button>    
                                    </div>
                                
                                </div>
                                
                            </div>
                            
                        </div>`        
            })
            container.innerHTML = str;

        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            container.innerHTML = 'No se pudo cargar la lista';
        });


        /*
        str = str + `<tr>
                                <td>
                                    ${rows.NOMBRE}<br>
                                    <small>
                                        Tel:<b class="text-danger">${rows.TELEFONO}</b> - 
                                        Cod:${rows.CODIGO} - 
                                        
                                    </small>
                                </td>
                                <td>
                                    <button class="btn btn-info btn-circle btn-sm" onclick="getGerenciaVendedorLogro(${rows.CODIGO},'${rows.NOMBRE}');">
                                        +
                                    </button>
                                </td>
                            </tr>`        
        */
    },
    tblVendedoresPill : (sucursal,idContainer)=>{
        let container = document.getElementById(idContainer);
        container.innerHTML = GlobalLoader;
        
        let strHead = `<div class="d-flex">`
        let strFoot = `</div>`
        let str = '';

        axios.post('/empleados/vendedores', {
            sucursal: sucursal,
            user:GlobalUsuario
        })
        .then((response) => {
            //style="width: 15rem;"
            const data = response.data.recordset;
            data.map((rows)=>{
                str = str + `
                
                <div class="rounded-pill bg-white shadow-sm p-2 border-faded mr-3 d-flex flex-row align-items-center justify-content-center">
                    <img src="img/favicon.png" alt="${rows.NOMBRE}" class="img-thumbnail img-responsive rounded-circle" style="width:5rem; height: 5rem;">
                        <div class="ml-2 mr-3">
                            <h5 class="m-0">
                                ${rows.NOMBRE}
                                <small class="m-0 fw-300">
                                    Vendedor
                                </small>
                            </h5>
                            <a href="https://api.whatsapp.com/send?phone=502${rows.TELEFONO}&text=${rows.NOMBRE.replace(' ','%20')}" target="blank">${rows.TELEFONO}</a>
                            <div class="text-right">
                                <button class="btn btn-info btn-circle btn-lg" onclick="getGerenciaVendedorLogro(${rows.CODIGO},'${rows.NOMBRE}');">
                                +
                                </button>
                            </div>                            
                    </div>
                </div>`        
            })
            container.innerHTML = strHead + str + strFoot;

        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            container.innerHTML = 'No se pudo cargar la lista';
        });


        /*
        str = str + `<tr>
                                <td>
                                    ${rows.NOMBRE}<br>
                                    <small>
                                        Tel:<b class="text-danger">${rows.TELEFONO}</b> - 
                                        Cod:${rows.CODIGO} - 
                                        
                                    </small>
                                </td>
                                <td>
                                    <button class="btn btn-info btn-circle btn-sm" onclick="getGerenciaVendedorLogro(${rows.CODIGO},'${rows.NOMBRE}');">
                                        +
                                    </button>
                                </td>
                            </tr>`        
        */
    },
    comboVendedores : (sucursal,idContainer)=>{
        let container = document.getElementById(idContainer);
        let str = '';

        return new Promise((resolve,reject)=>{
            axios.post('/empleados/vendedores', {
                sucursal: sucursal,
                user:GlobalUsuario
            })
            .then((response) => {
                const data = response.data.recordset;
                data.map((rows)=>{
                    str = str + `<option value='${rows.CODIGO}'>
                                    ${rows.NOMBRE}
                                   Tel:<b class="text-danger">${rows.TELEFONO}</b>
                                 </option>
                                `        
                })
                container.innerHTML = str;
                resolve();
            }, (error) => {
                funciones.AvisoError('Error en la solicitud');
                container.innerHTML = '';
                reject();
            });
        })
    },
    clientesListadoVendedor:(sucursal, codven, idContainer)=>{
        let container = document.getElementById(idContainer);
        container.innerHTML = GlobalLoader;
        
        
        let strdata = '';
        let tbl = `<table class="table table-hover table-striped" id="tblClientesVendedor">
                    <thead  class="bg-trans-gradient text-white"> 
                        <tr>
                            <td>Cliente</td>
                            <td>Dirección</td>
                            <td>Telefono</td>
                            <td>Visita</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>`;

        let tblfoot = `</tbody></table>`;

        axios.post('/clientes/clientesvendedor', {
            sucursal: sucursal,
            codven:codven
        })
        .then((response) => {
            const data = response.data.recordset;
            
            data.map((rows)=>{
                    let strClass = '';
                    if(rows.ACTIVO==1){strClass='bg-danger text-white'}else{strClass=''};
                    strdata = strdata + `<tr class="${strClass}">
                                            <td>${rows.NOMCLIE}
                                                <br>
                                                <small>Código:<b>${rows.CODIGO}</b>  NIT:<b>${rows.NIT}</b></small>
                                            </td>
                                            <td>${rows.DIRCLIE}
                                                <br>
                                                <small>${rows.DESMUNI},${rows.DESDEPTO}</small>
                                            </td>
                                            <td>${rows.TELEFONO}</td>
                                            <td>${rows.VISITA}</td>
                                            
                                            <td>
                                                <button class="btn btn-md btn-circle btn-info" onclick="getMenuCliente('${rows.CODIGO}','${rows.NOMCLIE}','${rows.DIRCLIE}','${rows.VISITA}','${rows.CODVEN}','${rows.ACTIVO}');">+</button>
                                            </td>
                                        </tr>`
            })
            container.innerHTML = tbl + strdata + tblfoot;
            
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
        });

    },
    clientesListadoDesactivar : (sucursal,nitclie)=>{
        return new Promise((resolve,reject)=>{
            axios.put('/clientes/desactivar',{
                sucursal:sucursal,
                nitclie:nitclie
            })
            .then((response) => {
                
               resolve(response);             
            }, (error) => {
                
                reject(error);
            });
        });

    },
    clientesListadoActivar : (sucursal,nitclie)=>{
        return new Promise((resolve,reject)=>{
            axios.put('/clientes/reactivar',{
                sucursal:sucursal,
                nitclie:nitclie
            })
            .then((response) => {
                
               resolve(response);             
            }, (error) => {
                
                reject(error);
            });
        });

    },
    gerenciaResumenSucursal: (mes,anio,idContenedor,idLbTotal)=>{
        
        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';
        
        let strdata = '';

        axios.post('/ventas/rptsucursalesventas', {
            mes:mes,
            anio: anio
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    total = total + Number(rows.IMPORTE);
                    strdata = strdata + `
                    <div class="col-sm-6 col-xl-3">
                        <div class="p-3 bg-${rows.COLOR}-300 rounded overflow-hidden position-relative text-white mb-g">
                            <div class="">
                                <h3 class="display-4 d-block l-h-n m-0 fw-500">
                                            ${funciones.setMoneda(rows.IMPORTE,'Q')}
                                    <small class="m-0 l-h-n">${rows.SUCURSAL}</small>
                                </h3>
                            </div>
                                <i class="fal fa-lightbulb position-absolute pos-right pos-bottom opacity-15 mb-n5 mr-n6" style="font-size:6rem"></i>
                            </div>
                        </div>
                    </div>
                    `
            })
            container.innerHTML = strdata;
            lbTotal.innerText = funciones.setMoneda(total,'Q ');
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
    },
    gerenciaRankingVendedores: (mes,anio,idContenedor)=>{
        
        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
            
        let strdata = '';
        let tblHead = `<table class="table table-responsive table-striped table-hover table-bordered">
                        <thead class="bg-trans-gradient text-white">
                            <tr>
                                <td>Vendedor</td>
                                <td>Venta</td>
                                <td>Sucursal</td>
                            </tr>
                        </thead>
                        <tbody>`;
        let tblFoot = `</tbody></table>`;

        axios.post('/ventas/rptrankingvendedores', {
            mes:mes,
            anio: anio
        })
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                    strdata = strdata + `
                    <tr>
                        <td>${rows.NOMVEN}</td>
                        <td>${funciones.setMoneda(rows.TOTALPRECIO,'Q')}</td>
                        <td>${rows.SUCURSAL}</td>
                    </tr>
                    `
            })
            container.innerHTML = tblHead + strdata + tblFoot;
            
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
        });
    },
    gerenciaMarcas: (idContenedor, idContenedorProductos)=>{
        
        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
            
        let strdata = '';
        
        axios.post('/productos/marcas')
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                    strdata = strdata + `
                    <div class="card">
                        <div class="row">
                            <div class="col-10">
                                <h3 class="text-info">${rows.DESMARCA}</h3>    
                            </div>
                            <div class="col-1 text-right">
                                <button class="btn btn-info btn-circle btn-md" onclick="getProductosMarca('${rows.CODMARCA}','${idContenedorProductos}');">
                                    +
                                </button>    
                            </div>
                        </div>
                    </div>
                    `
            })
            container.innerHTML = strdata;
            
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
        });
    },
    gerenciaProductos: (filtro, idContenedor)=>{
        
        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
            
        let strdata = '';
        
        axios.post('/productos/listado',{filtro:filtro})
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                let classHabilitado = '';
                if(rows.NOHABILITADO==0){classHabilitado=''}else{classHabilitado='bg-warning'}
                    strdata = strdata + `
                    <tr class='${classHabilitado}'>
                        <td>${rows.DESPROD}
                            <br>
                            <small>Cod:<b>${rows.CODPROD}</b> - uxc:${rows.EQUIVALEINV}</small>
                            <br>
                            <small>Costo:<b>${funciones.setMoneda(rows.COSTO,'Q')}</b> - UF:<b>${rows.LASTUPDATE.replace('T00:00:00.000Z','')}</b></small>
                        </td>
                        <td>
                            <button class="btn btn-info btn-sm btn-circle" onclick="getOpcionesProducto('${rows.CODPROD}','${rows.DESPROD}',${rows.NOHABILITADO});">
                                +
                            </button>
                        </td>
                    </tr>
                    `
            })
            container.innerHTML = strdata;
            
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
        });
    },
    gerenteRankingVendedores: (fecha,idContenedor, idLbTotal)=>{
        
        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;

        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';
            
        let strdata = '';
        let tblHead = `<table class="table table-responsive table-striped table-hover table-bordered">
                        <thead class="bg-trans-gradient text-white">
                            <tr>
                                <td>Vendedor</td>
                                <td>Venta</td>
                                <td>Pedidos</td>
                                <td>Promedio</td>
                            </tr>
                        </thead>
                        <tbody>`;
        let tblFoot = `</tbody></table>`;

        axios.post('/ventas/rptrankingvendedoressucursal', {
            fecha:fecha,
            sucursal: GlobalCodSucursal
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    total = total + Number(rows.TOTALPRECIO);
                    let promedio = Number(rows.TOTALPRECIO) / Number(rows.PEDIDOS);
                    strdata = strdata + `
                    <tr>
                        <td>${rows.NOMVEN}</td>
                        <td>${funciones.setMoneda(rows.TOTALPRECIO,'Q')}</td>
                        <td>${rows.PEDIDOS}</td>
                        <td>${funciones.setMoneda(promedio,'Q')}</td>
                    </tr>
                    `
            })
            container.innerHTML = tblHead + strdata + tblFoot;
            lbTotal.innerText = funciones.setMoneda(total,'Q ');
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            lbTotal.innerText = 'Q 0.00'
            strdata = '';
            container.innerHTML = '';
        });
    },
    gerenteRankingVendedoresMes: (anio,mes,idContenedor, idLbTotal)=>{
        
        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;

        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';
            
        let strdata = '';
        let tblHead = `<table class="table table-responsive table-striped table-hover table-bordered">
                        <thead class="bg-trans-gradient text-white">
                            <tr>
                                <td>Vendedor</td>
                                <td>Venta</td>
                                <td>Pedidos</td>
                                <td>Promedio</td>
                            </tr>
                        </thead>
                        <tbody>`;
        let tblFoot = `</tbody></table>`;

        axios.post('/ventas/rptrankingvendedoressucursalmes', {
            anio:anio,
            mes:mes,
            sucursal: GlobalCodSucursal
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    total = total + Number(rows.TOTALPRECIO);
                    let promedio = Number(rows.TOTALPRECIO) / Number(rows.PEDIDOS);
                    strdata = strdata + `
                    <tr>
                        <td>${rows.NOMVEN}</td>
                        <td>${funciones.setMoneda(rows.TOTALPRECIO,'Q')}</td>
                        <td>${rows.PEDIDOS}</td>
                        <td>${funciones.setMoneda(promedio,'Q')}</td>
                    </tr>
                    `
            })
            container.innerHTML = tblHead + strdata + tblFoot;
            lbTotal.innerText = funciones.setMoneda(total,'Q ');
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            lbTotal.innerText = 'Q 0.00'
            strdata = '';
            container.innerHTML = '';
        });
    },
    gerenteMarcas: async(fecha,idContenedor,idLbTotal)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';

        let strdata = '';
        let tbl = `<table class="table table-responsive table-striped table-hover table-bordered">
                        <thead class="bg-trans-gradient text-white">
                        <tr>
                            <td>Marca</td>
                            <td>Costo</td>
                            <td>Precio</td>
                            <td>Utilidad</td>
                            <td>Margen</td>
                        </tr>
                        </thead>
                        <tbody>`;

        let tblfoot = `</tbody></table>`;

        axios.post('/ventas/reportemarcasfecha', {
            sucursal: GlobalCodSucursal,
            fecha:fecha
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                let utilidad = 0; let margen = 0;
                utilidad = Number(rows.TOTALPRECIO) - Number(rows.TOTALCOSTO);
                margen = (Number(utilidad) / Number(rows.TOTALCOSTO))*100;
                total = total + Number(rows.TOTALPRECIO);
                strdata = strdata + `<tr>
                                        <td>
                                            ${rows.DESMARCA}
                                        </td>
                                        <td>
                                            ${funciones.setMoneda(rows.TOTALCOSTO,'Q')}
                                        </td>
                                        <td>
                                            ${funciones.setMoneda(rows.TOTALPRECIO,'Q')}
                                        </td>
                                        <td>
                                            ${funciones.setMoneda(utilidad,'Q')}
                                        </td>
                                        <td>
                                            ${funciones.setMargen(margen,' %')}
                                        </td>
                                    </tr>`
            })
            container.innerHTML = tbl + strdata + tblfoot;
            lbTotal.innerText = funciones.setMoneda(total,'Q ');
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
           
    },
    gerenteMarcasMes: async(anio,mes,idContenedor,idLbTotal)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';

        let strdata = '';
        let tbl = `<table class="table table-responsive table-striped table-hover table-bordered">
                        <thead class="bg-trans-gradient text-white">
                            <tr>
                                <td>Marca</td>
                                <td>Costo</td>
                                <td>Precio</td>
                                <td>Utilidad</td>
                                <td>Margen</td>
                            </tr>
                        </thead>
                        <tbody>`;

        let tblfoot = `</tbody></table>`;

        axios.post('/ventas/reportemarcasmes', {
            sucursal: GlobalCodSucursal,
            anio:anio,
            mes:mes   
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    let utilidad = 0; let margen = 0;
                    utilidad = Number(rows.TOTALPRECIO) - Number(rows.TOTALCOSTO);
                    margen = (Number(utilidad) / Number(rows.TOTALCOSTO))*100;
                    total = total + Number(rows.TOTALPRECIO);
                    strdata = strdata + `<tr>
                                            <td>
                                                ${rows.DESMARCA}
                                            </td>
                                            <td>
                                                ${funciones.setMoneda(rows.TOTALCOSTO,'Q')}
                                            </td>
                                            <td>
                                                ${funciones.setMoneda(rows.TOTALPRECIO,'Q')}
                                            </td>
                                            <td>
                                                ${funciones.setMoneda(utilidad,'Q')}
                                            </td>
                                            <td>
                                                ${funciones.setMargen(margen,' %')}
                                            </td>
                                        </tr>`
            })
            container.innerHTML = tbl + strdata + tblfoot;
            lbTotal.innerText = funciones.setMoneda(total,'Q ');
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
           
    },
    gerenteStatusGpsVentas: async(idContenedor,tipoempleado)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
    
        let tbl = `<div class="mapcontainer2" id="mapcontainer"></div>`;        
        
        container.innerHTML = tbl;
        
        let mapcargado = 0;

        axios.post('/empleados/statusempleado', {
            sucursal: GlobalCodSucursal,
            tipoempleado:tipoempleado
        })
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                    if(mapcargado==0){
                        map = Lmap(rows.LAT, rows.LONG, rows.VENDEDOR, rows.TELEFONO,rows.HORAMIN);
                        mapcargado = 1;
                    }else{
                        L.marker([rows.LAT, rows.LONG])
                        .addTo(map)
                        .bindPopup(`${rows.VENDEDOR} - <br>Tel:${rows.TELEFONO} - Updated:${rows.HORAMIN} hrs`, {closeOnClick: false, autoClose: false})
                        .openPopup()   
                    }
            })
          
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            container.innerHTML = '';
        });
    },
    supervisorRankingVendedores: (fecha,idContenedor, idLbTotal)=>{
        
        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;

        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';
            
        let strdata = '';
        let tblHead = `<table class="table table-responsive table-striped table-hover table-bordered">
                        <thead class="bg-trans-gradient text-white">
                            <tr>
                                <td>Vendedor</td>
                                <td>Venta</td>
                                <td>Pedidos</td>
                                <td>Promedio</td>
                            </tr>
                        </thead>
                        <tbody>`;
        let tblFoot = `</tbody></table>`;

        axios.post('/ventas/rptrankingvendedoressucursal', {
            fecha:fecha,
            sucursal: GlobalCodSucursal
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    total = total + Number(rows.TOTALPRECIO);
                    let promedio = Number(rows.TOTALPRECIO) / Number(rows.PEDIDOS);
                    strdata = strdata + `
                    <tr>
                        <td>${rows.NOMVEN}</td>
                        <td>${funciones.setMoneda(rows.TOTALPRECIO,'Q')}</td>
                        <td>${rows.PEDIDOS}</td>
                        <td>${funciones.setMoneda(promedio,'Q')}</td>
                    </tr>
                    `
            })
            container.innerHTML = tblHead + strdata + tblFoot;
            lbTotal.innerText = funciones.setMoneda(total,'Q ');
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            lbTotal.innerText = 'Q 0.00'
            strdata = '';
            container.innerHTML = '';
        });
    },
    supervisorRankingVendedoresMes: (anio,mes,idContenedor, idLbTotal)=>{
        
        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;

        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';
            
        let strdata = '';
        let tblHead = `<table class="table table-responsive table-striped table-hover table-bordered">
                        <thead class="bg-trans-gradient text-white">
                            <tr>
                                <td>Vendedor</td>
                                <td>Venta</td>
                                <td>Pedidos</td>
                                <td>Promedio</td>
                            </tr>
                        </thead>
                        <tbody>`;
        let tblFoot = `</tbody></table>`;

        axios.post('/ventas/rptrankingvendedoressucursalmes', {
            anio:anio,
            mes:mes,
            sucursal: GlobalCodSucursal
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    total = total + Number(rows.TOTALPRECIO);
                    let promedio = Number(rows.TOTALPRECIO) / Number(rows.PEDIDOS);
                    strdata = strdata + `
                    <tr>
                        <td>${rows.NOMVEN}</td>
                        <td>${funciones.setMoneda(rows.TOTALPRECIO,'Q')}</td>
                        <td>${rows.PEDIDOS}</td>
                        <td>${funciones.setMoneda(promedio,'Q')}</td>
                    </tr>
                    `
            })
            container.innerHTML = tblHead + strdata + tblFoot;
            lbTotal.innerText = funciones.setMoneda(total,'Q ');
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            lbTotal.innerText = 'Q 0.00'
            strdata = '';
            container.innerHTML = '';
        });
    },
    supervisorMarcas: async(fecha,idContenedor,idLbTotal)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';

        let strdata = '';
        let tbl = `<table class="table table-responsive table-striped table-hover table-bordered">
                        <thead class="bg-trans-gradient text-white">
                        <tr>
                            <td>Marca</td>
                            <td>Importe</td>
                        </tr>
                        </thead>
                        <tbody>`;

        let tblfoot = `</tbody></table>`;

        axios.post('/ventas/reportemarcasfecha', {
            sucursal: GlobalCodSucursal,
            fecha:fecha
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    total = total + Number(rows.TOTALPRECIO);
                    strdata = strdata + `<tr>
                                            <td>${rows.DESMARCA}</td>
                                            <td>${funciones.setMoneda(rows.TOTALPRECIO,'Q')}</td>
                                        </tr>`
            })
            container.innerHTML = tbl + strdata + tblfoot;
            lbTotal.innerText = funciones.setMoneda(total,'Q ');
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
           
    },
    supervisorMarcasMes: async(anio,mes,idContenedor,idLbTotal)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';

        let strdata = '';
        let tbl = `<table class="table table-responsive table-striped table-hover table-bordered">
                        <thead class="bg-trans-gradient text-white">
                            <tr>
                                <td>Marca</td>
                                <td>Importe</td>
                            </tr>
                        </thead>
                        <tbody>`;

        let tblfoot = `</tbody></table>`;

        axios.post('/ventas/reportemarcasmes', {
            sucursal: GlobalCodSucursal,
            anio:anio,
            mes:mes   
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    total = total + Number(rows.TOTALPRECIO);
                    strdata = strdata + `<tr>
                                            <td>
                                                ${rows.DESMARCA}
                                            </td>
                                            <td>
                                                ${funciones.setMoneda(rows.TOTALPRECIO,'Q')}
                                            </td>
                                        </tr>`
            })
            container.innerHTML = tbl + strdata + tblfoot;
            lbTotal.innerText = funciones.setMoneda(total,'Q ');
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
           
    },
    supervisorStatusGpsVentas: async(idContenedor)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
    
        let tbl = `<div class="mapcontainer2" id="mapcontainer"></div>`;        
        
        container.innerHTML = tbl;
        
        let mapcargado = 0;

        axios.post('/empleados/statusempleado', {
            sucursal: GlobalCodSucursal,
            tipoempleado:'VENDEDOR'
        })
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                    if(mapcargado==0){
                        map = Lmap(rows.LAT, rows.LONG, rows.VENDEDOR, rows.TELEFONO,rows.HORAMIN);
                        mapcargado = 1;
                    }else{
                        L.marker([rows.LAT, rows.LONG])
                        .addTo(map)
                        .bindPopup(`${rows.VENDEDOR} - Tel:${rows.TELEFONO} - Updated:${rows.HORAMIN}`, {closeOnClick: false, autoClose: false})
                        .openPopup()   
                    }
            })
          
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            container.innerHTML = '';
        });
    },
    productosSetStatus: (codprod,st)=>{
        return new Promise((resolve,reject)=>{
            axios.put('/productos/status',{codprod:codprod,status:st})
            .then((response) => {
                console.log(response);
               resolve();             
            }, (error) => {
                reject();
            });


        })
        
    },
    productosEditDetalle : (data)=>{
        return new Promise((resolve,reject)=>{
            axios.put('/productos/detalles',data)
            .then((response) => {
                console.log(response);
               resolve();             
            }, (error) => {
                reject();
            });


        })
    },
    productosGetDetalle: (codprod,idDesprod,idUxc,idMarca,idClaseUno,idClaseDos,idClaseTres)=>{
        axios.post('/productos/detalles',{codprod:codprod})
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                document.getElementById(idDesprod).value = rows.DESPROD;
                document.getElementById(idUxc).value = rows.EQUIVALEINV;
                document.getElementById(idMarca).value = rows.CODMARCA;
                document.getElementById(idClaseUno).value = rows.CODCLAUNO;
                document.getElementById(idClaseDos).value = rows.CODCLADOS;
                document.getElementById(idClaseTres).value = rows.CODCLATRES;
            })
                        
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
        });
    },
    productosComboMarcas: (idContainer)=>{
        let container = document.getElementById(idContainer);
        let strdata = '';
        axios.post('/productos/marcas')
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                    strdata = strdata + `
                    <option value="${rows.CODMARCA}">${rows.DESMARCA}</option>
                    `
            })
            container.innerHTML = strdata;
            
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
        });
    },
    productosComboClaseUno: (idContainer)=>{
        let container = document.getElementById(idContainer);
        let strdata = '';
        axios.post('/productos/claseuno')
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                    strdata = strdata + `
                    <option value="${rows.COD}">${rows.DES}</option>
                    `
            })
            container.innerHTML =  strdata;
            
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
        });
    },
    productosComboClaseDos: (idContainer)=>{
        let container = document.getElementById(idContainer);
        let strdata = '';
        axios.post('/productos/clasedos')
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                    strdata = strdata + `
                    <option value="${rows.COD}">${rows.DES}</option>
                    `
            })
            container.innerHTML =  strdata;
            
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
        });
    },
    productosComboClaseTres: (idContainer)=>{
        let container = document.getElementById(idContainer);
        let strdata = '';
        axios.post('/productos/clasetres')
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                    strdata = strdata + `
                    <option value="${rows.COD}">${rows.DES}</option>
                    `
            })
            container.innerHTML = strdata;
            
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = strdata;
        });
    },
    productosGetPrecios: (codprod,idContainer)=>{
        let container = document.getElementById(idContainer);
        container.innerHTML = GlobalLoader;
        let str = '';

        axios.post('/productos/preciosproducto',{codprod:codprod})
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                str = str + `
                    <tr>
                        <td>${rows.CODMEDIDA}</td>
                        <td>${rows.EQUIVALE}</td>
                        <td>${rows.COSTO}</td>
                        <td>${rows.PPUBLICO}</td>
                        <td>${rows.PMAYOREOC}</td>
                        <td>${rows.PMAYOREOB}</td>
                        <td>${rows.PMAYOREOA}</td>
                        <td>
                            <button class="btn btn-warning btn-circle" 
                            onclick="getPrecioEditar('${rows.CODPROD}','${rows.CODMEDIDA}',${rows.COSTO},${rows.EQUIVALE},${rows.PPUBLICO},${rows.PMAYOREOC},${rows.PMAYOREOB},${rows.PMAYOREOA});">
                                <i class="fa fa-check"></i>
                            </button>
                        </td>
                    </tr>
                `
            })
            container.innerHTML = str;  
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            container.innerHTML = '';
        });
    },
    productosSetPrecio: (codprod,codmedida,costo,equivale,ppublico,pmayoreoc,pmayoreob,pmayoreoa)=>{
        return new Promise((resolve,reject)=>{
            axios.put('/productos/precio',{
                codprod:codprod,
                codmedida:codmedida,
                costo:costo,
                equivale:equivale,
                ppublico:ppublico,
                pmayoreoc: pmayoreoc,
                pmayoreob:pmayoreob,
                pmayoreoa:pmayoreoa
            })
            .then((response) => {
                
               resolve();             
            }, (error) => {
                reject();
            });


        })
        
    },
    digitadorPedidosTipoprecio: async(sucursal,codven,idContenedor)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
                
        let strdata = '';
     
        axios.post('/digitacion/pedidostipoprecio', {
            sucursal: sucursal,
            codven:codven
        })
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                    strdata = strdata + `
                            <tr>
                                <td><b class="text-danger">${rows.CODDOC + '-' + rows.CORRELATIVO}<b>
                                    <br>
                                    <small>${rows.FECHA.toString().replace('T00:00:00.000Z','')}</small>
                                </td>
                                <td>${rows.DESPROD}
                                    <br>
                                    <small class="text-info">${rows.CODPROD}</small>
                                </td>
                                <td>${rows.CODMEDIDA}
                                    <br>
                                    TipoP:<b class="text-danger">${rows.TIPOPRECIO}</b>
                                </td>
                                <td>${rows.CANTIDAD}</td>
                                <td>
                                    <small>${funciones.setMoneda(rows.PRECIO,'Q')}</small>    
                                </td>
                                <td>
                                    ${funciones.setMoneda(rows.TOTALPRECIO,'Q')}    
                                </td>
                            </tr>`
            })
            container.innerHTML = strdata;
            
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
        });
           
    },
    digitadorBloquearPedido: async(sucursal,codven,coddoc,correlativo)=>{
        
        return new Promise((resolve,reject)=>{
            axios.put('/digitacion/pedidobloquear',{
                sucursal:sucursal,
                coddoc:coddoc,
                correlativo:correlativo,
                codven:codven
            })
            .then((response) => {
                
               resolve();             
            }, (error) => {
                
                reject();
            });


        })
    },
    digitadorConfirmarPedido: async(sucursal,codven,coddoc,correlativo,embarque)=>{
        return new Promise((resolve,reject)=>{
            axios.put('/digitacion/pedidoconfirmar',{
                sucursal:sucursal,
                coddoc:coddoc,
                correlativo:correlativo,
                codven:codven,
                embarque:embarque
            })
            .then((response) => {
                
               resolve();             
            }, (error) => {
                
                reject();
            });

        })
    },
    digitadorComboEmbarques : async(idContainer)=>{
        
        let container = document.getElementById(idContainer);
                
        let strdata = '<option value="">SELECCIONE EMBARQUE</option>';

        axios.post('/digitacion/embarquespendientes', {
            sucursal: GlobalCodSucursal
        })
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                strdata = strdata + `
                            <option value='${rows.CODEMBARQUE}'>
                                ${rows.CODEMBARQUE}-${rows.RUTA}
                            </option>
                            `
            })
            container.innerHTML = strdata;
            
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            container.innerHTML = '';            
        });
    },
    digitadorPicking : async(embarque,idContenedor,idLbTotal)=>{
        
        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';
        
        let strdata = '';
        let tblhead = `
                <thead class="bg-trans-gradient text-white">
                    <tr>
                        <td>Vendedor</td>
                        <td>Pedido</td>
                        <td>Cliente</td>
                        <td>Importe</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>`;

        let totalpedidos = 0;
        axios.post('/digitacion/pickingdocumentos', {
            sucursal: GlobalCodSucursal,
            embarque:embarque
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    total = total + Number(rows.TOTALPRECIO);
                    totalpedidos = totalpedidos + 1;
                    
                    strdata = strdata + `
                            <tr>
                                <td>${rows.VENDEDOR}</td>
                                <td>
                                    ${rows.CODDOC + '-' + rows.CORRELATIVO}
                                    <br>
                                    <small class="text-danger">${rows.FECHA.toString().replace('T00:00:00.000Z','')}</small>
                                </td>
                                <td>${rows.CLIENTE}</td>
                                <td>
                                    <b>${funciones.setMoneda(rows.TOTALPRECIO,'Q')}</b>
                                </td>
                                <td>
                                    <button class="btn btn-danger btn-sm btn-circle" onclick="QuitarPedidoPicking('${rows.CODDOC}','${rows.CORRELATIVO}',${rows.CODVEN})">
                                        x
                                    </button>
                                </td>
                            </tr>`
            })
            container.innerHTML = tblhead + strdata + '</tbody>';
            lbTotal.innerText = `${funciones.setMoneda(total,'Q ')} - Peds:${totalpedidos} - Prom:${funciones.setMoneda((Number(total)/Number(totalpedidos)),'Q')}`;
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
    },
    digitadorPickingProductos : async(embarque,idContenedor,idLbTotal)=>{
        
        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';
        
        let strdata = '';
        let tblhead = `
                <thead class="bg-trans-gradient text-white">
                    <tr>
                        <td>Código</td>
                        <td>Producto</td>
                        <td>uxc</td>
                        <td>Cajas</td>
                        <td>Unidades</td>
                        <td>Importe</td>
                    </tr>
                </thead>
                <tbody>`;

        let totalpedidos = 0;
        axios.post('/digitacion/pickingproductos', {
            sucursal: GlobalCodSucursal,
            embarque:embarque
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                    total = total + Number(rows.TOTALPRECIO);
                    totalpedidos = totalpedidos + 1;
                    
                    strdata = strdata + `
                            <tr>
                                <td>${rows.CODPROD}</td>
                                <td>${rows.DESPROD}</td>
                                <td>${rows.UXC}</td>
                                <td>${Math.floor(rows.CAJAS)}</td>
                                <td>${ Math.floor((Number(rows.CAJAS)- Math.floor(rows.CAJAS)) * Number(rows.UXC)) }</td>
                                <td>
                                    <b class="text-danger">${funciones.setMoneda(rows.TOTALPRECIO,'Q')}</b>
                                </td>
                            </tr>`
            })
            container.innerHTML = tblhead + strdata + '</tbody>';
            lbTotal.innerText = `${funciones.setMoneda(total,'Q ')} - Items:${totalpedidos}`;
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
    },
    digitadorQuitarPedidoPicking : async (coddoc,correlativo,codven)=>{
        
                return new Promise((resolve,reject)=>{
                    axios.put('/digitacion/pedidoregresar',{
                        sucursal:GlobalCodSucursal,
                        coddoc:coddoc,
                        correlativo:correlativo,
                        codven:codven
                    })
                    .then((response) => {
                        
                        resolve();             
                    }, (error) => {
                        
                        reject();
                    });
        
                })
    },
    repartidorComboEmbarques : async(idContainer)=>{
        
            let container = document.getElementById(idContainer);
                
            let strdata = '<option value="">SELECCIONE EMBARQUE</option>';
    
            axios.post('/digitacion/embarquesrepartidor', {
                sucursal: GlobalCodSucursal,
                codrepartidor:GlobalCodUsuario
            })
            .then((response) => {
                const data = response.data.recordset;
                data.map((rows)=>{
                    strdata = strdata + `
                                <option value='${rows.CODEMBARQUE}'>
                                    ${rows.CODEMBARQUE}-${rows.RUTA}
                                </option>
                                `
                })
                container.innerHTML = strdata;
        
            }, (error) => {
                funciones.AvisoError('Error en la solicitud');
                container.innerHTML = '';            
        
            });

        
    },
    usuariosGetListado: (tipo,idContenedor)=>{
        
        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let strdata = '';
        
        axios.post('/usuarios/listado', {
            sucursal: GlobalCodSucursal,
            tipo:tipo
        })
        .then((response) => {
            const data = response.data.recordset;        
            data.map((rows)=>{
                    strdata = strdata + `
                            <tr>
                                <td>${rows.USUARIO}
                                    <br>
                                    <small>Codigo:${rows.CODIGO}</small>
                                </td>
                                <td>${rows.CLAVE}</td>
                                <td>${rows.CODDOC}</td>
                                <td>${rows.TELEFONO}</td>
                                <td>
                                    <button class="btn btn-sm btn-circle btn-info"
                                    onclick="editUser(${rows.ID},${rows.CODIGO},'${rows.USUARIO}','${rows.CLAVE}','${rows.CODDOC}','${rows.TELEFONO}');">
                                    +
                                    </button>
                                </td>
                            </tr>`
            })
            container.innerHTML = strdata;
        
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
            container.innerHTML = '';
            
        });
    },
    usuariosNuevo:(codigo,usuario,clave,coddoc,telefono,tipo)=>{
        
        return new Promise((resolve,reject)=>{
            axios.post('/usuarios/nuevo',{
                sucursal:GlobalCodSucursal,
                codusuario:codigo,
                usuario:usuario,
                clave:clave,
                coddoc:coddoc,
                telefono:telefono,
                tipo:tipo
            })
            .then((response) => {
                
               resolve();             
            }, (error) => {
                
                reject();
            });
        });

    },
    usuariosEditar:(codigo,usuario,clave,coddoc,telefono,tipo)=>{
        
        return new Promise((resolve,reject)=>{
            axios.post('/usuarios/editar',{
                sucursal:GlobalCodSucursal,
                id:GlobalSelectedId,
                codusuario:codigo,
                usuario:usuario,
                clave:clave,
                coddoc:coddoc,
                telefono:telefono,
                tipo:tipo
            })
            .then((response) => {
                
               resolve();             
            }, (error) => {
                
                reject();
            });
        });

    },
    usuariosEliminar:(id,codigo)=>{
        
        return new Promise((resolve,reject)=>{
            axios.post('/usuarios/eliminar',{
                sucursal:GlobalCodSucursal,
                id:id,
                codven:codigo
            })
            .then((response) => {
                let data = response.data;
                if(Number(data.rowsAffected[0])>0){
                    resolve();             
                }else{
                    reject();
                }
               
            }, (error) => {
                
                reject();
            });
        });

    },
    updateClientesLastSale:(nitclie,visita)=>{
        return new Promise((resolve,reject)=>{
            axios.post('/clientes/lastsale',{
                sucursal:GlobalCodSucursal,
                nitclie:nitclie,
                fecha:funciones.getFecha(),
                visita:visita
            })
            .then((response) => {               
                socket.emit('clientes ultimaventa',GlobalCodSucursal, GlobalSelectedForm);
                resolve();             
            }, (error) => {
                reject();
            });
        });
    }
}
