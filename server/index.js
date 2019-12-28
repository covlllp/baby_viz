const express = require('express');
const db = require('./../models');

const { queryForEvents, addMinutes } = require('./util');

const app = express();

app.get('/data/events/:date/:activity', (req, res) => {
  const date = new Date(parseInt(req.params.date, 10));
  date.setUTCHours(0, 0, 0, 0);

  queryForEvents({
    activity: req.params.activity,
    startDate: date,
    endDate: addMinutes(date, 24 * 60),
  })
    .then(events => {
      res.json(events);
    })
    .catch(err => {
      console.error(err);
      res.status(404).json(err);
    });
});

app.get('/data/range/events/:start/:end/:activity', (req, res) => {
  const start = new Date(parseInt(req.params.start, 10));
  const end = new Date(parseInt(req.params.end, 10));

  queryForEvents({
    activity: req.params.activity,
    startDate: start,
    endDate: end,
  })
    .then(events => {
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
