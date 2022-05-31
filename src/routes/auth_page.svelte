<script context="module">
  export async function load({ session }) {
    if (typeof session.authenticated != "undefined") {
    return {
        status: 302,
        redirect: "/"
    }
    }
    return{
      
    }
  }
</script>

<script>
  let email;
  let done = false;
  let loading = false;
  let error_msg = "";

  async function handleLogin() {
    loading = true
    
    const response = await fetch('/login', {
      method: 'post',
      body: JSON.stringify({email})
    })
    error_msg = ""
    if (response.ok) {
      done = true
      }
    else {
      error_msg = (await response.text())
    }

    loading = false
    
  }

  const hide_not = function () {
    done = false;
  }
</script>

<p class="is-size-5 mb-3">
  Du kannst auf die Kompetenzdatenbank mit einem Link zugreifen, den wir dir per
  E-Mail geschickt haben.
</p>
<p>
  Wenn du einen neuen Link zugesendet haben willst, gib hier deine E-Mail an:
</p>

<form
  class="control has-icons-left has-icons-right mb-3"
  on:submit|preventDefault={handleLogin}
>
  <input
    class="input is-medium"
    placeholder="Email"
    bind:value={email}
  />
  <span class="icon is-medium is-left">
    <i class="fas fa-envelope" />
  </span>
  <p class="help is-danger">{error_msg}</p>

  <input type="submit" class="button mt-3 is-medium" value={loading ? "Loading" : "Send magic link"} disabled={loading}/>
</form>

<div class="notification is-info" style={done ? 'display: static;' : 'display: none;'}>
  <button class="delete" on:click={hide_not}/>
  E-Mail ist auf dem Weg! Schau mal in dein Postfach.
</div>
