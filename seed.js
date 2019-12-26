const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const db = require('./models');
const { csvToDate } = require('./server/util');

const dataPath = path.resolve('.', 'data');

async function seed() {
  await db.sequelize.sync({ force: true }).then('tables synced');

  const fileNames = fs.readdirSync(dataPath);
  let count = 0;

  fileNames.forEach(fileName => {
    const events = [];
    const filePath = path.join(dataPath, fileName);
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', row => {
        const event = {
          start: csvToDate(row['Start Time']),
          end: csvToDate(row['End Time']),
          activity: row.Activity,
          duration: parseInt(row['Duration (min)'], 10) || 0,
          quantity: parseFloat(row.Quantity) || 0,
        };
        events.push(event);
      })
      .on('end', () => {
        db.Event.bulkCreate(events).then(() => {
          console.log(`${events.length} items inserted from ${filePath}`);
          count++;
          if (count >= fileNames.length) {
            db.sequelize.close().then(() => {
              console.log('connection closed');
            });
          }
        });
      });
  });
}

seed();
