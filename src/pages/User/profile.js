import React, { useState, useEffect } from "react";
import { Descriptions } from "antd";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import moment from "moment";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import { updateUser, getMe } from "../../functions/user";

const Profile = () => {
	let dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state }));

	const [ok, setOk] = useState(false);
	const [field, setField] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [date, setDate] = useState("");
	const [updatename, setUpdatename] = useState("");
	const format1 = "DD-MM-YYYY";
	const handleUpdate = (e) => {
		e.preventDefault();
		setField(!field);
	};

	const hanldeSubmit = async (e) => {
		e.preventDefault();
		try {
			const updateProfile = await updateUser(user.token, updatename);
			const data = updateProfile.data.data.UpdateallThese;
			dispatch({
				type: "LOGGED_IN_USER",
				payload: {
					username: data.username,
					email: data.email,
					token: user.token,
					role: data.role,
					DOB: data.dateofbirth,
					_id: data._id,
				},
			});
			setField(false);
			setOk(true);
			toast.success("account has been updated");
		} catch (err) {
			console.log("after update ", err.response);
		}
		setOk(false);
	};

	useEffect(async () => {
		const getUser = await getMe(user.token);
		const data = getUser.data.getProfile;
		setName(data.username);
		setEmail(data.email);
		setDate(data.dateofbirth);
	}, [ok]);
	return (
		<div>
			<div className="row">
				{name && (
					<div className="col-5 mx-auto">
						<Descriptions className="mr-auto" title="Your Info">
							<Descriptions.Item label="UserName">
								{name}
							</Descriptions.Item>
							<Descriptions.Item label="Email">
								{email}
							</Descriptions.Item>
							<Descriptions.Item label="Date of Birth">
								{moment(date).format(format1)}
							</Descriptions.Item>
						</Descriptions>
						<Button
							variant="primary"
							size="lg"
							block
							onClick={handleUpdate}>
							Update Information ?
						</Button>
					</div>
				)}
			</div>
			{field && (
				<div className="row mt-5">
					<div className="col-5 mx-auto">
						<h2>Update Information :</h2>
						<form>
							<Form.Label>Enter Your Name</Form.Label>
							<input
								type="text"
								placeholder="Your Name"
								className="form-control"
								value={updatename}
								onChange={(e) => setUpdatename(e.target.value)}
							/>
						</form>
					</div>
					<Button
						variant="primary"
						size="lg"
						block
						onClick={hanldeSubmit}>
						Update
					</Button>
				</div>
			)}
		</div>
	);
};

export default Profile;
