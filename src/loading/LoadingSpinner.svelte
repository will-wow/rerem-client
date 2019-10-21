<script>
  import { isLoadingStore } from "./loading-store";
</script>

{#if $isLoadingStore}
  <span
    class="spinner-border spinner-border-sm"
    role="status"
    aria-hidden="true" />
{/if}
