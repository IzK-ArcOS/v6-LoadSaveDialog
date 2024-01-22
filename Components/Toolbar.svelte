<script lang="ts">
  import { pathToFriendlyName } from "$ts/server/fs/util";
  import { ProcessStack } from "$ts/stores/process";
  import { Plural as P } from "$ts/util";
  import { Runtime } from "../ts/runtime";
  import NameInput from "./Toolbar/NameInput.svelte";

  export let runtime: Runtime;

  let size = 0;
  let folder = "";

  const { isSave, selected, contents: contentsStore } = runtime;

  contentsStore.subscribe((v) => {
    if (!v) return;

    folder = pathToFriendlyName(v.scopedPath);
    size = v.directories.length + v.files.length;
  });

  function sendOff() {
    runtime.ConfirmFile();

    exit();
  }

  function exit() {
    ProcessStack.kill(runtime.pid, true);
  }
</script>

<div class="toolbar" class:saving={$isSave}>
  {#if $isSave}
    <NameInput {runtime} />
  {:else}
    <p class="count">
      {size}
      {P("item", size)} in {folder}
    </p>
  {/if}
  <div class="confirm">
    <button class="cancel" on:click={exit}>Cancel</button>
    <button class="confirm suggested" disabled={!$selected} on:click={sendOff}>
      {$isSave ? "Save" : "Open"}
    </button>
  </div>
</div>
