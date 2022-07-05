<script context="module">
  export async function load({ session }) {
    if (session.authenticated == true) {
      return {
        status: 302,
        redirect: "/",
      };
    }
    return {};
  }
</script>

<script>
  let email;
  let done = false;
  let loading = false;
  let error_msg = "";

  async function handleLogin() {
    loading = true;
    done = false;
    const response = await fetch("/login", {
      method: "post",
      body: JSON.stringify({ email }),
    });
    error_msg = "";
    if (response.ok) {
      done = true;
    } else {
      error_msg = await response.text();
    }

    loading = false;
  }

  const hide_not = function () {
    done = false;
  };
</script>

  <form 
    class="control has-icons-left has-icons-right my-3 px-2  "
    on:submit|preventDefault={handleLogin}
  >
    <input class="input is-medium" placeholder="Email" bind:value={email} />
    <span class="icon is-medium is-left">
      <i class="fas fa-envelope" />
    </span>
    <p class="help is-danger">{error_msg}</p>

    <input
      type="submit"
      class="button mt-3 is-medium"
      value={loading ? "Loading" : "Send magic link"}
      disabled={loading}
    />
  </form>

  <p class="is-size-4 is-size-5-mobile px-2 pb-2">
    Gib bitte deine E-Mail-Adresse an, um einen Einladunglink für die Kompetentdatenbank zu erhalten.
  </p>

  <div
    class="notification is-info"
    style={done ? "display: static;" : "display: none;"}
  >
    <button class="delete" on:click={hide_not} />
    E-Mail ist auf dem Weg! Schau mal in dein Postfach.
  </div>

