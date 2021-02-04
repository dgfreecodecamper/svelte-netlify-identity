exports.handler = async function (event, context) {
  const data = {
    name: "bob",
    age: 24,
    male: true,
  };

  const { identity, user } = context.clientContext;

  //note to self: need to send request using postman with bear token in authorization
  //in order to get back the actual user. Sending from chrome does not
  //seem to send the authorisation token with the GET request.
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello World from the backend serverless function",
      data: data,
      event: event,
      context: context,
      identity: identity,
      user: user,
    }),
  };
};
