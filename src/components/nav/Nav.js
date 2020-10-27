import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./Nav.css"
import Logo from "./rare.jpeg"

export const Nav = () => {
    const history = useHistory()
    const handleLogout = () => {
        localStorage.clear()
    }

    return (
        <ul className="nav">
            <li className="link nav__link">
                <img className="nav__logo" src={Logo} />
            </li>
            <li className="nav__item">
                <Link className="nav__link" to="/posts">Posts</Link>
            </li>
            <li className="nav__item">
                <Link className="nav__link" to="/new_post">Create Post</Link>
            </li>
            {
                (localStorage.getItem("rare_user_id") !== null)
                ?
                <Link className="link nav__link logout"
                    to="/"
                    onClick={()=>{
                    handleLogout()
                    }}>
                    Logout
                </Link>
                :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }
        </ul>
    )
}

