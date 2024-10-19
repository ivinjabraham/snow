import { Workflow, Task } from "../types/types";

export function extractWorkflowData(workflowJson: any): Workflow {
  const { wfId, wfStatus, wfInput, wfOutput, wfTasks } = workflowJson;

  const parsedTasks: Task[] = wfTasks.map((task: any) => ({
    ref_name: task.referenceTaskName,
    task_type: task.taskType,
    status: task.status,
    input: task.inputData,
    output: task.outputData,
    workflow_task: {
      type: task.workflowTask.type,
    },
  }));

  return {
    status: wfStatus,
    id: wfId,
    input: wfInput,
    output: wfOutput,
    tasks: parsedTasks,   
  };
}
