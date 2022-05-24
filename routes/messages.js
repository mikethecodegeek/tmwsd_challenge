const express = require('express')
const router = express.Router()
const models = require('../models/index')
const csurf = require('csurf')
const csrfProtection = csurf({ cookie: true })

router.get('/show/:id', async (req, res) => {
  try {
    const page = req.query.page;
    const message = await models.message.findByPk(req.params.id)
    message.destroy();
    res.render('messages/show', { message, page })
  } catch(error) {
    console.log(error)
    let message = {title: 'Error', text: 'There was an error', createdAt: new Date()}
    res.render('messages/show', { message })
  }
})

router.get('/', csrfProtection, async (req, res)  =>  {
  if (!req.query.page || req.query.page < 1) {
    res.redirect('?page=1')
  }
  const pageSize = 10;
  const skip = (Number(req.query.page) - 1) * pageSize;

  try {
    let messageCount = await models.message.count();
    if (req.query.page > Math.ceil(messageCount / pageSize)) {
      res.redirect('?page=1')
    }
    if (messageCount > 0) {
    const messages = await models.message.findAll({offset: skip, limit: pageSize, order: [['createdAt', 'DESC']]})
    res.render('messages/index', {
      page:Number(req.query.page),
      messageStart: (Number(req.query.page) -1 ) * pageSize + 1,
      messageEnd: Number(req.query.page) * pageSize > messageCount ? messageCount : Number(req.query.page) * pageSize,
      messageCount, 
      skip,
      messages, 
      csrfToken: req.csrfToken() })
  }
  } catch(error) {
    res.render('error')
  }

})

router.post('/new', csrfProtection, async (req, res) => {
  try {
    const {title, text} = req.body
    const message = await models.message.create({
      title,
      text
    })
    res.redirect('/')
  } catch(error) {
    console.log(error.message)
  }
})


module.exports = router
