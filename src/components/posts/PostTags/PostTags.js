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

    const currentTags = (postId) => {
        getPostTagsByPost(postId)
    }

    const singleTag = currentTags(postId).map((tag) => <CurrentPostTags tag={tag}/>)

    const toggleEdit = () => {
        setIsEditing(!isEditing)
        getPostTagsByPost(postId)
    }

    return (
        <div className="post-tags-container">
            <h3 className="post-tags-header">TAGGED AS</h3>
            <button className="edit-post-tags-bttn" onClick={toggleEdit}>manage tags</button>
            {isEditing ? <EditPostTags /> : singleTag /*currentTags(postId)*/  /*<CurrentPostTags postId={postId}/> */ }
        </div>
    )
}