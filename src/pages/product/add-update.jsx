import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import {Card, Form, Input, Cascader, Button, InputNumber, message} from "antd"
import {ArrowLeftOutlined} from "@ant-design/icons"
import LinkButton from "../../components/LinkButton/LinkButton"
import {useLocation, useNavigate} from "react-router-dom"
import {reqAddOrUpdateProduct, reqCategorys} from '../../api'
import PicturesWall from "./pictures-wall"
import RichTextEditor from "./rich-text-editor"

/*
* Product的添加/更新子路由组件
* */

const {TextArea} = Input


const {Item} = Form


const ProductAddUpdate = () => {

  const location = useLocation()

  const navigate = useNavigate()

  // 创建用来保存ref标识的标签对象容器
  const pName = useRef()

  const editor = useRef()

  // 用来判断是添加操作还是修改操作
  const [isUpdate, setIsUpdate] = useState(Boolean(location.state))

  const [product, setProduct] = useState(isUpdate ? location.state : {})
  // console.log(product)

  // 用来接收级联分类ID的数组
  const [categoryIds, setCategoryIds] = useState([])

  // 级联选择的option选项数组
  const [options, setOptions] = useState([])

  const [form] = Form.useForm()

  const [messageApi, contextHolder] = message.useMessage()


  // 初始化options数组
  const initOptions = async (categorys) => {
    // 根据categorys生成options数组
    const newOptions = categorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false,  // 不是叶子
    }))
    const {pCategoryId} = product
    // 如果是二级分类商品需要更新
    if (isUpdate && pCategoryId !== '0') {
      // 获取对应的二级分类列表
      const subCategorys = await getCategorys(pCategoryId)
      // 生成二级下拉列表的options
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      // 找到当前商品对应的一级option对象
      const targetOption = newOptions.find(option => option.value === pCategoryId)
      // 关联对应的一级option上
      targetOption.children = childOptions
    }
    // 更新额options状态
    setOptions(newOptions)
  }

  // 异步获取一级/二级分类列表.并显示
  // async函数的返回值是一个新的Promise对象,promise的结果和值由async函数的结果来决定
  const getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId)  // {status:0,data:{[categorys]}}
    if (result.status === 0) {
      const categorys = result.data
      // 如果是一级分类列表
      if (parentId === '0') {
        await initOptions(categorys)
      } else {    // 二级列表
        return categorys   // 返回二级列表==> 当前async函数的promise进入成功且value为subCategorys
      }
    }
  }

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions)
  }
  // 用于加载下一级的列表的回调函数
  const loadData = async (selectedOptions) => {
    // 获取选中的option对象
    const targetOption = selectedOptions[0]
    // 显示loading效果
    targetOption.loading = true
    // 根据选中的分类请求获取下一级分类列表
    const subCategorys = await getCategorys(targetOption.value)
    // 隐藏loading效果
    targetOption.loading = false
    // 二级分类列表有数据
    if (subCategorys && subCategorys.length > 0) {
      // 生成一个二级列表的options
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      // 将生成的二级列表关联到当前option上
      targetOption.children = childOptions
    } else {  // 当前选中的分类没有二级分类
      targetOption.isLeaf = true
    }
    // 更新option的状态
    setOptions([...options])
  }

  // form 布局 栅格布局方式
  const formItemLayout = {
    labelCol: {span: 2},  // 指定左侧包裹的宽度
    wrapperCol: {span: 10},  // 指定右侧包裹的宽度
    // row:{justify:'center'}
  }

  const title = (
      <span>
        <LinkButton onClick={() => navigate(-1)}>
          <ArrowLeftOutlined style={{marginRight: 5, fontSize: 18}}/>
        </LinkButton>
        <span>{isUpdate ? '修改商品' : '添加商品'}</span>
      </span>
  )

  const validatePrice = (rule, value, callback) => {
    if (value > 0) {
      callback()  // 验证通过
    } else {
      callback('价格必须大于0')  // 验证未通过
    }
  }

  // 表单验证成功提交表单
  const onFinish = async (values) => {
    // console.log(values)
    // 1.收集数据,并封装成product对象
    const {name, price, desc, categoryIds} = values
    let pCategoryId, categoryId
    if (categoryIds.length === 1) {  // 一级分类
      pCategoryId = '0'
      categoryId = categoryIds[0]
    } else {  // 二级分类
      pCategoryId = categoryIds[0]
      categoryId = categoryIds[1]
    }
    const imgs = pName.current.getImgs()
    const detail = editor.current.getDetail()
    // console.log('imgs:',imgs,'detail:',detail)
    const reqProduct = {name, price, desc, imgs, detail,pCategoryId,categoryId}
    // 如果是更新,需要添加_id
    if (isUpdate) {
      reqProduct._id = product._id
    }
    // 2.调用接口请求函数去添加/更新
    const result = await reqAddOrUpdateProduct(reqProduct)
    // 3.根据结果提示
    if(result.status===0){
      messageApi.open({
        type: 'success',
        content: `${isUpdate?'更新':'添加'}商品成功!`,
      })
      setTimeout(()=>{
        navigate(-1)
      },1500)
    }else {
      messageApi.open({
        type: 'error',
        content: `${isUpdate?'更新':'添加'}商品失败!`,
      })
    }
  }

  // 表单验证失败时的回调函数
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo)
    messageApi.open({
      type: 'error',
      content: `提交失败!`,
    })
  }


  // 代替componentsWillMount
  useEffect(() => {
    if (isUpdate) { // 如果是添加商品则product是没有值的,修改商品则product是有值的
      const {pCategoryId, categoryId} = product
      console.log(pCategoryId, categoryId)
      if (pCategoryId === '0') {
        // categoryIds.push(categoryId)
        setCategoryIds(prevState => [...prevState,categoryId])
      } else {
        // categoryIds.push(pCategoryId)
        // categoryIds.push(categoryId)
        setCategoryIds(prevState => [...prevState,pCategoryId,categoryId])
      }
    }
  }, [isUpdate,product])

  // 代替componentsDidMount
  useLayoutEffect(() => {
    getCategorys('0')
  },[])


  return (
      <Card
          title={title}
          style={{height: '100%'}}
      >
        {contextHolder}
        <Form
            form={form}
            {...formItemLayout}
            labelAlign={"right"}   // label标签对齐方式
            style={{
              maxWidth: 1100,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
          <Item
              name='name'
              label='商品名称'
              initialValue={product.name}
              rules={[
                {
                  required: true,
                  message: '商品名称不能为空'
                }
              ]}
          >
            <Input placeholder={'请输入商品名称'}/>
          </Item>
          <Item
              name='desc'
              label='商品描述'
              initialValue={product.desc}
              rules={[
                {
                  required: true,
                  message: '商品描述不能为空'
                }
              ]}
          >
            <TextArea
                showCount
                maxLength={100}
                autosize={{mixRows: 3, maxRows: 6}}
                placeholder="请输入商品描述"
            />
          </Item>
          <Item
              name='price'
              label='商品价格'
              initialValue={product.price}
              rules={[
                {
                  required: true,
                  type: "number",
                  message: '商品价格不能为空'
                },
                {
                  validator: validatePrice
                }
              ]}

          >
            <InputNumber prefix="￥" style={{width: '100%'}} addonAfter={'元'}/>
          </Item>
          <Item
              name='categoryIds'
              label='商品分类'
              initialValue={categoryIds}
              rules={[
                {
                  required: true,
                  message: '商品分类不能为空'
                }
              ]}
          >
            <Cascader
                options={options}
                loadData={loadData}
                onChange={onChange}
                changeOnSelect
                placeholder={'请选择分类'}
            />
          </Item>
          <Item
              label='商品图片'
          >
            <PicturesWall ref={pName} imgs={product.imgs}/> {/*使用ref标识子组件*/}
          </Item>
          <Item
              label='商品详情'
              labelCol={{span: 2}}
              wrapperCol={{span: 14}}
          >
            <RichTextEditor ref={editor} detail={product.detail}/>
          </Item>
          <Item style={{marginLeft: 22}}>
            <Button type={"primary"} htmlType={"submit"}>提交</Button>
          </Item>
        </Form>
      </Card>
  )
}

export default ProductAddUpdate


/*
* 1.在子组件中调用父组件的方法:将父组件中的方法以函数的属性的形式传递给子组件,子组件就可以调用
* 2.在父组件中调用子组件的方法:在父组件中通过ref得到子组件标签对象(组件对象),调用其方法
*     在父组件中创建一个ref容器const childRef=useRef(),然后传递给<childComponents ref={childRef} />
*     在子组件中使用forwardRef(ChildComponents)包裹子组件, 然后子组件中传递props,ref
*        const ChildComponents=(props,ref)=>{
*          const getImgs=()=>{
*             xxxxxx
*          }
*          // 子组件中调用useImperativeHandle()
*          useImperativeHandle(ref, () => ({
*            // 填入需要使用ref传递给父组件使用的方法
*            getImgs,
*          }))
*         }
*      在父组件中调用childRef.current.getImgs()就可以得到子组件中方法
* */

