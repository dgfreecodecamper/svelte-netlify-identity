<script>
  import { onMount } from "svelte";
  import router from "page";

  //import the routes
  import Home from "../routes/Home.svelte";
  import About from "../routes/About.svelte";
  import Secretpage from "../routes/Secretpage.svelte";
  import Mongo from "../routes/Mongo.svelte";

  //auth import
  import { loggedInUser } from "../stores/userStore.js";
  import netlifyIdentity from "netlify-identity-widget";
  netlifyIdentity.init();

  let page;

  //setup the routes
  router("/", () => {
    page = Home;
  });
  router("/about", () => {
    page = About;
  });
  router("/secretpage", () => {
    page = Secretpage;
  });
  router("/mongo", () => {
    page = Mongo;
  });
  router.start();

  onMount(() => {
    //check for current user and place in store
    $loggedInUser = netlifyIdentity.currentUser();
  });

  const handleUserAction = (action) => {
    // console.log(`handleUserAction called action is:${action}`);
    if (action === "login") {
      netlifyIdentity.open(action);
      netlifyIdentity.on("login", (u) => {
        $loggedInUser = u;
        netlifyIdentity.close();
      });
    } else if (action === "logout") {
      netlifyIdentity.logout();
      $loggedInUser = null;
    }
  };
</script>

<nav>
  <li><a href="/"> Home</a></li>
  <li><a href="/about"> About</a></li>
  <li><a href="/secretpage"> Secretpage</a></li>
  <li><a href="/mongo"> Mongo</a></li>
</nav>

{#if $loggedInUser && $loggedInUser.email}
  <p>current user is: {$loggedInUser.email}</p>
{:else}
  <p>Not logged in</p>
{/if}

{#if $loggedInUser && $loggedInUser.email}
  <button
    on:click={() => {
      handleUserAction("logout");
    }}>Logout</button
  >
{:else}
  <button
    on:click={() => {
      handleUserAction("login");
    }}>Login</button
  >
{/if}

<!-- <svelte:component this={page} {params} /> -->
<svelte:component this={page} />
