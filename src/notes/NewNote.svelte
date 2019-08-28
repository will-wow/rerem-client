<script>
  import _ from "lodash";
  import * as Api from "../api.ts";
  import * as AccessData from "./access-data.ts";
  import { createNote } from "./note.ts";
  import Note from "./Note.svelte";

  let note = { body: "" };
  let accessData = AccessData.generateKeys();
</script>

<div class="new-note">
  {#await accessData}
    Generating Keys...
  {:then accessData}
    <Note {note} {accessData} onSubmit={createNote} />
  {:catch error}
    Faild to generate keys: {error}
  {/await}
</div>
