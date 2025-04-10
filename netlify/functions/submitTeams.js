const { MongoClient } = require('mongodb');

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

const uri = `mongodb+srv://${username}:${password}@ac-r0zzg7a-shard-00-00.vq4kvnd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db('TeamRegistration');
    const teams = db.collection('teams');

    await teams.insertOne({
      class: selectedClass,
      members,
      mentors,
      ideas,
      timestamp: new Date(),
    });

    await client.close();

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
