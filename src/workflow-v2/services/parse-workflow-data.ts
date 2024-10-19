import { Edge, Graph, Ir, Ir_task, Node, Workflow } from "../types/types";

export function parse_workflow(workflow: Workflow): Ir {
  let wfDef = workflow.workflowDef;
  const ir: Ir = {
    tasks: [],
  };
  const refNames: string[] = [];
  let task_id: number = 0;

  wfDef.tasks.forEach((task) => {
    refNames.push(task.refName);

    switch (task.type) {
      case "SIMPLE":
        if (!task.input) {
          const ir_task: Ir_task = {
            id: task_id,
            name: task.refName,
            dependencies: [],
          };

          ir.tasks.push(ir_task);
          task_id++;
          break;
        }
        Object.keys(task.input).forEach((key) => {
          const value = task.input[key];

          if (typeof value === "string") {
            if (value.includes("workflow.input")) {
              const ir_task: Ir_task = {
                id: task_id,
                name: task.refName,
                dependencies: [],
              };

              ir.tasks.push(ir_task);
              task_id++;
            } else {
              const matchingStrings = refNames.filter((str) =>
                value.includes(str)
              );

              if (matchingStrings.length > 0) {
                const ir_task: Ir_task = {
                  id: task_id,
                  name: task.refName,
                  dependencies: matchingStrings,
                };

                ir.tasks.push(ir_task);
                task_id++;
              }
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
    }
  });

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

  let final_node: Node;
  let start: Node = {
    id: "Start",
    data: { label: "Start" },
    position: { x: 0, y: 0 },
  };

  nodes.push(start);

  let edge_id: number = 0;
  console.log(intermediate_representation);
  intermediate_representation.tasks.forEach((task) => {
    let node: Node = {
      id: task.name,
      data: { label: task.name },
      position: { x: 0, y: 0 },
    };

    nodes.push(node);
    final_node = node;

    task.dependencies.forEach((str) => {
      let edge: Edge = {
        id: edge_id,
        source: str,
        target: task.name,
      };

      edge_id++;

      edges.push(edge);
    });
  });

  let end: Node = {
    id: "End",
    data: { label: "End" },
    position: { x: 0, y: 0 },
  };

  nodes.push(end);

  let final_edge: Edge = {
    id: edge_id,
    source: final_node.id,
    target: "End",
  };

  edges.push(final_edge);

  console.log(graph);
  graph.nodes = nodes;
  graph.edges = edges;
  return graph;
}
