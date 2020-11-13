import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import "./User.css"

export const User = (props) => {


    return (
        <>

            <tr key={props.user.date_joined}>
                <td className="userInfo">{<Link
                        className="link user-link"
                        to="/userdetail">
                        {props.user.username}
                    </Link>}
                </td>
                <td className="userInfo">{<label>
                        <input type="checkbox" id="userRadio" checked={props.user.is_active} ></input>
                        Active
                    </label>}
                </td>
                <td className="userRadioInfo">{
                    <div className="radio-container">
                    <label className="userRadio">
                        <input type="radio" id="userRadio" checked={!props.user.is_staff} ></input>
                        Author
                    </label>
                    <label className="userRadio">
                        <input type="radio" id="userRadio" checked={props.user.is_staff} ></input>
                        Admin
                    </label>
                </div>
                }</td>
                
            </tr>
        </>
    )
}