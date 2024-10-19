import React, { useCallback, useEffect } from 'react';
import  {
  ReactFlow,
  useEdgesState,
  useNodesState,
  addEdge,
} from '@xyflow/react';

import dagre from 'dagre';
import '@xyflow/react/dist/style.css';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes: any[], edges: any[]) => {
  const nodeWidth = 172;
  const nodeHeight = 36;
  dagreGraph.setGraph({ rankdir: 'TB' }); // Top to Bottom layout

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
  });

  return { nodes, edges };
};

const initialNodes = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 0, y: 0 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 0, y: 0 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 0, y: 0 } },
  { id: '4', data: { label: 'Node 3' }, position: { x: 0, y: 0 } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
];

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: any) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  useEffect(() => {
    // Automatically layout nodes when component mounts
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges
    );
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  }, []);

  return (
    <div className='flex flex-row bg-slate-400'>
        <div style={{ width: '70%', height: '100vh' }}>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
        />
        </div>
        <div className='w-[30%] flex flex-col bg-deep-blue m-5 rounded-md'>
            <div className=' bg-light-blue h-5/6 m-5 mb-0 rounded-md flex justify-center items-center'>
                Output text is recieved here...
            </div>
            <div className=' h-1/6 m-5 flex items-center justify-center'>
                <div className='h-20 w-36 text-sm font-semibold bg-light-blue rounded-md flex justify-center items-center cursor-pointer shadow-2xl'>
                    INITIALISE
                </div>
            </div>
        </div>
    </div>

  );
}
