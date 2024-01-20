import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

function Register() {

    const navigate = useNavigate()

    const submitHandler = async (values) => {
        try {
           const response = await axios.post('http://localhost:8000/api/v1/users/register', values)
           console.log(response)
            if(response.data.statusCode===201){
                alert('register success')
                navigate('/')
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(localStorage.getItem('userInfo')){
            navigate('/')
        }
    },[navigate]);
  return (
    <div className='register-page'>
        <Form layout='vertical' onFinish={submitHandler}>
        <h1>Register Page</h1>
            <Form.Item label='Name' name="name">
                <Input placeholder='Enter Name' /> 
            </Form.Item>
            <Form.Item label='Email' name="email">
                <Input placeholder='Enter Email' type='email' />
            </Form.Item>
            <Form.Item label='Password' name="password">
                <Input.Password placeholder='Enter Password' />
            </Form.Item>
            <button className='btn btn-primary'>submit</button>
            <div> Already Registered ? click here to <Link to="/login"> log in</Link></div>
        </Form>   

    </div>
  )
}

export default Register

{/*
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const App = () => (
  <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
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
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);
export default App;

    */}