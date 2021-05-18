'use strict';

const { server } = require('../src/server.js');
const superTest = require('supertest');
const { it, expect } = require('@jest/globals');
const request = superTest(server);

describe('api server', () => {
    let idFood;
    let idClothes;
    it('should create a new food/clothes using post request', async () => {
        //arrange
        let food = {
            name: 'angus prime',
            type: 'beef'
        }
        let shirt = {
            size:'medium',
            color: 'black'
        }
        //act
        const responseFood = await request.post('/food').send(food);
        const responseClothes = await request.post('/clothes').send(shirt);
        //assert
        expect(responseFood.status).toEqual(201);
        expect(responseFood.body.data.name).toEqual('angus prime');
        expect(responseFood.body.data.type).toEqual('beef');
        expect(responseFood.body.id.length).toBeGreaterThan(0);

        expect(responseClothes.status).toEqual(201);
        expect(responseClothes.body.data.size).toEqual('medium');
        expect(responseClothes.body.data.color).toEqual('black');
        expect(responseClothes.body.id.length).toBeGreaterThan(0);

        idFood = responseFood.body.id;
        idClothes = responseClothes.body.id
    });

      
    it('should read the food/clothes list',async ()=>{

        const responseFood = await request.get('/food');
        const responseClothes = await request.get('/clothes');
        
        expect(responseFood.status).toEqual(200);
        expect(responseClothes.status).toEqual(200);

        expect(responseFood.body.length).toBeGreaterThan(0);
        expect(responseClothes.body.length).toBeGreaterThan(0);


    });

    it('should read the food/clothes item',async ()=>{

        const responseFood = await request.get(`/food/${idFood}`);
        const responseClothes = await request.get(`/clothes/${idClothes}`);
        
        expect(responseFood.status).toEqual(200);
        expect(responseClothes.status).toEqual(200);

       expect(responseFood.body.data.name).toEqual('angus prime');
        expect(responseFood.body.data.type).toEqual('beef');

        expect(responseClothes.body.data.size).toEqual('medium');
        expect(responseClothes.body.data.color).toEqual('black');



    });



    it('should update a clothes/food using put request', async () => {
        //arrange
        let editFood = {
            name: 'seabass',
            type: 'fish'
        };

        let editShirt = {
            size :'large',
            color:'grey'
        }
        //act
        const responseFood = await request.put(`/food/${idFood}`).send(editFood);
        const responseClothes = await request.put(`/clothes/${idClothes}`).send(editShirt);
                   
        //asert
        
        expect(responseFood.status).toEqual(200);
        expect(responseClothes.status).toEqual(200);

        expect(responseFood.body.data.name).toEqual('seabass');
        expect(responseFood.body.data.type).toEqual('fish');

        expect(responseClothes.body.data.size).toEqual('large');
        expect(responseClothes.body.data.color).toEqual('grey');

    });

    it('should delete the clothes/food item(s)',async()=>{

        const responseFood  = await request.delete(`/food/${idFood}`) ;
        const responseClothes  = await request.delete(`/Clothes/${idClothes}`) ;

        expect(responseFood.status).toEqual(200);
        expect(responseClothes.status).toEqual(200);

        expect(responseFood.body.length).toEqual(0);
        expect(responseClothes.body.length).toEqual(0);
        
        

    })
        it('should be notFound error',async ()=>{
        const res = await request.patch('/food');
        expect(res.status).toEqual(404);
      
        });

    it('should be notFound error',async ()=>{
        const res = await request.get('/sad');
        expect(res.status).toEqual(404);
      
      });
});



    

