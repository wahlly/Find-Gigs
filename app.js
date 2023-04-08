const express = require('express')
const exphbs = require('express-handlebars')
const handlebars = require('handlebars')
const bodyParser = require('body-parser')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const path = require('path')
const db = require('./config/db')

//test db
db.authenticate()
      .then(() => console.log('Database connected...'))
      .catch(err => console.log(err))

const app = express()

//handlebars
app.engine('handlebars', exphbs.engine({defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(handlebars)}))
app.set('view engine', 'handlebars')

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

//index route
app.get('/', (req, res) => res.render('index', {layout: 'landing'}))
//gig routes
app.use('/gigs', require('./routes/gig'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on port ${PORT}`))