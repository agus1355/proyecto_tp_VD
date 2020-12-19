const express = require('express')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator');
const request = require('request-promise');
const port = 3000
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/crearPersonas.html') 
})

//TODO: notificar error cuando se manden más atributos de los permitidos
app.post('/prueba_POST', [
    check('nombre').isString(),
    check('apellido').isString(),
    check('dni').isNumeric().isLength({max: 10})
] , (req, res) => {
     const errTotal = validationResult(req)
    if(!errTotal.isEmpty())
    {
        return res.status(400).json({errors: errTotal.array() })
    }
    req.body.dni = parseInt(req.body.dni);
    console.log(req.body);

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
      //falta mandar la respuesta del post a la pagina
      res.sendStatus(201);
})

app.listen(port, () => {
  console.log("test servidor");
})