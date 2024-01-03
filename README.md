# React 管理后台

## 1. 准备



### 1.1 项目描述

    1) 此项目为一个前后台分离的后台管理的 SPA, 包括前端 PC 应用和后端应用
    2) 包括用户管理 / 商品分类管理 / 商品管理 / 权限管理等功能模块
    3) 前端: 使用 React 全家桶 + Antd + Axios + ES6 + Webpack 等技术
    4) 后端: 使用 Node + Express + Mongodb 等技术
    5) 采用模块化、组件化、工程化的模式开发

### 1.2 项目需要用到的React插件和第三方库

    1) react-router-dom 开发单页应用
    2) redux+react-redux+redux-thunk 管理应用组件状态
    3) axios/jsonp 与后端进行数据交互
    4) antd 组件库构建界面
    5) echarts/bizcharts 实现数据可视化展现
    6) react-draft-wysiwyg 实现富文本编辑器

### 1.3 npm/yarn 常用命令

yarn 命令文档: https://yarnpkg.com/zh-Hans/docs/cli/
npm 命令文档: https://docs.npmjs.com/cli-documentation/

```
## 设置淘宝镜像
npm config set registry https://registry.npm.taobao.org
yarn config set registry https://registry.npm.taobao.org

## 初始化项目:
yarn init -y
npm init -y

## 下载项目的所有声明的依赖:
yarn
npm install

## 下载指定的运行时依赖包:
yarn add webpack@3.2.1
npm install webpack@3.2.1 -S

## 下载指定的开发时依赖:
yarn add webpack@3.2.1 -D
npm install webpack@3.2.1 -D

## 全局下载指定包:
yarn global add webpack
npm install webpack -g

## 删除依赖包:
yarn remove webpack
npm remove webpack -S
yarn global remove webpack
npm remove webpack -g

## 运行项目中配置的 script:
yarn run xxx
npm run xxx

## 查看某个包的信息:
yarn info xxx
npm info xxx
```

### 1.4 git常用命令

Git 在线参考手册: http://gitref.justjavac.com/

```
* git config --global user.name "username" //配置用户名
* git config --global user.email "xx@gmail.com" //配置邮箱
* git init //初始化生成一个本地仓库
* git add . //添加到暂存区
* git commit –m "message" //提交到本地仓库
* git remote add origin url //关联到远程仓库
* git push origin master //推送本地 master 分支到远程 master 分支
* git checkout -b dev //创建一个开发分支并切换到新分支
* git push ogigin dev //推送本地 dev 分支到远程 dev 分支
* git pull origin dev //从远程 dev 分支拉取到本地 dev 分支
* git clone url //将远程仓库克隆下载到本地
* git checkout -b dev origin/dev // 克隆仓库后切换到 dev 分支
```



## 2. 开启项目开发





### 2.1 项目初始化

1) create-react-app 是 react 官方提供的用于搭建基于 react+webpack+es6 项目的脚手架

2. 操作:

   ```
   npm install -g create-react-app : 全局下载工具
   create-react-app react-admin :下载模板项目
   cd react-admin
   npm start
   访问: localhost:3000
   ```

3. 可能会出现包版本差异的导致异常的问题

   解决: 添加.env 配置文件忽略版本差异

   SKIP_PREFLIGHT_CHECK=true

   

### 2.2 编码测试与打包发布项目

 1. 编码测试

    ```
    npm start
    访问:http://localhost:3000
    ```

​		编码, 自动编译打包刷新(live-reload), 查看效果



2. 打包发布

   ```
   npm run build
   npm install -g serve
   serve build
   访问: http://localhost:5000
   ```



### 2.3 项目源码基本目录设计

#### 2.3.1 基本机构

```
src
 |-api									// ajax相关
 |-assets							// 公用资源
 |-components					// 非路由组件
 |-config							// 配置
 |-pages								// 路由组件
 |-utils								// 工具模块
 |-App.js							// 应用根组件
 |-index.js						// 入口js
```

### 2.4 引入antd

