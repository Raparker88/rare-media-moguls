import React, { useContext, useEffect, useState } from "react"
import { PostTagContext } from "./PostTagProvider"
import { CurrentPostTags } from "./CurrentPostTags"
import { EditPostTags } from "./EditPostTags"

export const PostTags = ({post}) => {
    const testPost = useContext(PostTagContext)
    const [isEditing, setIsEditing] = useState(false)
    const postId = post.id

    const toggleEdit = () => {
        if (isEditing) {
            setIsEditing(false)
        }
        else {
            setIsEditing(true)
            testPost()
        }
    }

    return (
        <div className="post-tags-container">
            <h3 className="post-tags-header">TAGGED AS</h3>
            <button className="edit-post-tags-bttn" onClick={toggleEdit}>manage tags</button>
            {isEditing ? <EditPostTags /> : <CurrentPostTags /> }
        </div>
    )
}