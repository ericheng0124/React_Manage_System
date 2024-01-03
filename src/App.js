import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Admin from "./pages/admin/admin";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import Category from "./pages/category/category";
import Product from "./pages/product/product";
import User from "./pages/user/user";
import Role from "./pages/role/role";
import Bar from "./pages/charts/bar";
import Line from "./pages/charts/line";
import Pie from "./pages/charts/pie";
import ProductHome from "./pages/product/home";
import ProductAddUpdate from "./pages/product/add-update";
import ProductDetail from "./pages/product/detail";
import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
// import 'antd/dist/antd.css';


const App = () => {

  return (
      <ConfigProvider locale={zhCN}>
        <div style={{height: '100%', width: '100%'}}>
          <Routes>
            <Route path={'/login'} element={<Login/>}></Route>
            <Route path={'/'} element={<Admin/>}>
              <Route path={'/home'} exact element={<Home/>}></Route>
              <Route path={'/products/category'} element={<Category/>}></Route>
              <Route path={'/products/product'} element={<Product/>}>
                <Route path={''} element={<ProductHome/>}/>
                <Route path={'product/add-update'} element={<ProductAddUpdate/>}/>
                <Route path={'product/detail'} element={<ProductDetail/>}/>
                {/*路由重定向*/}
                <Route path={'*'} element={<Navigate to={'/products/product'}/>}/>
              </Route>
              <Route path={'/user'} element={<User/>}></Route>
              <Route path={'/role'} element={<Role/>}></Route>
              <Route path={'/charts/bar'} element={<Bar/>}></Route>
              <Route path={'/charts/line'} element={<Line/>}></Route>
              <Route path={'/charts/pie'} element={<Pie/>}></Route>
              <Route path={'/'} element={<Navigate to={'/home'}/>}></Route>
            </Route>
            <Route path={'*'} element={<Navigate to={'/login'}/>}/>
          </Routes>
        </div>
      </ConfigProvider>
  )
}

export default App