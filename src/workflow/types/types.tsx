export interface Workflow {
  id: string;
  status: string;
  input: object;
  output: object;
  tasks: Task[];
}

export interface Task {
  ref_name: string;
  task_type: string;
  status: string;
  input: object;
  output: object;
  workflow_task: WorkflowTask;
}

export interface WorkflowTask {
  type: string;
}
