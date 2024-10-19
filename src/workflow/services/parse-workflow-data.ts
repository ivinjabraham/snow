import { Edge, Graph, Ir, Node } from "../types/types";

export function create_graph(intermediate_representation: Ir): Graph {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  let graph: Graph;

  let start: Node = {
    id: 1,
    data: { label: 'Start' },
    position: { x: 0, y: 0 },
  };

  nodes.push(start);

  return graph;
}
