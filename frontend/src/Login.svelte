<script lang="typescript">
  import firebase from "firebase"
  import * as firebaseui from "firebaseui"
  import "firebaseui/dist/firebaseui.css"

  import { onMount } from "svelte"
  import type IUser from "../../common/Interfaces/IUser"
  import { ApolloError } from "@apollo/client"

  const authInstance = firebase.auth()
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult() {
        // Handle the result
        return false
      },
    },
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  }

  let userData: IUser
  let error: ApolloError

  authInstance.onAuthStateChanged((authUser) => {
    try {
      const id: string = `${authUser?.uid}_${authUser?.displayName}`
      const username: string = authUser?.displayName as string
      const userId: string = authUser?.uid as string
      const email: string | null = authUser?.email as string

      userData = { id, userId, username, email }
    } catch (e) {
      new ApolloError({ errorMessage: e.message })
    }
  })

  onMount(() => {
    // Initialize the FirebaseUI Widget using Firebase.
    var ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth())
    // The start method will wait until the DOM is loaded.
    ui.start("#firebaseui-auth-container", uiConfig)

    return () => {
      // Clear usual subscriptions
    }
  })
</script>

<div class="App">
  Landing Page
  <div id="firebaseui-auth-container" />
  {#if !userData}
    Loading...
  {:else if error?.message}
    Error: {error.message}
  {:else}
    {userData.email} | {userData.username}
  {/if}
</div>
