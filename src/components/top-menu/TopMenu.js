/* eslint-disable no-lone-blocks */
import React from 'react'
import './TopMenu.css';
import { NavBar } from './navbar/NavBar';
export const TopMenu = () => {
    const menudata =
        [
            {
                type: "button",
                title: "ADD ITEM",
            },
            {
                type: "linkProfile",
                title: "This Month",
                image: "/assets/profileimage.png"
            },
        ]

    return (<>
        <div className="banner">
            <div data-testid="navbar" className="navbar">
                <img src={process.env.PUBLIC_URL + "/assets/nxtwavelogo.png"} className="logo desktop-menu"  alt="logo" />
                <ul className="desktop-menu" >
                    {
                        menudata.map((item, index) => <NavBar key={index} item={item} index={index} />)
                    }
                </ul>
            </div>
        </div>
    </>)

}
