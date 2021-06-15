import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { loginUser } from "../functions/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const Login = ({ history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	let dispatch = useDispatch();

	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		let intended = history.location.state;

		if (intended) {
			return;
		} else {
			if (user && user.token && user.role === "admin") {
				history.push("/admin/profile");
			} else if (user && user.token) {
				history.push("/user/profile");
			}
		}
	}, [user, history]);
	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log("email ", email, password);
		try {
			const logindata = await loginUser(email, password);
			const { data } = logindata.data.user.UserLogin;
			console.log("user created", logindata.data.token);

			dispatch({
				type: "LOGGED_IN_USER",
				payload: {
					username: data.username,
					email: data.email,
					token: logindata.data.token,
					role: data.role,
					DOB: data.dateofbirth,
					_id: data._id,
				},
			});
			let makeobj = {};
			makeobj.username = data.username;
			makeobj.email = data.email;
			makeobj.token = logindata.data.token;
			makeobj.role = data.role;
			makeobj.DOB = data.dateofbirth;
			makeobj._id = data._id;

			const serializedState = JSON.stringify(makeobj);
			localStorage.setItem("state", serializedState);
		} catch (error) {
			console.log("who know ?", error.response);
			toast.error(error.response.data.message);
		}
	};
	return (
		<>
			<div className="row">
				<div className="col-5 mx-auto">
					<div className="ml-5 mt-5">
						<h3 className="ml-4">Account Login </h3>
						<form onSubmit={handleSubmit}>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>

							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								className="form-control"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>

							<Button variant="primary" type="submit">
								Login
							</Button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
