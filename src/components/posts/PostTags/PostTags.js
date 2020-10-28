import React, { useContext, useState, useEffect } from "react"
import { PostTagContext } from "./PostTagProvider"
import { TagContext } from "../../tags/TagProvider"
import { CurrentPostTags } from "./CurrentPostTags"
import { EditPostTags } from "./EditPostTags"

export const PostTags = ({postId}) => {
    const { postTags, getPostTagsByPost } = useContext(PostTagContext)
    const { tags, getTags } = useContext(TagContext)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        getPostTagsByPost(postId)
    }, [postId]);

    const toggleEdit = () => {
        setIsEditing(!isEditing)
        isEditing ? getTags() : getPostTagsByPost(postId)
    }

    return (
        <div className="post-tags-container">
            <h3 className="post-tags-header">TAGGED AS</h3>
            <button className="edit-post-tags-bttn" onClick={toggleEdit}>manage tags</button>
            {isEditing ? 
                    (
                    tags.map(tag => {
                    return <EditPostTags tag={tag} key={tag.id} />
                    })
                ) 
                :   (
                    postTags.map(tag => {
                    return <CurrentPostTags tag={tag} key={tag.id} />
                    })
                ) 
            }
        </div>
    )
}