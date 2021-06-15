import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Menu, Button } from "antd";
import {
	AppstoreOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	PieChartOutlined,
	DesktopOutlined,
	ContainerOutlined,
	MailOutlined,
} from "@ant-design/icons";
import { getTaskList } from "../../functions/user";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const Sidebar = () => {
	let dispatch = useDispatch();
	let history = useHistory();
	const { user, cart } = useSelector((state) => ({ ...state }));
	const [datalength, setDatalength] = useState();

	const [data, setData] = useState([]);
	const [ok, setOk] = useState(false);
	// useEffect(async () => {
	// 	try {
	// 		const getTask = await getTaskList(user.token);
	// 		setData(getTask.data.data.getUserList);
	// 		console.log("lsit length ", getTask.data.length);

	// 		dispatch({
	// 			type: "ADD_TO_CART",
	// 			payload: {
	// 				length: getTask.data.length,
	// 			},
	// 		});
	// 	} catch (error) {
	// 		console.log(error.response);
	// 	}
	// }, []);
	const { SubMenu } = Menu;
	return (
		<>
			<div style={{ width: 256 }}>
				<Menu mode="inline">
					{user && user.token && user.role === "admin" && (
						<>
							<Menu.Item key="1" icon={<PieChartOutlined />}>
								<Link to="/admin/profile" /> Profile
							</Menu.Item>

							<Menu.Item key="2" icon={<DesktopOutlined />}>
								<Link to="/admin/userlist" />
								UserList
							</Menu.Item>
							<Menu.Item key="3" icon={<ContainerOutlined />}>
								<Link to="/admin/subscription" /> Subscription
							</Menu.Item>
						</>
					)}
					{user && user.token && user.role === "user" && (
						<>
							{cart && cart.length > 0 ? (
								<Menu.Item key="1" icon={<PieChartOutlined />}>
									<Link to="/user/task" /> Task
								</Menu.Item>
							) : (
								<Menu.Item
									key="1"
									disabled
									icon={<PieChartOutlined />}>
									<Link to="/user/task" /> Task
								</Menu.Item>
							)}

							<Menu.Item key="2" icon={<DesktopOutlined />}>
								<Link to="/user/profile" />
								Profile
							</Menu.Item>

							<Menu.Item key="3" icon={<ContainerOutlined />}>
								<Link to="/user/subscription" /> Subscription
							</Menu.Item>
							<Menu.Item key="4" icon={<ContainerOutlined />}>
								<Link to="/user/update/password" /> Update
								Password
							</Menu.Item>
						</>
					)}
				</Menu>
			</div>
		</>
	);
};

export default Sidebar;
