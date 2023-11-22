import { useState } from "react";
import "./table.css";
import { tableMockData } from "./tableMockData";
import { Popover } from "antd";
import { TableItemType } from "../../types";
type Props = {};

const headers = [
  {
    id: 1,
    title: "عملیات",
    width: "20%",
  },
  {
    id: 2,
    title: "پیش فرض",
    width: "25%",
  },
  {
    id: 3,
    title: "کد",
    width: "55%",
  },
];

const Table = (props: Props) => {
  const [data, setData] = useState<TableItemType[]>(tableMockData);
  const [openIndex, setOpenIndex] = useState(null);

  const handleOpenChange = (index: number) => {
    setOpenIndex(index);
  };

  const changeDefaultHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let newList = [...data];
    for (let i = 0; i < newList.length; i++) {
      if (i === index) {
        newList[i].isDefault = e.target.checked;
      } else if (newList[i].isDefault) {
        newList[i].isDefault = false;
      }
    }
    setData(newList);
  };

  const deleteTableItem = (id: number) => {
    let newlist = [...data];
    newlist = newlist.filter((item) => item.id !== id);
    setData(newlist);
    setOpenIndex(null);
  };

  return (
    <div className="table">
      <div className="table-header">
        {headers.map((item) => (
          <div className="table-header-item" style={{ width: item.width }}>
            {item.title}
          </div>
        ))}
      </div>
      <div className="table-body">
        {data?.map((item, index) => (
          <div key={item.code} className="table-body-item">
            <div className="table-body-action">
              {index === openIndex ? (
                <div
                  className="table-body-action-back-surface"
                  onClick={() => setOpenIndex(null)}
                ></div>
              ) : null}
              <Popover
                content={
                  <div
                    className="table-body-action-delete"
                    onClick={() => deleteTableItem(item.id)}
                  >
                    حذف
                  </div>
                }
                trigger="click"
                open={index === openIndex}
                onOpenChange={() => handleOpenChange(index)}
                style={{ zIndex: "101" }}
              >
                <img
                  src="./icons/more.png"
                  alt="more-icon"
                  className="table-body-action-icon"
                />
              </Popover>
            </div>
            <div className="table-body-default">
              <input
                type="checkbox"
                name="table-body-default-checkbox"
                checked={item.isDefault}
                onChange={(e) => changeDefaultHandler(e, index)}
              />
            </div>
            <div className="table-body-code">{item.code}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
