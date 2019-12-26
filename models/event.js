module.exports = function(sequelize, Sequelize) {
  return sequelize.define('Event', {
    start: Sequelize.DATE,
    end: Sequelize.DATE,
    activity: Sequelize.TEXT,
    duration: Sequelize.INTEGER,
    quantity: Sequelize.FLOAT,
  });
};
