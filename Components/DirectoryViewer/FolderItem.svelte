<script lang="ts">
  import { GetSystemFolderIcon } from "$apps/FileManager/ts/store";
  import { Runtime } from "$apps/LoadSaveDialog/ts/runtime";
  import { FolderIcon } from "$ts/images/filesystem";
  import { PartialUserDir } from "$types/fs";
  import { onMount } from "svelte";

  export let runtime: Runtime;
  export let dir: PartialUserDir;

  let selected = [];
  let icon = FolderIcon;

  onMount(() => (icon = GetSystemFolderIcon(dir.scopedPath)));

  function goHere() {
    runtime.navigate(dir.scopedPath);
  }
</script>

<button class="item folder" class:selected={selected.includes(dir.scopedPath)} on:dblclick={goHere}>
  <div class="segment icon">
    <img src={icon} alt="" />
  </div>
  <div class="segment name">{dir.name}</div>
  <div class="segment type">Folder</div>
  <div class="segment size">-</div>
  <div class="segment modified">-</div>
</button>
