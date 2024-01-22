<script lang="ts">
  import { pathToFriendlyPath } from "$ts/server/fs/util";
  import { Runtime } from "../ts/runtime";

  export let runtime: Runtime;

  let pathStr = "";

  const { path } = runtime;

  path.subscribe((v) => (pathStr = pathToFriendlyPath(v)));
</script>

<div class="address-bar">
  <div class="portion address">
    <button
      class="material-icons-round parent"
      on:click={() => runtime.parentDir()}
    >
      arrow_upward
    </button>
    <div class="path">{pathStr}</div>
  </div>
  <div class="sep" />
  <div class="portion">
    <button class="material-icons-round">list</button>
    <button class="material-icons-round">grid_on</button>
  </div>
</div>
