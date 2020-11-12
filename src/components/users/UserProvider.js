import React, { useState } from "react"

export const UserContext = React.createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])
    const [currentUserId, setCurrentUserId] = useState(null)

    const getUsers = () => {
        return fetch("http://localhost:8000/rareusers")
            .then(res => res.json())
            .then(setUsers)
    }

    const addUser = user => {
        return fetch("http://localhost:8000/rareusers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(getUsers)
    }

    return (
        <UserContext.Provider value={{
            users, addUser, getUsers, setCurrentUserId, currentUserId
        }}>
            {props.children}
        </UserContext.Provider>
    )
}