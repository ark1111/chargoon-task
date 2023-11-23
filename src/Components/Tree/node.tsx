import React from "react";
import { NodeType } from "../../types";
import {
  ContextMenuTriggerEx,
  ContextMenuItemEx,
  ContextMenuEx,
} from "../ContextMenu";

interface Props {
  node: NodeType;
  handleContextMenuClick: (key: string, node: NodeType) => void;
  setSelectedItem: (node: NodeType) => void;
}

function Node({ node, handleContextMenuClick, setSelectedItem }: Props) {
  const selectNodeHanler = () => {
    setSelectedItem(node);
  };
  return (
    <div>
      {/* NOTICE: id must be unique between EVERY <ContextMenuTrigger> and <ContextMenu> pair */}
      {/* NOTICE: inside the pair, <ContextMenuTrigger> and <ContextMenu> must have the same id */}
      <ContextMenuTriggerEx
        id={node.key}
        title={node.title}
        selectNodeHanler={selectNodeHanler}
      />

      <ContextMenuEx id={node.key}>
        <ContextMenuItemEx
          handleClick={() => handleContextMenuClick("newChild", node)}
          title={"افزودن زیرشاخه"}
        />
        <ContextMenuItemEx
          handleClick={() => handleContextMenuClick("cut", node)}
          title={"برش"}
        />
        <ContextMenuItemEx
          handleClick={() => handleContextMenuClick("paste", node)}
          title={"چسباندن"}
        />
        <ContextMenuItemEx
          handleClick={() => handleContextMenuClick("delete", node)}
          title={"حذف"}
        />
      </ContextMenuEx>
    </div>
  );
}
export default Node;
