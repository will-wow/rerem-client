<script>
  import _ from "lodash";
  import * as Api from "../api";
  import * as AccessKey from "../crypto/access-key";
  import * as Crypto from "../crypto";

  export let note;

  let body = "";

  let viewKey = "";
  let viewHash = "";
  AccessKey.createKey()
    .then(key => (viewKey = key))
    .then(() => AccessKey.hashKey(viewKey).then(hash => (viewHash = hash)));

  let editKey = "";
  let editHash = "";
  AccessKey.createKey()
    .then(key => (editKey = key))
    .then(() => AccessKey.hashKey(editKey).then(hash => (editHash = hash)));

  $: encryptedData = Crypto.encryptNew(body);

  let accessData = {};

  $: editAccessParam = Crypto.objectToHex(accessData);
  $: viewAccessParam = Crypto.objectToHex(_.omit(accessData, ["editKey"]));

  function handleClick() {
    Api.post("/notes", {
      body: encryptedData.body,
      viewKeyHash: viewHash,
      editKeyHash: editHash
    }).then(response => {
      accessData = {
        id: response.ok.id,
        viewKey,
        editKey,
        decryptionKey: encryptedData.key,
        decryptionIv: encryptedData.iv
      };
    });
  }
</script>

<form class="note">
  <textarea bind:value={body} />
  <div>encrypted: {encryptedData.body}</div>
  <button type="button" on:click={handleClick} disabled={!body}>Create</button>

  {#if accessData.id}
    <div>ID: {accessData.id}</div>
    <a href="/note/{accessData.id}#?access={viewAccessParam}" target="_blank">
      View Link
    </a>
    <a href="/note/{accessData.id}#?access={editAccessParam}" target="_blank">
      Edit Link
    </a>
  {/if}
</form>
