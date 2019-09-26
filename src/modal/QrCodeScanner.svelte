<script>
  import { onDestroy } from "svelte";
  import Instascan from "instascan";

  export let onScan = () => {};

  const scanner = new Instascan.Scanner({
    video: document.getElementById("preview")
  });

  scanner.addListener("scan", function(content) {
    console.log(content);
    onScan(content);
  });

  Instascan.Camera.getCameras()
    .then(function(cameras) {
      if (cameras.length > 0) {
        scanner.start(cameras[0]);
      } else {
        console.error("No cameras found.");
      }
    })
    .catch(function(e) {
      console.error(e);
    });

  onDestroy(() => {
    scanner.stop();
  });
</script>

<video id="preview" />
