import { useEffect, useContext, useState, useMemo } from "react";
import AppContext from "./appContext";
import Form from "./Components/Form";
import Sidebar from "./Components/Sidebar";
import ExtendedTree from "./Components/Tree";
import { getNodes } from "./transportLayer";
import { NodeType } from "./types";

function App() {
  const [selectedItem, setSelectedItem] = useState<NodeType | null>(null);
  const [showEdit, setShowEdit] = useState(true);
  const [treeData, setTreeData] = useState([]);
  const [cutInfo, setCutInfo] = useState<NodeType | null>(null);
  const [activeNewChild, setActiveNewChild] = useState<NodeType | null>(null);

  const fetchTreeData = async () => {
    const result = await getNodes();
    setTreeData(result);
  };

  useEffect(() => {
    fetchTreeData();
  }, []);

  const deleteNode = (list: NodeType[], node: NodeType) => {
    let newList = [...list];
    for (let i = 0; i < newList.length; i++) {
      if (newList[i].key === node.key) {
        newList = newList.filter((item) => item.key !== node.key);
        break;
      } else if (newList[i].children?.length > 0) {
        let children = deleteNode(newList[i].children, node);
        newList[i].children = [...children];
      }
    }
    return newList;
  };

  const pasteNode = (list: NodeType[], destinationNode: NodeType) => {
    let newList = [...list];
    for (let i = 0; i < newList.length; i++) {
      if (newList[i].key === destinationNode.key) {
        let newNode = {
          ...cutInfo,
          parentKey: destinationNode.key,
          hierarchy:
            destinationNode.hierarchy.length !== 0
              ? [...destinationNode.hierarchy, cutInfo.key]
              : [treeData[0].key, cutInfo.key],
        };
        newList[i].children = [...newList[i].children, newNode];
        break;
      } else if (newList[i].children?.length > 0) {
        let children = pasteNode(newList[i].children, destinationNode);
        newList[i].children = [...children];
      }
    }
    return newList;
  };

  const findNewChildParent = (list: NodeType[], newNode: NodeType) => {
    let newList = [...list];
    for (let i = 0; i < newList.length; i++) {
      if (newList[i].key === activeNewChild.key) {
        newList[i].children = [...newList[i].children, newNode];
        break;
      } else if (newList[i].children.length > 0) {
        newList[i].children = findNewChildParent(newList[i].children, newNode);
      }
    }
    return newList;
  };

  const submitNewchild = (info: any) => {
    let hierarchy = [...activeNewChild.hierarchy, info.key];
    let newObj = { ...info, parentKey: activeNewChild.key, hierarchy };
    let newList = findNewChildParent(treeData, newObj);
    handleUpdateTree(newList);
    setActiveNewChild(null);
    setSelectedItem(newObj);
  };

  const handleContextMenuClick = (actionKey: any, node: NodeType) => {
    console.log("handleContextMenuClick");
    console.log(actionKey);
    console.log(node);
    switch (actionKey) {
      case "delete":
        if (node.children?.length === 0) {
          let newList = deleteNode(treeData, node);
          handleUpdateTree(newList);
        }
        break;
      case "cut":
        if (node.children?.length === 0) {
          setCutInfo({ ...node });
        }
        break;
      case "paste":
        if (
          cutInfo &&
          node.key !== cutInfo.key &&
          node.key !== cutInfo.parentKey
        ) {
          let newList = deleteNode(treeData, cutInfo);
          newList = pasteNode(newList, node);
          console.log(newList);
          handleUpdateTree(newList);
          setCutInfo(null);
        } else {
          alert("illegal action!!");
        }
        break;
      case "newChild":
        setActiveNewChild({ ...node });
        setSelectedItem(null);
        break;
    }
  };

  const handleUpdateTree = (nodes: NodeType[]) => {
    console.log("handleUpdateTree*************************");
    let newNodes = [...nodes];
    setTreeData(newNodes);
  };

  const handleUpdateNode = (key: string, data: any) => {};

  return (
    <AppContext.Provider
      value={{
        treeData,
        updateTreeData: handleUpdateTree,
      }}
    >
      <div className="App">
        <Sidebar>
          <ExtendedTree
            handleContextMenuClick={handleContextMenuClick}
            setSelectedItem={setSelectedItem}
          />
        </Sidebar>
        {showEdit && (
          <Form
            item={selectedItem}
            updateNode={handleUpdateNode}
            activeNewChild={activeNewChild}
            submitNewchild={submitNewchild}
          />
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
