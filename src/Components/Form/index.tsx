import { Input, Tabs } from "antd";
import React from "react";
import ErrorBoundry from "../../ErrorBoundry";
import ActionBar from "../ActionBar";
import ArrowDownIcon from "../SvgIcons/arrow-down";
import ArrowUpIcon from "../SvgIcons/arrow-up";
import Accesses from "./accesses";
import BasicInformation from "./basic-information";
import UsersList from "./user-autocomplete";
import "./index.css";
import Table from "./table";

interface Props {
  item: any;
  updateNode: (key: string, data: any) => void;
}

function Form({ item, updateNode }: Props) {
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
              {item && <Table />}
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
