import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { upload } from '../services/upload';
import { useNavigate } from 'react-router-dom';
function Adduser() {
    const navigate = useNavigate()

    const [users, setUsers] = useState({
        name: "",
        username: "",
        contact: "",
        email: "",
        password: ""

    })
    const handleChange = (e) => {
        setUsers({
            ...users,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = (e) => {
        e.preventDefault();
        upload(users);

        navigate("/all")

    }

    return (
        <div>
            <Form className='w-50 m-auto mt-5'>
                <Form.Group className="mb-3" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" name='name' onChange={(e) => {
                        handleChange(e)
                    }} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" name='username' onChange={(e) => {
                        handleChange(e)
                    }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control type="text" placeholder="Enter contact" name='contact' onChange={(e) => {
                        handleChange(e)
                    }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" name='email' onChange={(e) => {
                        handleChange(e)
                    }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder="Password" name='password' onChange={(e) => {
                        handleChange(e)
                    }} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={submitForm}>
                    Add User
                </Button>
            </Form>
        </div>
    )
}

export default Adduser;
