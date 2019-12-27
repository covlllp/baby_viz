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

module.exports = {
  csvToDate,
  serializeEvent,
  splitEvent,
};
