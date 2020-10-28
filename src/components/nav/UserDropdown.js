import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "../posts/PostProvider"
import "./Nav.css";

export const UserDropdown = (props) => {
    const { getPostsByUser } = useContext(PostContext)

    const handleLogout = () => {
        localStorage.clear();
    };

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
                to={{pathname: `/posts?user_id=${props.currentUserId}`}}
                onClick={() => {
                    console.log(props.currentUserId)
                    props.toggleOpen()
                    getPostsByUser()
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
