import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {AuthContext} from '../context/auth'
import { useContext } from "react";

function MenuBar() {
  const {user, logout} = useContext(AuthContext);
  const pathname = window.location.pathname;
  const [activeItem, setActiveItem] = useState(
    pathname === "/" ? "home" : pathname.substring(1)
  );

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (<Menu pointing secondary size="massive" color="teal">
  <Menu.Item
    name={user.username}
    active
    as={Link}
    to="/"
  />
  <Menu.Item
    name="Messages"
    active={activeItem === "messages"}
    onClick={handleItemClick}
    as={Link}
    to="/messages"
  />
  <Menu.Menu position="right">
    <Menu.Item
      name="logout"
      onClick={()=>{
        logout()
        window.location.href= '/'
      }}
    />
  </Menu.Menu>
</Menu>
  ):(<Menu pointing secondary size="massive" color="teal">
  <Menu.Item
    name="home"
    active={activeItem === "home"}
    onClick={handleItemClick}
    as={Link}
    to="/"
  />
  <Menu.Menu position="right">
    <Menu.Item
      name="login"
      active={activeItem === "login"}
      onClick={handleItemClick}
      as={Link}
      to="/login"
    />
    <Menu.Item
      name="register"
      active={activeItem === "register"}
      onClick={handleItemClick}
      as={Link}
      to="/register"
    />
  </Menu.Menu>
</Menu>)

  
    
    return menuBar;
}
export default MenuBar;
