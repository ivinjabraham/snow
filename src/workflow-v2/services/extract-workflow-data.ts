import { Workflow, Task, WorkflowDefinition } from "../types/types";

/**
 * Extracts workflow data from a given JSON object and converts it into a strongly-typed Workflow object.
 * 
 * @param {any} workflowJson - The JSON object containing workflow information.
 * @returns {Workflow} - A strongly-typed Workflow object containing the extracted data.
 * 
 * @throws {Error} - Throws an error if the required fields are not present in the workflowJson.
 */
export function extractWorkflowData(workflowJson: any): Workflow {
  // Destructure the useful properties from the workflow JSON
  const { workflowId, status, inputData, outputData, workflowDefinition } = workflowJson;

  // Check for required properties
  if (!workflowDefinition || !workflowDefinition.tasks) {
    throw new Error("Invalid workflow JSON: Missing 'workflowDefinition' or 'tasks'");
  }

  // Parse tasks from the workflow definition
  const parsedTasks: Task[] = workflowDefinition.tasks.map((task: any) => {
    const { taskReferenceName, type, inputParameters } = task;

    // Return a Task object
    return {
      refName: taskReferenceName,
      type: type,
      input: inputParameters || {}, // Default to an empty object if undefined
    };
  });

  // Return the fully constructed Workflow object
  return {
    status: status || "UNKNOWN", // Provide a default status
    id: workflowId,
    input: inputData || {}, // Default to an empty object if undefined
    output: outputData || {}, // Default to an empty object if undefined
    workflowDef: { tasks: parsedTasks },
  };
}
