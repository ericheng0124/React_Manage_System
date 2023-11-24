import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import loginData from "../../utils/memoryUtils";
import {Layout} from 'antd';
import LeftNav from "../../components/LfetNav/LeftNav";
import Header from "../../components/Header/Header"


/*
*   管理页面
* */

const {Footer, Sider, Content} = Layout;


const Admin = () => {
  const nav = useNavigate()

  const user = loginData.user

  // 如果内存中没有存储user,说明没有登陆
  useEffect(() => {
    if (!user || !user._id) {
      nav('/login')
    }
  }, [nav, user])


  return (
      <Layout style={{minHeight: '100%'}}>
        <Sider width={200}>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header/>
          <Content style={{padding: '20px',width:'100%',height:'100%',overflow:'auto'}}>
            <Outlet/>
          </Content>
          <Footer style={{textAlign: 'center',backgroundColor: 'white', color: 'lightgray'}}>推荐使用谷歌浏览器,
            可以获得更加的页面操作体验</Footer>
        </Layout>
      </Layout>

  );
};


export default Admin;