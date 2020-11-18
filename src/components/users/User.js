import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./UserProvider"
import "./User.css"

export const User = (props) => {

    const { changeUserType } = useContext(UserContext)

    return (
        <>

            <tr key={props.user.date_joined}>
                <td className="userInfo">
                    <div
                        className="link user-link">
                        {props.user.first_name} {props.user.last_name}
                    </div>
                </td>
                <td className="userInfo"><Link
                        className="link user-link"
                        to="/userdetail">
                        {props.user.username}
                    </Link>
                </td>
                <td className="userInfo"><label>
                        <input type="checkbox" id="userRadio" checked={props.user.is_active} ></input>
                        Active
                    </label>
                </td>
                <td className="userRadioInfo">
                    <div className="radio-container">
                    <label className="userRadio">
                        <input type="radio" id="userRadio" checked={!props.user.is_staff} onChange={() => changeUserType(props.user.id)}></input>
                        Author
                    </label>
                    <label className="userRadio">
                        <input type="radio" id="userRadio" checked={props.user.is_staff} onChange={() => changeUserType(props.user.id)}></input>
                        Admin
                    </label>
                </div>
                </td>
                
            </tr>
        </>
    )
}