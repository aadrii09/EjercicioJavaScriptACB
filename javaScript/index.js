const numIntento = document.getElementById("numIntento");

const numRestante = document.getElementById("numRestante");

const panelJuego = document.getElementById("panelJuego");

const error = document.getElementById("error");

const confirm = document.getElementById("confirm");

const casillas_td = document.getElementsByTagName("td");

let numFila = 0;
let numColumna = 0;

let valorFila;
let valorColumna;

let tabla;
// esto es para que se genere la tabla por defecto al entrar a la pagina
window.onload = function(){
    intentos = 0 ;
    conseguirValores();
    crearTabla(3,4)
}
// let intentos = 0;

function conseguirValores(){
    valorFila = document.getElementById("filas").value;
    valorColumna = document.getElementById("columnas").value;
}
// crear la tabla del juego
function crearTabla(filas, columnas){
    if(tabla != null){
        tabla.remove();
    }

    var tablaCreada = document.createElement("table");
    var body = document.createElement("tbody");

    for(var i = 0; i < filas; i++){
        var fila = document.createElement("tr");
    for(var j = 0; j <columnas; j++){
        var celda = document.createElement("td");
        fila.appendChild(celda);
    }    
    body.appendChild(fila);
    }
    tablaCreada.appendChild(body);
    panelJuego.append(tablaCreada);

    tabla = tablaCreada;

    numFila = tabla.rows.length;
    console.log(numFila);
    numColumna = tabla.rows[0].cells.length;
    
    var tablaCreada = document.createElement("table");
} 

// metodo para iniciar el juego y sera el que se llamara para cuando cambie la dificultad
function iniciarJuego(){
    intentos =0;
    conseguirValores();
    console.log("MENSAJE");
    if((valorFila * valorColumna) %2 ==0){
        crearTabla(valorFila, valorColumna);
    }else{
        error.innerHTML = "No se puede crear una tabla cuya multiplicacion de fila y columna sea impar";
    setTimeout(()=>{
        error.innerHTML = "";
    },1000)
    }
}

    function dificultades(dificultad) {
        
        if (dificultad == "facil") {
            document.getElementById("filas").value = 3;
            document.getElementById("columnas").value = 4;

            document.getElementById("filas").disabled=true
            document.getElementById("columnas").disabled=true
        } else if (dificultad == "medio") {
            document.getElementById("filas").value = 5;
            document.getElementById("columnas").value = 6;

            document.getElementById("filas").disabled=true
            document.getElementById("columnas").disabled=true
        } else if (dificultad == "dificil") {
            document.getElementById("filas").value = 10;
            document.getElementById("columnas").value = 10;

            document.getElementById("filas").disabled=true
            document.getElementById("columnas").disabled=true
        } else if (dificultad == "perso") {
            document.getElementById("filas").value;
            document.getElementById("columnas").value;

            document.getElementById("filas").disabled=false
            document.getElementById("columnas").disabled=false
        }
    }


   
   
   






































