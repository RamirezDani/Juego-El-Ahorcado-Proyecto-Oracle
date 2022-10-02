var contador = 0;
var estado = false;
var palabras = ["HTML", "JAVASCRIPT", "PROGRAMACION", "FRAMEWORK"];

const valores = window.location.search;

if (valores) {

    var valores2 = valores.replace("?", "");
    valores2 = b64_to_utf8(valores2);
    palabras = valores2.split(",");

}

function PalabraSecreta() {
    //console.log("palabras: " + palabras)
    var numeAleatorio = Math.floor(Math.random() * palabras.length);
    var palabraSecreta = palabras[numeAleatorio];
    return palabraSecreta;
}

function SeleccionaPalabra() {

    var palaSecreta = PalabraSecreta();
    var numGuiones = palaSecreta.length;
    var targetDiv = document.getElementById('grupoLetras');

    for (var i = 0; i < numGuiones; i++) {

        targetDiv.insertAdjacentHTML('beforeend', '<div class="gLetra"><div class="letra">&nbsp</div><div class="guion">-</div></div>');
    }

    var arrayPalabra = [];
    for (cont = 0; cont < numGuiones; cont++) {
        arrayPalabra.push("&nbsp");
    }

    var arrayMalas = palaSecreta.split("");
    var arrayMalas2 = [];

    PalabraEntradaTeclado(palaSecreta, arrayPalabra, arrayMalas, arrayMalas2);
}

function NuevoJuego() {

    document.getElementById('grupoLetras').innerHTML = "";
    document.getElementById('malaLetra').innerHTML = "";
    SeleccionaPalabra();
    location.reload();
}


function PalabraEntradaTeclado(palaSecreta, arrayPalabra, arrayMalas, arrayMalas2) {


    document.addEventListener('keydown', function (e) {
        //Dependiendo del navegador usara el which o el keycode OJO ES IMPORTANTE
        var keycodeentero = e.which || e.keyCode;
        var lenPalabra = palaSecreta.length;

        if (contador < 9) {

            if (VerificaSoloLetras(keycodeentero)) {
                var textoEn = String.fromCharCode(keycodeentero);
                //escribe las letras correctas
                EscribeLetrasCorrectas(textoEn, lenPalabra, palaSecreta, arrayPalabra);

                if (estado == false) {
                    //escribe las letras incorrectas
                    IntentosFallidos(textoEn, arrayMalas, arrayMalas2);
                }

                //imprime msg cuando gana
                ImprimeMsgGana(arrayPalabra);
            }
        }
        if (contador > 8 && estado == false) {
            ImprimeMsgPierde();
        }
    })
}


function VerificaSoloLetras(keycodeentero) {

    if ((keycodeentero >= 65 && keycodeentero <= 90) || keycodeentero == 192) { return true; }
    return false;
}

function EscribeLetrasCorrectas(textoEn, lenPalabra, palaSecreta, arrayPalabra) {

    for (var i = 0; i <= lenPalabra; i++) {
        if (textoEn === palaSecreta[i]) {

            var targetDiv = document.getElementById('grupoLetras');
            document.getElementById('grupoLetras').innerHTML = "";
            var letraEncontrada = '';
            var guion = '<div class = "guion">-</div>'
            for (var j = 0; j < lenPalabra; j++) {
                if (j === i) {
                    arrayPalabra[j] = textoEn;
                }

                var letraEncontrada = '<div class = "letra">' + arrayPalabra[j] + '</div>';
                targetDiv.insertAdjacentHTML('beforeend', '<div class="gLetra">' + letraEncontrada + guion + '</div>');
                letraEncontrada = '';
            }
        }
    }
}


function IntentosFallidos(textoEn, arrayMalas, arrayMalas2) {

    if (arrayMalas.indexOf(textoEn) == -1) {
        DibujaAhorcado(contador);
        EscribeLetrasIncorrectas(textoEn, arrayMalas, arrayMalas2);
        contador++;
    }
}

function EscribeLetrasIncorrectas(textoEn, arrayMalas, arrayMalas2) {
    arrayMalas.push(textoEn);
    arrayMalas2.push(textoEn);
    document.getElementById('malaLetra').innerHTML = "";
    var msgSalidaElem = document.getElementById('malaLetra');
    var msgSalida = arrayMalas2.toString().replace(/,/g, "-");
    msgSalidaElem.insertAdjacentHTML('beforeend', msgSalida);
}

function DibujaAhorcado(num) {

    document.getElementById('malaLetra').innerHTML = "";
    var dibujo = document.getElementById('ahorcado');
    var partesAhorcado = ['<div id="lineaH"></div>', '<div id="lineaV"></div>', '<div id="lineaH2"></div>', '<div id="circulo"></div>', '<div id="lineaCuerpo"></div>',
        '<div id="lineaBrazoIzq"></div>', '<div id="lineaBrazoDer"></div>', '<div id="lineaPiernaIzq"></div>', '<div id="lineaPiernaDer"></div>'];
    dibujo.insertAdjacentHTML('beforeend', partesAhorcado[num]);

}

function ImprimeMsgGana(arrayPalabra) {

    if (arrayPalabra.indexOf("&nbsp") == -1) {
        document.getElementById('msgGana').innerHTML = "GANASTE, FELICIDADES!";
        return estado = true;
    }
}

function ImprimeMsgPierde() {

    document.getElementById('msgPierde').innerHTML = "FIN DEL JUEGO!";

}

function AgregarPalabra() {

    var textoEn = document.getElementById('textIn').value;
    textoEn = textoEn.toUpperCase();

    if (palabras.indexOf(textoEn) == -1) {
        palabras.push(textoEn);
        console.log("pla: " + palabras);
        window.location = "juego.html?" + utf8_to_b64(palabras);
    }

}

function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

function DevuelveArray(){
    window.location = "index.html?" + utf8_to_b64(palabras);
}

function IndexANuevaPalabra(){
    window.location = "nuevaPalabra.html";
}