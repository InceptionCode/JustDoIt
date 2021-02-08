<script context="module">
  import firebase from "firebase"

  const { env } = import.meta
  const firebaseConfig = {
    apiKey: env.SNOWPACK_PUBLIC_API_KEY,
    authDomain: `${env.SNOWPACK_PUBLIC_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${env.SNOWPACK_PUBLIC_PROJECT_ID}.firebaseio.com`,
    projectId: env.SNOWPACK_PUBLIC_PROJECT_ID,
  }

  firebase.initializeApp(firebaseConfig)

  export const authInstance = firebase.auth
</script>

<script>
  import { ApolloClient, InMemoryCache } from "@apollo/client"
  import { createHttpLink } from "apollo-link-http"
  import { setClient } from "svelte-apollo"

  import Login from "./components/Login.svelte"
  import { userData } from "./store"

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({ uri: env.SNOWPACK_PUBLIC_API }),
  })

  setClient(client)

  const signUserOut = async () => {
    await authInstance().signOut()
  }
</script>

<!-- Conditionally render login/todo screen based on if userData is present. Customize a sign up form. -->
<div class="App">
  <button
    class="app-btn mdl-button mdl-button--raised transparent"
    disabled={!$userData.userId}
    on:click={signUserOut}
  >
    <i class="material-icons">exit_to_app</i>
    <span>Sign Out</span>
  </button>
  Landing Page
  <Login />
</div>

<style>
  button {
    float: right;
    text-align: center;
  }
</style>
