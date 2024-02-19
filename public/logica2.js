//logica planta 2

let plazasEstacionamiento = [];

// Inicializamos las plazas
for (let i = 11; i <= 20; i++) {
    plazasEstacionamiento.push({
        numero: i,
        estado: 'libre'
    });
}

function generarMatriculaAleatoria() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';

    let matricula = '';
    for (let i = 0; i < 3; i++) {
        matricula += letras.charAt(Math.floor(Math.random() * letras.length));
    }
    matricula += '-';
    for (let i = 0; i < 4; i++) {
        matricula += numeros.charAt(Math.floor(Math.random() * numeros.length));
    }

    return matricula;
}

function cocheEntra() {
    const plazasLibres = plazasEstacionamiento.filter(plaza => plaza.estado === 'libre');
    if (plazasLibres.length > 0) {
        // Elegir una plaza aleatoria entre las plazas libres
        const plazaAleatoria = plazasLibres[Math.floor(Math.random() * plazasLibres.length)];
        plazaAleatoria.estado = 'ocupada';
        const matricula = generarMatriculaAleatoria();
        plazaAleatoria.matricula = matricula; // Guardamos la matrícula en la plaza
        console.log('Coche entrando en la plaza:', plazaAleatoria.numero, 'con matrícula:', matricula);
        alert('Matrícula ingresada: ' + matricula);
        actualizarVisualizacion();
    } else {
        alert('Lo sentimos, no hay plazas libres disponibles.');
    }
}

function eliminarMatriculaRegistrada(matricula) {
    // Buscamos la matricula en el array de plazas ocupadas y la eliminamos
    for (let plaza of plazasEstacionamiento) {
        if (plaza.estado === 'ocupada' && plaza.matricula === matricula) {
            plaza.estado = 'libre';
            plaza.matricula = null;
            console.log('Matrícula', matricula, 'eliminada.');
            break;
        }
    }
}

function cocheSale() {
    const plazasOcupadas = plazasEstacionamiento.filter(plaza => plaza.estado === 'ocupada');
    if (plazasOcupadas.length > 0) {
        // Elegir una plaza aleatoria entre las plazas ocupadas
        const plazaAleatoria = plazasOcupadas[Math.floor(Math.random() * plazasOcupadas.length)];
        const matricula = plazaAleatoria.matricula;
        eliminarMatriculaRegistrada(matricula);
        console.log('Coche saliendo de la plaza:', plazaAleatoria.numero, 'con matrícula:', matricula);
        actualizarVisualizacion();
        alert('El coche con matrícula ' + matricula + ' ha salido del estacionamiento.');
    } else {
        alert('Lo sentimos, no hay coches estacionados para salir.');
    }
}



function actualizarVisualizacion() {
    const plazasDiv = document.getElementById('plazas');
    plazasDiv.innerHTML = ''; // Limpiamos el contenido actual del div

    const filas = 2;
    const columnas = 5;
    let contador = 11;

    for (let i = 0; i < filas; i++) {
        const filaDiv = document.createElement('div');
        filaDiv.className = 'fila';
        for (let j = 0; j < columnas; j++) {
            if (contador <= 20) {
                const plazaDiv = document.createElement('div');
                plazaDiv.className = 'plaza';

                // Cambiar color de fondo según el estado de la plaza
                const plaza = plazasEstacionamiento.find(plaza => plaza.numero === contador);
                plazaDiv.textContent = contador++;
                if (plaza.estado === 'ocupada') {
                    plazaDiv.classList.add('ocupada');
                } else {
                    plazaDiv.classList.add('libre');
                }

                filaDiv.appendChild(plazaDiv);
            } else {
                break; // Solo se crean 10 plazas
            }
        }
        plazasDiv.appendChild(filaDiv);
    }
}

function regresarAlIndex() {
    window.location.href = "index.html"; // Redirecciona al índice
}

// Llamamos a actualizarVisualizacion al cargar la página
window.onload = function () {
    actualizarVisualizacion();
};