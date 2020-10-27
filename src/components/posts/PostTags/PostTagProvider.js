import React, {useContext, useState} from "react"
import { PostContext } from "../PostProvider"

export const PostTagContext = React.createContext()

export const PostTagProvider = (props) => {
    const [postTags, setPostTags] = useState([])
    const post = useContext(PostContext)

    const testPost = () => {
        console.warn(post)
    }

    const getAllPostTags = () => {
        return fetch("http://localhost:8000/post_tags")
            .then(res => res.json())
            .then(setPostTags)
    }

    const getPostTagsByPost = (postId) => {
        return fetch(`http://localhost:8000/post_tags?post_id=${postId}`)
            .then(res => res.json())
            .then(setPostTags)
    }

    const addPostTag = postTag => {
        return fetch("http://localhost:8000/post_tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postTag)
        })
        .then(getPostTagsByPost(postTag)) 
    }

    const removePostTag = postTag => {
        return fetch("http://localhost:8000/post_tags", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postTag)
        })
        .then(getPostTagsByPost(postTag)) 
    }

    return (
        <PostTagContext.Provider value={{postTags, testPost, addPostTag, removePostTag, getAllPostTags, getPostTagsByPost}}>
            {props.children}
        </PostTagContext.Provider>
    )

}