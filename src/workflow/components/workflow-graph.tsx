// utils/extractWorkflowData.ts
export interface Task {
  id: string;
  name: string;
  type: string;
  status: string;
  inputData: object;
  outputData: object;
  dependencies: string[];
}

export interface WorkflowData {
  tasks: Task[];
}

export function extractWorkflowData(workflowJson: any): WorkflowData {
  const tasks: Task[] = workflowJson.tasks.map((task: any) => ({
    id: task.taskId,
    name: task.taskDefName,
    type: task.taskType,
    status: task.status,
    inputData: task.inputData,
    outputData: task.outputData,
    dependencies: [],
  }));

  const taskMap: { [key: string]: Task } = {};
  tasks.forEach(task => {
    taskMap[task.id] = task;
  });

  tasks.forEach(task => {
    for (const key in task.inputData) {
      const value = task.inputData[key];
      if (typeof value === 'string' && value.startsWith('${')) {
        const match = value.match(/(\w+)_ref\.output\.result/);
        if (match) {
          const previousTaskName = match[1];
          const previousTaskId = tasks.find(t => t.name === previousTaskName)?.id;
          if (previousTaskId) {
            task.dependencies.push(previousTaskId);
          }
        }
      }
    }
  });

  return { tasks };
}
