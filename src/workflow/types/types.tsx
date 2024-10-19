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

export interface Ir_task {
  id: string;
  name: string;
  dependencies: string[];
}

export interface Ir {
  tasks: Ir_task[];
}

export interface Position {
  x: number;
  y: number;
}

export interface NodeData {
  label : string;
}

export interface Node {
  id: number;
  data: NodeData;
  position: Position;
}

export interface Edge {
  id: string;
  source: number;
  target: number;
}

export interface Graph {
  nodes: Node[];
  edges: Edge[];
}
