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

  function handleClick() {}
</script>

<form class="note">
  <textarea bind:value={body} />
  <div>pass: {password}</div>
  <div>hash: {hashedPassword}</div>
  <div>encrypted: {encryptedData.encrypted || ''}</div>
  <div>decrypted: {decryptedBody || ''}</div>
  <button on:click={handleClick} />
</form>
