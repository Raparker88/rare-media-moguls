import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "../PostProvider"
import { CurrentPostTags } from "./CurrentPostTags"
import { EditPostTags } from "./EditPostTags"

export const PostTags = (props) => {
    const { getPostById } = useContext(PostContext)
    const [isEditing, setIsEditing] = useState(false)

    const toggleEdit = () => {
        if (isEditing) {
            setIsEditing(false)
        }
        else {
            setIsEditing(true)
        }
    }

    return (
        <div className="post-tag-container">
            <h3>TAGGED AS</h3>
            <button onClick={toggleEdit}>manage tags</button>
            {isEditing ? <EditPostTags /> : <CurrentPostTags /> }
        </div>
    )
}