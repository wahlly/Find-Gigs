const {Router} = require('express')
const db = require('../config/db')
const Gig = require('../models/gig')
const router = Router()

//Get gig list
router.get('/', (req, res) =>
      Gig.findAll()
            .then(gigs =>{
                  res.render('gigs', {
                        gigs
                  })
            })
            .catch(err => console.log(err))
)

//display gig form
router.get('/add', (req, res) => res.render('add'))

//Add a gig
router.post('/add', (req, res) => {
      const data = {
            title: 'Simple Wordpress website',
            technologies: 'wordpress, php, html, css',
            budget: '$1000',
            description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.',
            contact_email: 'user1@gmail.com'
      }

      let { title, technologies, budget, description, contact_email } = data

      //insert into table
      Gig.create({title, technologies, budget, description, contact_email})
            .then((gig) => res.redirect('/gigs'))
            .catch(err => console.log(err))
})

module.exports = router