const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

exports.handler = async () => {
  const filePath = path.join(__dirname, 'data', 'teams.csv');

  if (!fs.existsSync(filePath)) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'No teams data found' })
    };
  }

  return new Promise((resolve) => {
    const teams = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        teams.push(row);
      })
      .on('end', () => {
        resolve({
          statusCode: 200,
          body: JSON.stringify({ teams }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      })
      .on('error', (err) => {
        resolve({
          statusCode: 500,
          body: JSON.stringify({ error: 'Failed to read file', details: err.message })
        });
      });
  });
};
