<script>
  import bcrypt from "bcryptjs";
  import forge from "node-forge";
  import * as Api from "./api";
  import * as AccessKey from "./access-key";
  import * as Encrypt from "./encrypt";
  import * as Note from "./note";

  let body = "";

  let viewKey = "";
  AccessKey.createKey().then(key => (viewKey = key));

  let viewHash = "";
  $: AccessKey.hashKey(viewKey).then(hash => (viewHash = hash));

  let editKey = "";
  $: AccessKey.createKey().then(key => (editKey = key));

  let editHash = "";
  AccessKey.hashKey(editKey).then(hash => (editHash = hash));

  $: encryptedData = Encrypt.encrypt(body);
  $: decryptedBody = Encrypt.decrypt(encryptedData);
  $: decryptedThroughApi = { ok: "" };

  let accessData = null;

  function handleClick() {
    Api.post("/notes", {
      body: encryptedData.body,
      viewKeyHash: viewHash,
      editKeyHash: editHash
    }).then(response => {
      accessData = {
        id: response.ok.id,
        viewKey,
        editKey
      };

      console.log({
        ...accessData,
        decryptionKey: forge.util.bytesToHex(encryptedData.decryptionKey),
        decryptionIv: forge.util.bytesToHex(encryptedData.iv)
      });

      Api.post("/notes/lookup", {
        id: accessData.id,
        viewKey: accessData.viewKey
      }).then(response => {
        console.log(response);
        decryptedThroughApi = Encrypt.decrypt({
          decryptionKey: encryptedData.decryptionKey,
          iv: encryptedData.iv,
          body: response.ok.body
        });
      });
    });
  }
</script>

<form class="note">
  <textarea bind:value={body} />
  <div>encrypted: {encryptedData.body}</div>
  <div>decrypted: {decryptedBody.ok}</div>
  <div>decrypted through API: {decryptedThroughApi.ok}</div>
  <button type="button" on:click={handleClick} disabled={!body}>Create</button>
</form>
