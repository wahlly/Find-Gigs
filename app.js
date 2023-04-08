const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const db = require('./config/db')

//test db
db.authenticate()
      .then(() => console.log('Database connected...'))
      .catch(err => console.log(err))

const app = express()

//gig routes
app.use('/gigs', require('./routes/gig'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on port ${PORT}`))