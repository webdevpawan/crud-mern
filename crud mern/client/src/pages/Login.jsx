import React, { useState, useContext } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Auth';


function Login() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    });
    const { setUser } = useContext(AuthContext)
    const handleInput = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (userInfo.email && userInfo.password) {
                const res = await axios.post('http://localhost:4000/user/login', userInfo);

                if (res.data.status === 400) {
                    toast.error(res.data.message);
                }
                else {
                    toast.success(res.data.message);
                    setUser(res.data.token);
                    localStorage.setItem("token", res.data.token);
                    setUserInfo({
                        email: "",
                        password: ""
                    });
                    setTimeout(() => {
                        navigate("/all")
                    }, 2000);
                }
            }
        } catch (error) {
            toast.error(error.response.data.message);

        }
    }

    return (
        <div className='w-50 m-auto p-5'>
            <Toaster />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Email" name='email' value={userInfo.email} onChange={handleInput} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Password" name='password' value={userInfo.password} onChange={handleInput} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Login
