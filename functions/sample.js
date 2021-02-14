//read this
//https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html

const fetch = require("node-fetch").default;
// const MongoClient = require("mongodb").MongoClient;

// const uri = "mongodb+srv://app-user:I56sVX2ftDkUCnMn@sandbox.0qxw6.mongodb.net/video?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("video").collection("movieDetails");

//   // perform actions on the collection object
//   client.close();
// });

// Define our connection string. Info on where to get this will be described below. In a real world application you'd want to get this string from a key vault like AWS Key Management, but for brevity, we'll hardcode it in our serverless function here.
const MONGODB_URI =
  "mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.cvaeo.mongodb.net/test?retryWrites=true&w=majority";

// Once we connect to the database once, we'll store that connection and reuse it so that we don't have to connect to the database on every request.
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  // Connect to our MongoDB database hosted on MongoDB Atlas
  const client = await MongoClient.connect(MONGODB_URI);

  // Specify which database we want to use
  const db = await client.db("sample_mflix");

  cachedDb = db;
  return db;
}

const getNotes = async () => {
  //connect to the DB and fetch the notes
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  // console.log(data);
  return data;
};

exports.handler = async function (event, context) {
  //function to get the data

  //check for an auth user
  // const { identity, user } = context.clientContext;

  //useful link
  //https://dev.to/moshe/implementing-access-control-with-netlify-identity-and-netlify-functions-3jpj

  const user = context.clientContext.user;
  const roles = context.clientContext.user.app_metadata.roles || "";
  console.log(user.email);
  console.log(roles);

  if (user && roles.includes("bco")) {
    console.log(`user is: ${user.email}`);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "The list of posts from the JSON placeholder api",
        data: await getNotes(),
      }),
    };
  } else {
    console.log(`no user information`);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Sorry you are not authorised to fetch this data",
        data: [],
      }),
    };
  }
};

//check out this article
//https://developer.mongodb.com/how-to/serverless-development-lambda-atlas/

// Import the MongoDB driver
const MongoClient = require("mongodb").MongoClient;

// Define our connection string. Info on where to get this will be described below. In a real world application you'd want to get this string from a key vault like AWS Key Management, but for brevity, we'll hardcode it in our serverless function here.
const MONGODB_URI =
  // process.env.MONGODB_URI;
  // "mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.cvaeo.mongodb.net/test?retryWrites=true&w=majority";
  "mongodb+srv://app-user:qphN3ERm3nWcfbu7@sandbox.0qxw6.mongodb.net/video?retryWrites=true&w=majority";

// Once we connect to the database once, we'll store that connection and reuse it so that we don't have to connect to the database on every request.
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  // Connect to our MongoDB database hosted on MongoDB Atlas
  const client = await MongoClient.connect(MONGODB_URI);

  // Specify which database we want to use
  const db = await client.db("video");

  cachedDb = db;
  return db;
}

exports.handler = async (event, context) => {
  /* By default, the callback waits until the runtime event loop is empty before freezing the process and returning the results to the caller. Setting this property to false requests that AWS Lambda freeze the process soon after the callback is invoked, even if there are events in the event loop. AWS Lambda will freeze the process, any state data, and the events in the event loop. Any remaining events in the event loop are processed when the Lambda function is next invoked, if AWS Lambda chooses to use the frozen process. */
  context.callbackWaitsForEmptyEventLoop = false;

  // Get an instance of our database
  const db = await connectToDatabase();

  // Make a MongoDB MQL Query to go into the movies collection and return the first 20 movies.
  const movies = await db
    .collection("movieDetails")
    .find({})
    .limit(2)
    .skip(2)
    .toArray();

  const response = {
    statusCode: 200,
    body: JSON.stringify(movies),
  };

  return response;
};
