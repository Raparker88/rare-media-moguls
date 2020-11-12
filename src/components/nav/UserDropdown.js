import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "../posts/PostProvider"
import "./Nav.css";

export const UserDropdown = (props) => {
    const handleLogout = () => {
        localStorage.clear();
    };
    const { getPostsByUser } = useContext(PostContext)

    const [currentUserId, setCurrentUserId] = useState(0)

    useEffect(()=>{
        const currentUserId = localStorage.getItem('rare_token')
        setCurrentUserId(currentUserId)
    }, [])

    return (
        <>
            <div className="dropdown-wrapper">
                <Link
                title="Create A New Post"
                className="link nav__link dropdown-link"
                to="/new_post"
                onClick={() => {
                    props.toggleOpen();
                }}>
                    create post
                </Link>
                <Link
                title="Review Your Posts"
                className="link nav__link dropdown-link"
                to={`/posts/user/${currentUserId}`}
                onClick={() => {
                    props.toggleOpen()
                }}>
                    my posts
                </Link>
                <Link
                title="Manage Categories"
                className="link nav__link dropdown-link"
                to="/categories"
                onClick={() => {
                    props.toggleOpen();
                }}>
                    category management
                </Link>
                <Link
                title="Manage Tags"
                className="link nav__link dropdown-link"
                to="/tags"
                onClick={() => {
                    props.toggleOpen();
                }}>
                    tag management
                </Link>
                <Link
                title="Logout"
                className="link nav__link logout dropdown-link"
                to="/"
                onClick={() => {
                    handleLogout();
                }}>
                    logout
                </Link>
            </div>
        </>
    );
};
