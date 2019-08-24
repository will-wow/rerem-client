<script>
  import bcrypt from "bcryptjs";
  import forge from "node-forge";
  import * as Api from "./api";
  import * as Encrypt from "./encrypt";

  let body = "";

  let password = "";

  forge.random.getBytes(32, function(err, bytes) {
    password = forge.util.bytesToHex(bytes);
  });

  let hashedPassword = "";
  $: bcrypt.hash(password, 10).then(hash => (hashedPassword = hash));

  $: encryptedData = Encrypt.encrypt(body);

  $: decryptedBody = Encrypt.decrypt(encryptedData);

  function handleClick() {
    Api.post("/notes", {
      body: encryptedData.encrypted
    });
  }
</script>

<form class="note">
  <textarea bind:value={body} />
  <div>pass: {password}</div>
  <div>hash: {hashedPassword}</div>
  <div>encrypted: {encryptedData.body}</div>
  <div>decrypted: {decryptedBody.ok}</div>
  <button type="button" on:click={handleClick} disabled={!body}>Create</button>
</form>
