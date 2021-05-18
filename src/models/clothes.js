'use strict';

let uuid = require('uuid').v4;

class Clothes {
  constructor(){
    this.pieces = [];
  }
  create(obj){
    const piece = {
      id:uuid(),
      data:obj
    };
    this.pieces.push(piece);
    return piece;
  }


  read(id){
    if(id){
      return this.pieces.find(piece=>{
        return piece.id === id;
      });

    }else{
      return this.pieces;
    }
  }

  update(obj,id){
    let i = -1;
    this.pieces.map(piece=>{
      if (piece.id === id){
        piece.data = obj;
        i = i+1;
        return piece;

      }

    });
    if (i >= 0){
      return this.pieces[i];}

  }




  delete(id){

    this.pieces = this.pieces.filter(piece=>{
      return piece.id !==id;
    });
    return this.pieces;

  }

}
module.exports= Clothes;
