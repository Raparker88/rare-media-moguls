import React, { useState } from "react"

export const UserContext = React.createContext()

export const UserProvider = (props) => {

    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)
    const [currentUserProfile, setCurrentUserProfile] = useState({})
    const [currentUserSubscriptions, setCurrentUserSubscriptions] = useState([])
    const [activeSubscriptions, setActiveSubscriptions] = useState([])
    const [followedAuthors, setFollowedAuthors] = useState([])

    const getUsers = () => {
        return fetch("http://localhost:8000/users", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setUsers)
    }

    const getCurrentUser = () => {
        return fetch("http://localhost:8000/users/current_user", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setCurrentUser)
    }

    const getUserProfile = (userId) => {
        return fetch(`http://localhost:8000/users/${userId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())

    }

    const changeUserType = (userId) => {
        return fetch(`http://localhost:8000/users/${userId}/change_type`, {
            method: "PATCH",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            },
        })
            .then(getUsers)
    }

    const changeUserActive = (userId) => {
        return fetch(`http://localhost:8000/users/${userId}/change_active`, {
            method: "PATCH",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            },
        })
            .then(getUsers)
    }

    const getCurrentUserSubscriptions = () => {
        return fetch(`http://localhost:8000/subscriptions`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`
            }
        })
            .then(res => res.json())
            .then(res => {
                setCurrentUserSubscriptions(res)
                const active = res.filter(r=>r.ended_on === null)
                setActiveSubscriptions(active)
                const authors = active.map(r=>r.author)
                setFollowedAuthors(authors)
            })
    }

    return (
        <UserContext.Provider value={{
            users, getUsers, currentUser, getCurrentUser, changeUserType, changeUserActive, getUserProfile, loggedIn, setLoggedIn, setCurrentUser, currentUserProfile, setCurrentUserProfile, getCurrentUserSubscriptions, currentUserSubscriptions, setCurrentUserSubscriptions, setActiveSubscriptions, setFollowedAuthors, followedAuthors, activeSubscriptions
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
