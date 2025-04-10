const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const csvParser = require('csv-parser');
const readFile = promisify(fs.readFile);

exports.handler = async () => {
  const filePath = path.resolve(__dirname, '../../data', 'teams.csv');

  try {
    const data = await new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => results.push(row))
        .on('end', () => resolve(results))
        .on('error', (err) => reject(err));
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ teams: data }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to read CSV data', details: err.message }),
    };
  }
};
