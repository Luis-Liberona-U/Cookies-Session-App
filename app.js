const express = require('express')
const port    = 8000;
const app     = express()
const session = require('express-session')

app.use(session({
    secret: 'SECRETO',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,     
        secure: false,       
        maxAge: 3600000      
    }
}));

app.use(express.urlencoded({extended: true}))


app.get('/',(req,res) => {

    req.session.contador = req.session.contador -1
    
    res.send(`Hemos ingresado ${req.session.contador}`)
})

app.set('view engine', 'ejs');

app.get('/formulario', (req,res) => {
    res.render("index");
})

app.post('/enviar', (req,res) => {
    req.session.nombre = req.body.nombre;
    req.session.apellido = req.body.apellido;
    req.session.correoelectronico = req.body.correoelectronico;

    console.log(`Datos recibidos: ${req.body.nombre} ${req.body.apellido}`);

    res.redirect('/perfil');
})

app.get('/perfil', (req, res) => {
    if (req.session.nombre) {
        res.send(`
            <h1>Perfil de Usuario</h1>
            <p>Nombre: ${req.session.nombre}</p>
            <p>Apellido: ${req.session.apellido}</p>
            <p>Correo: ${req.session.correoelectronico}</p>
            <a href="/formulario">Volver al formulario</a>
        `);
    } else {
        res.send("No hay datos guardados. <a href='/formulario'>Ir al formulario</a>");
    }
});

app.listen(port, () => {
    console.log('example app listening on port')
})