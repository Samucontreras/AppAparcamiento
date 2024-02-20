const express = require('express');
const app = express();
const path = require('path');
const dbManager = require('./public/dbManager');


// Configurar Express para servir archivos estáticos desde la carpeta "views"
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Ruta para la página principal
app.get('/', async (req, res) => {
    const data = await dbManager.getData();
    if (data)
        res.render('index.ejs', { titulo: 'Parking', plazas: data });
});

const PORT =  3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});