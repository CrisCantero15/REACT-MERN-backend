const path = require('path');

const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

// console.log( process.env );

// Crear el servidor de express

const app = express();

// Base de Datos

dbConnection();

// CORS

app.use(cors());

// Directorio público --> Cuando el usuario entre al "/" va a mostrar el directorio público (index.html)

app.use( express.static('public') );

// Lectura y parseo del body (JSON)

app.use( express.json() );

// Rutas

app.use( '/api/auth', require('./routes/auth') );
app.use( '/api/events', require('./routes/events') );

app.use('*', ( req, res ) => {
    res.sendFile( path.join( __dirname, 'public/index.html' ) );
});

// Escuchar peticiones

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});