<script lang="typescript">
  import { ApolloClient, InMemoryCache } from "@apollo/client"
  import { createHttpLink } from "apollo-link-http"
  import { setClient } from "svelte-apollo"

  import { setContext } from "svelte"
  import { writable } from "svelte/store"

  import firebase from "firebase"

  import Login from "./Login.svelte"

  import type IUser from "../../common/Interfaces/IUser"

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

  const initialUserData: IUser = {}
  const userData = writable(initialUserData)

  setContext("userData", userData)
  setClient(client)
  firebase.initializeApp(firebaseConfig)
</script>

<div class="App">
  Landing Page
  <Login />
</div>

<style>
</style>
