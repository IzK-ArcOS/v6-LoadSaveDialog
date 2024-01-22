import { DefaultIcon } from "$ts/images/apps";
import { App } from "$types/app";
import AppSvelte from "../App.svelte";
import { Runtime } from "./runtime";

export const LoadSaveDialog: App = {
  metadata: {
    name: "LoadSaveDialog",
    description: "Used for choosing files to load/save",
    author: "ArcOS Team",
    version: "2.0.0",
    icon: DefaultIcon,
    appGroup: "internal",
    hidden: true
  },
  runtime: Runtime,
  content: AppSvelte,
  id: "LoadSaveDialog",
  size: { w: 600, h: 400 },
  minSize: { w: 500, h: 300 },
  maxSize: { w: 1000, h: 800 },
  pos: { x: 60, y: 60 },
  state: {
    minimized: false,
    maximized: false,
    headless: true,
    fullscreen: false,
    resizable: true,
  },
  controls: {
    minimize: false,
    maximize: false,
    close: true,
  },
};
