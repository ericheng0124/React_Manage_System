import React from 'react';
import {Outlet} from "react-router-dom";
import './product.css'

/*
* 商品路由
* */

const Product = () => {
  return (
    <div>
      {/*嵌套子路由*/}
        <Outlet/>
    </div>
  );
};

export default Product;