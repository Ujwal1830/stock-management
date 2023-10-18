import { MongoClient } from "mongodb";

// Replace the uri string with your connection string.
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('stocks');
    const movies = database.collection('movies');

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);

    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);