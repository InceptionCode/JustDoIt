<script lang="typescript">
  import { ApolloClient, InMemoryCache } from "@apollo/client"
  import { createHttpLink } from "apollo-link-http"
  import { setClient } from "svelte-apollo"

  import firebase from "firebase"

  import Login from "./Login.svelte"

  const { env } = import.meta
  const firebaseConfig = {
    apiKey: env.SNOWPACK_PUBLIC_API_KEY,
    authDomain: `${env.SNOWPACK_PUBLIC_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${env.SNOWPACK_PUBLIC_PROJECT_ID}.firebaseio.com`,
    projectId: env.SNOWPACK_PUBLIC_PROJECT_ID,
  }

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({ uri: env.SNOWPACK_PUBLIC_API }),
  })

  setClient(client)
  firebase.initializeApp(firebaseConfig)
</script>

<div class="App">
  <Login />
</div>

<style>
</style>
