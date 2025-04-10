// netlify/functions/submitTeam.js

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const BUCKET_NAME = process.env.S3_BUCKET_NAME;  // Set this environment variable in Netlify

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { class: selectedClass, members = [], mentors = [], ideas = [] } = data;

    if (!selectedClass || members.length === 0 || ideas.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    if (members.length > 4 || mentors.length > 4 || ideas.length > 3) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Maximum 4 members, 4 mentors and 3 ideas allowed' 
        }),
      };
    }

    const fileKey = 'teams.csv';

    // Fetch the current CSV from S3
    const file = await s3.getObject({ Bucket: BUCKET_NAME, Key: fileKey }).promise();
    const fileData = file.Body.toString('utf-8');

    // Split CSV data into rows and process
    const rows = fileData.split('\n');
    const header = rows[0];
    const newRow = [
      selectedClass,
      ...members,
      ...Array(4 - members.length).fill(''),
      ...mentors,
      ...Array(4 - mentors.length).fill(''),
      ...ideas,
      ...Array(3 - ideas.length).fill('')
    ].join(',');

    // Append new row
    rows.push(newRow);

    // Upload the updated CSV back to S3
    await s3.putObject({
      Bucket: BUCKET_NAME,
      Key: fileKey,
      Body: rows.join('\n'),
      ContentType: 'text/csv',
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Team submitted successfully!' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save data', details: err.message }),
    };
  }
};
