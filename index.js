import Crypto  from "./Moneda.js";
let dataLocal = leerstorage() || [];
function leerstorage()
{
    return JSON.parse(localStorage.getItem("Crypto"));
}
function guardarEnStorage(moneda)
{
    localStorage.setItem("Crypto",JSON.stringify(moneda));
}
document.addEventListener("DOMContentLoaded", () =>{
    
    const formulario = document.getElementById("miFormulario");
    formulario.addEventListener("submit",altaMoneda);
}
);
function Eliminar(e)
{
    console.log(e.target.id);
    let flag = [];
    dataLocal.forEach((elemento) =>
        {
            if (elemento.id ==e.target.id)
            {
                console.log("es el mismno id");
            }else
            {
                flag.push(elemento);
            }
        }
    );
    dataLocal = flag;
    guardarEnStorage(flag); 
    cargarTabla();
}
function altaMoneda(e)
{
    e.preventDefault();
    inyectarSpinner();
    setTimeout(()=>{

        InstancioMoneda();
        cargarTabla();
        removerSpinner();
        
    },2500);
}
function InstancioMoneda()
{
    const formulario = document.getElementById("miFormulario");
    const coin = new Crypto(
        new Date(),
        formulario.nombre.value,
        formulario.simbolo.value,
        new Date(),
        formulario.PrecioActual.value,
        formulario.tipoDC.value,
        formulario.algoritmo.value,
        formulario.SWO.value,
        formulario.cantidadC.value
    );
    dataLocal.push(coin);
    guardarEnStorage(dataLocal);
}
function cargarTabla()
{
    let tabla = document.getElementById("tabla-crypto");
    var body =null;
    if (tabla==null)
    {
        tabla = document.createElement("table");
        tabla.className ="formCrypto";
        tabla.id ="tabla-crypto";
        tabla = creoThad(tabla);
        body = llenoTabla(dataLocal); 
        tabla.appendChild(body);
        const father = document.getElementById("divTabla");
        father.appendChild(tabla);
        body =null;
    }
    else
    {
        body = llenoTabla(dataLocal);
        tabla.appendChild(body);
        const father = document.getElementById("divTabla");
        father.appendChild(tabla);
    }
}
function removeTableBody() {
    const tableBody = document.getElementById("01body");
    if (tableBody) {
        tableBody.remove();
    }
}
function creoThad(tabla)
{
    const thead = document.createElement("thead");
    const tr1 = document.createElement("tr");
    for (const key  in dataLocal[0] )
    {
        const th = document.createElement("th");
        th.textContent = key;
        tr1.appendChild(th);
    }
    thead.appendChild(tr1);
    tabla.appendChild(thead);
    return tabla;
}
function llenoTabla(lista)
{   
    removeTableBody();
    const tbody = document.createElement("tbody");
    tbody.id = "01body";
    lista.forEach((elemento) => {
            const tr = document.createElement("tr");
            let id ="";
            for (const llave in elemento)
            {
                const td = document.createElement("td");
                td.textContent= elemento[llave];
                tr.appendChild(td);
                if (llave =="id")
                {
                    id = elemento[llave];
                }
            }
            const btnElim = document.createElement("button");
            btnElim.textContent = "Eliminar";
            btnElim.className = "btn-eliminar";
            btnElim.id=id;
            btnElim.addEventListener("click", Eliminar);

            const btnEditar = document.createElement("button");
            btnEditar.textContent= "Editar";
            btnEditar.className = "btn-guardar";
            btnEditar.id = id;
            btnEditar.addEventListener("click",modificar);

            tr.class="celda";
            tr.appendChild(btnElim);
            tr.appendChild(btnEditar);
            tbody.appendChild(tr);
        });

    return tbody;
}
function modificar(e)
{
    const formulario = document.getElementById("miFormulario");
    dataLocal.forEach((elemento) =>
        {
            if (elemento.id == e.target.id)
            {
                formulario.nombre.value = elemento.nombre;
                formulario.simbolo.value = elemento.simbolo;
                formulario.PrecioActual.value = elemento.PrecioActual;
                formulario.tipoDC.value = elemento.tipoDC;
                formulario.PrecioActual.value = elemento.PrecioActual;
                formulario.algoritmo.value = elemento.algoritmo;
                formulario.SWO.value = elemento.SWO;
                formulario.cantidadC.value= elemento.cantidadC;
            }
        }
    );
}



function inyectarSpinner() {
    const spinner = document.createElement("img");
    const contenedor = document.getElementById("spner");
    spinner.setAttribute("src", "loading.gif");
    spinner.setAttribute("alt", "imagen spinner");
    spinner.setAttribute("height", "700px");
    spinner.setAttribute("width", "60%");
    contenedor.appendChild(spinner);
  }
  
  function removerSpinner() {
    const contenedor = document.getElementById("spner");
    contenedor.removeChild(contenedor.firstChild);
  }
  