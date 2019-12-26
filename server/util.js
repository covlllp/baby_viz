function csvToDate(ts) {
  return new Date(`${ts}Z`);
}

module.exports = {
  csvToDate,
};
