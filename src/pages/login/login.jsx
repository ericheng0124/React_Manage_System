import React, {useEffect} from 'react';
import styles from "./login.module.css"
import logo from "../../assets/images/logo.png"
import {Button, Form, Input, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";
import localStore from "../../utils/storageUtils";
import {usePostLoginMutation} from "../../store/loginApi";
// import {reqLogin} from "../../api";


/*
*   登陆页面
* */


const Login = () => {


  const nav = useNavigate()
  const user = memoryUtils.user

  // console.log('memory',user)



  // 使用RTKQ获取用户信息
  const [postLogin, isSuccess] = usePostLoginMutation()


  const onFinish = async (values) => {
    console.log('Success:', values);
    const {username, password} = values;

    try {
      const result = await postLogin({username, password})
      // if (result.data.status === 0) {
      if (isSuccess) {
        message.success('登陆成功!')
        const user = result.data.data
        console.log('user:', user)
        // 将user信息存储到内存中
        memoryUtils.user = user
        // 存储到浏览器中
        localStore.saveUser(user)
        nav('/')
      } else {
        message.error('登陆失败')
      }
    } catch (err) {
      message.error(err)
    }
  }


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (user && user._id) {
      nav('/')
    }

  }, [nav, user])

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

