<script>
  import { user } from "../src/store.js";

  // console.log($user.username);
</script>

{#if $user && $user.username}
  <h1>The secret page with secrets exposed</h1>
{:else}
  <h1>Unauthorised to view this</h1>
{/if}
