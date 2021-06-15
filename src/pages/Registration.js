import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

import { registerUser } from "../functions/auth.js";

import "react-datepicker/dist/react-datepicker.css";
const Registraiton = () => {
	const [name, setName] = useState("jubair");
	const [email, setEmail] = useState("j@gmail.com");
	const [password, setPassword] = useState("abcdef12");
	const [date, setDate] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		if (!name) return toast.error("Name field should not be empty");
		if (!email) return toast.error("Email field should not be empty");
		if (!password) return toast.error("password field should not be empty");
		if (!date) return toast.error("Date field should not be empty");

		registerUser(name, email, date, password)
			.then((res) => {
				console.log(res);
				toast.success(res.data.message);
			})
			.catch((err) => {
				console.log(err.response.data.message);
				toast.error(err.response.data.message);
			});
	};
	return (
		<>
			<div className="row ">
				<div className="col-5 mx-auto">
					<div className="ml-5 mt-5">
						<h3 className="ml-4">Account Registration </h3>
						<form onSubmit={handleSubmit}>
							<Form.Label>Enter Your Name</Form.Label>
							<input
								type="text"
								placeholder="Your Name"
								className="form-control"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>

							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>

							<Form.Label className="mr-5 ">
								Select Date of Birth
							</Form.Label>
							<DatePicker
								selected={date}
								onChange={(date) => setDate(date)}
							/>

							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								className="form-control"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>

							<button type="submit" className="btn btn-raised">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Registraiton;
