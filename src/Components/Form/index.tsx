import { Input, Tabs } from "antd";
import React, { useState } from "react";
import ErrorBoundry from "../../ErrorBoundry";
import ActionBar from "../ActionBar";
import ArrowDownIcon from "../SvgIcons/arrow-down";
import ArrowUpIcon from "../SvgIcons/arrow-up";
import Accesses from "./accesses";
import BasicInformation from "./basic-information";
import UsersList from "./user-autocomplete";
import "./index.css";
import Table from "./table";
import { NodeType, TableItemType } from "../../types";
import { tableMockData } from "./tableMockData";

interface Props {
  item: any;
  updateNode: (key: string, data: any) => void;
  activeNewChild: NodeType | null;
  submitNewchild: (info: any) => void;
}

function Form({ item, updateNode, activeNewChild, submitNewchild }: Props) {
  const [tableData, setTableData] = useState<TableItemType[]>(tableMockData);
  const [newChildInfo, setNewChildInfo] = useState({
    title: "",
    key: "",
    users: [],
    children: [],
    accesses: [],
  });
  const handleSave = () => {
    // updateNode("key", {});
    let newObj = { ...newChildInfo, users: tableData };
    console.log("++++++++ handleSave ++++++++");
    console.log(newObj);
    submitNewchild(newObj);
  };

  return (
    <div className="detail">
      <div className="detail-container">
        <Tabs>
          <Tabs.TabPane tab="اطلاعات اصلی" key="item-1">
            <div
              className={`form-content ${
                activeNewChild ? "form-content-active" : ""
              }`}
            >
              <BasicInformation
                initialValue={item}
                setNewChildInfo={setNewChildInfo}
                newChildInfo={newChildInfo}
              />
              {activeNewChild && (
                <Table data={tableData} setTableData={setTableData} />
              )}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="دسترسی ها" key="item-2">
            <div className="form-content">
              <ErrorBoundry>
                <Accesses
                  initialValue={item}
                  setNewChildInfo={setNewChildInfo}
                  newChildInfo={newChildInfo}
                />
              </ErrorBoundry>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
      {activeNewChild && (
        <ActionBar actions={[{ title: "ذخیره", handler: handleSave }]} />
      )}
    </div>
  );
}
export default Form;
