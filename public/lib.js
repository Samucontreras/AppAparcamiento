
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

module.exports = generarMatriculaAleatoria;
