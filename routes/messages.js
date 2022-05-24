const express = require('express')
const router = express.Router()
const models = require('../models/index')
const csurf = require('csurf')
const csrfProtection = csurf({ cookie: true })

router.get('/:id', async (req, res) => {
  try {
    const message = await models.message.findByPk(req.params.id)
    message.destroy();
    res.render('messages/show', { message })
  } catch(error) {
    console.log(error.message)
  }
})

router.get('/', csrfProtection, async (req, res)  =>  {
  try {
    const allMessages = await models.message.findAll()
    res.render('messages/index', { messages: allMessages, csrfToken: req.csrfToken() })
  } catch(error) {
    console.log(error.message)
  }

})

router.post('/new', csrfProtection, async (req, res) => {
  try {
    const message = await models.message.create({
      title: req.body.title,
      text: req.body.message,
    })
    res.redirect('/')
  } catch(error) {
    console.log(error.message)
  }
})


module.exports = router
