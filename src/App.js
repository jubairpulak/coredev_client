import React, { useState, useEffect } from "react";
import logo from "./logo.svg";

import "./App.css";
import { Switch, Route } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

import Header from "./myComponent/nav/Header";
import SideBar from "./myComponent/nav/sidebar";

//pages
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

//user and user pages
import profile from "./pages/User/profile";

//adminroute
import AdminRoute from "./myComponent/routes/AdminRoute";
//admin pages
import AdminProfile from "./pages/Admin/profile";
import Userlist from "./pages/Admin/user";
import AdminSubscription from "./pages/Admin/subscription";
import UserRoute from "./myComponent/routes/UserRoute";
import UserSubscription from "./pages/User/subscription";
import task from "./pages/User/task";
import UserProfile from "./pages/User/profile";
import UpdatePassword from "./pages/User/updatePassword";
import { getTaskList } from "./functions/user";

function App() {
	const dispatch = useDispatch();
	const [datalength, setDatalength] = useState();
	const [data, setData] = useState()
	
	const { user, cart } = useSelector((state) => ({ ...state }));
	useEffect(async() => {
		
		
		let data = localStorage.getItem("state")
		data =JSON.parse(data)
		if(localStorage.getItem("state") !==null){
			dispatch({
				type: "LOGGED_IN_USER",
				payload: {
					username: data.username,
					email: data.email,
					token: data.token,
					role: data.role,
					DOB: data.dateofbirth,
					_id: data._id,
				},
				
			});
		
		}

			let datalength = localStorage.getItem("length")
			console.log("from storage ",datalength)
			datalength =JSON.parse(datalength)
		if(localStorage.getItem("length") !==null){
			dispatch({
				
				type : "ADD_TO_CART",
				payload : {
					length : datalength.data
				}
			});
		}
		// else {
		// 	console.log("token : ", data.token)
		// 	const getTask = await getTaskList(data.token);

		// 	setData(getTask.data.data.getUserList);
		// 	console.log("lsit length ", getTask.data.length);
		// 	dispatch({
		// 		type: "ADD_TO_CART",
		// 		payload: {
		// 			length: getTask.data.length,
		// 		},
		// 	});
		// }
			// 	const getTask = await getTaskList(data.token);
			// setDatalength(getTask.data.length);

			// console.log("lsit length ", getTask.data.length);
			

	}, [datalength]);

	return (
		<>
			<Header />
			<SideBar />
			<ToastContainer />

			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/registration" component={Registration} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/logout" component={Login} />
				<AdminRoute
					exact
					path="/admin/profile"
					component={AdminProfile}
				/>
				<AdminRoute exact path="/admin/userlist" component={Userlist} />
				<AdminRoute
					exact
					path="/admin/subscription"
					component={AdminSubscription}
				/>

				<UserRoute
					exact
					path="/user/subscription"
					component={UserSubscription}
				/>
				<UserRoute exact path="/user/task" component={task} />
				<UserRoute exact path="/user/profile" component={UserProfile} />
				<UserRoute
					exact
					path="/user/update/password"
					component={UpdatePassword}
				/>
			</Switch>
		</>
	);
}

export default App;
