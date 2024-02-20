const libManager = require('./lib');
const dbManager = require('./dbManager');

function setOccuped(id) {
    const spotDiv = document.getElementById(id);

    if (spotDiv.classList.contains('libre')) {
        spotDiv.classList.remove('libre');
    }
    spotDiv.classList.add('ocupado');
}

function setFree(id) {
    const spotDiv = document.getElementById(id);

    if (spotDiv.classList.contains('ocupado')) {
        spotDiv.classList.remove('ocupado');
    }
    spotDiv.classList.add('libre');
}

function cocheEntra() {
    var plazasEstacionamiento = dbManager.getData();
    const plazasLibres = plazasEstacionamiento.filter(plaza => plaza.Disponible === true);
    if (plazasLibres.length > 0) {
        // Elegir una plaza aleatoria entre las plazas libres
        const plazaAleatoria = plazasLibres[Math.floor(Math.random() * plazasLibres.length)].id;
        const matricula = libManager.generarMatriculaAleatoria();
        dbManager.insertCar(plazaAleatoria, matricula);
        plazasEstacionamiento = dbManager.getData();
        setOccuped(id);
        console.log('Coche entrando en la plaza:', plazaAleatoria.numero, 'con matrícula:', matricula);
        alert('Matrícula ingresada: ' + matricula);
    } else {
        alert('Lo sentimos, no hay plazas libres disponibles.');
    }
}

function cocheSale() {
    const plazasOcupadas = plazasEstacionamiento.filter(plaza => plaza.estado === 'ocupada');
    if (plazasOcupadas.length > 0) {
        // Elegir una plaza aleatoria entre las plazas ocupadas
        const plazaAleatoria = plazasOcupadas[Math.floor(Math.random() * plazasOcupadas.length)].id;
        db_manager.exitCar(id);
        plazasEstacionamiento = db_manager.getData();
        setFree(id);
        console.log('Coche saliendo de la plaza:', plazaAleatoria.numero, 'con matrícula:', matricula);
        alert('El coche con matrícula ' + matricula + ' ha salido del estacionamiento.');
    } else {
        alert('Lo sentimos, no hay coches estacionados para salir.');
    }
}

function regresarAlIndex() {
    window.location.href = "index.html"; // Redirecciona al índice
}

module.exports = { cocheEntra, cocheSale };