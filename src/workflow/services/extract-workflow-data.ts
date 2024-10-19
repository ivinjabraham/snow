import { Workflow, Task } from "../types/types";

export function extractWorkflowData(workflowJson: any): Workflow {
  const { wfId, wfStatus, wfInput, wfOutput, wfDef } = workflowJson;

  const parsedTasks: Task[] = wfDef.tasks.map((task: any) => ({
    refName: task.taskReferenceName,
    type: task.type,
    input: task.inputData,
  }));

  return {
    status: wfStatus,
    id: wfId,
    input: wfInput,
    output: wfOutput,
    workflowDef: { tasks: parsedTasks },
  };
}
