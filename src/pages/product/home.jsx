import React, {useLayoutEffect, useState} from 'react';
import {Card, Select, Input, Button, Table, message} from 'antd'
import {PlusOutlined} from "@ant-design/icons";
import LinkButton from "../../components/LinkButton/LinkButton";
import {reqProducts, reqSearchProducts, reqUpdateStatus} from "../../api";
import {PAGE_SIZE} from "../../utils/constants";
import {useNavigate} from "react-router-dom";


/*
* Product默认子路由组件
* */

const Option = Select.Option

const ProductHome = () => {


  const [loading, setLoading] = useState(false)

  const [products, setProducts] = useState([])

  const [total, setTotal] = useState(0)

  const [searchName, setSearchName] = useState('')

  const [searchType, setSearchType] = useState('productName')

  const navigate = useNavigate()

  const [curPageNum, setCurPageNum] = useState(1)


  const title = (
      <span>
        <Select
            style={{width: 130}}
            defaultValue={searchType}
            onChange={value => setSearchType(value)
            }>
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input
            style={{width: 200, margin: '0 15px'}}
            placeholder={'关键字'}
            value={searchName}
            onChange={(event) => setSearchName(event.target.value)}
        />
        <Button type={"primary"} onClick={() => getProducts(1)}>搜索</Button>
      </span>
  )

  const extra = (
      <Button type={"primary"} onClick={() => navigate('product/add-update')}>
        <PlusOutlined/>
        添加商品
      </Button>
  )

  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name'
    },
    {
      title: '商品描述',
      dataIndex: 'desc'
    },
    {
      width: 90,
      align: 'center',
      title: '价格',
      dataIndex: 'price',
      render: (price) => '¥ ' + price
    },
    {
      width: 90,
      align: 'center',
      title: '状态',
      // dataIndex: 'status',
      render: (product) => {
        const {status, _id} = product
        // console.log(status,_id)
        const newStatus = (status === 1 ? 2 : 1)
        return (
            <span>
              <Button
                  type={"primary"}
                  onClick={() => updateStatus(_id, newStatus)}
              >
                {status === 1 ? '下架' : '上架'}
              </Button>
              <span>{status === 1 ? '在售' : '已下架'}</span>
            </span>
        )
      }
    },
    {
      width: 90,
      align: 'center',
      title: '操作',
      render: (product) => {
        return (
            <span>
              {/*通过react-router6路由传参,使用useNavigate()中的state传参方法,将点击的商品信息传递给子路由组件*/}
              <LinkButton onClick={() => navigate('product/detail', {state:{product}})}>详情</LinkButton>
              <LinkButton onClick={() => navigate('product/add-update', {state: product})}>修改</LinkButton>
            </span>
        )
      }
    }
  ]

  // 获取指定商品页码的列表数据显示
  const getProducts = async (pageNum) => {
    setCurPageNum(pageNum)  // 保存当前查看商品的页码
    // console.log('当前页码', curPageNum)
    setLoading(true)
    let result
    if (searchName) {
      // console.log('搜索商品请求触发')
      result = await reqSearchProducts({pageNum, pageSize: PAGE_SIZE, searchName, searchType})
    } else { // 一般请求
      // console.log('普通商品请求触发')
      result = await reqProducts(pageNum, PAGE_SIZE)
    }
    setLoading(false)
    // 取出分页数据,更新状态,显示分页数据
    if (result.status === 0) {
      // console.log(products);
      const {total, list} = result.data
      setTotal(total)
      setProducts(list)
    }
  }

  // 更新指定商品的状态
  const updateStatus = async (productId, status) => {
    const result = await reqUpdateStatus(productId, status)
    if (result === 0) {
      message.success('更新商品状态成功')
    }
    getProducts(curPageNum)
  }



  useLayoutEffect(()=>{
      getProducts(curPageNum)
    },[curPageNum])


  return (
      <Card
          title={title}
          extra={extra}

      >
        <Table
            loading={loading}
            bordered
            size='small'
            rowKey={'_id'}
            columns={columns}
            dataSource={products}
            pagination={
              {
                total,
                defaultPageSize: PAGE_SIZE,
                current: curPageNum,
                showQuickJumper: true,
                onChange: (pageNum) => getProducts(pageNum)
              }
            }
        />
      </Card>
  );
};

export default ProductHome;

