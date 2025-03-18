const amigos = []; // Lista para almacenar los nombres de los participantes
const maxAmigos = 5; // Límite máximo de participantes

// Referencias a elementos del DOM
const inputAmigo = document.getElementById("amigo");
const listaAmigos = document.getElementById("listaAmigos");
const resultadoDiv = document.getElementById("resultado");
const botonAgregar = document.querySelector(".button-add");
const botonSortear = document.querySelector(".button-draw");

// Permitir agregar nombres presionando Enter
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !botonAgregar.disabled) {
        agregarAmigo();
    }
});

function agregarAmigo() {
    let nombre = inputAmigo.value.trim(); // Eliminar espacios en blanco
    nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase(); // Normalizar nombres
    
    if (!nombre || !isNaN(nombre)) {
        mostrarMensaje("Ingrese un nombre válido.", "error");
        return;
    }
    
    if (amigos.includes(nombre)) {
        mostrarMensaje("El nombre ya ha sido ingresado.", "error");
        return;
    }
    
    amigos.push(nombre);
    console.log("Nombres ingresados:", amigos);
    
    actualizarLista();
    inputAmigo.value = "";
    inputAmigo.focus(); // Devolver el cursor al input automáticamente
    
    if (amigos.length >= maxAmigos) {
        botonAgregar.disabled = true;
        inputAmigo.disabled = true; // Deshabilitar el input
        mostrarMensaje("Se ha alcanzado el límite de nombres.", "info");
    }
}

function actualizarLista() {
    listaAmigos.innerHTML = amigos.map(nombre => `<li>${nombre}</li>`).join("");
}

function sortearAmigo() {
    if (amigos.length < 2) {
        mostrarMensaje("Se necesitan al menos 2 participantes.", "error");
        return;
    }
    
    let amigosDisponibles = [...amigos];
    let asignaciones = {};
    
    amigos.forEach(amigo => {
        let posiblesAmigos = amigosDisponibles.filter(a => a !== amigo);
        if (posiblesAmigos.length === 0) {
            return sortearAmigo(); // Reiniciar sorteo si no hay opciones válidas
        }
        let amigoSecreto = posiblesAmigos[Math.floor(Math.random() * posiblesAmigos.length)];
        asignaciones[amigo] = amigoSecreto;
        amigosDisponibles = amigosDisponibles.filter(a => a !== amigoSecreto);
    });
    
    console.log("Resultados del sorteo:", asignaciones);
    mostrarResultados(asignaciones);
}

function mostrarResultados(asignaciones) {
    resultadoDiv.innerHTML = Object.entries(asignaciones)
        .map(([persona, amigo]) => `<li>${persona} → ${amigo}</li>`)
        .join("");
    
    setTimeout(limpiarPantalla, 5000);
}

function mostrarMensaje(mensaje, tipo) {
    resultadoDiv.innerHTML = `<p class="mensaje ${tipo}">${mensaje}</p>`;
}

function limpiarPantalla() {
    amigos.length = 0;
    listaAmigos.innerHTML = "";
    resultadoDiv.innerHTML = "";
    inputAmigo.value = "";
    inputAmigo.focus(); // Restaurar el foco en el input después de limpiar
    botonAgregar.disabled = false;
    inputAmigo.disabled = false; // Habilitar nuevamente el input
}
