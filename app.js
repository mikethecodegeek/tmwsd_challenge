const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const messagesRoute = require('./routes/messages')


app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.locals.moment = require('moment');
app.use('/', messagesRoute)
app.set('view engine', 'pug')

const server = app.listen(port, () => {
  console.log(`TMWSD is listening at http://localhost:${port}`)
})

module.exports = server;