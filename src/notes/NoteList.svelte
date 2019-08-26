<script>
  import NoteSummary from "./NoteSummary.svelte";
  import { fetchNotes } from "./note";

  const noteAccessData = [
    {
      id: "84f4d55f-cd9c-4766-ae66-15c618d4dc13",
      viewKey:
        "355eb79c38805ff3fdbc869a6a83ea03a49dfb2e5ad62c6e8ad7857b80844bbd",
      editKey:
        "b4d4942bc4d556d4c7acedc32fbaf6429034375cac608a795a0ca2e96c698398",
      decryptionKey: "38689cd6797f0c9f9e5dc54af663e68b",
      decryptionIv: "e106e275752623f7bb3f5504cabb001f"
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
      <NoteSummary {note} />
    {/each}
  {/await}
</div>
