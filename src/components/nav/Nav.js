import React, { useState, useEffect, useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import "./Nav.css"
import Logo from "./rare_logo_diamond_transparent.png"
import { UserDropdown } from "./UserDropdown"
import { UserContext } from "../users/UserProvider"

export const Nav = (props) => {

    const [isOpen, setIsOpen] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [currentUserId, setCurrentUserId] = useState(null)

    const {currentUser, getCurrentUser} = useContext(UserContext)

    const toggleOpen = () => {
        if (isOpen) {
            setIsOpen(false)
        }
        else {
            setIsOpen(true)
        }
    }

    useEffect(()=>{
        if(localStorage.getItem("rare_token")!== null){
            setLoggedIn(true)
            setCurrentUserId(localStorage.getItem("rare_token"))
        }
        else{
            setLoggedIn(false)
        }
        getCurrentUser()
    }, [])

    return (
        <>
        <div className="nav">
            <div className="nav__inner">
                <div className="spacer__nav--left"></div>
                <div className="link nav__link logo-wrapper left">
                    <div className="top-space"></div>
                    <div className="middle-wrap">
                        <img className="nav__logo"
                        to="/"
                        onClick={()=>{
                        props.history.push("/")}}
                        src={Logo} />
                        <div className="right-middle"></div>
                    </div>
                    <div className="bottom-space"></div>
                </div>
                <div className="spacer__nav--middle"></div>
                <div className="link nav__link user-nav-wrapper right">
                    <div className="top-space"></div>
                    <div className="link nav__link wrapper__nav--right">
                        <div className="nav__link-wrapper post-wrapper">
                            <Link
                            className="link nav__link posts-link"
                            to="/">
                                posts
                            </Link>
                            {currentUser.is_staff ?
                            <Link
                            className="link nav__link posts-link"
                            to="/users">
                                User Manager
                            </Link>
                            : null
                            }
                        </div>
                        {loggedIn
                        ?
                        <div className="user-menu-btn"
                        onClick={toggleOpen}>
                            <div className={`arrow ${isOpen ? "upArrow" : "downArrow"}`}></div>
                        </div>
                        :
                        <Link className="link nav__link get-started"
                        to="/login">
                            get started
                        </Link>
                        }
                    </div>
                    <div className="bottom-space"></div>
                </div>
                <div className={`dropdown ${isOpen ? "dropdown--open" : "dropdown--collapsed" }`}>
                    <UserDropdown
                    toggleOpen={toggleOpen}
                    currentUserId={currentUserId}
                    {...props}/>
                </div>

                <div className="spacer__nav--right"></div>
            </div>
        </div>
        </>
    )
}

