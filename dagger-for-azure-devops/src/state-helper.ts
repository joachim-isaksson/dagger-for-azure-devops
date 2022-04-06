import * as tl from "azure-pipelines-task-lib/task";

export const IsPost = !!tl.getTaskVariable("isPost");
export const cleanup = /true/i.test(tl.getTaskVariable("cleanup") || "");

export function setCleanup(cleanup: boolean) {
  tl.setTaskVariable("cleanup", cleanup.toString());
}

if (!IsPost) {
  tl.setTaskVariable("isPost", "true");
  console.log("Set state");
}
