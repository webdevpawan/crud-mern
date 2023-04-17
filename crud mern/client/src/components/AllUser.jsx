import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Auth';


function AllUser() {
    const { user } = useContext(AuthContext)

    const navigate = useNavigate();

    const [userData, setUserData] = useState([])
    useEffect(() => {
        async function getUsers() {
            const res = await axios.get("http://localhost:4000/users");
            setUserData(res.data.users);
        }
        getUsers();
    }, [])

    const handleDelete = async (id) => {
        const res = await axios.delete(`http://localhost:4000/delete-user/${id}`)
    }

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                {
                    userData.map((item, i) => {
                        return (
                            <tbody key={i}>
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.contact}</td>
                                    <td><Button variant='primary' disabled={user ? false : true} onClick={() => {
                                        navigate(`/edit/${item._id}`)
                                    }}>Edit</Button></td>
                                    <td><Button variant='danger' disabled={user ? false : true} onClick={() => {
                                        handleDelete(item._id)
                                    }}>Delete</Button></td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </Table>
        </div>
    )
}

export default AllUser
