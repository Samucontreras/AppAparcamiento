const express = require('express');
const app = express();
const path = require('path');

// Configuración de la conexión a la base de datos
// (Mantengo este bloque ya que parece que lo necesitas para otras operaciones en tu aplicación)
const mysql2 = require('mysql2');
const connection = mysql2.createConnection({
    host: 'localhost',
    port: 3306, 
    user: 'root',
    password: '25012173',
    database: 'parking2'
});
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
