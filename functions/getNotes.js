const MongoClient = require("mongodb").MongoClient;

const MONGODB_URI = process.env.MONGODB_URI;

let cachedDb = null;
// console.log(cachedDb);

const connectToDatabase = async (uri) => {
  // async function connectToDatabase(uri) {
  if (cachedDb) {
    console.log("using the cached connection");
    return cachedDb;
  }
  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
  });
  console.log("using new connection");

  // console.log(client);
  cachedDb = client.db("video");
  return cachedDb;
};

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase(MONGODB_URI);

  const movies = await db
    .collection("movieDetails")
    .find({})
    .limit(4)
    .skip(8)
    .toArray();

  const response = {
    statusCode: 200,
    body: JSON.stringify(movies),
  };

  return response;
};
