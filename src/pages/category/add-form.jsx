/*
* 添加分类modal框
**/

import React, {useEffect} from 'react';
import {Form, Select, Input} from "antd";


const Item = Form.Item

const Option = Select.Option

const AddForm = (props) => {

  const [form] = Form.useForm()

  const {categorys, parentId, setForm} = props

  useEffect(() => {
    form.resetFields()  // 重置表单
    setForm(form)
  }, [form, categorys, parentId, setForm])


  return (

      <Form
          form={form}
      >
        <span>所属分类:</span>
        <Item
            name='parentId'
            initialValue={parentId}
        >
          <Select
              style={{marginTop: '5px'}}
          >
            <Option value={'0'}>一级分类</Option>
            {categorys.map(item => <Option value={item._id} key={item._id}>{item.name}</Option>)}
          </Select>
        </Item>
        <span>分类名称:</span>
        <Item
            name='addCategoryName'
            initialValue={''}
            rules={[
              {
                required: true,
                message: 'Please input your categoryName!',
              },
            ]}
        >
          <Input placeholder='请输入分类名称' style={{marginTop: '5px'}}/>
        </Item>
      </Form>
  );
};

export default AddForm;