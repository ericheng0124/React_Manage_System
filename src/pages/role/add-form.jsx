/*
* 添加角色的form组件
**/

import React, {useEffect} from 'react';
import {Form, Input} from "antd";


const Item = Form.Item


const AddForm = (props) => {

  const [form] = Form.useForm()

  const {setForm} = props

  // form 布局 栅格布局方式
  const formItemLayout = {
    labelCol: {span: 4},  // 指定左侧包裹的宽度
    wrapperCol: {span: 16},  // 指定右侧包裹的宽度
  }


  useEffect(() => {
    setForm(form)  // 将表单数据传递给父组件
    form.resetFields()  // 重置表单
  }, [form, setForm])


  return (
      <Form
          form={form}
          style={{maxWidth: 600}}
          labelAlign={'right'}
          {...formItemLayout}
      >
        <Item
            label={'角色名称'}
            style={{margin: '30px auto'}}
            name='roleName'
            initialValue={''}
            rules={[
              {
                required: true,
                message: '请输入角色名称!',
              },
            ]}
        >
          <Input placeholder='请输入角色名称' style={{width: 350}}/>
        </Item>
      </Form>
  )
}

export default AddForm