<script>
  import * as Api from "../api.ts";
  import Note from "./Note.svelte";
  import { fetchNotes } from "./note";

  let noteAccessData = [
    {
      id: "42882a3b-4a6c-409c-9806-d72fc2c2b866",
      viewKey:
        "1bd7711e648e01358640c85c7f5202584e3273ad284d163903fbadf5278352de",
      editKey:
        "e4207ecd2621387036deeb6a4a181ed98c2e0617b9e9ad0a0e2f45009cbbd9e5",
      decryptionKey: "749aef84f56aa982ce9573305266073a",
      decryptionIv: "fa00533d5816ae9814c5e544ceb8ae5a"
    }
  ];

  let notes = fetchNotes(noteAccessData).then(
    response => (notes = response.ok)
  );
</script>

<div class="note-list">
  {#await notes}
    Loading
  {:then notes}
    {#each notes as note}
      <Note {note} />
    {/each}
  {/await}
</div>
