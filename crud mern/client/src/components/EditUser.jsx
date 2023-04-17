import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditUser() {
    const navigate = useNavigate()
    const { id } = useParams()

    const [user, setUser] = useState({
        name: "",
        username: "",
        contact: "",
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const getSingleUser = async () => {
            const res = await axios.get(`http://localhost:4000/single-user/${id}`)
            setUser(res.data.user[0]);
        }
        getSingleUser();
    }, [id]);

    const updateUser = async () => {
        const res = await axios.put(`http://localhost:4000/update-user/${id}`, user)
        console.log(res);
    }
    const submitForm = (e) => {
        e.preventDefault();
        updateUser();
        navigate("/all")
    }

    return (
        <div>
            <Form className='w-50 m-auto mt-5'>
                <Form.Group className="mb-3" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" name='name' value={user.name} onChange={(e) => {
                        handleChange(e)
                    }} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" name='username'
                        value={user.username} onChange={(e) => {
                            handleChange(e)
                        }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control type="text" placeholder="Enter contact" name='contact'
                        value={user.contact} onChange={(e) => {
                            handleChange(e)
                        }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" name='email'
                        value={user.email} onChange={(e) => {
                            handleChange(e)
                        }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder="Password" name='password' value={user.password} onChange={(e) => {
                        handleChange(e)
                    }} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={submitForm}>
                    Update User
                </Button>
            </Form>
        </div>
    )
}

export default EditUser;

