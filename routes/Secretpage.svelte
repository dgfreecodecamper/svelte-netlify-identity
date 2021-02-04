<script>
  import { loggedInUser } from "../stores/userStore.js";

  let posts = [];
  let msg = "";

  const handleClick = async () => {
    console.log(`handleclick clicked`);

    // console.log($loggedInUser);
    if ($loggedInUser !== null) {
      console.log($loggedInUser);
      const res = await fetch("/.netlify/functions/getPosts", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${$loggedInUser.token.access_token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      posts = data.data;
      msg = data.message;
    } else {
      console.log(`no token found!`);
    }
  };
</script>

{#if $loggedInUser && $loggedInUser.email}
  <h1>The secret page with secrets exposed</h1>
  <button on:click={handleClick}>Fetch posts</button>
{:else}
  <h1>Unauthorised to view this</h1>
{/if}

<h3>{msg}</h3>
{#if posts.length > 0}
  {#each posts as post}
    <p>{post.id} => {post.title}</p>
    <p>{post.body}</p>
  {/each}
{:else}
  <p>Sorry no results</p>
{/if}

<!-- 
read this 
https://www.netlify.com/blog/2018/03/29/jamstack-architecture-on-netlify-how-identity-and-functions-work-together/

https://www.freecodecamp.org/news/building-jamstack-apps/

https://dev.to/moshe/implementing-access-control-with-netlify-identity-and-netlify-functions-3jpj


-->
