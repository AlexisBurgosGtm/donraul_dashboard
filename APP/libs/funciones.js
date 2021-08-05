let funciones = {
  convertDate2(date) {
    const [yy, mm, dd] = date.split(/-/g);
    return `${dd}/${mm}/${yy}`.replace('T00:00:00.000Z', '');
  },
  getHora(){
    let f = new Date(); 
    let h = f.getHours();
    let m = f.getMinutes();
    return `${h.toString()}:${m.toString()}`;
  },
    GetDataNit: async (idNit,idCliente,idDireccion)=>{

      return new Promise((resolve, reject) => {
        let nit = document.getElementById(idNit).value;                    
        let url = 'https://free.feel.com.gt/api/v1/obtener_contribuyente';
        
        axios.post(url,{nit: nit})
        .then((response) => {
            let json = response.data;
            console.log(response.data);
            
            //document.getElementById(idCliente).value = json.descripcion;
            //document.getElementById(idDireccion).value = json.direcciones.direccion;    

            resolve(json);
        }, (error) => {
            console.log(error);
            reject();
        });
  


      });

      /*
      let nit = document.getElementById(idNit).value;
      var data =JSON.stringify({
        nit: nit
      });
      var peticion = new Request('https://free.feel.com.gt/api/v1/obtener_contribuyente', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: data
      });
      const response = await fetch(peticion)
      const json = await response.json();
      document.getElementById(idCliente).value = json.descripcion;
      document.getElementById(idDireccion).value = json.direcciones.direccion;
      */
    },
    instalationHandlers: (idBtnInstall)=>{
      //INSTALACION APP
      let btnInstalarApp = document.getElementById(idBtnInstall);
      btnInstalarApp.hidden = true;

      let capturedInstallEvent;
      window.addEventListener('beforeinstallprompt',(e)=>{
        e.preventDefault();
        btnInstalarApp.hidden = false;
        capturedInstallEvent = e;
      });
      btnInstalarApp.addEventListener('click',(e)=>{
        capturedInstallEvent.prompt();
      capturedInstallEvent.userChoice.then((choice)=>{
          //solicita al usuario confirmacion para instalar
      })
    })
    //INSTALACION APP
    },
    Confirmacion: function(msn){
        return swal({
            title: 'Confirme',
            text: msn,
            icon: 'warning',
            buttons: {
                cancel: true,
                confirm: true,
              }})
    },
    Aviso: function(msn){
        swal(msn, {
            timer: 1500,
            icon: "success",
            buttons: false
            });

        try {
            navigator.vibrate(500);
        } catch (error) {
            
        }
    },
    AvisoError: function(msn){
        swal(msn, {
            timer: 1500,
            icon: "error",
            buttons: false
            });
        try {
            navigator.vibrate([100,200,500]);
        } catch (error) {
            
        }
    },
    getPassword : (titulo,nivel)=>{
      if(nivel==1){
        return new Promise(async(resolve,reject)=>{

          const { value: password } =  await Swal.fire({
            title: 'Escriba su contraseña',
            input: 'password',
            inputLabel: 'Password',
            inputPlaceholder: 'Escriba aqui...',
            inputAttributes: {
              maxlength: 10,
              autocapitalize: 'off',
              autocorrect: 'off'
            }
          })
          
          if (password) {
            if(password==GlobalPassUsuario){
              resolve(password);
            }else{
              reject('no');
            }
          }else{
            reject('no');
          }

        })

      }else{
        funciones.AvisoError('Usted no tiene permiso de realizar esta acción');
      }
      
    },
    FiltrarListaProductos: function(idTabla){
        swal({
          text: 'Escriba para buscar...',
          content: "input",
          button: {
            text: "Buscar",
            closeModal: true,
          },
        })
        .then(name => {
          if (!name) throw null;
            funciones.FiltrarTabla(idTabla,name);

            //'tblProductosVentas'
        })
    },
    setMoneda: function(num,signo) {
        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num)) num = "0";
        let sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        let cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10) cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
        return (((sign) ? '' : '-') + signo + ' ' + num + ((cents == "00") ? '' : '.' + cents)).toString();
    },
    loadScript: function(url, idContainer) {
        return new Promise((resolve, reject) => {
          var script = document.createElement('script');
          script.src = url;
    
          script.onload = resolve;
          script.onerror = reject;
             
          document.getElementById(idContainer).appendChild(script)
        });
    },
    loadCss: function(url, idContainer) {
        return new Promise((resolve, reject) => {
          var link = document.createElement('link');
          //script.async = true;
          link.href = url;
          link.rel = "stylesheet"
    
          link.onload = resolve;
          link.onerror = reject;
             
          document.getElementById(idContainer).appendChild(link)
        });
    },
    fetchData: (url)=>{
        fetch(url)
            .then(function(response) {
                return response.json();
                                    })
            .catch();
    },
    loadView: (url, idContainer)=> {
        return new Promise((resolve, reject) => {
            
            let contenedor = document.getElementById(idContainer);

            axios.get(url)
            .then((response) => {
                contenedor.innerHTML ='';
                contenedor.innerHTML = response.data;
                resolve();
            }, (error) => {
                console.log(error);
                reject();
            });
      
          });
    },
    hablar: function(msn){
        var utterance = new SpeechSynthesisUtterance(msn);
        return window.speechSynthesis.speak(utterance); 
    },
    CompaniaTelefono: function(numero,hablado){
        var rangos = [[30000000,32289999,"TIGO"],
        [32290000,32299999,"CLARO"],
        [32300000,33099999,"TIGO"],
        [34000000,34499999,"MOVISTAR"],
        [40000000,40999999,"TIGO"],
        [41000000,42999999,"CLARO"],
        [43000000,44759999,"MOVISTAR"],
        [44760000,46999999,"TIGO"],
        [47000000,47729999,"CLARO"],
        [47730000,48199999,"TIGO"],
        [48200000,48219999,"UNITEL"],
        [48220000,50099999,"TIGO"],
        [50100000,50199999,"CLARO"],
        [50200000,50299999,"MOVISTAR"],
        [50300000,50699999,"TIGO"],
        [50700000,51099999,"MOVISTAR"],
        [51100000,51399999,"CLARO"],
        [51400000,51499999,"MOVISTAR"],
        [51500000,51999999,"TIGO"],
        [52000000,52099999,"TIGO"],
        [52100000,52999999,"MOVISTAR"],
        [53000000,53099999,"TIGO"],
        [53100000,53119999,"CLARO"],
        [53120000,53139999,"MOVISTAR"],
        [53140000,53899999,"TIGO"],
        [53900000,54099999,"MOVISTAR"],
        [54100000,54999999,"CLARO"],
        [55000000,55099999,"MOVISTAR"],
        [55100000,55179999,"CLARO"],
        [55180000,55199999,"MOVISTAR"],
        [55210000,55299999,"TIGO"],
        [55310000,55399999,"CLARO"],
        [55400000,55429999,"MOVISTAR"],
        [55430000,55449999,"CLARO"],
        [55450000,55499999,"MOVISTAR"],
        [55500000,55539999,"TIGO"],
        [55540000,55799999,"CLARO"],
        [55800000,55819999,"TIGO"],
        [55820000,55999999,"CLARO"],
        [56000000,56089999,"MOVISTAR"],
        [56100000,56399999,"CLARO"],
        [56400000,56899999,"MOVISTAR"],
        [56900000,56999999,"CLARO"],
        [57000000,57099999,"TIGO"],
        [57100000,57189999,"CLARO"],
        [57190000,57899999,"TIGO"],
        [57900000,57999999,"MOVISTAR"],
        [58000000,58099999,"TIGO"],
        [58100000,58189999,"CLARO"],
        [58190000,58199999,"TIGO"],
        [58200000,58799999,"CLARO"],
        [58800000,59099999,"TIGO"],
        [59100000,59149999,"CLARO"],
        [59150000,59179999,"MOVISTAR"],
        [59180000,59199999,"TIGO"],
        [59200000,59899999,"CLARO"],
        [59900000,59999999,"TIGO"]],

    lengthRangos = rangos.length;

    var num = numero;
    let len = num.length; 
    let nnum = parseInt(num,10);
    let found;

    if (len == 8 ) {
    for (var i = lengthRangos - 1; i >= 0; i--) {
    if (rangos[i][0] <= nnum && nnum <= rangos[i][1]) {
        if (hablado=='SI'){     
            funciones.hablar("Su línea telefónica es " + rangos[i][2]);
        }else{
            return rangos[i][2];
        }
        found = true;
    }
    };

    if (!found) {
    if (hablado=='SI'){ 
        funciones.hablar("El número indicado no aparece en la lista");
    }else{
        return "No Disponible";
    }
    }

    } else {
    return "Ingrese 8 dígitos";
    }
    },
    crearBusquedaTabla: function(idTabla,idBusqueda){
    var tableReg = document.getElementById(idTabla);
    var searchText = document.getElementById(idBusqueda).value.toLowerCase();
      var cellsOfRow="";
      var found=false;
      var compareWith="";
   
      // Recorremos todas las filas con contenido de la tabla
        for (var i = 1; i < tableReg.rows.length; i++)
                {
                  cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
                    found = false;
                    // Recorremos todas las celdas
                    for (var j = 0; j < cellsOfRow.length && !found; j++)
                    {
                      compareWith = cellsOfRow[j].innerHTML.toLowerCase();
                      // Buscamos el texto en el contenido de la celda
                      if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1))
                      {
                          found = true;
                      }
                  }
                  if(found)
                  {
                      tableReg.rows[i].style.display = '';
                  } else {
                      // si no ha encontrado ninguna coincidencia, esconde la
                      // fila de la tabla
                      tableReg.rows[i].style.display = 'none';
                  }
              }
    },
    FiltrarTabla: function(idTabla,idfiltro){
    var tableReg = document.getElementById(idTabla);
    let filtro = document.getElementById(idfiltro).value;

    var searchText = filtro.toLowerCase();
      var cellsOfRow="";
      var found=false;
      var compareWith="";
   
      // Recorremos todas las filas con contenido de la tabla
        for (var i = 1; i < tableReg.rows.length; i++)
                {
                  cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
                    found = false;
                    // Recorremos todas las celdas
                    for (var j = 0; j < cellsOfRow.length && !found; j++)
                    {
                      compareWith = cellsOfRow[j].innerHTML.toLowerCase();
                      // Buscamos el texto en el contenido de la celda
                      if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1))
                      {
                          found = true;
                      }
                  }
                  if(found)
                  {
                      tableReg.rows[i].style.display = '';
                  } else {
                      // si no ha encontrado ninguna coincidencia, esconde la
                      // fila de la tabla
                      tableReg.rows[i].style.display = 'none';
                  }
              }
        //funciones.scrollUp(1000, 'easing');
    },
    OcultarRows: function(idTabla){
    var tableReg = document.getElementById(idTabla);
        // Recorremos todas las filas con contenido de la tabla
        for (var i = 1; i < tableReg.rows.length; i++)
        {
            if(i>15){
                tableReg.rows[i].style.display = 'none';
            }
        }
    },
    PingInternet: async (url)=>{
    var peticion = new Request(url, {
        method: 'POST',
        headers: new Headers({
            // Encabezados
           'Content-Type': 'application/json'
        })
      });

      await fetch(peticion)
         .then(function(res) {
           if (res.status==200)
               {
                   funciones.hablar('parece que ya hay internet');
                }
      })
      .catch(
          ()=>{
            funciones.hablar('por lo visto no hay señal');
          }
      )
    },
    NotificacionPersistent : (titulo,msn)=>{

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

        InicializarServiceWorkerNotif();
        
        const options = {
            body : titulo,
            icon: "../favicon.png",
            vibrate: [1,2,3],
          }
          //image: "../favicon.png",
            if (!('Notification' in window) || !('ServiceWorkerRegistration' in window)) {
              console.log('Persistent Notification API not supported!');
              return;
            }
            
            try {
              navigator.serviceWorker.getRegistration()
                .then(reg => 
                        reg.showNotification(msn, options)
                    )
                .catch(err => console.log('Service Worker registration error: ' + err));
            } catch (err) {
              console.log('Notification API error: ' + err);
            }
      
    },
    ObtenerUbicacion: (idlat,idlong)=>{
    let lat = document.getElementById(idlat);
    let long = document.getElementById(idlong);
    
    try {
        navigator.geolocation.getCurrentPosition(function (location) {
            lat.value = location.coords.latitude.toString();
            long.value = location.coords.longitude.toString();
            console.log('obtuvo la ubicacion' + 'lat. ' + location.coords.latitude.toString())
        })
    } catch (error) {
        console.log(error);
        lat.value = '0';
        long.value = '0';
    }
    },
    ComboMeses: ()=>{
    let str =`<option value='1'>Enero</option>
              <option value='2'>Febrero</option>
              <option value='3'>Marzo</option>
              <option value='4'>Abril</option>
              <option value='5'>Mayo</option>
              <option value='6'>Junio</option>
              <option value='7'>Julio</option>
              <option value='8'>Agosto</option>
              <option value='9'>Septiembre</option>
              <option value='10'>Octubre</option>
              <option value='11'>Noviembre</option>
              <option value='12'>Diciembre</option>`
    return str;
    },
    ComboAnio: ()=>{
    let str =`<option value='2017'>2017</option>
              <option value='2018'>2018</option>
              <option value='2019'>2019</option>
              <option value='2020'>2020</option>
              <option value='2021'>2021</option>
              <option value='2022'>2022</option>
              <option value='2023'>2023</option>
              <option value='2024'>2024</option>
              <option value='2025'>2025</option>
              <option value='2026'>2026</option>
              <option value='2027'>2027</option>
              <option value='2028'>2028</option>
              <option value='2029'>2029</option>
              <option value='2030'>2030</option>`
    return str;
    },
    ComboTipoPrecio: ()=>{
      let str =  `<option value="P">PUBLICO</option>
                  <option value="A">MAYORISTA A</option>
                  <option value="B">MAYORISTA B</option>
                  <option value="C">MAYORISTA C</option>`
      return str;
    },
    getFecha(){
      let fecha
      let f = new Date(); let d = f.getDate(); let m = f.getUTCMonth()+1; let y = f.getFullYear();
     
      di = d;
      var D = '0' + di;
      let DDI 
      if(D.length==3){DDI=di}else{DDI=D}
      
      ma = m;
      var MA = '0' + ma;
      let DDM 
      if(MA.length==3){DDM=ma}else{DDM=MA}


      fecha = y + '-' + DDM + '-' + DDI;
      return fecha;
    },
    quitarCaracteres2: (texto) =>{
      texto = texto.replace(/[\\^$.|?*+()[{]/g, "\\$&");
      texto = texto.replace(/\$(?=[$&`"'\d])/g, "$$$$");

      return texto;
      
    },
    quitarCaracteres: ( texto, reemplazarQue, reemplazarCon, ignorarMayMin) =>{
      var reemplazarQue = reemplazarQue.replace(/[\\^$.|?*+()[{]/g, "\\$&"),
      reemplazarCon = reemplazarCon.replace(/\$(?=[$&`"'\d])/g, "$$$$"),
      modif = "g" + (ignorarMayMin ? "i" : ""),
      regex = new RegExp(reemplazarQue, modif);
      return texto.replace(regex,reemplazarCon);
    },
    copyTextToClipboard: (text)=> {
      if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData('Text', text);
      } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
        const textArea = createTextarea(text);
        textArea.focus();
        textArea.select();
    
        try {
          const status = document.execCommand('copy'); // Security exception may be thrown by some browsers.
          if (status) {
            createNotification('Copied text to clipboard');
          }
          return status;
        } catch (ex) {
          console.warn('Copy to clipboard failed.', ex);
          return false;
        } finally {
          document.body.removeChild(textArea);
        }
      }
    },
    devuelveFecha: (idInputFecha)=>{
      let fe = new Date(document.getElementById(idInputFecha).value);
      let ae = fe.getFullYear();
      let me = fe.getUTCMonth()+1;
      let de = fe.getUTCDate() 
      let fret = ae + '-' + me + '-' + de;
      return fret;
    },
    jsonMunicipios : ()=>{
      return [
      {CODMUN:'001',DESMUN:'MAGDALENA MILPAS ALTAS'},
      {CODMUN:'002',DESMUN:'SANTA CRUZ BALANYA'},
      {CODMUN:'003',DESMUN:'IZTAPA'},
      {CODMUN:'004',DESMUN:'PANAJACHEL'},
      {CODMUN:'005',DESMUN:'SAN MATEO'},
      {CODMUN:'006',DESMUN:'GUATEMALA'},
      {CODMUN:'007',DESMUN:'SANTA CATARINA PINULA'},
      {CODMUN:'008',DESMUN:'SAN JOSÉ PINULA'},
      {CODMUN:'009',DESMUN:'SAN JOSÉ DEL GOLFO'},
      {CODMUN:'010',DESMUN:'PALENCIA'},
      {CODMUN:'011',DESMUN:'CHINAUTLA'},
      {CODMUN:'012',DESMUN:'SAN PEDRO AYAMPUC'},
      {CODMUN:'013',DESMUN:'MIXCO'},
      {CODMUN:'014',DESMUN:'SAN PEDRO SACATEPEQUEZ'},
      {CODMUN:'015',DESMUN:'SAN JUAN SACATEPEQUEZ'},
      {CODMUN:'016',DESMUN:'SAN RAYMUNDO'},
      {CODMUN:'017',DESMUN:'CHUARRANCHO'},
      {CODMUN:'018',DESMUN:'FRAIJANES'},
      {CODMUN:'019',DESMUN:'AMATITLÁN'},
      {CODMUN:'020',DESMUN:'VILLA NUEVA'},
      {CODMUN:'021',DESMUN:'VILLA CANALES'},
      {CODMUN:'022',DESMUN:'PETAPA'},
      {CODMUN:'023',DESMUN:'GUASTATOYA'},
      {CODMUN:'024',DESMUN:'MORAZÁN'},
      {CODMUN:'025',DESMUN:'SAN AGUSTÍN ACASAGUASTLÁN'},
      {CODMUN:'026',DESMUN:'SAN CRISTÓBAL ACASAGUASTLÁN'},
      {CODMUN:'027',DESMUN:'EL JÍCARO'},
      {CODMUN:'028',DESMUN:'SANSARE'},
      {CODMUN:'029',DESMUN:'SANARATE'},
      {CODMUN:'030',DESMUN:'SAN ANTONIO LA PAZ'},
      {CODMUN:'031',DESMUN:'ANTIGUA GUATEMALA'},
      {CODMUN:'032',DESMUN:'JOCOTENANGO'},
      {CODMUN:'033',DESMUN:'PASTORES'},
      {CODMUN:'034',DESMUN:'SUMPANGO'},
      {CODMUN:'035',DESMUN:'SANTO DOMINGO XENACOJ'},
      {CODMUN:'036',DESMUN:'SANTIAGO SACATEPÉQUEZ'},
      {CODMUN:'037',DESMUN:'SAN BARTOLOMÉ MILPAS ALTAS'},
      {CODMUN:'038',DESMUN:'SAN LUCAS SACATEPÉQUEZ'},
      {CODMUN:'039',DESMUN:'SANTA LUCÍA MILPAS ALTAS'},
      {CODMUN:'040',DESMUN:'SANTA MARÍA DE JESÚS'},
      {CODMUN:'041',DESMUN:'CIUDAD VIEJA'},
      {CODMUN:'042',DESMUN:'SAN MIGUEL DUEÑAS'},
      {CODMUN:'043',DESMUN:'ALOTENANGO'},
      {CODMUN:'044',DESMUN:'SAN ANTONIO AGUAS CALIENTES'},
      {CODMUN:'045',DESMUN:'SANTA CATARINA BARAHONA'},
      {CODMUN:'046',DESMUN:'CHIMALTENANGO'},
      {CODMUN:'047',DESMUN:'|SAN JOSÉ POAQUIL'},
      {CODMUN:'048',DESMUN:'SAN MARTÍN JILOTEPEQUE'},
      {CODMUN:'049',DESMUN:'COPMALAPA'},
      {CODMUN:'050',DESMUN:'SANTA APOLONIA'},
      {CODMUN:'051',DESMUN:'TECPÁN GUATEMALA'},
      {CODMUN:'052',DESMUN:'PATZÚN'},
      {CODMUN:'053',DESMUN:'POCHUTA'},
      {CODMUN:'054',DESMUN:'PATZICÍA'},
      {CODMUN:'055',DESMUN:'ACATENANGO'},
      {CODMUN:'056',DESMUN:'YEPOCAPA'},
      {CODMUN:'057',DESMUN:'SAN ANDRÉS ITZAPA'},
      {CODMUN:'058',DESMUN:'PARRAMOS'},
      {CODMUN:'059',DESMUN:'ZARAGOZA'},
      {CODMUN:'060',DESMUN:'EL TEJAR'},
      {CODMUN:'061',DESMUN:'ESCUINTLA'},
      {CODMUN:'062',DESMUN:'SANTA LUCÍA COTZUMALGUAPA'},
      {CODMUN:'063',DESMUN:'LA DEMOCRACIA'},
      {CODMUN:'064',DESMUN:'SIQUINALÁ'},
      {CODMUN:'065',DESMUN:'MASAGUA'},
      {CODMUN:'066',DESMUN:'TIQUISATE'},
      {CODMUN:'067',DESMUN:'LA GOMERA'},
      {CODMUN:'068',DESMUN:'GUANAGAZAPA'},
      {CODMUN:'069',DESMUN:'SAN JOSÉ'},
      {CODMUN:'070',DESMUN:'PALÍN'},
      {CODMUN:'071',DESMUN:'SAN VICENTE PACAYA'},
      {CODMUN:'072',DESMUN:'NUEVA CONCEPCIÓN'},
      {CODMUN:'073',DESMUN:'CUILAPA'},
      {CODMUN:'074',DESMUN:'BARBERENA'},
      {CODMUN:'075',DESMUN:'SANTA ROSA DE LIMA'},
      {CODMUN:'076',DESMUN:'CASILLAS'},
      {CODMUN:'077',DESMUN:'SAN RAFAEL LAS FLORES'},
      {CODMUN:'078',DESMUN:'ORATORIO'},
      {CODMUN:'079',DESMUN:'SAN JUAN TECUACO'},
      {CODMUN:'080',DESMUN:'CHIQUIMULILLA'},
      {CODMUN:'081',DESMUN:'TAXISCO'},
      {CODMUN:'082',DESMUN:'SANA MARÍA IXHUATÁN'},
      {CODMUN:'083',DESMUN:'GUAZACAPÁN'},
      {CODMUN:'084',DESMUN:'SANTA CRUZ NARANJO'},
      {CODMUN:'085',DESMUN:'PUEBLO NUEVO VIÑAS'},
      {CODMUN:'086',DESMUN:'NUEVA SANTA ROSA'},
      {CODMUN:'087',DESMUN:'SOLOLÁ'},
      {CODMUN:'088',DESMUN:'SAN JOSÉ CHACAYÁ'},
      {CODMUN:'089',DESMUN:'SANTA MARÍA VISITACIÓN'},
      {CODMUN:'090',DESMUN:'SANTA LUCÍA UTATLÁN'},
      {CODMUN:'091',DESMUN:'NAHUALÁ'},
      {CODMUN:'092',DESMUN:'SANTA CATARINA IXTAHUACÁN'},
      {CODMUN:'093',DESMUN:'SANTA CLARA LA LAGUNA'},
      {CODMUN:'094',DESMUN:'CONCEPCIÓN'},
      {CODMUN:'095',DESMUN:'SAN ANDRÉS SEMETABAJ'},
      {CODMUN:'096',DESMUN:'SANTA CATARINA PALOPÓ'},
      {CODMUN:'097',DESMUN:'SAN ANTONIO PALOPÓ'},
      {CODMUN:'098',DESMUN:'SAN LUCAS TOLIMÁN'},
      {CODMUN:'099',DESMUN:'SANTA CRUZ LA LAGUNA'},
      {CODMUN:'100',DESMUN:'SAN PABLO LA LAGUNA'},
      {CODMUN:'101',DESMUN:'SAN MARCOS LA LAGUNA'},
      {CODMUN:'102',DESMUN:'SAN JUAN LA LAGUNA'},
      {CODMUN:'103',DESMUN:'SAN PEDRO LA LAGUNA'},
      {CODMUN:'104',DESMUN:'SANTIAGO ATITLÁN'},
      {CODMUN:'105',DESMUN:'TOTONICAPÁN'},
      {CODMUN:'106',DESMUN:'SAN CRISTÓBAL TOTONICAPÁN'},
      {CODMUN:'107',DESMUN:'SAN FRANCISCO EL ALTO'},
      {CODMUN:'108',DESMUN:'SAN ANDRÉS XECUL'},
      {CODMUN:'109',DESMUN:'MOMOSTENANGO'},
      {CODMUN:'110',DESMUN:'SANTA MARÍA CHIQUIMULA'},
      {CODMUN:'111',DESMUN:'SANTA LUCÍA LA REFORMA'},
      {CODMUN:'112',DESMUN:'SAN BARTOLO'},
      {CODMUN:'113',DESMUN:'QUETZALTENANGO'},
      {CODMUN:'114',DESMUN:'SALCAJÁ'},
      {CODMUN:'115',DESMUN:'OLINTEPEQUE'},
      {CODMUN:'116',DESMUN:'SAN CARLOS SIJA'},
      {CODMUN:'117',DESMUN:'SIBILIA'},
      {CODMUN:'118',DESMUN:'CABRICÁN'},
      {CODMUN:'119',DESMUN:'CAJOLÁ'},
      {CODMUN:'120',DESMUN:'SAN MIGUEL SIGÜILÁ'},
      {CODMUN:'121',DESMUN:'OSTUNCALCO'},
      {CODMUN:'122',DESMUN:'CONCEPCIÓN CHIQUIRICHAPA'},
      {CODMUN:'123',DESMUN:'SAN MARTÍN SACATEPÉQUEZ'},
      {CODMUN:'124',DESMUN:'ALMOLONGA'},
      {CODMUN:'125',DESMUN:'CANTEL'},
      {CODMUN:'126',DESMUN:'HUITÁN'},
      {CODMUN:'127',DESMUN:'ZUNIL'},
      {CODMUN:'128',DESMUN:'COLOMBA'},
      {CODMUN:'129',DESMUN:'SAN FRANCISCO LA UNIÓN'},
      {CODMUN:'130',DESMUN:'EL PALMAR'},
      {CODMUN:'131',DESMUN:'COATEPEQUE'},
      {CODMUN:'132',DESMUN:'GÉNOVA'},
      {CODMUN:'133',DESMUN:'FLORES COSTA CUCA'},
      {CODMUN:'134',DESMUN:'LA ESPERANZA'},
      {CODMUN:'135',DESMUN:'PALESTINA DE LOS ALTOS'},
      {CODMUN:'136',DESMUN:'MAZATENANGO'},
      {CODMUN:'137',DESMUN:'CUYOTENANGO'},
      {CODMUN:'138',DESMUN:'SAN FRANCISCO ZAPOTITLÁN'},
      {CODMUN:'139',DESMUN:'SAN BERNARDINO'},
      {CODMUN:'140',DESMUN:'SAN JOSÉ EL IDOLO'},
      {CODMUN:'141',DESMUN:'SANTO DOMINGO SUCHITEPÉQUEZ'},
      {CODMUN:'142',DESMUN:'SAN LORENZO'},
      {CODMUN:'143',DESMUN:'SAMAYAC'},
      {CODMUN:'144',DESMUN:'SAN PABLO JOCOPILAS'},
      {CODMUN:'145',DESMUN:'SAN ANTONIO SUCHITEPÉQUEZ'},
      {CODMUN:'146',DESMUN:'SAN MIGUEL PANÁN'},
      {CODMUN:'147',DESMUN:'SAN GABRIEL'},
      {CODMUN:'148',DESMUN:'CHICACAO'},
      {CODMUN:'149',DESMUN:'PATULUL'},
      {CODMUN:'150',DESMUN:'SANTA BÁRBARA'},
      {CODMUN:'151',DESMUN:'SAN JUAN BAUTISTA'},
      {CODMUN:'152',DESMUN:'SANTO TOMÁS LA UNIÓN'},
      {CODMUN:'153',DESMUN:'ZUNILITO'},
      {CODMUN:'154',DESMUN:'PUEBLO NUEVO'},
      {CODMUN:'155',DESMUN:'RÍO BRAVO'},
      {CODMUN:'156',DESMUN:'RETALHULEU'},
      {CODMUN:'157',DESMUN:'SAN SEBASTIÁN'},
      {CODMUN:'158',DESMUN:'SANTA CRUZ MULUÁ'},
      {CODMUN:'159',DESMUN:'SAN MARTÍN ZAPOTITLÁN'},
      {CODMUN:'160',DESMUN:'SAN FELIPE'},
      {CODMUN:'161',DESMUN:'SAN ANDRÉS VILLA SECA'},
      {CODMUN:'162',DESMUN:'CHAMPERICO'},
      {CODMUN:'163',DESMUN:'NUEVO SAN CARLOS'},
      {CODMUN:'164',DESMUN:'EL ASINTAL'},
      {CODMUN:'165',DESMUN:'SAN MARCOS'},
      {CODMUN:'166',DESMUN:'SAN PEDRO SACATEPÉQUEZ'},
      {CODMUN:'167',DESMUN:'SAN ANTONIO SACATEPÉQUEZ'},
      {CODMUN:'168',DESMUN:'COMITANCILLO'},
      {CODMUN:'169',DESMUN:'SAN MIGUEL IXTAHUACÁN'},
      {CODMUN:'170',DESMUN:'CONCEPCIÓN TUTUAPA'},
      {CODMUN:'171',DESMUN:'TACAPÁ'},
      {CODMUN:'172',DESMUN:'SIBINAL'},
      {CODMUN:'173',DESMUN:'TAJUMULCO'},
      {CODMUN:'174',DESMUN:'TEJUTLA'},
      {CODMUN:'175',DESMUN:'SAN RAFAEL PIE DE LA CUESTA'},
      {CODMUN:'176',DESMUN:'NUEVO PROGRESO'},
      {CODMUN:'177',DESMUN:'EL TUMBADOR'},
      {CODMUN:'178',DESMUN:'EL RODEO'},
      {CODMUN:'179',DESMUN:'MALACATÁN'},
      {CODMUN:'180',DESMUN:'CATARINA'},
      {CODMUN:'181',DESMUN:'AYUTLA'},
      {CODMUN:'182',DESMUN:'OCÓS'},
      {CODMUN:'183',DESMUN:'SAN PABLO'},
      {CODMUN:'184',DESMUN:'EL QUETZAL'},
      {CODMUN:'185',DESMUN:'LA REFORMA'},
      {CODMUN:'186',DESMUN:'PAJAPITA'},
      {CODMUN:'187',DESMUN:'IXCHIGUÁN'},
      {CODMUN:'188',DESMUN:'SAN JOSÉ OJETENAM'},
      {CODMUN:'189',DESMUN:'SAN CRISTÓBAL CUCHO'},
      {CODMUN:'190',DESMUN:'SIPACAPA'},
      {CODMUN:'191',DESMUN:'ESUIPULAS PALO GORDO'},
      {CODMUN:'192',DESMUN:'RÍO BLANCO'},
      {CODMUN:'193',DESMUN:'SAN LORENZO'},
      {CODMUN:'194',DESMUN:'HUEHUETENANGO'},
      {CODMUN:'195',DESMUN:'CHIANTLA'},
      {CODMUN:'196',DESMUN:'MALACATANCITO'},
      {CODMUN:'197',DESMUN:'CUILCO'},
      {CODMUN:'198',DESMUN:'NENTÓN'},
      {CODMUN:'199',DESMUN:'SAN PEDRO NECTA'},
      {CODMUN:'200',DESMUN:'JACALTENANGO'},
      {CODMUN:'201',DESMUN:'SOLOMA'},
      {CODMUN:'202',DESMUN:'IXTAHUACÁN'},
      {CODMUN:'203',DESMUN:'SANTA BÁRBARA'},
      {CODMUN:'204',DESMUN:'LA LIBERTAD'},
      {CODMUN:'205',DESMUN:'LA DEMOCRACIA'},
      {CODMUN:'206',DESMUN:'SAN MIGUEL ACATÁN'},
      {CODMUN:'207',DESMUN:'SAN RAFAEL LA INDEPENDENCIA'},
      {CODMUN:'208',DESMUN:'TODOS SANTOS CUCHUMATÁN'},
      {CODMUN:'209',DESMUN:'SAN JUAN ATITÁN'},
      {CODMUN:'210',DESMUN:'SANTA EULALIA'},
      {CODMUN:'211',DESMUN:'SAN MATEO IXTATÁN'},
      {CODMUN:'212',DESMUN:'COLOTENANGO'},
      {CODMUN:'213',DESMUN:'SAN SEBASTIÁN HUEHUETENANGO'},
      {CODMUN:'214',DESMUN:'TECTITÁN'},
      {CODMUN:'215',DESMUN:'CONCEPCIÓN'},
      {CODMUN:'216',DESMUN:'SAN JUAN IXCOY'},
      {CODMUN:'217',DESMUN:'SAN ANTONIO HUISTA'},
      {CODMUN:'218',DESMUN:'SAN SEBASTIÁN COATÁN'},
      {CODMUN:'219',DESMUN:'BARILLAS'},
      {CODMUN:'220',DESMUN:'AGUACATÁN'},
      {CODMUN:'221',DESMUN:'SAN RAFAEL PETZAL'},
      {CODMUN:'222',DESMUN:'SAN GASPAR IXCHIL'},
      {CODMUN:'223',DESMUN:'SANTIAGO CHIMALTENANGO'},
      {CODMUN:'224',DESMUN:'SANTA ANA HUISTA'},
      {CODMUN:'225',DESMUN:'SANTA CRUZ DEL QUICHÉ'},
      {CODMUN:'226',DESMUN:'CHICHÉ'},
      {CODMUN:'227',DESMUN:'CHINIQUE'},
      {CODMUN:'228',DESMUN:'ZACUALPA'},
      {CODMUN:'229',DESMUN:'CHAJUL'},
      {CODMUN:'230',DESMUN:'CHICHICASTENANGO'},
      {CODMUN:'231',DESMUN:'PATZITÉ'},
      {CODMUN:'232',DESMUN:'SAN ANTONIO ILOTENANGO'},
      {CODMUN:'233',DESMUN:'SAN PEDRO JOCOPILAS'},
      {CODMUN:'234',DESMUN:'CUNÉN'},
      {CODMUN:'235',DESMUN:'SAN JUAN COTZAL'},
      {CODMUN:'236',DESMUN:'JOYABAJ'},
      {CODMUN:'237',DESMUN:'NEBAJ'},
      {CODMUN:'238',DESMUN:'SAN ANDRÉS SAJCABAJÁ'},
      {CODMUN:'239',DESMUN:'USPANTÁN'},
      {CODMUN:'240',DESMUN:'SACAPULAS'},
      {CODMUN:'241',DESMUN:'SAN BARTOLOMÉ JOCOTENANGO'},
      {CODMUN:'242',DESMUN:'CANILLÁ'},
      {CODMUN:'243',DESMUN:'CHICAMÁN'},
      {CODMUN:'244',DESMUN:'IXCÁN'},
      {CODMUN:'245',DESMUN:'PACHALUM'},
      {CODMUN:'246',DESMUN:'SALAMÁ'},
      {CODMUN:'247',DESMUN:'SAN MIGUEL CHICAJ'},
      {CODMUN:'248',DESMUN:'RABINAL'},
      {CODMUN:'249',DESMUN:'CUBULCO'},
      {CODMUN:'250',DESMUN:'GRANADOS'},
      {CODMUN:'251',DESMUN:'EL CHOL'},
      {CODMUN:'252',DESMUN:'SAN JORÓNIMO'},
      {CODMUN:'253',DESMUN:'PURULHÁ'},
      {CODMUN:'254',DESMUN:'COBÁN'},
      {CODMUN:'255',DESMUN:'SANTA CRUZ VERAPÁZ'},
      {CODMUN:'256',DESMUN:'SAN CRISTÓBAL VERAPÁZ'},
      {CODMUN:'257',DESMUN:'TACTIC'},
      {CODMUN:'258',DESMUN:'TAMAHÚ'},
      {CODMUN:'259',DESMUN:'TUCURÚ'},
      {CODMUN:'260',DESMUN:'PANZÓS'},
      {CODMUN:'261',DESMUN:'SENAHÚ'},
      {CODMUN:'262',DESMUN:'SAN PEDRO CARCHÁ'},
      {CODMUN:'263',DESMUN:'SAN JUAN CHAMELCO'},
      {CODMUN:'264',DESMUN:'LANQUÍN'},
      {CODMUN:'265',DESMUN:'CAHABÓN'},
      {CODMUN:'266',DESMUN:'CHISEC'},
      {CODMUN:'267',DESMUN:'CHAHAL'},
      {CODMUN:'268',DESMUN:'FRAY BARTOLOMÉ DE LAS CASAS'},
      {CODMUN:'269',DESMUN:'SANTA CATALINA LA TINTA'},
      {CODMUN:'270',DESMUN:'FLORES'},
      {CODMUN:'271',DESMUN:'SAN JOSÉ'},
      {CODMUN:'272',DESMUN:'SAN BENITO'},
      {CODMUN:'273',DESMUN:'SAN ANDRÉS'},
      {CODMUN:'274',DESMUN:'LA LIBERTAD'},
      {CODMUN:'275',DESMUN:'SAN FRANCISCO'},
      {CODMUN:'276',DESMUN:'SANTA ANA'},
      {CODMUN:'277',DESMUN:'DOLORES'},
      {CODMUN:'278',DESMUN:'SAN LUIS'},
      {CODMUN:'279',DESMUN:'SAYAXCHÉ'},
      {CODMUN:'280',DESMUN:'MELCHOR DE MENCOS'},
      {CODMUN:'281',DESMUN:'POPTÚN'},
      {CODMUN:'282',DESMUN:'PUERTO BARRIOS'},
      {CODMUN:'283',DESMUN:'LIVINGSTON'},
      {CODMUN:'284',DESMUN:'EL ESTOR'},
      {CODMUN:'285',DESMUN:'MORALES'},
      {CODMUN:'286',DESMUN:'LOS AMATES'},
      {CODMUN:'287',DESMUN:'ZACAPA'},
      {CODMUN:'288',DESMUN:'ESTANZUELA'},
      {CODMUN:'289',DESMUN:'RÍO HONDO'},
      {CODMUN:'290',DESMUN:'GUALÁN'},
      {CODMUN:'291',DESMUN:'TECULUTÁN'},
      {CODMUN:'292',DESMUN:'USUMATLÁN'},
      {CODMUN:'293',DESMUN:'CABAÑAS'},
      {CODMUN:'294',DESMUN:'SAN DIEGO'},
      {CODMUN:'295',DESMUN:'LA UNIÓN'},
      {CODMUN:'296',DESMUN:'HUITÉ'},
      {CODMUN:'297',DESMUN:'CHIQUIMULA'},
      {CODMUN:'298',DESMUN:'SAN JOSÉ LA ARADA'},
      {CODMUN:'299',DESMUN:'SAN JUAN ERMITA'},
      {CODMUN:'300',DESMUN:'JOCOTÁN'},
      {CODMUN:'301',DESMUN:'CAMOTÁN'},
      {CODMUN:'302',DESMUN:'OLOPA'},
      {CODMUN:'303',DESMUN:'ESQUIPULAS'},
      {CODMUN:'304',DESMUN:'CONCEPCIÓN LAS MINAS'},
      {CODMUN:'305',DESMUN:'QUETZALTEPEQUE'},
      {CODMUN:'306',DESMUN:'SAN JACINTO'},
      {CODMUN:'307',DESMUN:'IPALA'},
      {CODMUN:'308',DESMUN:'JALAPA'},
      {CODMUN:'309',DESMUN:'SAN PEDRO PINULA'},
      {CODMUN:'310',DESMUN:'SAN LUIS JILOTEPEQUE'},
      {CODMUN:'311',DESMUN:'SAN MANUEL CHAPARRÓN'},
      {CODMUN:'312',DESMUN:'SAN CARLOS ALZATATE'},
      {CODMUN:'313',DESMUN:'MONJAS'},
      {CODMUN:'314',DESMUN:'MATAQUESCUINTLA'},
      {CODMUN:'315',DESMUN:'JUTIAPA'},
      {CODMUN:'316',DESMUN:'EL PROGRESO'},
      {CODMUN:'317',DESMUN:'SANTA CATARINA MITA'},
      {CODMUN:'318',DESMUN:'AGUA BLANCA'},
      {CODMUN:'319',DESMUN:'ASUNCIÓN MITA'},
      {CODMUN:'320',DESMUN:'YUPILTEPEQUE'},
      {CODMUN:'321',DESMUN:'ATESCATEMPA'},
      {CODMUN:'322',DESMUN:'JERÉZ'},
      {CODMUN:'323',DESMUN:'EL ADELANTO'},
      {CODMUN:'324',DESMUN:'ZAPOTITLÁN'},
      {CODMUN:'325',DESMUN:'COMAPA'},
      {CODMUN:'326',DESMUN:'JALPATAGUA'},
      {CODMUN:'327',DESMUN:'CONGUACO'},
      {CODMUN:'328',DESMUN:'MOYUTA'},
      {CODMUN:'329',DESMUN:'PASACO'},
      {CODMUN:'330',DESMUN:'SAN JOSÉ ACATEMPA'},
      {CODMUN:'331',DESMUN:'QUEZADA'},
      {CODMUN:'331',DESMUN:'QUEZADA'}
      ]
    },
    jsonDepartamentos: ()=>{
      return [
          {CODDEPTO:'001',DESDEPTO:'GUATEMALA'},
          {CODDEPTO:'002',DESDEPTO:'EL PROGRESO'},
          {CODDEPTO:'003',DESDEPTO:'SACATEPEQUEZ'},
          {CODDEPTO:'004',DESDEPTO:'CHIMALTENANGO'},
          {CODDEPTO:'005',DESDEPTO:'ESCUINTLA'},
          {CODDEPTO:'006',DESDEPTO:'SANTA ROSA'},
          {CODDEPTO:'007',DESDEPTO:'SOLOLA'},
          {CODDEPTO:'008',DESDEPTO:'TOTONICAPAN'},
          {CODDEPTO:'009',DESDEPTO:'QUETZALTENANGO'},
          {CODDEPTO:'010',DESDEPTO:'SUCHITEPEQUEZ'},
          {CODDEPTO:'011',DESDEPTO:'RETALHULEU'},
          {CODDEPTO:'012',DESDEPTO:'SAN MARCOS'},
          {CODDEPTO:'013',DESDEPTO:'HUEHUETENANGO'},
          {CODDEPTO:'014',DESDEPTO:'QUICHE'},
          {CODDEPTO:'015',DESDEPTO:'BAJA VERAPAZ'},
          {CODDEPTO:'016',DESDEPTO:'ALTA VERAPAZ'},
          {CODDEPTO:'017',DESDEPTO:'PETEN'},
          {CODDEPTO:'018',DESDEPTO:'IZABAL'},
          {CODDEPTO:'019',DESDEPTO:'ZACAPA'},
          {CODDEPTO:'020',DESDEPTO:'CHIQUIMULA'},
          {CODDEPTO:'021',DESDEPTO:'JALAPA'},
          {CODDEPTO:'022',DESDEPTO:'JUTIAPA'}
          
      ]},
      convertDate:(fecha)=>{
        return fecha.replace('T00:00:00.000Z','')
      }
};

//export default funciones;