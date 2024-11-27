const numIntento = document.getElementById("numIntento");

const numRestante = document.getElementById("numRestante");

const panelJuego = document.getElementById("panelJuego");

const error = document.getElementById("error");

const confirm = document.getElementById("confirm");

const casillas_td = document.getElementsByTagName("td");

let intentos = 0;
let parejasRestantes;
let bloquearClick = false;
let guardarUltimoBotonPulsado;

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

    juego();
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
        juego();
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

            document.getElementById("filas").disabled = true
            document.getElementById("columnas").disabled = true
        } else if (dificultad == "medio") {
            document.getElementById("filas").value = 5;
            document.getElementById("columnas").value = 6;

            document.getElementById("filas").disabled = true
            document.getElementById("columnas").disabled = true
        } else if (dificultad == "dificil") {
            document.getElementById("filas").value = 10;
            document.getElementById("columnas").value = 10;

            document.getElementById("filas").disabled = true
            document.getElementById("columnas").disabled = true
        } else if (dificultad == "perso") {
            document.getElementById("filas").value;
            document.getElementById("columnas").value;

            document.getElementById("filas").disabled = false
            document.getElementById("columnas").disabled = false
        }
    }
    

    function numerosAleatorios(min, max){
        return Math.floor(Math.random()*max)-min;
    }
   
    function generarParejas(valor){
        let parejas = 0;
        while(parejas < 2){
            const fila = numerosAleatorios(0, tabla.rows.length);
            const columna = numerosAleatorios(0, tabla.rows[0].cells.length);

            if (tabla.rows[fila].cells[columna].getAttribute("num")==null) {
                tabla.rows[fila].cells[columna].setAttribute("num",valor);
                parejas++;
            }
        }
    }

    function comprobarGanador(){
        for (const casilla of casillas_td) {
            const ganador = casilla.classList.contains("casillaDescubierta");
            if (ganador == false) {
                return;
            }    
        }
            if (confirm("has ganado yisus")) {
                location.reload(); 
            }
    }


    function juego(){

        for (let i = 0;i<numFila; i++) {
           
            const fila = tabla.rows[i];
            for (let j = 0;j<fila.cells.length; j++) {
                const celda = fila.cells[j];
                
                numIntento.innerHTML=intentos;

                celda.addEventListener("click",function (e){

                    if (bloquearClick == false && !celda.classList.contains("botonPulsado")) {
                        celda.classList.add("botonPulsado");
                        celda.innerHTML= `<h2>${celda.getAttribute("num")}</h2>`;
                        numRestante.innerHTML= parejasRestantes;
                        console.log(celda.getAttribute("num"))
                        if(!guardarUltimoBotonPulsado){
                            guardarUltimoBotonPulsado = celda;
                        }else if(guardarUltimoBotonPulsado.getAttribute("num")!=celda.getAttribute("num")){
                            bloquearClick =true;
                            intentos ++;
                            numIntento.innerHTML = intentos;
                            confirm.innerHTML = "los numeros no son iguales";
                            setTimeout(()=>{
                                confirm.innerHTML = "";
                                guardarUltimoBotonPulsado.innerHTML = "";
                                guardarUltimoBotonPulsado.classList.remove("botonPulsado");
                                guardarUltimoBotonPulsado=undefined;
                                celda.innerHTML="";
                                celda.classList.remove("botonPulsado");
                                bloquearClick= false;
                                
                            },1000)
                        }else{
                            intentos++;
                            guardarUltimoBotonPulsado=undefined;
                            parejasRestantes--;
                            numRestante.innerHTML=parejasRestantes;
                            numIntento.innerHTML=intentos;
                            confirm.innerHTML= "numero de parejas iguales";
                            setTimeout(()=>{
                                confirm.innerHTML="";
                            },1000)
                    
                    }

                    comprobarGanador();

                    }
                })
            }
        }
        for (let i=0; i<(numFila*numColumna)/2;i++) {
           generarParejas(i+1);
           parejasRestantes=i+1;
            
        }
        numRestante.innerHTML= parejasRestantes;
    }



































