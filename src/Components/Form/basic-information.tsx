import { Form, Input } from "antd";
import React, { useEffect } from "react";
import UserAutoComplete from "./user-autocomplete";
import { TableItemType } from "../../types";
import { FormInstance } from "antd/es/form/Form";

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

function BasicInformation({
  initialValue,
  setNewChildInfo,
  newChildInfo,
}: Props) {
  const [form] = Form.useForm();
  console.log("BasicInformation");

  const titleValue = Form.useWatch("title", form);
  const codeValue = Form.useWatch("code", form);

  useEffect(() => {
    if (initialValue) {
      form.setFieldsValue({
        title: initialValue.title,
        code: initialValue.key,
      });
    } else {
      form.setFieldsValue({
        title: "",
        code: "",
      });
    }
  }, [initialValue]);

  useEffect(() => {
    console.log({ titleValue, codeValue });
    setNewChildInfo({ ...newChildInfo, title: titleValue, key: codeValue });
  }, [titleValue, codeValue]);

  return (
    <Form form={form} disabled={initialValue ? true : false}>
      <Form.Item name="title" label="عنوان" labelCol={{ span: 2 }}>
        <Input />
      </Form.Item>
      <Form.Item name="code" label="کد" labelCol={{ span: 2 }}>
        <Input />
      </Form.Item>
      <Form.Item name="users" label="کاربران" labelCol={{ span: 2 }}>
        <UserAutoComplete />
      </Form.Item>
    </Form>
  );
}
export default BasicInformation;
