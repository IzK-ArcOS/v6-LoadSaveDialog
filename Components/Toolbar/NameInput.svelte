<script lang="ts">
  import { Runtime } from "$apps/LoadSaveDialog/ts/runtime";

  export let runtime: Runtime;

  const { selected } = runtime;
</script>

<input type="text" class="name-input" bind:value={$selected} />
