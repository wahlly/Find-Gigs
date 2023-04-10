const {Router} = require('express')
const db = require('../config/db')
const Gig = require('../models/gig')
const router = Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op

//Get gig list
router.get('/', (req, res) =>
      Gig.findAll()
            .then(gigs => res.render('gigs', { gigs }))
            .catch(err => console.log(err))
)

//display gig form
router.get('/add', (req, res) => res.render('add'))

//Add a gig
router.post('/add', (req, res) => {
      let { title, technologies, budget, description, contact_email } = req.body
      let errors = []
      //validations
      if(!title) {
            errors.push({text: 'Please add a title'})
      }
      if(!technologies) {
            errors.push({text: 'Please add some technologies'})
      }
      if(!description) {
            errors.push({text: 'Please add a description'})
      }
      if(!contact_email) {
            errors.push({text: 'Please add a contact email'})
      }

      if(errors.length > 0) {
            res.render('add', {errors, ...req.body })
      }else{
            if(!budget) {
                  budget = 'Unknown'
            }
            technologies = technologies.replace(/, /g, ',')
            //insert into table
            Gig.create({title, technologies, budget, description, contact_email})
                  .then((gig) => res.redirect('/gigs'))
                  .catch(err => console.log(err))
      }
})

//Search for gigs
router.get('/search', (req, res) => {
      let { term } = req.query
      term = term.toLowerCase()

      Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
            .then(gigs => res.render('gigs', { gigs }))
            .catch(err => console.log(err))
})

module.exports = router