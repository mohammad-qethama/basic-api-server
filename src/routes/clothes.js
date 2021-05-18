'use strict';

const express = require('express');
const Clothes = require('../models/clothes.js');
const clothes = new Clothes();//object
const router = express.Router();

router.get('/',getHandler);
router.get('/:id',getIdHandler);
router.post('/',postHandler);
router.put('/:id',putHandler);
router.delete('/:id',deleteHandler);


function getHandler(req,res){
  res.status(200).json(clothes.read());

}

function getIdHandler(req,res){
  res.status(200).json(clothes.read(req.params.id));

}

function postHandler(req,res){
  let reqObj = req.body;
  console.log(reqObj);
  let resObj = clothes.create(reqObj);
  console.log(resObj);
  res.status(201).json(resObj);

}

function putHandler(req,res){
  let reqObj = req.body;
  let id = req.params.id;
  let resObj = clothes.update(reqObj,id);
  res.status(200).json(resObj);

}

function deleteHandler(req,res){
  let id = req.params.id;
  let resObj = clothes.delete(id);
  res.status(200).json(resObj);

}

module.exports = router;


