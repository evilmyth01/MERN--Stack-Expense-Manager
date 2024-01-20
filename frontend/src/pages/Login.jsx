import React,{useEffect} from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const navigate = useNavigate()
    const submitHandler = async (values) => {
        try {
           const {data} = await axios.post('http://localhost:8000/api/v1/users/login', values)
            message.success('login success')
            localStorage.setItem('userInfo', JSON.stringify({...data.data.user}))
            navigate('/')
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
        <h1>Log in Page</h1>
            <Form.Item label='Email' name="email">
                <Input placeholder='Enter Email' type='email' />
            </Form.Item>
            <Form.Item label='Password' name="password">
                <Input.Password placeholder='Enter Password' />
            </Form.Item>
            <button className='btn btn-primary'>submit</button>
            <div> Not Registered ? click here to <Link to="/register">Register</Link></div>
        </Form>   

    </div>
  )
}

export default Login