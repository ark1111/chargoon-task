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
  const [values, setValues] = useState([]);
  console.log("Accesses");
  console.log(options);

  const fetchAccessList = async () => {
    const result = await getAccessList();
    setOptions(result);
  };

  useEffect(() => {
    fetchAccessList();
  }, []);

  useEffect(() => {
    if (initialValue) {
      setValues([...initialValue]);
    } else {
      setValues([]);
    }
  }, [initialValue]);

  const handleOnChange = (checkedValues: CheckboxValueType[]) => {
    if (!initialValue) {
      setNewChildInfo({ ...newChildInfo, accesses: checkedValues });
      setValues(checkedValues);
    }
  };

  return (
    <Checkbox.Group
      options={options as any}
      onChange={handleOnChange}
      value={values}
    />
  );
}
export default Accesses;
