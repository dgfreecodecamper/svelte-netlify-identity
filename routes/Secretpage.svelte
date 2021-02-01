<script>
  import { loggedInUser } from "../stores/userStore.js";
</script>

{#if $loggedInUser && $loggedInUser.email}
  <h1>The secret page with secrets exposed</h1>
{:else}
  <h1>Unauthorised to view this</h1>
{/if}
