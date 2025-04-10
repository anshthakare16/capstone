// netlify/functions/getTeams.js

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const BUCKET_NAME = process.env.S3_BUCKET_NAME;  // Set this environment variable in Netlify

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const classFilter = event.queryStringParameters.class;

    const fileKey = 'teams.csv';
    const file = await s3.getObject({ Bucket: BUCKET_NAME, Key: fileKey }).promise();
    const fileData = file.Body.toString('utf-8');

    const rows = fileData.split('\n');
    const filteredRows = rows.slice(1).filter(row => {
      const columns = row.split(',');
      return columns[0] === classFilter;
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ teams: filteredRows }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data', details: err.message }),
    };
  }
};
