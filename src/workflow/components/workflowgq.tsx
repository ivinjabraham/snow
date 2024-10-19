import React, { useEffect, useRef } from 'react';
import { DataSet, Network } from 'vis-network/standalone';
import { extractWorkflowData, WorkflowData } from '../services/extract-workflow-data';

interface WorkflowGraphProps {
  workflowJson: any; // Pass the full workflow JSON here
}

const WorkflowGraph: React.FC<WorkflowGraphProps> = ({ workflowJson }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Extract tasks and dependencies from the workflow JSON
    const { tasks }: WorkflowData = extractWorkflowData(workflowJson);

    // Create nodes with custom colors based on the task status
    const nodes = new DataSet(
      tasks.map(task => ({
        id: task.id, // Use the unique identifier for nodes
        label: `${task.name}\nStatus: ${task.status}`, // Display task name and status
        shape: 'box', // Shape of the node (box)
        color: {
          background: task.status === 'COMPLETED' ? 'lightgreen' : 'lightcoral', // Node background color based on task status
          border: 'black', // Border color
          highlight: {
            background: 'yellow', // Highlight color when node is selected
            border: 'orange',
          },
          hover: {
            background: 'lightblue', // Color on hover
            border: 'blue',
          },
        },
      }))
    );

    // Create edges based on task dependencies using a simple forEach loop
    const edgesArray = [];
    tasks.forEach(task => {
      task.dependencies.forEach(depId => {
        edgesArray.push({
          from: depId, // The task that is depended on
          to: task.id, // The task that depends on the previous task
          arrows: 'to', // Show an arrow pointing to the dependent task
          color: {
            color: 'gray', // Default edge color
            highlight: 'green', // Edge color when selected
            hover: 'blue', // Edge color when hovered
          },
        });
      });
    });

    // Create edges DataSet from the gathered edges array
    const edges = new DataSet(edgesArray);

    // Set up the network graph options (optional for customization)
    const options = {
      layout: {
        hierarchical: {
          enabled: true,
          direction: 'UD', // Up-Down layout
          sortMethod: 'directed',
        },
      },
      nodes: {
        borderWidth: 1,
        shape: 'box',
        font: {
          color: 'black',
          size: 14, // Font size for node labels
        },
      },
      edges: {
        smooth: true,
      },
      interaction: {
        hover: true,
        dragNodes: true,
      },
      physics: {
        enabled: true,
        stabilization: {
          iterations: 500,
        },
      },
    };

    // Initialize the network graph inside the container
    if (containerRef.current) {
      const network = new Network(containerRef.current, { nodes, edges }, options);
    }

    // Clean up the effect when the component is unmounted
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [workflowJson]);

  return <div ref={containerRef} />;
};

export default WorkflowGraph;
