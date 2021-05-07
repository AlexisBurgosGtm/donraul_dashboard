function getView(){
    let view = {
        encabezado: ()=>{
            return `
            <div class="row">

                <div class="card col-12">
                    <div class="card-header">
                        <h3>Lista de productos Agotados</h3>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-responsive table-striped table-hover">
                                <thead class="bg-trans-gradient text-white">
                                    <tr>
                                        <td>CODIGO</td>
                                        <td>PRODUCTO</td>
                                        <td>COSTO</td>
                                        <td>EXISTENCIA</td>
                                        <td>ULTIMA VENTA</td>
                                    </tr>
                                </thead>
                                <tbody id="tblAgotados"></tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
            `
        },
        modal: ()=>{}
    }

    root.innerHTML = view.encabezado();
};


async function addListeners(){

    await gettblAgotados('tblAgotados');

}


function gettblAgotados(idcontainer){

    let container = document.getElementById(idcontainer);
    container.innerHTML = GlobalLoader;

    let str = ""; //'`<option value=''>Todas...</option>`;
    axios.get('/reports/agotados?token=' + GlobalToken)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            str += `<tr class="border-bottom">
                        <td>${rows.CODPROD}</td>
                        <td>${rows.DESPROD}</td>
                        <td>${funciones.setMoneda(rows.COSTO,'Q')}</td>
                        <td>${rows.EXISTENCIA}</td>
                        <td>${rows.LASTSALE}</td>
                    </tr>`;
        })
        container.innerHTML = str;
    }, (error) => {
        console.log(error);
        container.innerHTML ='No se pudo cargar ...'
    });
    
}