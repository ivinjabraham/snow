import React, { useCallback, useEffect } from 'react';
import  {
  ReactFlow,
  useEdgesState,
  useNodesState,
  addEdge,
} from '@xyflow/react';

import dagre from 'dagre';
import '@xyflow/react/dist/style.css';
import { extractWorkflowData } from '../services/extract-workflow-data';
import { create_graph, parse_workflow } from '../services/parse-workflow-data';
import { Graph } from '../types/types';

const workflowJson = {
    "ownerApp": "",
    "createTime": 1729332031397,
    "updateTime": 1729332031821,
    "status": "COMPLETED",
    "endTime": 1729332031821,
    "workflowId": "f9ce5d57-8e00-11ef-bbcb-0242ac110002",
    "tasks": [
      {
        "taskType": "get_user_email",
        "status": "COMPLETED",
        "inputData": {
          "userid": "user_a"
        },
        "referenceTaskName": "get_user_email_ref",
        "retryCount": 0,
        "seq": 1,
        "pollCount": 1,
        "taskDefName": "get_user_email",
        "scheduledTime": 1729332031401,
        "startTime": 1729332031602,
        "endTime": 1729332031610,
        "updateTime": 1729332031602,
        "startDelayInSeconds": 0,
        "retried": false,
        "executed": true,
        "callbackFromWorker": true,
        "responseTimeoutSeconds": 3600,
        "workflowInstanceId": "f9ce5d57-8e00-11ef-bbcb-0242ac110002",
        "workflowType": "dynamic_workflow",
        "taskId": "f9cef998-8e00-11ef-bbcb-0242ac110002",
        "callbackAfterSeconds": 0,
        "workerId": "BiscuitBobby",
        "outputData": {
          "result": "user_a@example.com"
        },
        "workflowTask": {
          "name": "get_user_email",
          "taskReferenceName": "get_user_email_ref",
          "description": null,
          "inputParameters": {
            "userid": "${workflow.input.userid}"
          },
          "type": "SIMPLE",
          "dynamicTaskNameParam": null,
          "caseValueParam": null,
          "caseExpression": null,
          "scriptExpression": null,
          "dynamicForkJoinTasksParam": null,
          "dynamicForkTasksParam": null,
          "dynamicForkTasksInputParamName": null,
          "startDelay": 0,
          "subWorkflowParam": null,
          "sink": null,
          "optional": false,
          "taskDefinition": {
            "ownerApp": null,
            "createTime": null,
            "updateTime": null,
            "createdBy": null,
            "updatedBy": null,
            "accessPolicy": {},
            "name": "get_user_email",
            "description": null,
            "retryCount": 3,
            "timeoutSeconds": 0,
            "inputKeys": [],
            "outputKeys": [],
            "timeoutPolicy": "TIME_OUT_WF",
            "retryLogic": "FIXED",
            "retryDelaySeconds": 60,
            "responseTimeoutSeconds": 3600,
            "concurrentExecLimit": null,
            "inputTemplate": {},
            "rateLimitPerFrequency": 0,
            "rateLimitFrequencyInSeconds": 1,
            "isolationGroupId": null,
            "executionNameSpace": null,
            "ownerEmail": null,
            "pollTimeoutSeconds": null,
            "backoffScaleFactor": 1
          },
          "rateLimited": null,
          "asyncComplete": false,
          "loopCondition": null,
          "retryCount": null,
          "evaluatorType": null,
          "expression": null
        },
        "rateLimitPerFrequency": 0,
        "rateLimitFrequencyInSeconds": 1,
        "workflowPriority": 0,
        "iteration": 0,
        "subworkflowChanged": false,
        "queueWaitTime": 201,
        "loopOverTask": false,
        "taskDefinition": {
          "ownerApp": null,
          "createTime": null,
          "updateTime": null,
          "createdBy": null,
          "updatedBy": null,
          "accessPolicy": {},
          "name": "get_user_email",
          "description": null,
          "retryCount": 3,
          "timeoutSeconds": 0,
          "inputKeys": [],
          "outputKeys": [],
          "timeoutPolicy": "TIME_OUT_WF",
          "retryLogic": "FIXED",
          "retryDelaySeconds": 60,
          "responseTimeoutSeconds": 3600,
          "concurrentExecLimit": null,
          "inputTemplate": {},
          "rateLimitPerFrequency": 0,
          "rateLimitFrequencyInSeconds": 1,
          "isolationGroupId": null,
          "executionNameSpace": null,
          "ownerEmail": null,
          "pollTimeoutSeconds": null,
          "backoffScaleFactor": 1
        }
      },
      {
        "taskType": "send_email",
        "status": "COMPLETED",
        "inputData": {
          "subject": "Hello from Orkes",
          "body": "Test Email",
          "email": "user_a@example.com"
        },
        "referenceTaskName": "send_email_ref",
        "retryCount": 0,
        "seq": 2,
        "pollCount": 1,
        "taskDefName": "send_email",
        "scheduledTime": 1729332031613,
        "startTime": 1729332031810,
        "endTime": 1729332031817,
        "updateTime": 1729332031810,
        "startDelayInSeconds": 0,
        "retried": false,
        "executed": false,
        "callbackFromWorker": true,
        "responseTimeoutSeconds": 3600,
        "workflowInstanceId": "f9ce5d57-8e00-11ef-bbcb-0242ac110002",
        "workflowType": "dynamic_workflow",
        "taskId": "f9ef2bc9-8e00-11ef-bbcb-0242ac110002",
        "callbackAfterSeconds": 0,
        "workerId": "BiscuitBobby",
        "outputData": {
          "result": null
        },
        "workflowTask": {
          "name": "send_email",
          "taskReferenceName": "send_email_ref",
          "description": null,
          "inputParameters": {
            "email": "${get_user_email_ref.output.result}",
            "subject": "Hello from Orkes",
            "body": "Test Email"
          },
          "type": "SIMPLE",
          "dynamicTaskNameParam": null,
          "caseValueParam": null,
          "caseExpression": null,
          "scriptExpression": null,
          "dynamicForkJoinTasksParam": null,
          "dynamicForkTasksParam": null,
          "dynamicForkTasksInputParamName": null,
          "startDelay": 0,
          "subWorkflowParam": null,
          "sink": null,
          "optional": false,
          "taskDefinition": {
            "ownerApp": null,
            "createTime": null,
            "updateTime": null,
            "createdBy": null,
            "updatedBy": null,
            "accessPolicy": {},
            "name": "send_email",
            "description": null,
            "retryCount": 3,
            "timeoutSeconds": 0,
            "inputKeys": [],
            "outputKeys": [],
            "timeoutPolicy": "TIME_OUT_WF",
            "retryLogic": "FIXED",
            "retryDelaySeconds": 60,
            "responseTimeoutSeconds": 3600,
            "concurrentExecLimit": null,
            "inputTemplate": {},
            "rateLimitPerFrequency": 0,
            "rateLimitFrequencyInSeconds": 1,
            "isolationGroupId": null,
            "executionNameSpace": null,
            "ownerEmail": null,
            "pollTimeoutSeconds": null,
            "backoffScaleFactor": 1
          },
          "rateLimited": null,
          "asyncComplete": false,
          "loopCondition": null,
          "retryCount": null,
          "evaluatorType": null,
          "expression": null
        },
        "rateLimitPerFrequency": 0,
        "rateLimitFrequencyInSeconds": 1,
        "workflowPriority": 0,
        "iteration": 0,
        "subworkflowChanged": false,
        "queueWaitTime": 197,
        "loopOverTask": false,
        "taskDefinition": {
          "ownerApp": null,
          "createTime": null,
          "updateTime": null,
          "createdBy": null,
          "updatedBy": null,
          "accessPolicy": {},
          "name": "send_email",
          "description": null,
          "retryCount": 3,
          "timeoutSeconds": 0,
          "inputKeys": [],
          "outputKeys": [],
          "timeoutPolicy": "TIME_OUT_WF",
          "retryLogic": "FIXED",
          "retryDelaySeconds": 60,
          "responseTimeoutSeconds": 3600,
          "concurrentExecLimit": null,
          "inputTemplate": {},
          "rateLimitPerFrequency": 0,
          "rateLimitFrequencyInSeconds": 1,
          "isolationGroupId": null,
          "executionNameSpace": null,
          "ownerEmail": null,
          "pollTimeoutSeconds": null,
          "backoffScaleFactor": 1
        }
      }
    ],
    "input": {
      "userid": "user_a"
    },
    "output": {
      "send_emaol": null,
      "email": "user_a@example.com"
    },
    "taskToDomain": {},
    "failedReferenceTaskNames": [],
    "workflowDefinition": {
      "ownerApp": null,
      "createTime": null,
      "updateTime": null,
      "createdBy": null,
      "updatedBy": null,
      "accessPolicy": {},
      "name": "dynamic_workflow",
      "description": null,
      "version": 1,
      "tasks": [
        {
          "name": "get_user_email",
          "taskReferenceName": "get_user_email_ref",
          "description": null,
          "inputParameters": {
            "userid": "${workflow.input.userid}"
          },
          "type": "SIMPLE",
          "dynamicTaskNameParam": null,
          "caseValueParam": null,
          "caseExpression": null,
          "scriptExpression": null,
          "dynamicForkJoinTasksParam": null,
          "dynamicForkTasksParam": null,
          "dynamicForkTasksInputParamName": null,
          "startDelay": 0,
          "subWorkflowParam": null,
          "sink": null,
          "optional": false,
          "taskDefinition": {
            "ownerApp": null,
            "createTime": null,
            "updateTime": null,
            "createdBy": null,
            "updatedBy": null,
            "accessPolicy": {},
            "name": "get_user_email",
            "description": null,
            "retryCount": 3,
            "timeoutSeconds": 0,
            "inputKeys": [],
            "outputKeys": [],
            "timeoutPolicy": "TIME_OUT_WF",
            "retryLogic": "FIXED",
            "retryDelaySeconds": 60,
            "responseTimeoutSeconds": 3600,
            "concurrentExecLimit": null,
            "inputTemplate": {},
            "rateLimitPerFrequency": 0,
            "rateLimitFrequencyInSeconds": 1,
            "isolationGroupId": null,
            "executionNameSpace": null,
            "ownerEmail": null,
            "pollTimeoutSeconds": null,
            "backoffScaleFactor": 1
          },
          "rateLimited": null,
          "asyncComplete": false,
          "loopCondition": null,
          "retryCount": null,
          "evaluatorType": null,
          "expression": null
        },
        {
          "name": "send_email",
          "taskReferenceName": "send_email_ref",
          "description": null,
          "inputParameters": {
            "email": "${get_user_email_ref.output.result}",
            "subject": "Hello from Orkes",
            "body": "Test Email"
          },
          "type": "SIMPLE",
          "dynamicTaskNameParam": null,
          "caseValueParam": null,
          "caseExpression": null,
          "scriptExpression": null,
          "dynamicForkJoinTasksParam": null,
          "dynamicForkTasksParam": null,
          "dynamicForkTasksInputParamName": null,
          "startDelay": 0,
          "subWorkflowParam": null,
          "sink": null,
          "optional": false,
          "taskDefinition": {
            "ownerApp": null,
            "createTime": null,
            "updateTime": null,
            "createdBy": null,
            "updatedBy": null,
            "accessPolicy": {},
            "name": "send_email",
            "description": null,
            "retryCount": 3,
            "timeoutSeconds": 0,
            "inputKeys": [],
            "outputKeys": [],
            "timeoutPolicy": "TIME_OUT_WF",
            "retryLogic": "FIXED",
            "retryDelaySeconds": 60,
            "responseTimeoutSeconds": 3600,
            "concurrentExecLimit": null,
            "inputTemplate": {},
            "rateLimitPerFrequency": 0,
            "rateLimitFrequencyInSeconds": 1,
            "isolationGroupId": null,
            "executionNameSpace": null,
            "ownerEmail": null,
            "pollTimeoutSeconds": null,
            "backoffScaleFactor": 1
          },
          "rateLimited": null,
          "asyncComplete": false,
          "loopCondition": null,
          "retryCount": null,
          "evaluatorType": null,
          "expression": null
        }
      ],
      "inputParameters": [],
      "outputParameters": {
        "email": "${get_user_email_ref.output.result}",
        "send_emaol": "${send_email_ref.output.result}"
      },
      "failureWorkflow": "",
      "schemaVersion": 2,
      "restartable": true,
      "workflowStatusListenerEnabled": false,
      "ownerEmail": null,
      "timeoutPolicy": "ALERT_ONLY",
      "timeoutSeconds": 60,
      "variables": {},
      "inputTemplate": {}
    },
    "priority": 0,
    "variables": {},
    "lastRetriedTime": 0,
    "failedTaskNames": [],
    "workflowVersion": 1,
    "startTime": 1729332031397,
    "workflowName": "dynamic_workflow"
  }



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
  
  const initialNodes: any[] = [
  
  ];
  
  const initialEdges: any[] = [
  
  ];
  
  export default function Flow() {
  
  
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
    useEffect(() => {
        let graph: Graph = create_graph(parse_workflow(extractWorkflowData(workflowJson)));

        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
          graph.nodes,
          graph.edges
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
  