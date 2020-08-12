

/* global speechSynthesis */

var comandos = ["inicio", "registar", "ingresar usuario", "ingresar clave", "cerrar usuario", "manual", "cerrar clave", "limpiar usuario", "verificar usuario", "verificar clave", "limpiar clave", "confirmar usuario", "confirmar clave", "control final"];



window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec = new webkitSpeechRecognition();
rec.lang = "es-ES";
rec.continuous = true;
rec.interimResults = false;
const results = "";
const frase = "";
const texto = "";
const fraseusuario = "";
const resultssuario = "";
var bandejaEs = false;
var ingrusuario = false;
var autoLogin = false;
var bandejapass = false;





function inici()
{
    if (bandejaEs === true)
    {
        rec.onresult = (event) =>
        {
            const results = event.results;
            const frase = results[results.length - 1][0].transcript;
            console.log(frase.toString());
            if (frase.toString().trim() === vericom(frase.toString().trim()))
            {
                switch (frase.toString().trim())
                {
                    case "inicio":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("Direccionar al página de inicio"));
                        rec.abort();
                        location.href = "http://localhost:8080/ProyectoVI/faces/indextwo.xhtml";
                        break;

                    case "registar":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("Direccionar al página de registar a un usuario"));
                        rec.abort();
                        location.href = "http://localhost:8080/ProyectoVI/faces/pages/pcheckin.xhtml";
                        break;
                    case "manual":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("Direccionando a guia de control del sistema"));
                        rec.abort();
                        location.href = "http://localhost:8080/ProyectoVI/faces/Handbook.xhtml";
                        break;
                    case "ingresar usuario":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("Direccionar al ingreso del Usuario"));
                        focusuario();
                        ingrusuario = true;
                        break;
                    case"cerrar usuario":
                        ingrusuario = false;
                        speechSynthesis.speak(new SpeechSynthesisUtterance("cerrar ingreso de usuario"));

                        break;

                    case "limpiar usuario":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("comenzando a borrar usuario"));
                        borra();
                        break;

                    case "ingresar clave":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("Direccionar al ingreso de la clave"));
                        focupass();
                        bandejapass = true;
                        break;
                    case "cerrar clave":
                        bandejapass = false;
                        speechSynthesis.speak(new SpeechSynthesisUtterance("cerrar ingreso de clave"));
                        break;
                    case "limpiar clave":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("comenzando a borrar clave"));
                        borrapass();
                        break;

                    case "verificar usuario":
                        var usuariotex = document.getElementById("textuser");
                        speechSynthesis.speak(new SpeechSynthesisUtterance("el usuario que ha ingresado es " + usuariotex.value));
                        break;
                    case "verificar clave":
                        var passtex = document.getElementById("textpassword");
                        speechSynthesis.speak(new SpeechSynthesisUtterance("la clave que ha ingresado es " + passtex.value));
                        break;

                    case "control final":
                        speechSynthesis.speak(new SpeechSynthesisUtterance("Cerrando control de voz automatico"));
                        rec.abort();
                        bandejaEs = false;
                        break;


                }
            }
            if (ingrusuario === true)
            {
                if (frase.toString().trim() !== "ingresar usuario" && frase.toString().trim() !== "limpiar usuario")
                {

                    document.getElementById("textuser").value += frase;
                }
            }
            if (bandejapass === true)
            {
                if (frase.toString().trim() !== "ingresar clave")
                {

                    document.getElementById("textpassword").value += frase;
                }

            }
        };
    }



}
function borra()
{
    bandejaEs = false;
    document.getElementById("textuser").value = "";
}
function borrapass()
{
    bandejapass = false;
    document.getElementById("textpassword").value = "";

}
function focusuario()
{
    document.getElementById("textuser").focus();
    document.getElementById("textuser").style.border = "red solid 1px";
    if (document.getElementById("textpassword").length > 0)
    {
        document.getElementById("textpassword").style.border = "black solid 1px";
    }
}
function focupass()
{
    document.getElementById("textuser").style.border = "black solid 1px";
    document.getElementById("textpassword").focus();
    document.getElementById("textpassword").style.border = "red solid 1px";
    if (document.getElementById("textuser").length > 0)
    {
        document.getElementById("textuser").style.border = "black solid 1px";
    }
}

document.getElementById('bntStarLogin').addEventListener("click", () => {
    rec.abort();
    autoLogin = false;
    speechSynthesis.speak(new SpeechSynthesisUtterance("iniciando control de voz"));
    rec.start();
    inici();
});
document.getElementById('bntStarLogintwo').addEventListener("click", () => {
    speechSynthesis.speak(new SpeechSynthesisUtterance("iniciando control de voz"));
    rec.start();
    inici();
});

document.getElementById('bntmuteLogin').addEventListener("click", () => {
    speechSynthesis.speak(new SpeechSynthesisUtterance("Cerrando control de voz"));
    rec.abort();

});
window.onload = function () {
    autoLogin = true;
    bandejaEs = true;
    rec.start();
    inici();
};

function vericom(comando)
{
    for (var Co = 0; Co < comandos.length; Co++)
    {
        if (comandos[Co] === comando)
        {
            return comando;
        }
    }

}
