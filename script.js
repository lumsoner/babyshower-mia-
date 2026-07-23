/* =========================
INTRO
========================= */

const intro = document.getElementById("intro");
const videoIntro = document.getElementById("videoIntro");
const btnAbrir = document.getElementById("btnAbrir");
const glowRing = document.querySelector(".glow-ring");

document.querySelector(".glow-ring").classList.add("ocultar");

btnAbrir.addEventListener("click", () => {

    glowRing.style.display = "none";
    document.querySelector(".intro-flecha").style.display = "none";
    document.querySelector(".intro-texto").style.display = "none";
    btnAbrir.style.display = "none";

    videoIntro.play();

});

const musica = document.getElementById("musica");

musica.volume = 0.3;

videoIntro.addEventListener("ended", () => {

    // La música comienza de forma gradual
    musica.volume = 0;
    musica.play();

    let volumen = 0;

    const fade = setInterval(() => {

        volumen += 0.01;

        if (volumen >= 0.3) {
            volumen = 0.3;
            clearInterval(fade);
        }

        musica.volume = volumen;

    }, 120);

    document.getElementById("invitacion").style.display = "block";
    intro.style.opacity = "0";

    setTimeout(() => {
        intro.remove();
    }, 180);

});


// 📅 2 de agosto de 2026 - 14:00 hs
const fechaEvento = new Date(2026, 7, 2, 14, 0, 0).getTime();

function actualizarContador() {
    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;

    if (diferencia <= 0) {
        document.getElementById("dias").textContent = "00";
        document.getElementById("horas").textContent = "00";
        document.getElementById("minutos").textContent = "00";
        return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);

    document.getElementById("dias").textContent = dias.toString().padStart(2, "0");
    document.getElementById("horas").textContent = horas.toString().padStart(2, "0");
    document.getElementById("minutos").textContent = minutos.toString().padStart(2, "0");
}


setInterval(actualizarContador, 1000);
actualizarContador();

/* =========================
INVITADOS
========================= */

const contenedorInvitados = document.getElementById("invitados");
const btnAgregar = document.getElementById("agregarInvitado");
const btnConfirmar = document.getElementById("btnConfirmar");

btnAgregar.addEventListener("click", () => {

    const fila = document.createElement("div");
    fila.className = "fila-invitado";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Nombre y apellido";
    input.className = "input-invitado";

    const btnEliminar = document.createElement("button");
    btnEliminar.type = "button";
    btnEliminar.className = "btn-eliminar";
    btnEliminar.textContent = "✕";

    btnEliminar.addEventListener("click", () => {
        fila.remove();
    });

    fila.appendChild(input);
    fila.appendChild(btnEliminar);

    contenedorInvitados.appendChild(fila);

});
const mensajeError = document.getElementById("mensajeError");

document.addEventListener("input", (e) => {

    if (e.target.classList.contains("input-invitado")) {

        mensajeError.classList.remove("mostrar");
        mensajeError.textContent = "";

    }

});

btnConfirmar.addEventListener("click", (e) => {

    e.preventDefault();

    // Oculta el mensaje de error cada vez que intenta confirmar
    mensajeError.classList.remove("mostrar");
    mensajeError.textContent = "";

    const inputs = document.querySelectorAll(".input-invitado");

    let nombres = [];
    let lista = "";

    inputs.forEach(input => {

        const nombre = input.value.trim();

        if (nombre !== "") {

            nombres.push(nombre);
            lista += "• " + nombre + "\n";

        }

    });

    if (nombres.length === 0) {

        mensajeError.textContent = "Por favor, ingresá tu nombre.";
        mensajeError.classList.add("mostrar");

        return;
    }

    const mensaje =
`¡Hola! Quiero confirmar nuestra asistencia al Baby Shower de Mía. 💖

Asistiremos:

${lista}

¡Estamos muy felices de formar parte de este día tan especial! ✨`;

    const whatsappURL =
        "https://wa.me/5491131414415?text=" +
        encodeURIComponent(mensaje);

    window.open(whatsappURL, "_blank");

    document.getElementById("invitacion").style.opacity = "0";

    setTimeout(() => {

    const invitacion = document.getElementById("invitacion");
    const pantalla = document.getElementById("pantallaGracias");

    invitacion.style.display = "none";

    pantalla.style.display = "flex";


    setTimeout(() => {
        pantalla.style.opacity = "1";
    }, 10);

}, 400);

    });

});

document
.getElementById("volverInvitacion")
.addEventListener("click", (e) => {

    e.preventDefault();

const pantalla = document.getElementById("pantallaGracias");

    pantalla.style.opacity = "0";
    pantalla.style.pointerEvents = "none";  

const pantalla = document.getElementById("pantallaGracias");
const invitacion = document.getElementById("invitacion");

pantalla.style.opacity = "0";

setTimeout(() => {
    pantalla.style.display = "none";

    invitacion.style.display = "block";

    setTimeout(() => {
        invitacion.style.opacity = "1";
    }, 10);

}, 400);

});
