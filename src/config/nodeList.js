/*
*   menu菜单的items
*
* */
import {
  HomeOutlined,
  AppstoreOutlined,
  HddOutlined,
  ShoppingOutlined,
  UserOutlined,
  SafetyOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined
} from '@ant-design/icons';



const getItem = (title, label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    title,
    label,
    type,
  }
}


const items = [
  getItem('首页', '首页', '/home', <HomeOutlined/>,null,{isPublic:true}),
  getItem('产品管理', '产品管理', '/products', <AppstoreOutlined/>, [
    getItem('品类管理', '品类管理', '/products/category', <HddOutlined/>),
    getItem('商品管理', '商品管理', '/products/product', <ShoppingOutlined/>),
  ]),
  getItem('用户管理', '用户管理', '/user', <UserOutlined/>),
  getItem('权限管理', '权限管理', '/role', <SafetyOutlined/>),
  getItem('图形图标', '图形图标', '/charts', <AreaChartOutlined/>, [
    getItem('柱状图', '柱状图', '/charts/bar', <BarChartOutlined/>),
    getItem('折线图', '折线图', '/charts/line', <LineChartOutlined/>),
    getItem('饼图', '饼图', '/charts/pie', <PieChartOutlined/>),
  ])
]


export const rootSubmenuKeys = ['/products', '/charts'];

export default items