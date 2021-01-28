<script>
  import router from "page";

  import netlifyIdentity from "netlify-identity-widget";
  import { user } from "./store.js";

  import Home from "../routes/Home.svelte";
  import About from "../routes/About.svelte";
  import Secretpage from "../routes/Secretpage.svelte";

  netlifyIdentity.init();

  $: isLoggedIn = !!$user; // converts $user (falsy value) to false (boolean)
  $: username = $user !== null ? $user.username : " THERE!";

  let page;
  let params;
  // let loggedInUser;

  router("/", () => {
    page = Home;
  });
  router("/about", () => {
    page = About;
  });
  router("/secretpage", () => {
    page = Secretpage;
  });

  router.start();

  const handleUserAction = (action) => {
    console.log(`handleUserAction called action is:${action}`);
    if (action === "login") {
      netlifyIdentity.open(action);
      netlifyIdentity.on("login", (u) => {
        user.login(u);
        netlifyIdentity.close();
      });
    } else if (action === "logout") {
      user.logout();
      netlifyIdentity.logout();
    }
  };
</script>

<ul>
  <li><a href="/"> Home</a></li>
  <li><a href="/about"> About</a></li>
  <li><a href="/secretpage"> Secretpage</a></li>
</ul>

{#if isLoggedIn}
  <p>Hello {username}</p>
{:else}
  <p>Hello not logged in</p>
{/if}

<button
  on:click={() => {
    handleUserAction("signup");
  }}>Signup</button
>
<button
  on:click={() => {
    handleUserAction("login");
  }}>Login</button
>
<button
  on:click={() => {
    handleUserAction("logout");
  }}>Logout</button
>

<svelte:component this={page} {params} />

<!-- <main>
  <h1>Hello {name}!</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
</main> -->
<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
