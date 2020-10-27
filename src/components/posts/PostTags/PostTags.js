import React, { useContext, useState, useEffect } from "react"
import { PostTagContext } from "./PostTagProvider"
import { CurrentPostTags } from "./CurrentPostTags"
import { EditPostTags } from "./EditPostTags"

export const PostTags = ({postId}) => {
    const { postTags, getPostTagsByPost } = useContext(PostTagContext)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        getPostTagsByPost(postId)
    }, []);

    useEffect(() => {
        // It seems like it isn't getting the postId before the PostTags component renders?
        // How in the world does that happen
        console.warn(`postId: ${postId}, post tags: ${postTags}`)
    }, []);

    const toggleEdit = () => {
        setIsEditing(!isEditing)
        console.warn(`postId: ${postId}, post tags: ${postTags}`)
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