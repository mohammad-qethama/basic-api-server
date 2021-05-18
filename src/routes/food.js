'use strict';

const express = require('express');
const Food = require('../models/food.js');
const food = new Food();//object
const router = express.Router();

router.get('/',getHandler);
router.get('/:id',getIdHandler);
router.post('/',postHandler);
router.put('/:id',putHandler);
router.delete('/:id',deleteHandler);


function getHandler(req,res){
  res.status(200).json(food.read());

}

function getIdHandler(req,res){
  res.status(200).json(food.read(req.params.id));

}

function postHandler(req,res){
  let reqObj = req.body;
  console.log(reqObj);
  let resObj = food.create(reqObj);
  console.log(resObj);
  res.status(201).json(resObj);

}

function putHandler(req,res){
  let reqObj = req.body;
  let id = req.params.id;
  let resObj = food.update(reqObj,id);
  res.status(200).json(resObj);

}

function deleteHandler(req,res){
  let id = req.params.id;
  let resObj = food.delete(id);
  res.status(200).json(resObj);

}

module.exports = router;


