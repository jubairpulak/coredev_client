import axios from "axios";

//send user data for registration

export const registerUser = async (username, email, dateofbirth, password) =>
	await axios.post(`${process.env.REACT_APP_API}/signup`, {
		username,
		email,
		dateofbirth,
		password,
	});

//user login

export const loginUser = async (email, password) =>
	await axios.post(`${process.env.REACT_APP_API}/login`, {
		email,

		password,
	});
//user logout

export const logout = async (authtoken) =>
	await axios.post(
		`${process.env.REACT_APP_API}/logout`,
		{},
		{
			headers: {
				authtoken,
			},
		}
	);


