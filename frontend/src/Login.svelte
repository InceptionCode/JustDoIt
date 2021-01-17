<script>
  import { ApolloError, gql } from "@apollo/client";
  import { query } from "svelte-apollo";

  import { onMount } from "svelte";
  ApolloError;
  let todoData = query(gql`
    {
      todos {
        text
        createdBy {
          username
        }
      }
      tags {
        label
      }
    }
  `);

  onMount(() => {
    return () => {
      // Clear usual subscriptions
    };
  });
</script>

<div class="App">
  {#if $todoData.loading}
    Loading...
  {:else if $todoData.error}
    Error: {$todoData.error.message}
  {:else}
    {$todoData.data}
  {/if}
</div>
