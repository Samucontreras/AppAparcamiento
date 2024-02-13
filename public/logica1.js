//logica planta 1
let plazasEstacionamiento = [];

        // Inicializamos las plazas
        for (let i = 1; i <= 10; i++) {
            plazasEstacionamiento.push({
                numero: i,
                estado: 'libre'
            });
        }

        function cocheEntra() {
            const plazasLibres = plazasEstacionamiento.filter(plaza => plaza.estado === 'libre');
            if (plazasLibres.length > 0) {
                // Elegir una plaza aleatoria entre las plazas libres
                const plazaAleatoria = plazasLibres[Math.floor(Math.random() * plazasLibres.length)];
                plazaAleatoria.estado = 'ocupada';
                console.log('Coche entrando en la plaza:', plazaAleatoria.numero);
                actualizarVisualizacion();
            } else {
                alert('Lo sentimos, no hay plazas libres disponibles.');
            }
        }

        function cocheSale() {
            const plazasOcupadas = plazasEstacionamiento.filter(plaza => plaza.estado === 'ocupada');
            if (plazasOcupadas.length > 0) {
                // Elegir una plaza aleatoria entre las plazas ocupadas
                const plazaAleatoria = plazasOcupadas[Math.floor(Math.random() * plazasOcupadas.length)];
                plazaAleatoria.estado = 'libre';
                console.log('Coche saliendo de la plaza:', plazaAleatoria.numero);
                actualizarVisualizacion();
            } else {
                alert('Lo sentimos, no hay coches estacionados para salir.');
            }
        }

        function actualizarVisualizacion() {
            const plazasDiv = document.getElementById('plazas');
            plazasDiv.innerHTML = ''; // Limpiamos el contenido actual del div

            const filas = 2;
            const columnas = 5;
            let contador = 1;

            for (let i = 0; i < filas; i++) {
                const filaDiv = document.createElement('div');
                filaDiv.className = 'fila';
                for (let j = 0; j < columnas; j++) {
                    if (contador <= 10) {
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
        window.onload = function() {
            actualizarVisualizacion();
        };