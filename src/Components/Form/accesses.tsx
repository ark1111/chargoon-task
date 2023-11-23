import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
import { getAccessList } from "../../transportLayer";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { TableItemType } from "../../types";

interface Props {
  initialValue?: any;
  setNewChildInfo: React.Dispatch<
    React.SetStateAction<{
      title: string;
      key: string;
      users: TableItemType[];
      children: any[];
      accesses: any[];
    }>
  >;
  newChildInfo: {
    title: string;
    key: string;
    users: TableItemType[];
    children: any[];
    accesses: any[];
  };
}

function Accesses({ initialValue, setNewChildInfo, newChildInfo }: Props) {
  const [options, setOptions] = useState([]);
  console.log("Accesses");
  console.log(options);

  const fetchAccessList = async () => {
    const result = await getAccessList();
    setOptions(result);
  };

  useEffect(() => {
    fetchAccessList();
  }, []);

  const handleOnChange = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
    setNewChildInfo({ ...newChildInfo, accesses: checkedValues });
  };

  return <Checkbox.Group options={options as any} onChange={handleOnChange} />;
}
export default Accesses;
