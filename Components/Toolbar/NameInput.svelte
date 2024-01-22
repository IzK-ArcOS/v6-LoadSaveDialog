<script lang="ts">
  import { Runtime } from "$apps/LoadSaveDialog/ts/runtime";

  export let runtime: Runtime;

  let value = "";

  function update() {
    runtime.selected.set(value);
  }
</script>

<input
  type="text"
  class="name-input"
  bind:value
  on:input={update}
  on:keyup={update}
/>
