<script lang="ts">
  import { UserDataStore } from "$ts/stores/user";
  import { sleep } from "$ts/util";
  import { UserDirectory } from "$types/fs";
  import { Runtime } from "../ts/runtime";
  import Failed from "./DirectoryViewer/Failed.svelte";
  import FileItem from "./DirectoryViewer/FileItem.svelte";
  import FolderItem from "./DirectoryViewer/FolderItem.svelte";
  import Header from "./DirectoryViewer/Header.svelte";
  import Loading from "./DirectoryViewer/Loading.svelte";

  export let runtime: Runtime;

  const { failed, loading, contents: ContentsStore } = runtime;

  let contents: UserDirectory;

  ContentsStore.subscribe(async (v) => {
    contents = undefined;
    sleep(0);
    contents = v;
  });
</script>

<div class="directory-viewer" role="directory" class:grid={$UserDataStore.appdata.FileManager.grid}>
  <Header />
  {#if contents}
    {#each contents.directories as dir}
      {#if dir.hidden ? $UserDataStore.sh.showHiddenFiles : true}
        <FolderItem {dir} {runtime} />
      {/if}
    {/each}
    {#each contents.files as file}
      {#if file.hidden ? $UserDataStore.sh.showHiddenFiles : true}
        <FileItem {file} {runtime} />
      {/if}
    {/each}
    <!---->
    {#if !contents.files.length && !contents.directories.length}
      <p class="empty">This folder is empty.</p>
    {/if}
  {/if}

  {#if $failed}
    <Failed />
  {/if}

  {#if $loading}
    <Loading />
  {/if}
</div>
