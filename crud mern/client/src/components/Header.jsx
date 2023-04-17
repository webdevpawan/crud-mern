import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../context/Auth';
import { toast, Toaster } from "react-hot-toast";
function Header() {
    let { user, setUser } = useContext(AuthContext)
    const styles = {
        textDecoration: 'none',
        padding: "20px",
        color: "black"

    }

    const handleLogOut = () => {
        setUser(null);
        localStorage.removeItem('token');
        toast.success("User logged out");
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Crud</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="">
                        <Link to="/add" style={styles}>Add User</Link>
                        <Link to="/all" style={styles}>All Users</Link>
                        {
                            user ? (<Link to="#" style={styles} onClick={handleLogOut}>Logout</Link>) : (
                                <>
                                    <Link to="/register" style={styles}>Register</Link>
                                    <Link to="/login" style={styles}>Login</Link>
                                </>
                            )
                        }

                    </Nav>
                </Navbar.Collapse>
                <Toaster />
            </Container>
        </Navbar>
    );
}

export default Header;
