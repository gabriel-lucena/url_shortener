'use strict'

const urlsCreated = use('App/Models/Urlscreated')

class DefaultController {
  index ({ view }) {
    return view.render('default')
  }

  // GENERATE THE URL CODE
  async urlsGenerator ({ view, request, response }) {
    const newUrl = new urlsCreated()
    let generateUrlCode = () => {
      let code = ''
      let alphaNumbers = `0123456789ABCDEFGHIJKLMNOpQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`

      for(let i = 0; i < 6; i++) {
        code += alphaNumbers[Math.floor(Math.random() * 62)]
      }

      return code
    }

    // GET FORM DATA WITH POST
    let urlPost = request.input('url')

    // CHECKS WHETER THE FIELD HAS TEXT
    if(urlPost == null) return response.send('The text field is mandatory!')
    let urlCodegenerated = generateUrlCode()
    //GET FORM DATA WITH POST AND TAKE VALUES INTO THE DATABASE
    newUrl.url = urlPost
    newUrl.code_url = urlCodegenerated

    await newUrl.save()

    return view.render('default', { code: `localhost:5555\\${urlCodegenerated}`})
  }

  async redirectUrl ({ request, response, params }) {
    let code = await urlsCreated.query().where('code_url', params.id).first()

    if(code) {
      return response.redirect(`https://${code.url}`)
    } else {
      return response.send(`NOT FOUND PARAMS ID ${params.id}`)
    }

  }
}

module.exports = DefaultController
