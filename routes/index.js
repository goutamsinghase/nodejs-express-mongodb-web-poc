const express = require('express');

const mongoose = require('mongoose');

const { check, validationResult } = require('express-validator');

const router = express.Router();

const Registration = mongoose.model('Registration');

router.get('/', (req, res) => {
  Registration.find()
    .then((registrations) => {
      res.render('index', { title: 'Listing registrations', registrations });
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); });
});

router.get('/:email', (req, res) => {
  Registration.find()  
  .then((registrations) => {
      res.render('index', { title: 'Listing registrations', registrations });
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); });
});

router.post('/:email', (req, res) => {
  console.log(req.params.email);
  Registration.deleteOne(req.params)
  .then(()=>res.sendStatus(200));
});

router.get('/registration', (req, res) => {
  res.render('form', { title: 'Registration form' });
});


router.post('/registration', [
  check('name')
    .isLength({ min: 6 })
    .withMessage('Please enter a name'),
  check('email')
    .isLength({ min: 6 })
    .withMessage('Please enter an email'),
], (req, res) => {
  const errors = validationResult(req);
  console.log(errors);

  if (errors.isEmpty()) {
    const registration = new Registration(req.body);
    registration.save()
      .then(() => {
        Registration.find()
          .then((registrations) => {
            res.render('index', { title: 'Listing registrations', registrations });
          })
      })
      .catch((err) => {
        console.log(err);
        res.send('Sorry! Something went wrong.');
      });

  } else {
    res.render('form', {
      title: 'Registration form',
      errors: errors.array(),
      data: req.body,
    });
  }
});

module.exports = router;