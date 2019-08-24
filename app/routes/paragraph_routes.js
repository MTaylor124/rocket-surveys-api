// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for paragraphs
const Paragraph = require('../models/paragraph')
const Question = require('../models/question')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { paragraph: { title: '', text: 'foo' } } -> { paragraph: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /paragraphs
router.get('/paragraphs', (req, res, next) => {
  Paragraph.find()
    .populate('owner')
    .then(paragraphs => {
      // `paragraphs` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return paragraphs.map(paragraph => paragraph.toObject())
    })
    // respond with status 200 and JSON of the paragraphs
    .then(paragraphs => res.status(200).json({ paragraphs: paragraphs }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /paragraphs/5a7db6c74d55bc51bdf39793
router.get('/paragraphs/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Paragraph.findById(req.params.id)
    .populate('question')
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "paragraph" JSON
    .then(paragraph => res.status(200).json({ paragraph: paragraph.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /paragraphs
router.post('/paragraphs', requireToken, (req, res, next) => {
  // set owner of new paragraph to be current user
  req.body.paragraph.owner = req.user.id
  let questionId = req.body.paragraph.question
  let paragraph = req.body.paragraph
  Paragraph.create(req.body.paragraph)
    // respond to succesful `create` with status 201 and JSON of new "paragraph"
    .then(paragraph => {
      Question.findById(questionId)
        .then(foundQuestion => {
          foundQuestion.paragraphs.push(paragraph._id)
          let question = foundQuestion
          return foundQuestion.update(question)
        })
    })
    .then(() => {
      res.status(201).json({paragraph})
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /paragraphs/5a7db6c74d55bc51bdf39793
router.patch('/paragraphs/:id', removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.paragraph.owner

  Paragraph.findById(req.params.id)
    .then(handle404)
    .then(paragraph => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, paragraph)

      // pass the result of Mongoose's `.update` to the next `.then`
      return paragraph.update(req.body.paragraph)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /paragraphs/5a7db6c74d55bc51bdf39793
router.delete('/paragraphs/:id', requireToken, (req, res, next) => {
  Paragraph.findById(req.params.id)
    .then(handle404)
    .then(paragraph => {
      // throw an error if current user doesn't own `paragraph`
      requireOwnership(req, paragraph)
      // delete the paragraph ONLY IF the above didn't throw
      paragraph.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
