<script lang="ts">
  import { Runtime } from "$apps/LoadSaveDialog/ts/runtime";
  import { formatBytes } from "$ts/bytes";
  import { getMimeIcon } from "$ts/server/fs/mime";
  import { RelativeTimeMod } from "$ts/stores/dayjs";
  import { ProcessStack } from "$ts/stores/process";
  import { sleep } from "$ts/util";
  import { PartialArcFile } from "$types/fs";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  import updateLocale from "dayjs/plugin/updateLocale";
  import { fromMime } from "human-filetypes";
  import { onMount } from "svelte";

  export let file: PartialArcFile;
  export let runtime: Runtime;

  let date = "";
  let selected = "";
  let mime = "";
  let icon = "";

  onMount(() => {
    dayjs.extend(relativeTime);
    dayjs.extend(updateLocale);
    dayjs.updateLocale("en", RelativeTimeMod);

    date = dayjs(file.dateModified).fromNow();

    const m = fromMime(file.mime);

    mime = m.replace(m[0], m[0].toUpperCase());
    icon = getMimeIcon(file.filename);
  });

  runtime.selected.subscribe((v) => (selected = v));

  async function select() {
    await sleep(0);

    runtime.selected.set(file.filename);
  }

  function open() {
    runtime.ConfirmFile();
    ProcessStack.kill(runtime.pid, true);
  }
</script>

<button
  class="item file"
  on:click={select}
  on:dblclick={open}
  class:selected={selected == file.filename}
>
  <div class="segment icon">
    <img src={icon} alt="" />
  </div>
  <div class="segment name" title={file.filename}>{file.filename}</div>
  <div class="segment type">{mime}</div>
  <div class="segment size">{formatBytes(file.size)}</div>
  <div class="segment modified">{date}</div>
</button>
