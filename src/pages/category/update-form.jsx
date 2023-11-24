/*
* 添加分类modal框
* */

import React, {useEffect} from 'react';
import {Form, Input} from 'antd'

const Item = Form.Item

const UpdateForm = (props) => {
  const [form] = Form.useForm()

  const {categoryName,setForm}=props



  useEffect(() => {
    form.resetFields(['categoryName'])
    setForm(form)
  }, [form,categoryName,setForm])

  return (
      <Form
          form={form}
      >
        <Item
            name='categoryName'
            initialValue={categoryName}
            rules={[
              {
                required: true,
                message: 'Please input your categoryName!',
              },
            ]}
        >
          <Input
              placeholder='请输入分类名称'
          />
        </Item>
      </Form>
  );
};

export default UpdateForm;