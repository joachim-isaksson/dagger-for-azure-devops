import del from "del";
import path from "path";
import os from "os";
import * as context from "./context";
import * as dagger from "./dagger";
import * as stateHelper from "./state-helper";
import * as exec from "@actions/exec";
import * as task from "azure-pipelines-task-lib/task";

async function run(): Promise<void> {
  try {
    const inputs: context.Inputs = await context.getInputs();
    const daggerBin = await dagger.install(inputs.version);

    if (inputs.installOnly) {
      const daggerDir = path.dirname(daggerBin);
      process.env[
        "PATH"
      ] = `${daggerDir}${path.delimiter}${process.env["PATH"]}`;
      task.debug(`Added ${daggerDir} to PATH`);
      return;
    } else if (!inputs.args) {
      throw new Error("args input required");
    }

    if (inputs.workdir && inputs.workdir !== ".") {
      task.debug(`Using ${inputs.workdir} as working directory`);
      process.chdir(inputs.workdir);
    }

    stateHelper.setCleanup(inputs.cleanup);
    await exec.exec(`${daggerBin} ${inputs.args} --log-format plain`);
  } catch (error) {
    task.setResult(task.TaskResult.Failed, error.message);
  }
}

async function cleanup(): Promise<void> {
  if (!stateHelper.cleanup) {
    return;
  }
  task.debug(`Removing ${path.join(os.homedir(), ".config", "dagger")}`);
  await del([path.join(os.homedir(), ".config", "dagger")], { force: true });
}

if (!stateHelper.IsPost) {
  run();
} else {
  cleanup();
}
