import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

export const UserDropdown = ({ toggleOpen }) => {
    const handleLogout = () => {
        localStorage.clear();
    };
    return (
        <>
            <div className="dropdown-wrapper">
                <Link
                title="Create A New Post"
                className="link nav__link dropdown-link"
                to="/form"
                onClick={() => {
                    toggleOpen();
                }}>
                    create post
                </Link>
                <Link
                title="Review Your Posts"
                className="link nav__link dropdown-link"
                to="/user_posts"
                onClick={() => {
                    toggleOpen();
                }}>
                    my posts
                </Link>
                <Link
                title="Manage Categories"
                className="link nav__link dropdown-link"
                to="/categories"
                onClick={() => {
                    toggleOpen();
                }}>
                    category management
                </Link>
                <Link
                title="Manage Tags"
                className="link nav__link dropdown-link"
                to="/tags"
                onClick={() => {
                    toggleOpen();
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
