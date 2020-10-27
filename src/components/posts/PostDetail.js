import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { PostTags } from "./PostTags"


export const PostDetails = (props) => {
    const { getPostById } = useContext(PostContext)

    const [post, setPost] = useState({user: {}})

    useEffect(() => {
        const postId = parseInt(props.match.params.postId)
        getPostById(postId)
            .then(setPost)
    }, [])

    const handleDate = (date) => {
        if("publication_date" in post){
            return new Date(date).toDateString()
        }
    }

    return (
        <div className="postDetailContainer">
            <h2 className="postTitle">{post.title}</h2>
            <div className="author_date_container">
                <h3>{post.user.display_name}</h3>
                <h4>{handleDate(post.publication_date)}</h4>
            </div>
            <div className="postContent">
                <p>{post.content}</p>
            </div>
            <PostTags />
        </div>
    )
}
