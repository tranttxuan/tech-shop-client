import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";


const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user)
  console.log(user)
  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const handleLogout = async () => {
    await auth.signOut();
    dispatch({
      type: "LOGOUT",
      payload: null
    });
    history.push("/login");
  }

  useEffect(() => {

  }, [])

  return (
    <Menu onClick={handleClick} selectedKeys={current} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      {!user &&
        <>
          <Item key="register" icon={<UserAddOutlined />} className="float-right">
            <Link to="/register">Register</Link>
          </Item>

          <Item key="login" icon={<UserOutlined />} className="float-right">
            <Link to="/login">Login</Link>
          </Item>
        </>
      }

      {user &&
        <SubMenu key="user" icon={<SettingOutlined />} title={user.email && user.email.split("@")[0]} className="float-right">
          <Item key="setting:1">Option 2</Item>
          <Item key="setting:2">Option 2</Item>
          <Item key="logout"
            icon={<LogoutOutlined />}
            onClick={handleLogout}>
            Logout
        </Item>
        </SubMenu>
      }



    </Menu>
  );
};

export default Header;
