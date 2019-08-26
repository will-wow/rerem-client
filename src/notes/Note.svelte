<script>
  import bcrypt from "bcryptjs";
  import forge from "node-forge";

  import * as Api from "../api";
  import * as AccessKey from "../crypto/access-key";
  import * as Encrypt from "../crypto/encrypt";
  import * as Note from "./note";

  export let note;

  let body = "";

  let viewKey = "";
  let viewHash = "";
  AccessKey.createKey()
    .then(key => (viewKey = key))
    .then(() => AccessKey.hashKey(viewKey).then(hash => (viewHash = hash)));

  $: console.log(viewKey, viewHash, bcrypt.compareSync(viewKey, viewHash));

  let editKey = "";
  let editHash = "";
  AccessKey.createKey()
    .then(key => (editKey = key))
    .then(() => AccessKey.hashKey(editKey).then(hash => (editHash = hash)));

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

      Api.post("/notes/lookup", {
        id: accessData.id,
        viewKey: accessData.viewKey
      }).then(response => {
        decryptedThroughApi = Encrypt.decrypt({
          key: encryptedData.key,
          iv: encryptedData.iv,
          body: response.ok.body
        });
      });
    });
  }
</script>

<form class="note">
  <textarea bind:value={body} />
  <div>view_key: {viewKey}</div>
  <div>view_hash: {viewHash}</div>
  <div>encrypted: {encryptedData.body}</div>
  <div>decrypted: {decryptedBody.ok}</div>
  <div>decrypted through API: {decryptedThroughApi.ok}</div>
  <button type="button" on:click={handleClick} disabled={!body}>Create</button>
</form>
