const fetch = require("node-fetch").default;

exports.handler = async function (event, context) {
  //function to get the data
  const getPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    // console.log(data);
    return data;
  };

  //check for an auth user
  // const { identity, user } = context.clientContext;

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
        data: await getPosts(),
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
