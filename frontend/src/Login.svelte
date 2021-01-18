<script lang="typescript">
  import { query } from "svelte-apollo"
  import { GetUser } from "./queries/queries"

  import type { ReadableQuery } from "svelte-apollo"
  import type UserDto from "../../common/Dtos/UserDto"

  import firebase from "firebase"
  import * as firebaseui from "firebaseui"
  import "firebaseui/dist/firebaseui.css"

  import { onMount, getContext } from "svelte"
  import type IUser from "../../common/Interfaces/IUser"

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

  const userData = getContext("userData")
  // Works outside observer

  authInstance.onAuthStateChanged((authUser) => {
    const userId: string | undefined = authUser?.uid
    const username: string | null | undefined = authUser?.displayName

    $userData = { userId, username }
    // query doesn't work inside observer
    // Must use context in order to make/save return vals from async operations or events.
    // Will remove after commit & clean up code. For more info see:
    // https://stackoverflow.com/questions/60591927/svelte-user-registration-issue-with-setting-store-value
    // https://github.com/timhall/svelte-apollo/issues/9
  })

  // query under the hood calls getClient (ApolloClient) -> which even deeper references the context. Therefore, trying to query inside an event/async will result in attempting to access the context outside of the components initialization (life cycle) <- Big no no. This code works but is redundant will remove additional query after commit.
  let dbUser: ReadableQuery<UserDto> = query(
    GetUser($userData.userId, $userData.username)
  )

  // After query there must be a way to access cache or readable store with completed queries will look further into it.
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
  <div id="firebaseui-auth-container" />
  {#if $dbUser?.loading}
    Loading...
  {:else if $dbUser?.error}
    Error: {$dbUser?.error?.message}
  {:else}
    {$dbUser?.data?.user.email} | {$dbUser?.data?.user.username}
  {/if}
</div>
