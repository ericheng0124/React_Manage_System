/*
* 添加分类modal框
**/

import React, {forwardRef, memo, useEffect, useImperativeHandle, useState} from 'react'
import {Form, Input, Tree} from "antd"
import nodeList from "../../config/nodeList"

const Item = Form.Item


const AuthForm = memo(forwardRef((props, ref) => {
          const {menus} = props.role

          const [form] = Form.useForm()

          const [checkedKeys, setCheckedKeys] = useState([])


          // console.log(nodeList)


          // form 布局 栅格布局方式
          const formItemLayout = {
            labelCol: {span: 4},  // 指定左侧包裹的宽度
            wrapperCol: {span: 16},  // 指定右侧包裹的宽度
          }

          // 选中某个node时的回调
          const onCheck = (checkedKeys) => {
            console.log('onCheck_checkedKeys:', checkedKeys)
            setCheckedKeys(checkedKeys)
          }

          // 为父组件提供获取最新menus数据的方法
          const getMenus = () => checkedKeys

          useImperativeHandle(ref, () => ({
            getMenus,
          }))

          useEffect(() => {
            setCheckedKeys(menus)
          }, [props, menus])

          return (
              <div>
                <Form
                    form={form}
                    style={{maxWidth: 600}}
                    labelAlign={'right'}
                    {...formItemLayout}
                >
                  <Item
                      label={'角色名称'}
                      style={{margin: '30px auto'}}
                  >
                    <Input style={{width: 350}} value={props.role.name} disabled/>
                  </Item>
                </Form>

                <Tree
                    checkable
                    defaultExpandAll={true}
                    treeData={[{title: '平台权限', key: 'all', children: nodeList}]}
                    checkedKeys={checkedKeys}
                    onCheck={onCheck}
                />
              </div>

          )
        }
    )
)


export default AuthForm