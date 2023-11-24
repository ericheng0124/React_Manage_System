/*
* 分类管理界面路由
* */


import React, {useLayoutEffect, useState} from 'react';
import {Card, Button, Table, message, Modal} from "antd";
import {ArrowRightOutlined, PlusOutlined} from '@ant-design/icons'
import LinkButton from "../../components/LinkButton/LinkButton";
import {reqAddCategory, reqCategorys, reqUpdateCategory} from "../../api";
import AddForm from './add-form'
import UpdateForm from "./update-form";



const Category = () => {

  const [categorys, setCategorys] = useState([])  // 分类信息

  const [subCategorys, setSubCategorys] = useState([])  // 子分类

  const [category, setCategory] = useState({})  // 当前分类

  const [parentId, setParentId] = useState('0')  // 父分类ID

  const [totalC, setTotalC] = useState(0)  // 控制表格项目数

  const [loading, setLoading] = useState(false)  // 控制是否显示加载画面

  const [showStatus, setShowStatus] = useState(0)  // 0表示都不显示,1代表显示添加,2代表显示更新

  const [form, setForm] = useState({})  // 获取表单数据用的


  // Card的左侧
  const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={() => showCategory()}>一级分类列表</LinkButton>
        <ArrowRightOutlined style={{marginRight: '5px'}}/>
        <span style={{fontSize: 14}}>{category.name}</span>
      </span>
  )

  // Card的右侧
  const extra = (
      <Button type={"primary"} onClick={() => showAdd()}>
        <PlusOutlined/>
        添加
      </Button>
  )

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      width: 300,
      render: (category) => (
          <span>
            <LinkButton onClick={() => showUpdate(category)}>修改分类</LinkButton>
            {parentId === '0' ? <LinkButton onClick={() => showSubCategory(category)}>查看子分类</LinkButton> : null}
          </span>
      )
    }
  ]


  /*
  * 异步获取一级/二级分类列表
  * */
  const getCategorys = async () => {
    setLoading(true)
    const result = await reqCategorys(parentId)
    setLoading(false)
    if (result.status === 0) {
      const categorys = result.data
      if (parentId === '0') {
        setCategorys(categorys)
      } else {
        setSubCategorys(categorys)
      }
      setTotalC(categorys.length)
    } else {
      setLoading(true)
      message.error('获取分类列表失败!')
    }
  }

  // 显示一级分类信息
  const showCategory = () => {
    setParentId('0')
    getCategorys()
  }

  // 获取二级列表
  const showSubCategory = (category) => {
    setCategory(category)
    setParentId(category._id)
    getCategorys()
  }


  // 获取分类条目总数
  const showTotal = (totalC) => `Total ${totalC} items`


  // modal框取消按钮
  const handleCancel = () => {
    // 清除输入的数据
    form.resetFields()
    // 隐藏modal
    setShowStatus(0)
  }


  // 显示添加确认框
  const showAdd = () => {
    setShowStatus(1)
  }

  // 显示更新确认框
  const showUpdate = (category) => {
    setCategory(category)
    setShowStatus(2)
  }


  // 添加分类
  const addCategory = async () => {
    // console.log('addCategory()');
    const {parentId, categoryName} = form.getFieldsValue()
    if (categoryName !== null && categoryName !== "") {
      setShowStatus(0)
      const addParentId = parentId
      // 清除数据
      form.resetFields()
      const result = await reqAddCategory(addParentId, categoryName)
      if (result.status === 0) {
        // 添加的分类就是当前分类
        if (addParentId === parentId) {
          getCategorys()
          // 在二级列表下添加一级分类,重新获取一级分类列表,但不显示一级列表
        } else if (parentId === '0') {
          getCategorys('0')
        }
      }
    }

  }


  // 更新分类
  const updateCategory = async () => {
    const categoryId = category._id
    const categoryName = form.getFieldValue('categoryName')
    if (categoryName !== null && categoryName !== "") {
      setShowStatus(0)
      // 清除输入的数据
      form.resetFields()
      const result = await reqUpdateCategory({categoryId, categoryName})
      if (result.status === 0) {
        getCategorys()
      }
    }
  }


  useLayoutEffect(() => {
    getCategorys()
  }, [parentId, category, form])


  return (
      <Card
          title={title}
          extra={extra}
          style={{height: '100%'}}
      >
        <Table
            bordered
            dataSource={parentId === '0' ? categorys : subCategorys}
            columns={columns}
            rowKey='_id'
            size='small'
            pagination={{pageSize: 10, showQuickJumper: true, showTotal: showTotal, total: totalC}}
            loading={loading}
        />
        <Modal title="添加分类" open={showStatus === 1} onOk={addCategory} onCancel={handleCancel}>
          {<AddForm
              categorys={categorys}
              parentId={parentId}
              setForm={(form) => setForm(form)}
          />}
        </Modal>
        <Modal title="修改分类" open={showStatus === 2} onOk={updateCategory} onCancel={handleCancel}>
          {<UpdateForm
              categoryName={category.name}
              setForm={(form) => setForm(form)}
          />}
        </Modal>
      </Card>
  );
};

export default Category;