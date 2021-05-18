'use strict';

const uuid = require('uuid').v4;

class Food {
  constructor(){
    this.plates = [];
  }
  create(obj){
    const plate = {
      id:uuid(),
      data:obj
    };
    this.plates.push(plate);
    return plate;
  }


  read(id){
    if(id){
      return this.plates.find(plate=>{
        return plate.id === id;
      });

    }else{
      return this.plates;
    }
  }

  update(obj,id){
    let i = -1;
    this.plates.map(plate=>{
      if (plate.id === id){
        plate.data = obj;
        i = i+1;
        return plate;

      }

    });
    if (i >= 0){
      return this.plates[i];}

  }

  delete(id){

    this.plates = this.plates.filter(plate=>{
      return plate.id !==id;
    });
    return this.plates;

  }

}
module.exports= Food;



