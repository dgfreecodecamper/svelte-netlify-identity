exports.handler = async function (event, context) {
  const data = {
    name: "bob",
    age: 24,
    male: true,
  };
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello World from the backend serverless function",
      data: data,
    }),
  };
};
