import React, {useLayoutEffect, useState} from 'react';
import {Card, List} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import LinkButton from "../../components/LinkButton/LinkButton";
import {useLocation, useNavigate} from "react-router-dom";
import {BASE_IMG_URL} from "../../utils/constants";
import {reqCategory} from "../../api";


/*
* Product的详情页子路由组件
* */

const Item = List.Item


const ProductDetail = () => {

  const [cName1, setCname1] = useState('')

  const [cName2, setCname2] = useState('')

  const location = useLocation()

  const {name, desc, price, imgs, detail} = location.state.product
  // console.log(location.state.product)

  const navigate = useNavigate()

  const getCategoryName = async () => {
    const {pCategoryId, categoryId} = location.state.product
    if (pCategoryId === '0') { // 一级分类下的商品
      const result = await reqCategory(categoryId)
      setCname1(result.data.name)
    } else { // 二级分类下的商品
      /*
      // 通过多个await方式发多个请求:后面请求是在前面请求成功返回之后才发送
      const result1 =await reqCategory(pCategoryId)  // 获取一级分类列表
      const result2 =await reqCategory(categoryId)   // 获取二级分类列表
      setCname1(result1.data.name)
      setCname2(result2.data.name)
      */

      // 一次性发送多个请求,只有都成功了才正常处理
      const results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)])
      setCname1(results[0]["data"].name)
      setCname2(results[1]["data"].name)
    }
  }


  // useEffect(() => {
  //   // 得到当前商品分类ID
  //   getCategoryName()
  // }, [])
  useLayoutEffect(() => {
    // 得到当前商品分类ID
    getCategoryName()
  }, [])


  const title = (
      <span>
        <LinkButton>
          <ArrowLeftOutlined style={{marginRight: 5}} onClick={() => navigate(-1)}/>
        </LinkButton>
        <span>商品详情</span>
      </span>
  )
  return (
      <Card title={title} style={{height: '100%'}}>
        <List>
          <Item>
            <div>
              <span className='product-span-left'>商品名称:</span>
              <span className='product-span-right'>{name}</span>
            </div>
          </Item>
          <Item>
            <div>
              <span className='product-span-left'>商品描述:</span>
              <span className='product-span-right'>{desc}</span>
            </div>
          </Item>
          <Item>
            <div>
              <span className='product-span-left'>商品价格:</span>
              <span className='product-span-right'>{price} 元</span>
            </div>
          </Item>
          <Item>
            <div>
              <span className='product-span-left'>所属分类:</span>
              <span className='product-span-right'>{cName1}{cName2 ? '---> ' + cName2 : ''}</span>
            </div>
          </Item>
          <Item>
            <div>
              <span className='product-span-left'>商品图片:</span>
              <span>
                {imgs.map(img => (<img key={img} src={BASE_IMG_URL + img} alt="img" className='product-img'/>))}
              </span>
            </div>
          </Item>
          <Item>
            <div style={{display: 'flex'}}>
              <span className='product-span-left'>商品详情:</span>
              <span dangerouslySetInnerHTML={
                {__html: detail}
              }></span>
            </div>
          </Item>
        </List>
      </Card>
  );
};

export default ProductDetail;