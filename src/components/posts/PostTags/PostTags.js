import React, { useContext, useState, useEffect } from "react"
import { PostTagContext } from "./PostTagProvider"
import { CurrentPostTags } from "./CurrentPostTags"
import { EditPostTags } from "./EditPostTags"

export const PostTags = ({post}) => {
    const { postTags, getPostTagsByPost } = useContext(PostTagContext)
    const [isEditing, setIsEditing] = useState(false)
    const postId = post.id

    useEffect(() => {
        getPostTagsByPost(postId)
    }, []);

    const toggleEdit = () => {
        setIsEditing(!isEditing)
        console.warn(postTags)
    }

    return (
        <div className="post-tags-container">
            <h3 className="post-tags-header">TAGGED AS</h3>
            <button className="edit-post-tags-bttn" onClick={toggleEdit}>manage tags</button>
            {isEditing ? 
                <EditPostTags />
                : (
                    postTags.map(tag => {
                    return <CurrentPostTags tag={tag} />
                    })
                ) 
            }
        </div>
    )
}