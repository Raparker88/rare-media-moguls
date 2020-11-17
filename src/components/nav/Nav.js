import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import "./Nav.css"
import Logo from "./rare_logo_diamond_transparent.png"
import { UserContext } from "../users/UserProvider"

export const Nav = (props) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [admin, setAdmin] = useState(false)
    const {currentUser, getCurrentUser} = useContext(UserContext)

    useEffect(()=>{
        getCurrentUser()
    }, [])

    useEffect(()=>{
        if(localStorage.getItem("rare_token")!== null){
            setLoggedIn(true)
            if(currentUser.is_staff){
                setAdmin(true)
            }
            else{
                setAdmin(false)
            }
        }
        else{
            setLoggedIn(false)
        }
    }, [currentUser])

    const handleLogout = () => {
        localStorage.clear();
    };

    return (
        <>
        <div className="nav">
            <div className="nav__inner">
                <div className="spacer__nav--left"></div> {/*Creates space between left window edge and logo*/}
                <div className="link nav__link logo-wrapper left"> {/*Contains logo and logo spacers*/}
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
                <div className="link nav__link user-nav-wrapper right">
                    <div className="top-space"></div>
                    <div className="link nav__link wrapper__nav--right">
                        <div className="nav__link-wrapper post-wrapper">
                            <Link
                            title="View All Posts"
                            className="link nav__link posts-link"
                            to={`${loggedIn ? '/' : '/login'}`}>
                                All Posts
                            </Link>

                            {loggedIn
                            ?<>
                                <Link
                                title="Review My Posts"
                                className="link nav__link"
                                to={`/users/posts`}>
                                    My Posts
                                </Link>

                                <Link
                                title={`${admin ? "Manage Categories" : "View Categories"}`}
                                className="link nav__link"
                                to="/categories">
                                    {admin ? "Category Manager" : "Categories"}
                                </Link>

                                <Link
                                title={`${admin ? "Manage Tags" : "View Tags"}`}
                                className="link nav__link"
                                to="/tags">
                                    {admin ? "Tag Manager" : "Tags"}
                                </Link>

                                {admin ?<>
                                <Link
                                className="link nav__link posts-link"
                                to="/users">
                                    User Manager
                                </Link> </>
                                : null
                                }
                            </>
                            : null
                            }
                            <Link
                            title={`${loggedIn ? "Logout" : "Login"}`}
                            className={`link nav__link ${loggedIn ? "logout" :"get-started"}`}
                            onClick={() => {
                                if(loggedIn){
                                    handleLogout()
                                }
                                else{
                                    return
                                }
                            }}
                            to={`${loggedIn ? "/" : "/login"}`}>
                                {loggedIn ? "Logout" : "Get Sarted"}
                            </Link>

                        </div>
                    </div>
                    <div className="bottom-space"></div>
                </div>
                <div className="spacer__nav--right"></div>
            </div>
        </div>
        </>
    )
}

