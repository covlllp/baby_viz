const express = require('express');
const db = require('./../models');

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
      console.log(events.length);
      res.json(events);
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
