import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react'
import {Card, Table, message, Modal, Button} from "antd"
import LinkButton from "../../components/LinkButton/LinkButton"
import {formateDate} from "../../utils/dateUtils"
import {reqDeleteUser, reqUsers, reqAddOrUpdateUser} from "../../api"
import {PAGE_SIZE} from "../../utils/constants"
import UserForm from "./user-form";
import {ExclamationCircleFilled, UserAddOutlined, UserSwitchOutlined} from "@ant-design/icons";

const User = () => {

  const [messageApi, contextHolder] = message.useMessage()

  const [columns, setColumns] = useState([])  // Table的表头

  const [loading, setLoading] = useState(true)  // 存储表单的loading效果显示控制

  const [users, setUsers] = useState([])  // 用来存储所有的用户

  const [roles, setRoles] = useState([])  // 用来存储所有的角色

  const [roleNames, setRoleNames] = useState({})  // 用来存储所有的角色名称{角色名id:角色名}

  const [totalU, setTotalU] = useState(0)  // 用来保存获取到的所有用户数量

  const [isShow, setIsShow] = useState(false)  // 用来保存是否显示界面

  const [form, setForm] = useState({})  // 用来存储收集的表单数据

  const [curUser, setCurUser] = useState({})  // 用来存储当前选中的用户

  const title = <Button type={"primary"} onClick={() => addShow()}>添加用户</Button>  // Table的title

  const showTotal = (totalC) => `Total ${totalC} items`  // Table的pagination选项,显示所有条数目


  /*
  * 根据roles数组,生成包含所有角色名的对象(属性名用角色id值)
  * */
  const initRoleNames = (roles) => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name
      return pre
    }, {})
    setRoleNames(roleNames)
  }

  // 显示添加用户界面
  const addShow = () => {
    setCurUser(null)
    setIsShow(true)
  }

  // 显示更新用户界面
  const updateShow = (user) => {
    setCurUser(user)
    setIsShow(true)
  }

  // 关闭界面
  const handleCancel = () => {
    form.resetFields()
    setIsShow(false)
  }


  // 获取所有用户列表
  const getUsers = useCallback(async () => {
        const result = await reqUsers()
        if (result.status === 0) {
          setLoading(false)
          const {users, roles} = result.data
          setUsers(users)
          setTotalU(users.length)
          setRoles(roles)
          initRoleNames(roles)
        } else {
          messageApi.open({
            type: 'error',
            content: '获取用户列表失败!'
          })
        }
      }, [messageApi]
  )


  // 删除发送删除用户的请求
  const deleteUser = useCallback((user) => {
        // console.log(user)
        Modal.confirm({
          title: `确认删除用户${user.username}吗?`,
          icon: <ExclamationCircleFilled/>,
          onOk: async () => {
            const result = await reqDeleteUser(user._id)
            if (result.status === 0) {
              messageApi.open({
                type: 'success',
                content: `用户${user.username}删除成功!`
              })
              getUsers()
            } else {
              messageApi.open({
                type: 'error',
                content: '删除失败!'
              })
            }
          }
        })
      }, [getUsers, messageApi]
  )

  // 添加/更新用户
  const addOrUpdateUser = async () => {
    //1 获取收集的form信息
    const formUser = form.getFieldsValue()
    form.resetFields()
    console.log('formUser:',formUser)
    // 如果是更新,需要给user指定_id属性
    if (curUser && curUser._id) {
      formUser._id = curUser._id
    }
    // 2. 发送更新请求
    const result = await reqAddOrUpdateUser(formUser)
    if (result.status === 0) {  // 请求成功
      // 反馈成功信息
      messageApi.open({
        type: 'success',
        content: (curUser && curUser._id)?`用户${formUser.username}信息更新成功!`:`用户${formUser.username}信息添加成功!`
      })
      // 3.刷新界面显示
      getUsers()
      setIsShow(false)
    } else {
      messageApi.open({
        type: 'error',
        content: '更新用户信息失败!'
      })
      setIsShow(false)
    }
  }

  // 初始化Table表头
  const initColumns = useCallback(() => {
        setColumns([
          {
            title: '用户名',
            dataIndex: 'username',
            // align:'center'
          },
          {
            title: '电话号码',
            dataIndex: 'phone',
            // align:'center'
          },
          {
            title: '邮箱',
            dataIndex: 'email',
            // align:'center'
          },
          {
            title: '创建时间',
            dataIndex: 'create_time',
            // align:'center',
            render: formateDate
          },
          {
            title: '角色',
            dataIndex: 'role_id',
            // align:'center',
            render: (role_id) => roleNames[role_id]
          },
          {
            title: '操作',
            // align:'center',
            render: (user) => (
                <span>
              <LinkButton onClick={() => updateShow(user)}>更新</LinkButton>
              <LinkButton onClick={() => deleteUser(user)}>删除</LinkButton>
            </span>
            )
          }
        ])
      }, [roleNames, deleteUser]
  )


  // componentWillMount
  useEffect(() => {
    initColumns()
  }, [roles, initColumns])


  // componentDidMount
  useLayoutEffect(() => {
    getUsers()
  }, [getUsers])


  return (
      <Card title={title}>
        {contextHolder}
        <Table
            bordered
            columns={columns}
            dataSource={users}
            loading={loading}
            rowKey='_id'
            pagination={{pageSize: PAGE_SIZE, showQuickJumper: true, showTotal: showTotal, total: totalU}}
        />
        <Modal
            title={
              curUser ?
                  <span style={{fontSize: 20}}><UserSwitchOutlined style={{marginRight: 8}}/>更新用户</span> :
                  <span style={{fontSize: 20}}><UserAddOutlined style={{marginRight: 8}}/>添加用户</span>
            }
            open={isShow}
            onOk={addOrUpdateUser}
            onCancel={handleCancel}
        >
          <UserForm setForm={(form) => setForm(form)} roles={roles} curUser={curUser}/>
        </Modal>
      </Card>
  )
}

export default User