<script>
  import type firebase from "firebase"
  import * as firebaseui from "firebaseui"
  import "firebaseui/dist/firebaseui.css"

  import { onMount, afterUpdate } from "svelte"
  import { userData } from "../store/index"
  import { authInstance } from "../App.svelte"

  import SignUp from "./SignUp.svelte"
  import LoadingSpinner from "./Spinner.svelte"

  import { ApolloError } from "@apollo/client"

  const uiConfig = {
    signInFlow: "popup",
    callbacks: {
      signInSuccessWithAuthResult() {
        // Handle the result
        return false
      },
    },
    signInOptions: [
      authInstance.GoogleAuthProvider.PROVIDER_ID,
      authInstance.EmailAuthProvider.PROVIDER_ID,
    ],
  }

  let isLoading = true
  let error: ApolloError

  onMount(() => {
    const unsubAuth: firebase.Unsubscribe = authInstance().onAuthStateChanged(
      (authUser) => {
        try {
          const id = `${authUser?.uid}_${authUser?.displayName}`
          const username = authUser?.displayName as string
          const userId = authUser?.uid as string
          const email = authUser?.email as string

          userData.set({ id, userId, username, email })
        } catch (e) {
          error = new ApolloError({ errorMessage: e.message })
        } finally {
          isLoading = false
        }
      }
    )

    return () => {
      unsubAuth()
    }
  })

  afterUpdate(() => {
    const firebaseUiContainer = document.querySelector(
      "#firebaseui-auth-container"
    )
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(authInstance())
    console.log($userData)
    if (firebaseUiContainer != null) ui.start(firebaseUiContainer, uiConfig)
  })

  const setLoading = (e: CustomEvent) => {
    isLoading = !e.detail.loaded
  }
</script>

<!-- Load Todos component on else block. Create loading spinner -->
<div class="sign-in">
  {#if isLoading}
    <div class="spinner-container-center">
      <LoadingSpinner duration="3.5s" />
    </div>
  {:else if !$userData.userId}
    <div id="firebaseui-auth-container" />
    <SignUp on:creatingUser={setLoading} />
  {:else if error?.message}
    Error: {error.message}
  {:else}
    {$userData.email} | {$userData.username}
  {/if}
</div>

<style>
  .spinner-container-center {
    align-items: center;
    margin-top: 30px;
    height: 100px;
  }
</style>
