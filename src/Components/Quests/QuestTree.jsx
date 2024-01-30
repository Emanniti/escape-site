import React, { useState } from "react";
import Tree from "react-d3-tree";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { TASKS_CONST } from "../Utils/TaskConst";
import NavBarSite from "../NavBarSite";
const orgChart = {
  name: "Vendors",
  children: [
    {
      name: "Prapor",
      children: [],
    },
  ],
};

function QuestTree() {
  const [quests, setQuests] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const getCustomPathClass = (linkData) => {
    if (linkData.target.data.name === "hidden") {
      return "special-link";
    }
    return "custom-link";
  };

  function createNestedChildren(node, depth, maxDepth) {
    if (depth >= maxDepth) {
      return;
    }

    let taskVendor = TASKS_CONST.data.tasks.filter((task) => task.trader.name === "Therapist");
    let dds = TASKS_CONST.data.tasks.filter((task) => {
      if (task.taskRequirements.length > 0 && task.taskRequirements[0].task.id === taskVendor[depth].id) {
        return task;
      } else {
        return null;
      }
    });
    debugger;
    const newChild = {
      name: taskVendor[depth].name,
      children: dds.map((item) => {
        return {
          name: item.name,
          children: [],
        };
      }),
    };

    if (node.children && node.children.length > 0) {
      // Find the correct child to update
      const existingChild = node.children.find((child) => child.name === newChild.name);

      if (existingChild) {
        // Update existing child's children
        existingChild.children = newChild.children;
      } else {
        // Add newChild if not found
        node.children.push(newChild);
      }
    } else {
      node.children.push(newChild);
    }

    createNestedChildren(newChild, depth + 1, maxDepth);
  }

  let taskVendor = TASKS_CONST.data.tasks.filter((task) => task.trader.name === "Therapist");
  createNestedChildren(orgChart.children[0], 0, taskVendor.length);

  // Stampare l'organigramma modificato
  console.log(orgChart);

  const CustomNode = ({ nodeData, toggleNode }) => {
    if (nodeData.name === "hidden") {
      return null;
    }

    return (
      <g>
        {/* Includi qui il tuo path o altre componenti se necessario */}
        <foreignObject className="overflow-visible" width="40" height="10" onClick={toggleNode} style={{ cursor: "pointer" }}>
          <Card onClick={toggleNode} className="py-4 -ml-12 -mt-14">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">{nodeData.name}</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2">Ciao</CardBody>
          </Card>
        </foreignObject>
      </g>
    );
  };

  console.log(quests);

  return (
    <>
      <NavBarSite />
      <div id="treeWrapper" style={{ width: "100%", height: "100vh", backgroundColor: "darkgrey" }}>
        <Tree
          orientation="horizontal"
          pathFunc={"step"}
          data={orgChart}
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
          pathClassFunc={getCustomPathClass}
          renderCustomNodeElement={({ nodeDatum, toggleNode }) => <CustomNode nodeData={nodeDatum} toggleNode={toggleNode} />}
        />
      </div>
    </>
  );
}

export default QuestTree;
