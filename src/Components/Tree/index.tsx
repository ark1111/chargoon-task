import { Input, Tree } from "antd";
import type { DataNode } from "antd/es/tree";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import AppContext from "../../appContext";
import { NodeType } from "../../types";
import Node from "./node";
import SearchResult from "./searchResult";

const { Search } = Input;

interface Props {
  handleContextMenuClick: (key: string, node: NodeType) => void;
  setSelectedItem: (node: NodeType) => void;
}

const TreeExtended: React.FC<Props> = ({
  handleContextMenuClick,
  setSelectedItem,
}) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const searchedKeyword = useRef();
  const [searchResultVisible, setSearchResultVisible] = useState(true);
  const { treeData } = useContext(AppContext);
  const [searchResult, setSearchResult] = useState([]);

  const onExpand = (newExpandedKeys: any[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const searchHandler = (list: NodeType[], query: string) => {
    let newList: NodeType[] = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].title.includes(query)) {
        newList.push(list[i]);
      }
      if (list[i].children.length > 0) {
        let otherResults = searchHandler(list[i].children, query);
        newList = [...newList, ...otherResults];
      }
    }
    return newList;
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let results = searchHandler(treeData, e.target.value);
    if (e.target.value !== "") {
      setSearchResult(results);
    } else {
      setSearchResult([]);
    }
  };

  const handlePressEnter = () => {
    setSearchResultVisible(true);
  };

  const titleRenderer = (node: NodeType) => {
    return (
      <Node
        node={node}
        handleContextMenuClick={handleContextMenuClick}
        setSelectedItem={setSelectedItem}
      />
    );
  };

  return (
    <div className="tree-wrap">
      <Search
        style={{ marginBottom: 8 }}
        placeholder="جستجو"
        onChange={handleSearchInputChange}
        onPressEnter={handlePressEnter}
      />
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
        titleRender={titleRenderer}
      />
      <SearchResult
        items={searchResult}
        searchResultVisible={searchResultVisible}
        setSearchResultVisible={setSearchResultVisible}
      />
    </div>
  );
};

export default TreeExtended;
