const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const cookieParser = require('cookie-parser')

const messagesRoute = require('./routes/messages')
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
require('dotenv').config()
app.use('/', messagesRoute)
app.set('view engine', 'pug')

app.listen(port, () => {
  console.log(`TMWSD is listening at http://localhost:${port}`)
})
