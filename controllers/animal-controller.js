var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Animal = sequelize.import('../models/animal');

router.post('/create', (req, res) => {
  const newAnimal = {
    name: req.body.name,
    legNumber: req.body.legNumber,
    predator: req.body.predator
  }

  Animal.create(newAnimal)
    .then((animal) => {res.status(200).json({newAnimal: animal})})
    .catch(
      err => {
        res.status(500).json({error: err})
      }
    )
})

router.delete('/:id', (req, res) => {
  Animal.destroy({
    where: {id: req.params.id}
  })
    .then(numAnimals => res.status(200).json({numAnimalsDeleted: numAnimals}))
    .catch(err => res.status(500).json(err))
})

router.put('/:id', (req, res) => {
  Animal.update({
    legNumber: req.body.legNumber,
    predator: req.body.predator
  }, {
    where: {id: req.params.id}
  })
    .then(numAnimals => res.status(200).json({numAnimalsUpdated: numAnimals}))
    .catch(err => res.status(500).json(err))
})

module.exports = router;






/*
router.post('/create', (req, res) => {
  Animal.create({
    name: req.body.name,
    legNumber: req.body.legNumber,
    predator: req.body.predator
  })
    .then(animal => res.status(200).json(animal))
    .catch(err => res.status(500).json(err))
})

router.delete('/delete/:id', (req, res) => {
  let id = req.params.id
  Animal.destroy({
    where: {id: id}
  })
    .then(animal => res.status(200).json({animalsDeleted: animal}))
    .catch(err => res.status(500).json(err))
})

router.put('/update/:id', (req, res) => {
  Animal.update({
    legNumber: req.body.legNumber,
    predator: req.body.predator
  }, {where: {
    id: req.params.id
  }})
    .then(animal => res.status(200).json({animalsUpdated: animal}))
    .catch(err => res.status(500).json(err))
})
*/