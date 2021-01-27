<script>
  const handleLogin = () => {
    console.log("login clicked");
    netlifyIdentity.open();
  };
</script>

<h1>Home page</h1>
<p>netlify.toml file added</p>

<button on:click={handleLogin}>login</button>
