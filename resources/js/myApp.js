require('dotenv').config(); // Carga las variables de .env
let express = require('express');
let app = express();

const bodyParser = require('body-parser');

// Importa body-parser
app.use(bodyParser.urlencoded({ extended: false })); // Configura el middleware

// Middleware de registro (logger)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get('/now', 
  // Middleware: añade la hora a req.time
  (req, res, next) => {
    req.time = new Date().toString(); // Ejemplo: "Wed Oct 25 2023 14:30:00 GMT-0500"
    next();
  },
  // Controlador final: envía el JSON
  (req, res) => {
    res.json({ time: req.time });
  }
);

// console.log("Hello World");
app.use('/public', express.static(__dirname + '/public'));

// Ruta HTML
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Ruta JSON

app.get("/json", (req, res) => {
  let message = "Hello json";  
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message });
});

app.get('/:word/echo', (req, res) => {
  const word = req.params.word; // Captura el parámetro :word de la URL
  res.json({ echo: word });
});


// // Ruta GET /name con parámetros de consulta
// app.get('/name', (req, res) => {
//   const { first, last } = req.query; // Extrae first y last de la URL
//   res.json({ name: `${first} ${last}` });
// });


app.post('/name', (req, res) => {
  const { first, last } = req.body; // Obtiene los datos del cuerpo de la solicitud
  res.json({ name: `${first} ${last}` }); // Responde con el JSON esperado
});




 module.exports = app;

// https://3000-freecodecam-boilerplate-crdtp3plvso.ws-us118.gitpod.io/name?first=Gustavo&last=Andres


















