    let map; 

    function IniciarVistaMapa(){
        /*
        let cmbMes = document.getElementById('cmbMes');
        cmbMes.innerHTML = funciones.ComboMeses();
        cmbMes.value = new Date().getMonth()+1;
                
        let cmbAnio = document.getElementById('cmbAnio');
        cmbAnio.innerHTML = funciones.ComboAnio();
        cmbAnio.value = new Date().getFullYear();
        */
        
        let cmbVendedores = document.getElementById('cmbVendedores');
          

        let btnCargar = document.getElementById('btnCargar');
        btnCargar.addEventListener('click',()=>{
            getRecorrido(cmbVendedores.value,'mapcontainer');
            getVentasVendedor('tblVentaFecha');
        });

        getVendedores('cmbVendedores');
        
        document.getElementById('txtFecha').value = funciones.getFecha();

        map = Lmap();

    };
    function Lmap(){
  //INICIALIZACION DEL MAPA
        let map;
        let lat; let long;
        try {
            navigator.geolocation.getCurrentPosition(function (location) {
                lat = location.coords.latitude.toString() || 0;
                long = location.coords.longitude.toString() || 0;
            })
        } catch (error) {
            lat =0;
            long = 0;
        }
        lat =0;
        long = 0;
        var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        osmAttrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib});    
        map = L.map('mapcontainer').setView([lat, long], 15).addLayer(osm);
        return map;
    };
    function getRecorrido(codven,idContainer){
    
    let fecha = funciones.devuelveFecha('txtFecha');
    

        map.remove()
        map = Lmap();
       
        axios.get(`/supervisor/maparuta?token=${GlobalToken}&codven=${codven}&fecha=${fecha}`)
        .then((response) => {

            const data = response.data;        
            data.recordset.map((rows)=>{
                console.log(rows.NOMCLIENTE);
                L.marker([rows.LAT, rows.LONG])
                .addTo(map)
                .bindPopup(rows.NOMCLIENTE + ' - ' + funciones.setMoneda(rows.TOTALVENTA, 'Q'))// + `<button class="btn btn-success" onClick="alert('holamundo')">"` ) 
                .on('click',function(){alert(rows.NOMCLIENTE)})
            })
            
        }, (error) => {
            console.log(error);
        });         
                    
    };

    function getVendedores(idContainer){
        let container = document.getElementById(idContainer);

        let str = '';
        axios.get(`/supervisor/vendedores?token=${GlobalToken}`)
        .then((response) => {
            const data = response.data;        
            data.recordset.map((rows)=>{
                str = str + `<option value=${rows.CODVEN}>${rows.NOMVEN}</option>`;
            })
            
            container.innerHTML = str;

        }, (error) => {
            console.log(error);
        });       

    };

    function getVentasVendedor(idContainer){

        let container = document.getElementById(idContainer);
        let codven = document.getElementById('cmbVendedores').value;
        let fecha = funciones.devuelveFecha('txtFecha');
        let containertotal = document.getElementById('lbTotal');

        let varImporte = 0;

        container.innerHTML = GlobalLoader;

        let str = '';
        axios.get(`/supervisor/rptventas?token=${GlobalToken}&codven=${codven}&fecha=${fecha}`)
        .then((response) => {
            const data = response.data;        
            data.recordset.map((rows)=>{
                varImporte = varImporte + Number(rows.TOTALVENTA);
                str = str + `
                    <tr>
                        <td>${rows.CODDOC}-${rows.CORRELATIVO}</td>
                        <td>
                            ${rows.NOMCLIENTE}
                            <br>
                            <small>${rows.DIRCLIENTE}</small>
                        </td>
                        <td>${funciones.setMoneda(rows.TOTALVENTA,'Q')}</td>
                    </tr>
                `;
            })
            
            container.innerHTML = str;
            containertotal.innerText = 'Total : ' + funciones.setMoneda(varImporte,'Q');

        }, (error) => {
            console.log(error);
            container.innerHTML = '';
            containertotal.innerText = '--';
        });       

    };
