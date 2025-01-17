import { Container, Nav, Navbar} from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";
import './index.css'

function AppLayout(props) {

    return (
        <div className="site-container">
            <Navbar bg="dark" variant="dark" className="navigation-bar">
                <Container fluid className="navbar-container">
                    <Navbar.Brand as={Link} to="/" className="navbar-logo">
                        Song Ranker
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link as={Link} to="/beatles" className="navbar-page">The Beatles</Nav.Link>
                        <Nav.Link as={Link} to="/rakim" className="navbar-page">Eric B. & Rakim</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <div class="page-container">
                <Outlet />
            </div>
        </div>
    );
}

export default AppLayout;