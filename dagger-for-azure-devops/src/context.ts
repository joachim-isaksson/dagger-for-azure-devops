import tl = require("azure-pipelines-task-lib/task");

export interface Inputs {
  version: string;
  workdir: string;
  args: string | undefined;
  installOnly: boolean;
  cleanup: boolean;
}

export async function getInputs(): Promise<Inputs> {
  return {
    version: tl.getInput("version") || "latest",
    workdir: tl.getInput("workdir") || ".",
    args: tl.getInput("args"),
    installOnly: tl.getBoolInput("installonly"),
    cleanup: tl.getBoolInput("cleanup"),
  };
}
