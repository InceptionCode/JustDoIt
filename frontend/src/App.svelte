<script lang="typescript">
  import { ApolloClient, InMemoryCache } from "@apollo/client";
  import { createHttpLink } from "apollo-link-http";
  import { setClient } from "svelte-apollo";

  import Login from "./Login.svelte";

  const { env } = import.meta;

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({ uri: env.SNOWPACK_PUBLIC_API }),
  });

  setClient(client);
</script>

<div class="App">
  Landing Page
  <Login />
</div>

<style>
</style>
