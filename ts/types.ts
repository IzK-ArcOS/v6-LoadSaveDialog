export interface LoadSaveDialogData {
  title: string;
  icon: string;
  startDir?: string;
  isSave?: boolean;
  targetPid?: number;
  saveName?: string;
  extensions?: string[];
}
