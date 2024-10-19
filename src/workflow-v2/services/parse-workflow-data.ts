import { Edge, Graph, Ir, Ir_task, Node, Workflow } from "../types/types";

/**
 * Parses a Workflow object and converts it into an Intermediate Representation (Ir).
 * 
 * @param {Workflow} workflow - The Workflow object to be parsed.
 * @returns {Ir} - The Intermediate Representation (Ir) derived from the workflow.
 * 
 * @throws {Error} - Throws an error if the task type is unknown.
 */
export function parse_workflow(workflow: Workflow): Ir {
  const wfDef = workflow.workflowDef;
  
  // Initialize the Intermediate Representation
  const ir: Ir = {
    tasks: [],
  };
  
  // Holds reference names to check for previous functions
  // to check for dependencies later
  const refNames: string[] = [];
  let taskId: number = 0;

  // Check if the workflow definition has tasks
  if (!wfDef || !Array.isArray(wfDef.tasks)) {
    throw new Error("Invalid workflow definition: 'tasks' are missing or not an array.");
  }

  // Iterate through each task in the workflow definition
  wfDef.tasks.forEach((task) => {
    refNames.push(task.refName);

    switch (task.type) {
      case "SIMPLE":
        handleSimpleTask(task, ir, refNames, taskId);
        taskId++;
        break;

      case "FORK_JOIN":
        // Handle FORK_JOIN tasks if necessary
        break;

      case "FORK":
        // Handle FORK tasks if necessary
        break;

      default:
        console.error("Unknown workflow task type:", task.type);
        throw new Error(`Unknown workflow task type: ${task.type}`);
    }
  });

  // Ensure the first task has a "Start" dependency
  if (ir.tasks.length > 0) {
    ir.tasks[0].dependencies.push("Start");
  }

  return ir;
}

/**
 * Handles the processing of SIMPLE task types.
 * 
 * @param {any} task - The task object to process.
 * @param {Ir} ir - The Intermediate Representation being constructed.
 * @param {string[]} refNames - The reference names of the tasks.
 * @param {number} taskId - The current task ID for the IR.
 */
function handleSimpleTask(task: any, ir: Ir, refNames: string[], taskId: number) {
  // Check if the input is defined
  // If not, this is hopefully the first task
  // TODO: It is likely that there may be functions that don't take
  // any input but still have dependencies
  if (!task.input) {
    const irTask: Ir_task = {
      id: taskId,
      name: task.refName,
      dependencies: [],
    };

    ir.tasks.push(irTask);
    return;
  }

  // Iterate through the input keys
  Object.keys(task.input).forEach((key) => {
    const value = task.input[key];

    if (typeof value === "string") {
      // Takes user input, likely first task
      if (value.includes("workflow.input")) {
        const irTask: Ir_task = {
          id: taskId,
          name: task.refName,
          dependencies: [],
        };

        ir.tasks.push(irTask);
      } else {
        // Not first task, might have other dependencies
        const matchingStrings = refNames.filter((str) =>
          value.includes(str)
        );

        if (matchingStrings.length > 0) {
          const irTask: Ir_task = {
            id: taskId,
            name: task.refName,
            dependencies: matchingStrings,
          };

          ir.tasks.push(irTask);
        }
      }
    }
  });
}

/**
 * Creates a graph representation from an Intermediate Representation (Ir).
 *
 * @param {Ir} intermediate_representation - The Intermediate Representation from which to create the graph.
 * @returns {Graph} - The generated graph containing nodes and edges.
 */
export function create_graph(intermediate_representation: Ir): Graph {
  // Initialize nodes and edges arrays
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  
  // Create the graph object
  const graph: Graph = {
    nodes: [],
    edges: [],
  };

  // Create and add the Start node
  const start: Node = {
    id: "Start",
    data: { label: "Start" },
    position: { x: 0, y: 0 },
  };

  nodes.push(start);
  let edgeId: number = 0; // Initialize edge ID
  let finalNode: Node | null = null; // Track the last task node

  // Iterate through each task in the intermediate representation
  intermediate_representation.tasks.forEach((task) => {
    // Create a new node for the task
    const node: Node = {
      id: task.name,
      data: { label: task.name },
      position: { x: 0, y: 0 },
    };

    nodes.push(node);
    finalNode = node; // Update the last node added

    // Create edges for each dependency of the task
    task.dependencies.forEach((dependency) => {
      const edge: Edge = {
        id: edgeId,
        source: dependency,
        target: task.name,
      };

      edges.push(edge);
      edgeId++; // Increment edge ID
    });
  });

  // Create and add the End node
  const end: Node = {
    id: "End",
    data: { label: "End" },
    position: { x: 0, y: 0 },
  };

  nodes.push(end);

  // Create an edge from the last task node to the End node
  if (finalNode) {
    const finalEdge: Edge = {
      id: edgeId, // Ensure edge ID is a string
      source: finalNode.id,
      target: "End",
    };

    edges.push(finalEdge);
  }

  // Assign the nodes and edges to the graph
  graph.nodes = nodes;
  graph.edges = edges;

  return graph;
}
