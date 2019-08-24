// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for openresponses
const OpenResponse = require('../models/openresponse')
const OpenSurvey = require('../models/opensurvey')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { openresponse: { title: '', text: 'foo' } } -> { openresponse: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /openresponses
router.get('/openresponses', (req, res, next) => {
  OpenResponse.find()
    .populate('owner')
    .then(openresponses => {
      // `openresponses` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return openresponses.map(openresponse => openresponse.toObject())
    })
    // respond with status 200 and JSON of the openresponses
    .then(openresponses => res.status(200).json({ openresponses: openresponses }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /openresponses/5a7db6c74d55bc51bdf39793
router.get('/openresponses/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  OpenResponse.findById(req.params.id)
    .populate('opensurvey')
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "openresponse" JSON
    .then(openresponse => res.status(200).json({ openresponse: openresponse.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /openresponses
router.post('/openresponses', requireToken, (req, res, next) => {
//  console.log(req.body)

  req.body.openresponse.owner = req.user.id
  let opensurveyId = req.body.openresponse.opensurvey
  // console.log(req.body.openresponse.opensurvey)
  let openresponse = req.body.openresponse

  OpenResponse.create(req.body.openresponse)
    .then(openresponse => {
      // console.log(openresponse)

      OpenSurvey.findById(opensurveyId)
        .then(foundOpenSurvey => {
          foundOpenSurvey.openResponses.push(openresponse._id)
          return foundOpenSurvey.save()
        })
    })
    .then(() => {
      res.status(201).json({openresponse})
    })
    .catch(next)
})

// UPDATE
// PATCH /openresponses/5a7db6c74d55bc51bdf39793
router.patch('/openresponses/:id', removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.openresponse.owner

  OpenResponse.findById(req.params.id)
    .then(handle404)
    .then(openresponse => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, openresponse)

      // pass the result of Mongoose's `.update` to the next `.then`
      return openresponse.update(req.body.openresponse)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /openresponses/5a7db6c74d55bc51bdf39793
router.delete('/openresponses/:id', requireToken, (req, res, next) => {
  OpenResponse.findById(req.params.id)
    .then(handle404)
    .then(openresponse => {
      // throw an error if current user doesn't own `openresponse`
      requireOwnership(req, openresponse)
      // delete the openresponse ONLY IF the above didn't throw
      openresponse.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
