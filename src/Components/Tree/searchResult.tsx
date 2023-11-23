import "./searchResult.css";
import { NodePosInfoType, NodeType } from "../../types";
import OrgchartIcon from "../SvgIcons/orgchart";
import ArrowDownIcon from "../SvgIcons/arrow-down";
import ArrowUpIcon from "../SvgIcons/arrow-up";
import { Popover } from "antd";
import { useState, useContext } from "react";
import AppContext from "../../appContext";
interface Props {
  items: NodeType[];
  searchResultVisible: boolean;
  setSearchResultVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchResult({
  items,
  searchResultVisible,
  setSearchResultVisible,
}: Props) {
  const [activeNodePosKey, setActiveNodePosKey] = useState<string | null>(null);
  const [nodePosInfo, setNodePosInfo] = useState<NodePosInfoType>(null);
  const { treeData } = useContext(AppContext);

  const findNodePos = (
    list: NodeType[],
    hierarchy: string[],
    hierarchyIndex: number
  ): NodePosInfoType => {
    let newHierarchyIndex = hierarchyIndex + 1;
    if (hierarchy.length > 0) {
      for (let i = 0; i < list.length; i++) {
        if (
          hierarchyIndex < hierarchy.length &&
          list[i].key === hierarchy[hierarchyIndex]
        ) {
          let child = findNodePos(
            list[i].children,
            hierarchy,
            newHierarchyIndex
          );
          let newObj = { title: list[i].title, child };
          return newObj;
        }
      }
    } else {
      return { title: list[0].title, child: null };
    }
  };

  const handleOpenChange = (key: string, hierarchy: string[]) => {
    setActiveNodePosKey(key);
    let nodePos = findNodePos(treeData, hierarchy, 0);
    setNodePosInfo(nodePos);
  };

  const hidePopover = () => {
    setActiveNodePosKey(null);
  };
  return (
    <div className="search-result">
      <div
        className="search-result-trigger-button"
        onClick={() => setSearchResultVisible((oldValue) => !oldValue)}
      >
        {searchResultVisible ? <ArrowDownIcon /> : <ArrowUpIcon />}
      </div>
      {searchResultVisible && (
        <div className="search-result-box">
          {items.map((item) => (
            <div className="search-result-item">
              <div>{item.title}</div>
              {activeNodePosKey === item.key && (
                <div
                  className="search-result-popover-back-surface"
                  onClick={hidePopover}
                ></div>
              )}
              <Popover
                content={<NodePosInfoItem info={nodePosInfo} />}
                trigger="click"
                open={activeNodePosKey === item.key}
                placement="left"
                onOpenChange={() => handleOpenChange(item.key, item.hierarchy)}
                style={{ zIndex: "101", position: "relative" }}
              >
                <div className="search-result-item-icon">
                  <OrgchartIcon />
                </div>
              </Popover>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default SearchResult;

const NodePosInfoItem = ({ info }: { info: NodePosInfoType }) => {
  return (
    <div className="node-pos-info-item">
      <div className="node-pos-info-item-title">{info.title}</div>
      {info.child && (
        <div className="node-pos-info-item-child">
          <NodePosInfoItem info={info.child} />
        </div>
      )}
    </div>
  );
};
