<script>
  import { loggedInUser } from "../stores/userStore.js";

  let notes = [];
  let msg = "";

  const handleClick = async () => {
    console.log(`handleclick clicked`);

    // console.log($loggedInUser);
    if ($loggedInUser !== null) {
      // console.log($loggedInUser);
      const res = await fetch("/.netlify/functions/getNotes", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${$loggedInUser.token.access_token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      notes = data;
      msg = data.message;
    } else {
      console.log(`no token found!`);
    }
  };
</script>

{#if $loggedInUser && $loggedInUser.email}
  <h1>This page will fetch notes from MongoDB</h1>
  <button on:click={handleClick}>Fetch notes</button>
{:else}
  <h1>Unauthorised to view this</h1>
{/if}

<h3>{msg}</h3>
{#if notes.length > 0}
  {#each notes as note}
    <!-- <h2><span class="greyout">{note._id}</span> - {note.title}</h2> -->
    <h2>{note.title}</h2>
    <p>{note.plot}</p>
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
<style>
  .greyout {
    color: grey;
  }
</style>
