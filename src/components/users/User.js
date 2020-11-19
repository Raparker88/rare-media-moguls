import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./UserProvider"
import "./User.css"

export const User = (props) => {

    const { changeUserType, changeUserActive } = useContext(UserContext)

    // const statusPrompt = (id) => {
    //     let prompt = window.confirm("Are you sure you want to change this user's account status?");
    //     if( prompt === true ) {
    //         changeUserActive(id)
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

        const statusPrompt = (props, id) => {

            return (
                <form className="form change_tag_form" id="editTagForm">
                    <div className="toprow">
                        <div className="toprowblank"></div>
                        <span className="x" onClick={()=>{
                            props.setDeleteMode(false)
                        }}>X</span>
                    </div>
                    <h4 className="tagForm_label">Are you sure you want to delete this Tag?</h4>

                    <button type="submit"
                        onClick={e => {
                            changeUserActive(id)
                            e.preventDefault()
                        }}
                        className="btn post_submit_btn">
                        Ok
                    </button>
                    <button type="button"
                        className="btn cancel"
                        onClick={e => {
                            e.preventDefault()
                            props.setDeleteMode(false)
                        }}>
                            Cancel
                    </button>
                </form>
                )}
            return (
        <>

            <tr key={props.user.id}>
                <td className="userInfo">
                    <div
                        className="link user-link">
                        {props.user.first_name} {props.user.last_name}
                    </div>
                </td>
                <td className="userInfo"><Link
                        className="link user-link"
                        to={{pathname:`/users/${props.user.id}`}}>
                        {props.user.username}
                    </Link>
                </td>
                <td className="userInfo"><label>
                        <input type="checkbox" id="userRadio" checked={props.user.is_active} onChange={() => statusPrompt(props, props.user.id)} ></input>
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