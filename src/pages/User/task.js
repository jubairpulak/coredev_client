import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { getTaskList } from "../../functions/user";
import "./tablestyle.css";

const Task = () => {
	const { user, cart } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const [length, setLength] = useState();
	useEffect(async () => {
		try {
			const getTask = await getTaskList(user.token);
			setData(getTask.data.data.getUserList);
			console.log("task list ", getTask.data.length);
			// setData(getUser.data.getProfile);

			dispatch({
				type: "ADD_TO_CART",
				payload: {
					length: getTask.data.length,
				},
			});
		} catch (error) {
			console.log(error.response);
		}
	}, []);
	return (
		<>
			<div className="row mt-5">
				<div className="col-5 mx-auto">
					<h2>List of Task you subscribed : {data.length}</h2>

					<table border="2" id="customers">
						<tr>
							<th>Task Name</th>
							<th>Task Description</th>
						</tr>
						{data ? (
							data.map((value) => (
								<tr>
									<td>{value.packagename}</td>
									<td>{value.description}</td>
								</tr>
							))
						) : (
							<h2> No package assigned</h2>
						)}
					</table>
				</div>
			</div>
		</>
	);
};

export default Task;
