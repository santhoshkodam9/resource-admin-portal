import React, { useEffect, useState } from 'react'
import '../TopMenu.css';
export const NavBar = (props) => {
    const [loginStatus, setLoginStatus] = useState(false);
    var navItem;
    useEffect(() => {
        var user = sessionStorage.getItem("username");
        if (user !== "" && user !== null && user !== undefined) {
            setLoginStatus(true);
        } else {
            setLoginStatus(false);
        }
    }, []);

    function logout() {
        sessionStorage.removeItem("username");
        setLoginStatus(false);
        window.location.href = "http://localhost:3000/login";
    }

    if (props.item.type === "link") {
        navItem = <li data-testid="nav-element"><a href="./" className="nav-link"  >{props.item.title}</a></li>;
    } else if (props.item.type === "linkProfile") {
        navItem = (loginStatus && <li data-testid="nav-element"><img src={process.env.PUBLIC_URL + props.item.image} className="profile-icon" alt="logo" onClick={logout} /></li>)
    } else {
        navItem = (loginStatus && <li data-testid="nav-element"><a href="./create" className="nav-link add-btn" >{props.item.title}</a></li>)
    }

    return (<>
        {navItem}
    </>)
}
