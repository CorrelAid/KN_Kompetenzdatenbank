<script>
  import { supabase } from "$lib/supabaseClient";

  let email;
  let done = false
  let loading = false

  const handleSignup = async () => {
    const { data: user, error } = await supabase.auth.api.inviteUserByEmail(
      "jstet@tuta.io"
    );
  };

  const handleLogin = async () => {
    try {
      done = false
      loading = true
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      done = true
      loading = false
    }
  };

  $: console.log(done);
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
    type="email"
    placeholder="Email"
    bind:value={email}
  />
  <span class="icon is-medium is-left">
    <i class="fas fa-envelope" />
  </span>

  <input type="submit" class="button mt-3 is-medium" value={loading ? "Loading" : "Send magic link"} disabled={loading}/>
</form>

<div class="notification is-info" style={done ? 'display: static;' : 'display: none;'}>
  <button class="delete" />
  E-Mail ist auf dem Weg! Schau mal in dein Postfach.
</div>
