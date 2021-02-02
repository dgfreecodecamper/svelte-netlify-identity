exports.handler = async function (event, context) {
  const data = {
    name: "bob",
    age: 24,
    male: true,
  };

  const { identity, user } = context.clientContext;
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
