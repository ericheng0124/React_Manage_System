import React, {useEffect} from 'react';
import styles from "./login.module.css"
import logo from "../../assets/images/logo.png"
import {Button, Form, Input, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {reqLogin} from "../../api";
import {useNavigate} from "react-router-dom";
import loginData from "../../utils/memoryUtils";
import localStore from "../../utils/storageUtils";

/*
*   登陆页面
* */


const Login = () => {

  const nav = useNavigate()
  const user = loginData.user
  useEffect(()=>{
    if (user && user._id) {
      nav('/')
    }
  },[nav,user])


  const onFinish = async (values) => {
    console.log('Success:', values);
    const {username, password} = values;
    try {
      const result = await reqLogin(username, password)
      if (result.status === 0) {
        message.success('登陆成功!')
        const user = result.data
        // 将user信息存储到内存中
        loginData.user = user
        // 存储到浏览器中
        localStore.saveUser(user)
        nav('/')
      } else {
        message.error('登陆失败')
      }
    } catch (err) {
      message.error(err)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (

      <div className={styles.login}>
        <header className={styles.loginHeader}>
          <img src={logo} alt="logo"/>
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className={styles.loginContent}>
          <h2>用户登录</h2>
          <div>
            <Form
                name="basic"
                wrapperCol={{
                  span: 24,
                }}
                style={{
                  maxWidth: 600,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
              <Form.Item
                  name="username"
                  rules={[
                    {required: true, whitespace: true, message: '请输入用户名!'},
                    {min: 4, message: '用户名至少输入4位'},
                    {max: 12, message: '用户名最多输入12位'},
                    {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成'}
                  ]}
              >
                <Input placeholder={"Username"} prefix={<UserOutlined/>} style={{color: 'rgba(0,0,0,0.3)'}}/>
              </Form.Item>

              <Form.Item
                  name="password"
                  rules={[
                    {required: true, whitespace: true, message: '请输入密码!'},
                    {min: 4, message: '密码至少输入4位'},
                    {max: 12, message: '密码最多输入12位'},
                    {pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成'}
                  ]}
              >
                <Input.Password placeholder={"Password"} prefix={<LockOutlined/>} style={{color: 'rgba(0,0,0,0.3)'}}/>
              </Form.Item>

              <Form.Item
                  wrapperCol={{
                    offset: 9,
                    span: 18,
                  }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </section>
      </div>
  );
};

export default Login;

