import { AppRuntime } from "$ts/apps/runtime";
import { ErrorIcon, WarningIcon } from "$ts/images/dialog";
import { ComponentIcon } from "$ts/images/general";
import { sendNotification } from "$ts/notif";
import { Process } from "$ts/process";
import { GlobalDispatch } from "$ts/process/dispatch/global";
import { createErrorDialog } from "$ts/process/error";
import { getParentDirectory, readDirectory } from "$ts/server/fs/dir";
import { ProcessStack } from "$ts/stores/process";
import { Store } from "$ts/writable";
import type { App, AppMutator } from "$types/app";
import { UserDirectory } from "$types/fs";
import { LoadSaveDialogData } from "./types";

export class Runtime extends AppRuntime {
  public target = Store<number>();
  public path = Store<string>();
  public selected = Store<string>();
  private _refreshLocked = false;
  public contents = Store<UserDirectory>();
  public loading = Store<boolean>(true);
  public failed = Store<boolean>(false);
  public data = Store<LoadSaveDialogData>();
  public isSave = Store<boolean>(false);

  constructor(app: App, mutator: AppMutator, process: Process) {
    super(app, mutator, process);

    function stop() {
      process.handler.kill(process.pid, true);

      sendNotification({
        title: "Can't open Load/save Dialog",
        message: `No valid data was specified to use in the dialog. Aborting.`,
        image: WarningIcon,
        timeout: 3000,
      })
    }

    const data: LoadSaveDialogData = process.args[0];

    if (!app.isOverlay || !data) { stop(); return; }

    mutator.update((v) => { // Adapt the window properties to the error dialog's data
      v.metadata.name = data.title;
      v.metadata.icon = data.icon || ComponentIcon;

      return v;
    })

    this.data.set(data);
    this.isSave.set(data.isSave);
    this.path.set(data.startDir || "./");
    this.target.set(data.targetPid || this.process.parentPid);

    this._init();
  }


  private async _init() {
    GlobalDispatch.subscribe("fs-flush", () => this.refresh());
    this.navigate(this.path.get());
  }

  public async refresh() {
    if (this._refreshLocked) return;

    this.contents.set(undefined);
    this.loading.set(true);
    this.failed.set(false);

    const contents = await readDirectory(this.path.get());

    this.loading.set(false);

    if (!contents) {
      this.FileNotFound();

      return false;
    }

    this.contents.set(contents);

    return true;
  }

  public async parentDir() {
    const current = this.path.get();
    const parent = getParentDirectory(current);

    if (parent == current) return;

    return await this.navigate(parent);
  }

  public async navigate(path: string) {
    this.path.set(path);

    await this.refresh();
  }

  public FileNotFound(path = this.path.get()) {
    this.failed.set(true);

    createErrorDialog({
      title: "Location not found",
      message: `Folder <code>${path}</code> does not exist on your filesystem. Did you make a typo?`,
      image: ErrorIcon,
      buttons: [{
        caption: "Go Home", action: () => {
          this.navigate("./")
        }, suggested: true
      }]
    }, this.pid, true)
  }

  public ConfirmFile() {
    const pid = this.target.get();
    const dir = this.path.get();
    const file = this.selected.get();
    const path = `${dir}/${file}`.replaceAll("//", "/");
    const event = this.isSave.get() ? "save-file" : "open-file";

    ProcessStack.dispatch.dispatchToPid(pid, event, path);
  }

  public async Cancel() {
    const pid = this.target.get();

    ProcessStack.dispatch.dispatchToPid(pid, "ls-dialog-cancel");

    await this.process.handler.kill(this.pid, true);
  }
}