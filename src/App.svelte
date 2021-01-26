<script>
  import router from "page";

  import Home from "../routes/Home.svelte";
  import About from "../routes/About.svelte";
  import Secretpage from "../routes/Secretpage.svelte";

  let page;
  let params;

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

  export let name;
</script>

<ul>
  <li><a href="/"> Home</a></li>
  <li><a href="/about"> About</a></li>
  <li><a href="/secretpage"> Secretpage</a></li>
</ul>
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
