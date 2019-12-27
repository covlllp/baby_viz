const express = require('express');
const db = require('./../models');

const { splitEvent, serializeEvent } = require('./util');

const { Op } = db.Sequelize;

const app = express();

app.get('/data/days', (req, res) => {
  const day = {
    [Op.and]: {
      [Op.gte]: '2019-11-01',
      [Op.lt]: '2019-11-02',
    },
  };

  db.Event.findAll({
    where: {
      [Op.or]: {
        start: day,
        end: day,
      },
      activity: 'Sleep',
    },
    order: [['start', 'DESC']],
  })
    .then(events => {
      const cleanEvents = [];
      events.forEach(event => {
        splitEvent(event).forEach(e => {
          cleanEvents.push(serializeEvent(e));
        });
      });
      res.json(cleanEvents);
    })
    .catch(err => {
      console.error(err);
      res.status(404).json(err);
    });
});

db.sequelize.sync().then(() => {
  console.log('db connected');
  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
});
