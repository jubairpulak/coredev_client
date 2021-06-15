import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import { createSubscription } from "../../functions/admin";
const Subscription = () => {
	const [packagename, setPackagename] = useState("");
	const [description, setDescription] = useState("");
	const { user } = useSelector((state) => ({ ...state }));

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!packagename)
			return toast.error("Package Name field should not be empty");
		if (!description)
			return toast.error("Description field should not be empty");

		try {
			const create = await createSubscription(
				user.token,
				packagename,
				description
			);

			toast.success("Package is created");
			console.log("resposnt is getting", create);
		} catch (error) {
			console.log(error.response);
			toast.error(error.response.data.message);
		}
	};

	return (
		<>
			{" "}
			<div className="row">
				<div className="col-5 mx-auto">
					<div className="ml-5 mt-5">
						<form onSubmit={handleSubmit}>
							<Form.Label>Enter Package Name</Form.Label>
							<input
								type="text"
								placeholder="Package Name"
								className="form-control"
								value={packagename}
								onChange={(e) => setPackagename(e.target.value)}
							/>

							<Form.Label>Package Description</Form.Label>
							<Form.Control
								type="text"
								placeholder="Package Description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
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

export default Subscription;
