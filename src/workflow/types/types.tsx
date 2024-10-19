export interface Workflow {
  id: string;
  status: string;
  input: object;
  output: object;
  workflowDef: WorkflowDef;
}

export interface Task {
  refName: string;
  type: string;
  input: { [key: string] : string };
}

export interface WorkflowDef {
  tasks: Task[];
}

export interface Ir_task {
  id: number;
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
