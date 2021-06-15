import React, { useState, useEffect } from "react";
import { getUserlist, updateUserRole, deletUser } from "../../functions/admin";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import "../User/tablestyle.css";
const Users = () => {
	const [data, setData] = useState([]);
	const [admindata, setAdmindata] = useState([]);
	const { user } = useSelector((state) => ({ ...state }));
	const [ok, setOk] = useState(true);
	const [okay, setOkay] = useState(true);

	useEffect(async () => {
		try {
			const getUser = await getUserlist(user.token);
			setData(getUser.data.data.getUserList);
			setAdmindata(getUser.data.data.getAdminList);
		} catch (error) {
			console.log(error.response);
		}
	}, [ok, okay]);
	const handleclickAdmin = async (userid) => {
		try {
			setOk(!ok);
			const userslist = await updateUserRole(userid, user.token);
			toast.success("User has been turned into admin");
		} catch (error) {
			console.log(error.response);
		}
	};
	const handleClicdeleteUser = async (userid) => {
		try {
			setOkay(!okay);
			const userslist = await deletUser(userid, user.token);
			toast.error("User has been removed ");
		} catch (error) {
			console.log(error.response);
		}
	};
	return (
		<>
			<div className="row mt-5">
				<div className="col-5 mx-auto">
					<h2>List of Admins : {admindata.length}</h2>

					<table border="2" id="customers">
						<tr>
							<th>User Name</th>
							<th>User Email</th>
							<th>User Role</th>
							<th>Date of Birth</th>
						</tr>
						{admindata ? (
							admindata.map((value) => (
								<tr>
									<td>{value.username}</td>
									<td>{value.email}</td>
									<td>{value.role}</td>
									<td>{value.dateofbirth}</td>
								</tr>
							))
						) : (
							<h2> No Admin</h2>
						)}
					</table>
				</div>

				<div className="col-5 mx-auto">
					<h2>List of Users : {data.length}</h2>

					<table border="2" id="customers">
						<tr>
							<th>User Name</th>
							<th>User Email</th>
							<th>User Role</th>
							<th>Date of Birth</th>
							<th>Make Admin?</th>
							<th>Delete user</th>
						</tr>
						{setData ? (
							data.map((value) => (
								<tr>
									<td>{value.username}</td>
									<td>{value.email}</td>
									<td>{value.role}</td>
									<td>{value.dateofbirth}</td>
									<td>
										<button
											className="btn btn-outline"
											onClick={() =>
												handleclickAdmin(value._id)
											}>
											Click It
										</button>
									</td>
									<td>
										<button
											className="btn btn-outline"
											onClick={() =>
												handleClicdeleteUser(value._id)
											}>
											Click It
										</button>
									</td>
								</tr>
							))
						) : (
							<h2> No Users</h2>
						)}
					</table>
				</div>
			</div>
		</>
	);
};

export default Users;
