var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// *** USER CREATE *** //
router.post("/create", async (req, res) => {
    let { username, password } = req.body;
    try {
      const newUser = await User.create({
        username,
        password: bcrypt.hashSync(password, 13),
      });
      let token = jwt.sign({id: newUser.id}, 'super_secret_password', {expiresIn: 60*60*24});
      res.status(200).json({
        message: "Success!",
        user: newUser,
        sessionToken: token
      });
    } catch (error) {
      res.status(500).json({
        error: "Failed to save.",
      });
    }
  });


// *** USER LOGIN *** //
router.post("/login", function (req, res) {
    User.findOne({
      where: {
        username: req.body.user.username,
      },
    })
      .then((user) => {
        if (user) {
          if (user && bcrypt.compare(req.body.user.password, user.password)) {
            let token = jwt.sign({id: newUser.id}, 'super_secret_password', {expiresIn: 60*60*24});
            res.status(200).json({
              user: user,
              message: "User successfully logged in!",
              sessionToken: token
            });
          } else {
            res.status(401).json({
              message: "Login failed: user info bad.",
            });
          }
        } else {
          res.status(400).json({
            message: "You don't exist. Existential crisis.",
          });
        }
      })
      .catch((error) => res.status(500).json({ error }));
  });

  // *** USER ASYNC LOGIN *** //
  router.post("/asynclogin", async (req, res) => {
    let { username, password } = req.body.user;
    try {
      let loginUser = await User.findOne({
        where: {
          username,
        },
      });
      if (loginUser && await bcrypt.compare(password, loginUser.password)){
        let token = jwt.sign({id: loginUser.id}, 'super_secret_password', {expiresIn: 60*60*24});
        res.status(200).json({
          message: "Login Success",
          loginUser,
          token
        })
      } else {
        res.status(401).json({
          message: "You failed yo",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: "Error logging in",
      });
    }
  });

module.exports = router;