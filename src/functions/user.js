import axios from "axios";

export const getSubscription = async (authtoken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/admin/get-package`,
		{},
		{
			headers: {
				authtoken,
			},
		}
	);
};

//get task list of users
export const getTaskList = async (authtoken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/admin/get-tasklist`,
		{},
		{
			headers: {
				authtoken,
			},
		}
	);
};

export const subscribePackage = async (authtoken, packageId) => {
	return await axios.put(
		`${process.env.REACT_APP_API}/user/subscribe-package`,
		{ packageId },
		{
			headers: {
				authtoken,
			},
		}
	);
};

export const updateUser = async (authtoken, username) =>
	await axios.put(
		`${process.env.REACT_APP_API}/user/update-me`,
		{ username },
		{
			headers: { authtoken },
		}
	);

export const getMe = async (authtoken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/user/get-me`,
		{},
		{
			headers: {
				authtoken,
			},
		}
	);
};

export const updatePass = async (
	currentPassword,
	password,
	confirmPassword,
	authtoken
) =>
	await axios.put(
		`${process.env.REACT_APP_API}/user/update-pass`,
		{ currentPassword, password, confirmPassword },
		{
			headers: { authtoken },
		}
	);
