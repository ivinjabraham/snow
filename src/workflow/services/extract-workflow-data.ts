// utils/extractWorkflowData.ts
export interface Task {
  id: string;
  name: string;
  type: string;
  status: string;
  workflow_task: object;
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
    workflow_task: task.workflowTask,
    dependencies: [],
  }));

  const taskMap: { [key: string]: Task } = {};
  tasks.forEach(task => {
    taskMap[task.id] = task;
  });

  tasks.forEach(task => {

 const inputParameters = task.workflow_task['inputParameters']; // Access inputParameters once
// Ensure inputParameters is an object to avoid issues when iterating
  if (inputParameters && typeof inputParameters === 'object') {
    for (const key in inputParameters) {
      const value = inputParameters[key];

      // Check if the value is a string that starts with "${" to identify task references
      if (typeof value === 'string' && value.startsWith('${')) {
        // Use a regex to extract the task name from patterns like "${get_user_email_ref.output.result}"
        const match = value.match(/\${(\w+)_ref\.output\.result}/); // Extract "get_user_email"
        
        if (match) {
          const previousTaskName = match[1]; // Extract the task name (e.g., get_user_email)
          
          // Find the task ID by looking up the task name in the list of tasks
          const previousTaskId = tasks.find(t => t.name === previousTaskName)?.id;
          
          if (previousTaskId) {
            task.dependencies.push(previousTaskId); // Add the task ID to the dependencies list
            console.log("GREAT SUCCESS: Found dependency for", task.name, "->", previousTaskName);
          }
        }
      }
    }
  }
});
  return { tasks };
}
