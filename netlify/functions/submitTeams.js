const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);
const appendFile = promisify(fs.appendFile);
const exists = promisify(fs.exists);

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

    const filePath = path.resolve(__dirname, '../../data', 'teams.csv');
    const fileExists = await exists(filePath);

    if (!fileExists) {
      const header = 'Class,Member1,Member2,Member3,Member4,Mentor1,Mentor2,Mentor3,Mentor4,Idea1,Idea2,Idea3\n';
      await writeFile(filePath, header);
    }

    const row = [
      selectedClass,
      ...members,
      ...Array(4 - members.length).fill(''),
      ...mentors,
      ...Array(4 - mentors.length).fill(''),
      ...ideas,
      ...Array(3 - ideas.length).fill('')
    ].join(',');

    await appendFile(filePath, row + '\n');

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
