import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import {Card, Button, Table, Modal, message} from 'antd'
import {PAGE_SIZE} from "../../utils/constants"
import {reqAddRole, reqRoles,reqUpdateRole} from "../../api"
import AddForm from "./add-form"
import AuthForm from "./auth-form"
import memoryUtils from "../../utils/memoryUtils";
import {formateDate} from "../../utils/dateUtils";
/*
* 角色路由页面
* */


const Role = () => {

  const [loading, setLoading] = useState(true)

  const [columns, setColumns] = useState([])

  const [roles, setRoles] = useState([])  // 所有的roles权限列表

  const [role, setRole] = useState({})  // 选中的role

  const [isShowAdd, setIsShowAdd] = useState(false)  // 是否显示添加角色界面

  const [isShowAuth,setIsShowAuth]=useState(false)  // 是否显示设置权限界面

  const [form, setForm] = useState({})

  const [messageApi, contextHolder] = message.useMessage()

  const auth = useRef()


  const title = (
      <span>
        <Button
            type={"primary"}
            style={{width: 110}}
            onClick={() => setIsShowAdd(true)}
        >
          创建角色
        </Button>
        <Button
            type={"primary"}
            style={{width: 110, marginLeft: 18, paddingInline: 6}}
            disabled={!role._id}
            onClick={()=>setIsShowAuth(true)}
        >
          设置角色权限
        </Button>
      </span>
  )

  // 获取所有的角色列表
  const getRoles = async () => {
    const result = await reqRoles()
    if (result.status === 0) {
      setRoles(result.data)
      setLoading(false)
    }
  }


  // 获取选中的行
  const onRow = (role) => {
    return {
      onClick: (event) => {  // 点击行
        // console.log(role)
        // alert('点击行')
        setRole(role)
      }
    }
  }

  // 初始化table的表头
  const initColumns = () => {
    setColumns([
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render:(create_time)=>formateDate(create_time)
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render:formateDate
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      }
    ])
  }

  // 添加角色
  const addRole =async () => {
    // 隐藏确认框
    setIsShowAdd(false)
    // 1. 收集输入数据
    const values = form.getFieldsValue()
    const {roleName}=values
    // 2.请求添加
    const result =await reqAddRole(roleName)
    // 根据结果提示/更新列表显示
    if(result.status===0){
      messageApi.open({
        type:'success',
        content:'添加角色成功!'
      })
      const role = result.data
      // 更新roles状态,基于原本状态数据更新
      setRoles(prevState => [...prevState,role])
      // 清除form表单数据
      form.resetFields()
    }else{
      messageApi.open({
        type:'error',
        content:'添加角色错误!'
      })
    }
  }

  // 更新角色
  const updateRole = async ()=>{
    // 得到最新的menus
    const newMenus = auth.current.getMenus()
    role.menus = newMenus
    // 获取当前时间
    role.auth_time = Date.now()
    // 获取登录的账户信息
    role.auth_name = memoryUtils.user.username
    // 请求更新
    const result = await reqUpdateRole(role)
    if(result.status===0){
      messageApi.open({
        type:'success',
        content:'更新角色成功!'
      })
      // getRoles()
      setRoles([...roles])
      // 隐藏modal
      setIsShowAuth(false)
    }else {
      messageApi.open({
        type:'error',
        content:'更新角色失败!'
      })
    }
  }


  // componentsWillMount
  useEffect(() => {
    initColumns()
    setLoading(true)
  }, [])

  // componentsDidMount
  useLayoutEffect(() => {
    getRoles()
  }, [])

  return (
        <Card
            title={title}
        >

          <Table
              bordered
              rowKey='_id'
              dataSource={roles}
              columns={columns}
              size='small'
              rowSelection={{type: "radio", selectedRowKeys: [role._id]}}
              onRow={onRow}
              pagination={{pageSize: PAGE_SIZE, showQuickJumper: true}}
              loading={loading}
          />
          <Modal
              title="添加角色"
              open={isShowAdd}
              onOk={addRole}
              onCancel={()=>{
                // 清除输入的数据
                form.resetFields()
                // 隐藏modal
                setIsShowAdd(false)
              }}
          >
            {contextHolder}
            {<AddForm
                setForm={(form) => setForm(form)}
            />}
          </Modal>
          <Modal
              title="设置角色权限"
              open={isShowAuth}
              onOk={updateRole}
              onCancel={()=>{
                // 隐藏modal
                setIsShowAuth(false)
              }}>
            {contextHolder}
            {<AuthForm role={role} ref={auth}/>}
          </Modal>
        </Card>
  )
}


export default Role