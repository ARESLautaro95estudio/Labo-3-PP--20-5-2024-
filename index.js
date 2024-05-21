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
const formulario = document.getElementById("miFormulario");

document.addEventListener("DOMContentLoaded", () =>{

    formulario.addEventListener("submit",altaMoneda);
}
);

function altaMoneda(e)
{
    e.preventDefault();
    InstancioMoneda();
    cargarTabla();
}

function InstancioMoneda()
{
    const coin = new Crypto(
        new Date(),
        formulario.nombre.value,
        formulario.simbolo,
        new Date(),
        formulario.PrecioActual.value,
        formulario.tipoDC.value,
        formulario.algoritmo.value,
        formulario.SWO.value,
        formulario.cantidadC.value
    );
    guardarEnStorage(coin);
   
}

function cargarTabla()
{
    let tabla = document.getElementById("tabla-crypto");
    var body =null;
    if (tabla==null)
    {
        tabla = document.createElement("table");
        tabla = creoThad(tabla);
        body = llenoTabla(dataLocal);
        tabla.appendChild(body);
        const father = document.getElementById("divTabla");
        father.appendChild(tabla);
    }
    else{
        tabla = llenoTabla(tabla);
        const father = document.getElementById("divTabla");
        father.appendChild(tabla);
    }
}

function creoThad(tabla)
{
    const thead = document.createElement("thead");
    const tr1 = document.createElement("tr");
    for (const key  in dataLocal[0] )
    {
        const th = document.createElement("th");
        th.textContents = key;
        tr1.appendChild(th);
    }
    thead.appendChild(tr1);
    tabla.appendChild(thead);
    return tabla;
}
function llenoTabla(lista)
{
    const tbody = document.createElement("tbody");
    lista.forEach((elemento) => {
            const tr = document.createElement("tr");
            for (const llave in elemento)
            {
                const td = document.createElement("td");
                td.textContents= elemento[llave];
                tr.appendChild(td);
            }

            const btnElim = document.createElement("button");
            btnElim.textContent = "Eliminar";
            btnElim.class= "btn-eliminar";
            const btnEditar = document.createElement("button");
            btnEditar.textContent= "Editar";
            btnEditar.class = "btn-guardar";
            tr.appendChild(btnElim);
            tr.appendChild(btnEditar);
           tbody.appendChild(tr);
    });
    // tabla.appendChild(tbody);
    return tbody;
}