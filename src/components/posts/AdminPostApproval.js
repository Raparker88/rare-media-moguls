import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"

export const AdminPostApproval = (props) => {
    const {adminPostApproval} = useContext(PostContext)
    const [checked, setChecked] = useState(false)
    const post = props.post

    useEffect(() => {
        let approved = post.approved
        if(approved === true){
            setChecked(true)
        }
    }, [post])

    const checkboxHandler = () => {
        if (checked) {
            adminPostApproval(post)
        }else{
            adminPostApproval(post)
        }
        setChecked(!checked)
    }

    return (
        <div className="checkbox-container">
            <label>
                <div>Approved ?</div>
                <input type="checkbox" id="tag" checked={checked} onChange={checkboxHandler} ></input>
            </label>
        </div>
    )
}