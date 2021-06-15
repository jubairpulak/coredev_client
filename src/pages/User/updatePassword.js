import React, { useState, useEffect } from "react";
import { Descriptions } from "antd";
import Form from "react-bootstrap/Form";
import moment from "moment";

import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import { updatePass } from "../../functions/user";

const UpdatePassword = () => {
	let dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state }));

	const [password, setPassword] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const updateProfile = await updatePass(
				currentPassword,
				password,
				confirmPassword,
				user.token
			);
			const data = updateProfile.data.data.UpdateallThese;

			toast.success("account has been updated");
		} catch (err) {
			toast.error(err.response.data.message);
		}
	};

	return (
		<>
			<div className="row">
				<div className="col-5 mx-auto">
					<div className="ml-5 mt-5">
						<form onSubmit={handleSubmit}>
							<Form.Label>Enter Your Current Password</Form.Label>
							<input
								type="password"
								placeholder="Current Password"
								className="form-control"
								value={currentPassword}
								onChange={(e) =>
									setCurrentPassword(e.target.value)
								}
							/>

							<Form.Label>New Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Type New Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Form.Label>Confirm Your Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter New password "
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
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

export default UpdatePassword;
