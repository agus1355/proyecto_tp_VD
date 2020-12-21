const express = require('express')
const bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator');
const request = require('request-promise');
const port = 3000
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//get desde navegador para acceder al formulario
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/crearPersonas.html')
})

//POST enviado desde el navegador con los datos ingresados en el body
app.post('/prueba_POST', [
    body('nombre').isString(),
    body('apellido').isString(),
    body('dni').isNumeric().isLength({max: 10})
] , (req, res) => {
    const errTotal = validationResult(req)
    if(!errTotal.isEmpty() || Object.keys(req.body).length > 3)
    {
        return res.status(400).json({errors: errTotal.array() })
    }

    req.body.dni = parseInt(req.body.dni);
    console.log(req.body);

    //POST a servidor con la base de datos
     var options = {
        'method': 'POST',
        'url': 'https://reclutamiento-14cf7.firebaseio.com/personas.json',
        'headers': {
          'Content-Type': 'aplication/json'
        },
        body: JSON.stringify(req.body)
      }

      request(options, (err,response)=> {
            if(err)
            {
              res.sendStatus(500);
              throw err;
            }
        console.log(response.body)
      })
      
      res.sendStatus(201);
})

app.listen(port, () => {
  console.log("Servidor iniciado.");
})