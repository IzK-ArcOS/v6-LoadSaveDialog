<script lang="ts">
  import Titlebar from "$state/Desktop/Components/ProcessRenderer/Window/Titlebar.svelte";
  import DirectoryViewer from "./Components/DirectoryViewer.svelte";
  import Header from "./Components/Header.svelte";
  import Toolbar from "./Components/Toolbar.svelte";
  import { Runtime } from "./ts/runtime";
  import "./css/main.css";

  export let runtime: Runtime;
</script>

<Titlebar app={runtime.appMutator} pid={runtime.pid} />
<Header {runtime} />
<DirectoryViewer {runtime} />
<Toolbar {runtime} />
