import { Edge, Graph, Ir, Ir_task, Node, Workflow } from "../types/types";

export function parse_workflow(workflow: Workflow): Ir {
  let wfDef = workflow.workflowDef;
  const ir: Ir = {
    tasks: []
  };
  const refNames: string[] = [];
  let task_id: number = 0;

  wfDef.tasks.forEach((task) => {
    refNames.push(task.refName);

    switch (task.type) {
      case "SIMPLE":
        if (!task.input) {
        console.log("yes");
        break;
        }
        Object.keys(task.input).forEach((key) => {
          const value = task.input[key];

          if (typeof value === "string") {
            const matchingStrings = refNames.filter((str) => value.includes(str)); 

            if (matchingStrings.length > 0) {
             const ir_task: Ir_task = {
               id: task_id,
               name: task.refName,
               dependencies: matchingStrings
             };

             ir.tasks.push(ir_task);
            }
          }

      });
        break;

      case "FORK_JOIN":
        break;

      case "FORK":
        break;
      default:
        console.error("Unknown workflow task type.");
    };
  });
  console.log(ir);
  ir.tasks[0].dependencies.push("Start");
  return ir;
}

export function create_graph(intermediate_representation: Ir): Graph {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  let graph: Graph = {
    nodes: [],
    edges: [],
  };

  let start: Node = {
    id: "Start",
    data: { label: 'Start' },
    position: { x: 0, y: 0 },
  };

  nodes.push(start);

  intermediate_representation.tasks.forEach((task) => {
    let node: Node = {
      id: task.name,
      data: { label: task.name},
      position: { x: 0, y: 0 }
    };

    nodes.push(node);

    let edge_id: number = 0;
    task.dependencies.forEach((str) => {
      let edge: Edge = {
        id: edge_id,
        source: task.id.toString(),
        target: str
      };

      edge_id++;

    edges.push(edge);
    });

  });



  graph.nodes = nodes;
  graph.edges = edges;
  return graph;
}
