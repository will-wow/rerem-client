<script>
  export let className;
  export let icon;
  export let description;
  export let title = "";
  export let onClick;
  export let type = "button";
</script>

<button {type} class={$$props.class} title={title || description} on:click>
  <span class="d-none d-md-inline">{description}</span>
  <ion-icon name={icon} />
</button>
