'use strict';

const express = require('express') ;
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const error404 = require('./error-handlers/404.js');
const error500 = require('./error-handlers/500.js');

const foodRoute = require('./routes/food.js');
const clothesRoute = require('./routes/clothes.js');





app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

app.use('/food',foodRoute);
app.use('/clothes',clothesRoute);

app.use('*',error404);
app.use(error500);



function start (port){
  let PORT = port || 8080;
  app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
  });
}

module.exports= {
  server:app,
  start:start
};
