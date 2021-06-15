import axios from "axios";

export const currentAdmin = async (authtoken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/current-admin`,
		{},
		{
			headers: {
				authtoken,
			},
		}
	);
};

export const updatedata = async (authtoken, username) =>
	await axios.put(
		`${process.env.REACT_APP_API}/admin/update-me`,
		{ username },
		{
			headers: { authtoken },
		}
	);

export const getMe = async (authtoken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/admin/get-me`,
		{},
		{
			headers: {
				authtoken,
			},
		}
	);
};
export const getUserlist = async (authtoken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/admin/get-users`,
		{},
		{
			headers: {
				authtoken,
			},
		}
	);
};
export const createSubscription = async (
	authtoken,
	packagename,
	description
) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/admin/create-package`,
		{ packagename, description },
		{
			headers: {
				authtoken,
			},
		}
	);
};

export const updateUserRole = async (userid, authtoken) =>
	await axios.put(
		`${process.env.REACT_APP_API}/admin/update-role`,
		{ userid },
		{
			headers: { authtoken },
		}
	);
export const deletUser = async (userid, authtoken) =>
	await axios.put(
		`${process.env.REACT_APP_API}/admin/delete-user`,
		{ userid },
		{
			headers: { authtoken },
		}
	);
