const {Router} = require('express')
const db = require('../config/db')
const Gig = require('../models/gig')
const router = Router()

router.get('/', (req, res) =>
      Gig.findAll()
            .then(gigs =>{
                  console.log(gigs)
                  res.sendStatus(200)
            })
            .catch(err => console.log(err))
)
module.exports = router