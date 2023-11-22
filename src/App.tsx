import { useEffect, useContext, useState, useMemo } from "react";
import AppContext from "./appContext";
import Form from "./Components/Form";
import Sidebar from "./Components/Sidebar";
import ExtendedTree from "./Components/Tree";
import { getNodes } from "./transportLayer";
import { NodeType } from "./types";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEdit, setShowEdit] = useState(true);
  const [treeData, setTreeData] = useState([]);

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
          <ExtendedTree handleContextMenuClick={handleContextMenuClick} />
        </Sidebar>
        {showEdit && <Form item={selectedItem} updateNode={handleUpdateNode} />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
