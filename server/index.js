const express = require('express');
const db = require('./../models');

const app = express();

db.sequelize.sync().then(() => {
  console.log('db connected');
  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
});
