<script>
  import * as AccessData from "notes/access-data";
  import CopyableText from "./CopyableText";
  import { absoluteLink } from "./absolute-link";

  export let accessData;

  $: viewAccessParam = AccessData.toViewAccessParam(accessData);
  $: editAccessParam = AccessData.toEditAccessParam(accessData);
  $: viewAccessLink = absoluteLink(
    `/notes/${accessData.id}#?access=${viewAccessParam}`
  );
  $: editAccessLink = absoluteLink(
    `/notes/${accessData.id}#?access=${editAccessParam}`
  );
  $: hasEditPermission = AccessData.hasEditPermission(accessData);
</script>

<div>
  <h2>Share this note!</h2>

  <label class="form-group">
    View Link
    <CopyableText value={viewAccessLink} />
  </label>

  {#if hasEditPermission}
    <label class="form-group">
      Edit Link
      <CopyableText value={editAccessLink} />
    </label>
  {/if}

  <p>
    {#if hasEditPermission}
      You can copy the view link to share a read-only copy, or copy the edit
      link to share full permission to edit and delete this note.
    {:else}
      You can copy the view link to share a read-only copy with others.
    {/if}
  </p>
  <p>
    The links include the decryption key to the note, so we reccomend sending
    these over an encrypted channel, or using the QR Code to share a link
    directly to another device.
  </p>

</div>
