import { Workflow, Task } from "../types/types";

export function extractWorkflowData(workflowJson: any): Workflow {
  const { workflowId, status, inputData, outputData, workflowDefinition } = workflowJson;

  const parsedTasks: Task[] = workflowDefinition.tasks.map((task: any) => ({
    refName: task.taskReferenceName,
    type: task.type,
    input: task.inputParameters,
  }));

  return {
    status: status,
    id: workflowId,
    input: inputData,
    output: outputData,
    workflowDef: { tasks: parsedTasks },
  };
}
