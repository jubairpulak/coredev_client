import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import { getSubscription, subscribePackage } from "../../functions/user";
const Subscription = () => {
	const { user, cart } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();
	const [length, setLength] = useState();
	const [packagename, setPackagename] = useState("");
	const [description, setDescription] = useState("");
	const [packageid, setPackageId] = useState("");
	const [data, setData] = useState([]);
	const [ok, setOk] = useState(false);

	const handleSubmit = async (packageid) => {
		try {
			const subUser = await subscribePackage(user.token, packageid);

			console.log("user type ", subUser);
			toast.success(subUser.data.message);
			setOk(!ok);
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	useEffect(async () => {
		const getData = await getSubscription(user.token);
		setData(getData.data.data.getUserList);
		console.log("task list ", getData.data);

		dispatch({
			type: "ADD_TO_CART",
			payload: {
				length: getData.data.length,
			},
		});
		let obj = {};
		obj.data = getData.data.length;
		localStorage.setItem("length", JSON.stringify(obj));

		console.log("getdata ", getData.data.data.getUserList);
	}, [ok]);

	return (
		<>
			{" "}
			<div className="row">
				{data ? (
					data.map(({ packagename, description, _id }) => (
						<div className="col-4 mx-auto">
							<div className="ml-5 mt-5">
								<div
									className="card"
									style={{ width: "18rem" }}>
									<div className="card-body">
										<h5 className="card-title">
											{packagename}
										</h5>
										<p className="card-text">
											{description}
										</p>

										<a
											href="#"
											className="btn btn-primary"
											onClick={(e) => {
												handleSubmit(_id);
											}}>
											Subscribe
										</a>
									</div>
								</div>
							</div>
						</div>
					))
				) : (
					<div>No package available</div>
				)}
			</div>
		</>
	);
};

export default Subscription;
