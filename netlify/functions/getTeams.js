const { MongoClient } = require('mongodb');

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

const uri = `mongodb+srv://${username}:${password}@ac-r0zzg7a-shard-00-00.vq4kvnd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('TeamRegistration');
    const teams = await db.collection('teams').find({}).toArray();
    await client.close();

    return {
      statusCode: 200,
      body: JSON.stringify({ teams }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
