const db = require('./../models');
const { Op } = db.Sequelize;

function csvToDate(ts) {
  return new Date(`${ts}Z`);
}

function serializeEvent(event) {
  return {
    start: event.start,
    end:
      event.start.getTime() === event.end.getTime()
        ? addMinutes(event.end, 10)
        : event.end,
    activity: event.activity,
  };
}

function splitEvent(event) {
  if (event.start.getUTCDate() === event.end.getUTCDate()) {
    return [event];
  }
  const { end } = event;
  const midnight = new Date(
    Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate()),
  );
  const earlyEvent = {
    start: event.start,
    end: midnight,
    activity: event.activity,
  };
  const lateEvent = {
    start: midnight,
    end: end,
    activity: event.activity,
  };
  return [earlyEvent, lateEvent];
}

function addMinutes(time, minutes) {
  return new Date(time.getTime() + minutes * 60000);
}

function queryForEvents({ activity, startDate, endDate }) {
  const day = {
    [Op.and]: {
      [Op.gte]: startDate.toUTCString(),
      [Op.lt]: endDate.toUTCString(),
    },
  };

  return db.Event.findAll({
    where: {
      [Op.or]: {
        start: day,
        end: day,
      },
      activity,
    },
    order: [['start', 'DESC']],
  }).then(events => {
    const cleanEvents = [];
    events.forEach(event => {
      splitEvent(event).forEach(e => {
        cleanEvents.push(serializeEvent(e));
      });
    });
    return cleanEvents;
  });
}

module.exports = {
  addMinutes,
  csvToDate,
  queryForEvents,
};
