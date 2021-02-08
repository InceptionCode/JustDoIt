<script>
  import { authInstance } from "../App.svelte"

  import { ApolloError } from "@apollo/client"
  import { mutation } from "svelte-apollo"
  import { createEventDispatcher } from "svelte"

  import { updateUser } from "../mutations/mutations"
  import type IUser from "../../../common/Interfaces/IUser"

  const dispatch = createEventDispatcher()
  const mutateUser = mutation(updateUser())

  let error: ApolloError

  let showDialog = false
  let email = ""
  let password = ""
  let confirmPassword = ""
  let username = ""

  $: disabled = password !== confirmPassword

  const handleSubmit = async () => {
    dispatch("creatingUser", { loaded: false })
    try {
      const { user } = await authInstance().createUserWithEmailAndPassword(
        email,
        password
      )

      const credentials: IUser = {
        userId: `${user?.uid}_${username}`,
        email,
        username,
      }
      await mutateUser({ variables: { user: credentials } })
    } catch (e) {
      error = new ApolloError({ errorMessage: e.message })
      dispatch("creatingUser", { loaded: true })
    }
  }

  const toggleDialog = () => {
    const overlayDiv = document.querySelector(".overlay") as Element

    if (!error) {
      showDialog = !showDialog
      overlayDiv.style.display = showDialog ? "flex" : "none"
    }
  }
</script>

<div class="sign-up">
  {#if !showDialog}
    <button
      class="app-btn sign-up-btn mdl-button mdl-button--raised"
      on:click={toggleDialog}
    >
      <div class="btn-content">
        <i class="material-icons">login</i>
        <span>Sign Up</span>
      </div>
    </button>
  {/if}
  <div class="overlay">
    <i class="material-icons" on:click={toggleDialog}>cancel_presentation</i>
    <form action="submit" on:submit|preventDefault={handleSubmit}>
      <label for="Email">Email</label>
      <input type="email" name="Email" bind:value={email} required />
      <label for="Password">Password</label>
      <input type="password" name="Password" bind:value={password} required />
      <label for="ConfirmPassword">Confirm Password</label>
      <input
        type="password"
        name="ConfirmPassword"
        bind:value={confirmPassword}
        required
      />
      {#if disabled}
        <span>Passwords do not match!</span>
      {/if}
      <label for="Username">Username</label>
      <input type="text" name="Username" bind:value={username} required />
      <button
        class="app-btn submit-btn mdl-button mdl-button--raised"
        type="submit"
        {disabled}
      >
        Submit
      </button>
    </form>
    {#if error}
      <span>{error.message}</span>
    {/if}
  </div>
</div>

<style>
  .sign-up,
  .btn-content {
    display: flex;
    justify-content: center;
  }
  .btn-content {
    align-items: center;
    width: 145px;
  }
  .sign-up-btn,
  .submit-btn {
    color: red;
    background: black;
  }
  .btn-content > span {
    padding-left: 16px;
  }
  form {
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 20%;
    padding: 40px;
    align-items: center;
  }
  label {
    align-self: flex-start;
    font-weight: bold;
    font-size: 1.02em;
  }
  input {
    margin-bottom: 20px;
    padding: 5px;
    width: 95%;
  }
  :disabled {
    background-color: gray;
    color: darkred;
  }
</style>
