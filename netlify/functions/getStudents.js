const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

exports.handler = async (event) => {
  const classParam = event.queryStringParameters?.class;
  if (!classParam) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Class parameter missing' }),
    };
  }

  let fileName;
  switch (classParam.toLowerCase()) {
    case 'aids':
      fileName = 'aids_students.csv';
      break;
    case 'cse a':
    case 'csea':
      fileName = 'csa_a_students.csv';
      break;
    case 'cse b':
    case 'cseb':
      fileName = 'cse_b_students.csv';
      break;
    default:
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid class specified' }),
      };
  }

  const filePath = path.join(__dirname, 'data', fileName);

  if (!fs.existsSync(filePath)) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Student data not found for specified class' }),
    };
  }

  return new Promise((resolve) => {
    const students = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const student = row["Name of the Student"]?.trim();
        if (student) students.push(student);
      })
      .on('end', () => {
        if (students.length === 0) {
          resolve({
            statusCode: 404,
            body: JSON.stringify({ error: 'No student records found' }),
          });
        } else {
          resolve({
            statusCode: 200,
            body: JSON.stringify({ students }),
          });
        }
      })
      .on('error', (err) => {
        resolve({
          statusCode: 500,
          body: JSON.stringify({ 
            error: 'Failed to process student data',
            details: err.message 
          }),
        });
      });
  });
};
