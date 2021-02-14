const fetch = require("node-fetch").default;
const MongoClient = require("mongodb").MongoClient;

const MONGODB_URI = process.env.MONGODB_URI;

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    console.log("using the cached connection");
    return cachedDb;
  }
  const client = await MongoClient.connect(MONGODB_URI);
  console.log("new connection made");
  const db = await client.db("video");
  cachedDb = db;
  return db;
}

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase();

  const movies = await db
    .collection("movieDetails")
    .find({})
    .limit(3)
    .skip(4)
    .toArray();

  const response = {
    statusCode: 200,
    body: JSON.stringify(movies),
  };

  return response;
};