​	参考文档:https://ant.design/docs/react/use-with-create-react-app-cn

#### 2.4.1 下载组件包

```
yarn add antd
```

#### 2.4.2 实现组件的按需打包

 1. 下载依赖模块

    ```
    yarn add react-app-rewired customize-cra babel-plugin-import
    ```

    

 2. 定义加载配置的js模块:config-overrides.js

    ```
    const {override, fixBabelImports} = require('customize-cra');
    module.exports = override(
      fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      }),
    );
    ```

    修改配置:package.json

    ```
    "scripts": {
      "start": "react-app-rewired start",
      "build": "react-app-rewired build",
      "test": "react-app-rewired test",
      "eject": "react-scripts eject"
    },
    ```

    

#### 2.4.3 自定义antd主题

需求: 使antd的默认基本颜色从Blue变为Green

参考文档:https://ant.design/docs/react/use-with-create-react-app-cn#%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%BB%E9%A2%98

参考 [配置主题](https://ant.design/docs/react/customize-theme-cn)，通过 ConfigProvider 进行主题配置：

```
import React from 'react';
import { ConfigProvider } from 'antd';

const App = () => {
	return (
		// theme中配置需要的默认主题颜色,loacl中配置国际化,默认使用的语言
		<ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }} loacl={zhCN}> 
    	<MyApp />
  	</ConfigProvider>
	)
};

export default App;
```

#### 2.4.4 项目中应用到的antd组件

通用类: 

		1. Button 按钮
		1. Icon 图标

布局:

1. Row 行
2. Col 列

导航:

	1. Menu 导航菜单
	1. Pagination 分页

数据录入:

	1. Form 表单
	1. Input 输入框
	1. Select 选择器
	1. Upload 上传
	1. Cascader 级联选择
	1. DatePicker 日期选择框

数据展示:

	1. List 列表
	1. Tree 树形空间
	1. Table 表格

反馈:

1. Modal对话框

2. Message 全局提示

   

### 2.5 引入路由

#### 2.5.1 下载路由包: react-router-dom

```
yarn add react-router-dom
```

#### 2.5.2 前台应用路由

1. 登陆:

​	/login

​	login.jsx

主界面:

​	/

​	admin.jsx

​	2.2 子路由:

​		2.2.1 Home界面:

​			/home

​			home.jsx

​		2.2.2 分类管理界面:

​			/category

​			category.jsx

​		2.2.3 商品管理:

​			/product

​			product.jsx

​			2.2.3.1子路由:

​				主界面:

​					/product/index

​					index.jsx

​				添加/更新:

​					/product/saveupdate

​					/add-update.jsx

​				详情:

​					/product/detail

​					detail.jsx

​			2.3.4 用户管理:

​				/user

​				user.jsx

​			2.3.5 权限管理:

​				/role

​				role.jsx

​			2.3.6 图标界面:

​				/charts/bar:bar.jsx

​				/charts/pie:pie.jsx

​				/charts/line:HomeLine.jsx

#### 2.5.3 用户登录路由组件: pages/login/login.jsx

```
/*
用户登录的路由组件
*/
import React, {Component} from 'react'
const Login = () => {
	render () {
		return (
			<div>login</div>
		)
	}
}
export default Login
```

#### 2.5.4 后台管理主路由组件: pages/admin/admin.jsx

```
/*
后台管理主路由组件
*/
import React, {Component} from 'react'
const Admin = () => {
	render () {
		return (
			<div>Admin</div>
		)
	}
}
export default Admin
```

### 2.6 映射路由:App.js

```
import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Admin from "./pages/admin/admin";
import Login from "./pages/login/login";
import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';


const App = () => {
  return (
      <ConfigProvider locale={zhCN}>
        <div style={{height: '100%', width: '100%'}}>
          <Routes>
            <Route path={'/login'} element={<Login/>}></Route>
            <Route path={'/'} element={<Admin/>}></Route>
            <Route path={'*'} element={<Navigate to={'/login'}/>}/>
          </Routes>
        </div>
      </ConfigProvider>
  )
}

export default App
```







​		



