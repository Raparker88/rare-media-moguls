import React, { useState } from "react"


export const PostContext = React.createContext()

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])

    const getPosts = () => {
        return fetch("http://localhost:8000/posts")
            .then(res => res.json())
            .then(setPosts)
    }

    const getPostById = (id) => {
        return fetch(`http://localhost:8000/posts/${id}`)
            .then(res => res.json())
    }

    const getLastPost = () => {
        return fetch(`http://localhost:8000/latest_post`)
            .then(res => res.json())
    }

    const addPost = post => {
        return fetch("http://localhost:8000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
            .then(getPosts)
    }

    const updatePost = post => {
        return fetch(`http://localhost:8000/posts/${post.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
            .then(getPosts)
    }

    return (
        <PostContext.Provider value={{
            posts, addPost, getPosts, updatePost, getPostById, getLastPost
        }}>
            {props.children}
        </PostContext.Provider>
    )

}