import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
function Register() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleInput = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userInfo.name && userInfo.email && userInfo.password) {
            try {
                const res = await axios.post('http://localhost:4000/user/register', userInfo);
                toast.success(res.data.message);
                setUserInfo({
                    name: "",
                    email: "",
                    password: ""
                });
                setTimeout(() => {
                    navigate("/login")
                }, 3000);
            } catch (error) {
                toast.error(error);
            }
        }
    }

    return (
        <div className='w-50 m-auto p-5'>
            <Toaster />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Name" name='name' value={userInfo.name} onChange={handleInput} />
                </Form.Group>
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

export default Register
