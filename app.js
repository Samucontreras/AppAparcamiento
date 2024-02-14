const express = require('express');
const app = express();
const path = require('path');
const mysql2 = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql2.createConnection({
    host: 'localhost',
    port: 3306, 
    user: 'root',
    password: '25012173',
    database: 'parking'
});

// Conexión a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});


// Matriz para representar el estado de las plazas de aparcamiento
const parkingPlazas = [
    // Planta 1
    Array(10).fill('L'), // 10 plazas libres
    // Planta 2
    Array(10).fill('L')  // 10 plazas libres
];

// Configurar Express para servir archivos estáticos desde la carpeta "views"
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Ruta para mostrar las plazas ocupadas de la primera planta
app.get('/planta1', (req, res) => {
    const ocupadasPlanta1 = parkingPlazas[0].reduce((acc, plaza, index) => {
        if (plaza === 'O') {
            acc.push(index + 1);
        }
        return acc;
    }, []);
    res.json({ ocupadas: ocupadasPlanta1 });
});

// Ruta para mostrar las plazas ocupadas de la segunda planta
app.get('/planta2', (req, res) => {
    const ocupadasPlanta2 = parkingPlazas[1].reduce((acc, plaza, index) => {
        if (plaza === 'O') {
            acc.push(index + 1);
        }
        return acc;
    }, []);
    res.json({ ocupadas: ocupadasPlanta2 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
