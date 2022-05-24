const express = require('express')
const router = express.Router()
const models = require('../models/index')
const csurf = require('csurf')
const csrfProtection = csurf({ cookie: true })
const MessageController = require('../controllers/messages')
const messageController = new MessageController()

router.get('/show/:id', async (req, res) => {
  try {
    const page = req.query.page;
    const message = await messageController.viewMessage(req.params.id);
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
    return;
  }
  
  try {
    const paginatedMessages = await messageController.getMessages(req.query.page);
    if (paginatedMessages.error) {
      res.redirect('/?page=1')
    } else {
      const page = req.query.page;
      const { messageStart, messageEnd, messageCount, skip, messages } = paginatedMessages;
      res.render('messages/index', {page, messageStart, messageEnd, messageCount, skip, messages, csrfToken: req.csrfToken() })
    }
   
  } catch(error) {
    console.log(error);
    res.render('error', { error })
  }

})

router.post('/new', csrfProtection, async (req, res) => {
  try {
    const page = req.query.page;
    await messageController.createMessage(req.body.title, req.body.text);
    res.redirect(`/?page=${page}`)
  } catch(error) {
    console.log(error.message)
  }
})


module.exports = router
