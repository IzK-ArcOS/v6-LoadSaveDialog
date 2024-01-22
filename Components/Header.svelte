<script lang="ts">
  import { pathToFriendlyPath } from "$ts/server/fs/util";
  import { UserDataStore } from "$ts/stores/user";
  import { Runtime } from "../ts/runtime";

  export let runtime: Runtime;

  let grid = false;
  let pathStr = "";

  const { path } = runtime;

  path.subscribe((v) => (pathStr = pathToFriendlyPath(v)));

  UserDataStore.subscribe((v) => {
    grid = !!$UserDataStore.appdata.FileManager.grid;
  });

  function gridOff() {
    $UserDataStore.appdata.FileManager.grid = false;
  }

  function gridOn() {
    $UserDataStore.appdata.FileManager.grid = true;
  }
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
    <button
      class="material-icons-round"
      class:suggested={!grid}
      on:click={gridOff}>list</button
    >
    <button
      class="material-icons-round"
      class:suggested={grid}
      on:click={gridOn}>grid_on</button
    >
  </div>
</div>
