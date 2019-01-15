var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/create', (req, res) => {
  const userObj = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10)
  }
  
  User.create(userObj)
    .then(user => {
      var token = jwt.sign({id: user.id}, 'this_is_a_secret', {expiresIn: 60*60*24});
      res.status(200).json({
        user: user,
        message: 'created',
        sessionToken: token
      })
    })
    .catch(err => res.status(500).json({error: err}))
})

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then( user => {
      if (user){
        bcrypt.compare(req.body.password, user.password, (err, matches) => {
          if (matches) {
            var token = jwt.sign({id: user.id}, 'this_is_a_secret', {expiresIn: 60*60*24});
            res.status(200).json({
              user: user,
              message: 'successfully authenticated',
              sessionToken: token
            })
          } else {
            res.status(500).send({error: 'failed to authenticate'});
          }
        })
      } else{
        res.status(500).send('UN or PW is incorrect (or both)');
      }
    }
    )
    .catch(err => res.status(500).json({err: err}))
})



module.exports = router;