// @ts-nocheck
import React from "react";
import {
  ContextMenuTrigger,
  ContextMenu,
  ContextMenuItem,
} from "rctx-contextmenu";

export function ContextMenuTriggerEx({ id, title, selectNodeHanler }) {
  return (
    <ContextMenuTrigger id={id}>
      <div onClick={() => selectNodeHanler()}>{title}</div>
    </ContextMenuTrigger>
  );
}

export function ContextMenuEx({ id, children }) {
  return <ContextMenu id={id}>{children}</ContextMenu>;
}

export function ContextMenuItemEx({ title, handleClick }) {
  return <ContextMenuItem onClick={handleClick}>{title}</ContextMenuItem>;
}
