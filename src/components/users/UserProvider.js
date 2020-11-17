import React, { useState } from "react"

export const UserContext = React.createContext()

export const UserProvider = (props) => {

    const existentialCrisis = "USER DOES NOT EXIST"
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

    const getUserProfile = (user_id) => {
        return fetch(`http://localhost:8000/users/${user_id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if(res.status === 400){
                    console.log(res, "res")
                    res.existentialCrisis = existentialCrisis
                    return res.json()
                }
                else{
                    console.log(res)
                    return res.json()
                }
            })
    }


    return (
        <UserContext.Provider value={{
            users, getUsers, currentUser, getCurrentUser, getUserProfile
        }}>
            {props.children}
        </UserContext.Provider>
    )
}