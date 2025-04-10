const { MongoClient } = require('mongodb');

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

const uri = `mongodb+srv://${username}:${password}@ac-r0zzg7a-shard-00-00.vq4kvnd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

function toCSV(teams) {
  const header = [
    'Class',
    'Member1', 'Member2', 'Member3', 'Member4',
    'Mentor1', 'Mentor2', 'Mentor3', 'Mentor4',
    'Idea1', 'Idea2', 'Idea3',
    'Timestamp',
  ];

  const rows = teams.map(team => {
    const members = team.members || [];
    const mentors = team.mentors || [];
    const ideas = team.ideas || [];
    return [
      team.class || '',
      ...members.slice(0, 4), ...Array(4 - members.length).fill(''),
      ...mentors.slice(0, 4), ...Array(4 - mentors.length).fill(''),
      ...ideas.slice(0, 3), ...Array(3 - ideas.length).fill(''),
      team.timestamp ? new Date(team.timestamp).toLocaleString() : ''
    ];
  });

  const csv = [header, ...rows].map(row => row.join(',')).join('\n');
  return csv;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('TeamRegistration');
    const teams = await db.collection('teams').find({}).toArray();
    await client.close();

    const csv = toCSV(teams);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="teams.csv"',
      },
      body: csv,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data', details: err.message }),
    };
  }
};
