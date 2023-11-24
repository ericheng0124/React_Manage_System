import React, {useEffect} from 'react'
import {Form, Input, Select} from "antd"

const Item = Form.Item
const Option = Select.Option


const UserForm = (props) => {

  const [form] = Form.useForm()

  const {setForm, roles} = props

  const user = props.curUser || {}

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
            label={'用户名'}
            name='username'
            initialValue={user.username}
            rules={[
              {
                required: true,
                whitespace: true,
                message: '请输入用户名'
              },
              {
                min: 4,
                message: '用户名至少输入4位字符'
              },
              {
                max: 12,
                message: '用户最大长度为12位字符'
              },
              {
                pattern: /^[a-zA-Z0-9_]+$/,  // pattern属性用来识别正则匹配
                message: '用户名只能由英文,数字或下划线组成'
              }
            ]}
        >
          <Input placeholder={'请输入用户名'}/>
        </Item>
        {user._id ? null : <Item
            label={'密码'}
            name='password'
            initialValue={user.password}
            rules={[
              {
                required: true,
                message: '请输入密码!'
              },
              {
                min: 4,
                message: '用户名至少输入4位字符'
              },
              {
                max: 12,
                message: '用户最大长度为12位字符'
              },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: '密码只能由英文,数字或下划线组成!'
              }
            ]}
        >
          <Input type='password' placeholder={'请输入密码!'}/>
        </Item>}

        <Item
            label={'角色'}
            name='role_id'
            initialValue={user.role_id}
            rules={[
              {
                required: true,
                message: '请选择用户角色'
              }
            ]}
        >
          <Select placeholder={'请选择用户角色'}>
            {roles.map((role) => (<Option value={role._id} key={role._id}>{role.name}</Option>))}
          </Select>
        </Item>
        <Item
            label={'手机号'}
            name='phone'
            initialValue={user.phone}
            rules={[
              {
                required: true,
                whitespace: true,
                message: '请输入手机号'
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '请输入有效的手机号'
              }
            ]}
        >
          <Input placeholder={'请输入手机号'}/>
        </Item>
        <Item
            label={'电子邮箱'}
            name='email'
            initialValue={user.email}
            rules={[
              {
                required: true,
                whitespace: true,
                message: '请输入电子邮箱'
              },
              {
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: '请输入有效的电子邮箱'
              }
            ]}
        >
          <Input placeholder={'请输入电子邮箱'}/>
        </Item>
      </Form>
  )
}

export default UserForm