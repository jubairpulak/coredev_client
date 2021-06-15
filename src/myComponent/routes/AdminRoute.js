import React, { useEffect, useState } from "react";

import { Route, Link } from "react-router-dom";
import { createSelectorHook, useSelector, useStore } from "react-redux";

import LoadingToRedirect from "./Loadingtoredirect";

import { currentAdmin } from "../../functions/admin";

const AdminRoute = ({ children, ...rest }) => {
	const { user } = useSelector((state) => ({ ...state }));

	const [ok, setOk] = useState(false);

	useEffect(() => {
		if (user && user.token && user.role === "admin") {
			setOk(true);
		}
	}, [user]);

	return ok ? (
		<Route {...rest} render={() => children} />
	) : (
		<LoadingToRedirect />
	);
};

export default AdminRoute;
