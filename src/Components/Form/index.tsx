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
import { TableItemType } from "../../types";
import { tableMockData } from "./tableMockData";

interface Props {
  item: any;
  updateNode: (key: string, data: any) => void;
}

function Form({ item, updateNode }: Props) {
  const [tableData, setTableData] = useState<TableItemType[]>(tableMockData);
  const handleSave = () => {
    // updateNode("key", {});
  };

  return (
    <div className="detail">
      <div className="detail-container">
        <Tabs>
          <Tabs.TabPane tab="اطلاعات اصلی" key="item-1">
            <div
              className={`form-content ${item ? "form-content-active" : ""}`}
            >
              <BasicInformation initialValue={item} />
              {item && <Table data={tableData} setTableData={setTableData}/>}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="دسترسی ها" key="item-2">
            <div className="form-content">
              <ErrorBoundry>
                <Accesses initialValue={item} />
              </ErrorBoundry>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
      {item && (
        <ActionBar actions={[{ title: "ذخیره", handler: handleSave }]} />
      )}
    </div>
  );
}
export default Form;
