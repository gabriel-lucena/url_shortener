var express = require('express');
var router = express.Router();

// Configurantion database PostgreSQL
const Pool =require('pg').Pool
const db = new Pool ({
    user: 'USER',
    password: 'PASSWORD',
    host: 'HOST',
    port: 5432,
    database: 'DATABASE'
})

let title = 'Url Shortener'

/* GET home page. */
router.get('/', function(req, res, next) {
 db.query(`SELECT * FROM urls`, function(err, result) {
   if (err) return res.send('Error, no bank selected.')

   return res.render('index.tpl', {title})
 })
})

router.get('/:id', function(req, res) {
  const URL_ID = req.params.id

  db.query(`SELECT url FROM urls WHERE code = '${URL_ID}'`, function(err, result) {
    if (err) return res.send('Error, no bank selected.')

    const URL_REDIRECT = result.rows
    
    if(URL_REDIRECT.length == 0) return res.redirect('/error/404.html')
    else return res.redirect(`http://${URL_REDIRECT[0].url}`)
  })
})

 // Generates the URL code 
let getRandomColor = () => {
  let letters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let code = ''

  for (i = 0; i < 6; i++) {
    code += letters[Math.floor(Math.random() * 62)]
  }

  return code
}

router.post('/', function(req, res, next) {
  // Get form data with POST
  const URL = req.body.url

  // Get the page code
  const CODE_URL = getRandomColor()

  // Checks whether the field has text
  if(URL == null) {
    return res.send('The text field is mandatory!')
  }

  // Take the values of the CODE and URL and inject it into the bank
  const QUERY = `INSERT INTO urls ("url", "code") VALUES ($1, $2)`
  const VALUES = [URL, CODE_URL]

  db.query(QUERY, VALUES, function(err, result) {
    // Erro flow
    if (err) return res.send('Error sending data to the database!')

    // Ideal flow
    return res.render('index.tpl', {code: `localhost:3000\\${CODE_URL}`, title})
  })

})

module.exports = router;
