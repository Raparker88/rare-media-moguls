import React, { useState } from "react"

import { request } from '../utils/request';

export const UserContext = React.createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState({})

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

    const addImage = async (imageBase64) => {
        const requestData = {
            image: imageBase64,
        };

        return await request('http://localhost:8000/images', 'POST', requestData);
    };


    return (
        <UserContext.Provider value={{
            users, getUsers, currentUser, getCurrentUser, changeUserType, changeUserActive
        }}>
            {props.children}
        </UserContext.Provider>
    )
}