import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"
import { User } from "./User"
import "./User.css"


export const UsersList = (props) => {
    const {users, getUsers} = useContext(UserContext)


    useEffect(() => {
        getUsers()
    }, [])

    return (
        <>
        <section className="userTableContainer">
            <h2>Users</h2>
            <table className="usersTable">
                <tbody>
                    {users.map(u => {
                        return <User
                        key={u.date_joined}
                        user={u}
                        {...props}/>
                    })}

                </tbody>
                
            </table>

        </section>
        </>
    )
}