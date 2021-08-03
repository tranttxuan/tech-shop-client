import React, { useState } from "react";
import { Badge, Menu } from "antd";
import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
    LogoutOutlined,
    ShoppingOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import Search from "../forms/Search";
import { signout } from "../../actions/userActions";

const { SubMenu, Item } = Menu;



const Header = () => {
    const [current, setCurrent] = useState("home");
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.user);
    const cart = useSelector(state => state.cart)

    const handleClick = (e) => {
        // console.log(e.key);
        setCurrent(e.key);
    };

    const numberOfProductsInCart = () =>
        cart.reduce((acc, item) => acc + item.count, 0)

    const getXOffset = () => {
        const count = numberOfProductsInCart()
        return count < 10 ? 9 : count < 100 ? 16 : 20
    }
    const handleLogout = async () => {
        await auth.signOut();
        dispatch(signout());
        history.push("/login");
    }

    return (
        <div id="header">
        <Menu onClick={handleClick} selectedKeys={current} mode="horizontal" data-id="header">
            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to="/">Home</Link>
            </Item>
            <Item key="shop" icon={<ShoppingOutlined />}>
                <Link to="/shop">Shop</Link>
            </Item>
            <Item key="cart" icon={<ShoppingCartOutlined />}>
                <Link to="/cart">
                    <Badge
                        overflowCount={500}
                        count={numberOfProductsInCart()}
                        offset={[getXOffset(), 0]}>
                        Cart
                    </Badge>
                </Link>
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
                <SubMenu aria-label="current-user" key="user" icon={<SettingOutlined />} title={user.email && user.email.split("@")[0]} className="float-right">
                    {(user && user.role === "subscriber") &&
                        <Item key="dashboard-subscriber">
                            <Link to="/user/history">
                                Dashboard
                        </Link>
                        </Item>
                    }
                    {(user && user.role === "admin") &&
                        <Item key="dashboard-admin">
                            <Link to="/admin/dashboard">
                                Dashboard
                            </Link>
                        </Item>
                    }
                    <Item key="logout"
                        data-id="logout"
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}>
                        Logout
                    </Item>
                </SubMenu>
            }
            <span className="float-right p-1">
                <Search />
            </span>
        </Menu>
        </div>
    );
};

export default Header;
