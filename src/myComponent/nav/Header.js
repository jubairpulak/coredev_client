import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../functions/auth";
import { toast } from "react-toastify";

const Header = () => {
	let dispatch = useDispatch();
	let history = useHistory();

	let { user } = useSelector((state) => ({ ...state }));

	const logoutdata = async () => {
		try {
			console.log("hello jubair");
			const logoutuser = await logout(user.token);

			dispatch({
				type: "LOGOUT",
				payload: null,
			});
			localStorage.removeItem("state");
			localStorage.removeItem("length");

			history.push("/login");
			return;
		} catch (err) {
			toast.error("Something went wrong");
		}
	};
	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Brand>
					<Link to="/">CodeForce</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					{!user && (
						<Nav className="me-auto">
							<Nav.Link>
								<Link to="/login">Login</Link>
							</Nav.Link>
							<Nav.Link>
								<Link to="/registration">Registration</Link>
							</Nav.Link>
						</Nav>
					)}
					{user && (
						<Nav className="me-auto">
							<NavDropdown
								title={user.username}
								id="basic-nav-dropdown">
								<NavDropdown.Item onClick={logoutdata}>
									<Link to="/logout">Logout</Link>
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
export default Header;
