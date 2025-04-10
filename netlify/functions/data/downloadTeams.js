const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://thakareansh3:ansh1212@ac-r0zzg7a-shard-00-00.vq4kvnd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

function toCSV(data) {
  const header = [
    'Class', 'Member1', 'Member2', 'Member3', 'Member4',
    'Mentor1', 'Mentor2', 'Mentor3', 'Mentor4',
    'Idea1', 'Idea2', 'Idea3'
  ];

  const rows = data.map(team => [
    team.class,
    ...(team.members || []), ...Array(4 - (team.members?.length || 0)).fill(''),
    ...(team.mentors || []), ...Array(4 - (team.mentors?.length || 0)).fill(''),
    ...(team.ideas || []), ...Array(3 - (team.ideas?.length || 0)).fill('')
  ]);

  const csv = [header, ...rows].map(row => row.join(',')).join('\n');
  return csv;
}

exports.handler = async () => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('TeamRegistration');
    const teams = await db.collection('teams').find().toArray();
    await client.close();

    const csvData = toCSV(teams);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="teams.csv"',
      },
      body: csvData,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch or convert data', details: err.message }),
    };
  }
};
