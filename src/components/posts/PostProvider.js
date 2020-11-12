import React, { useState } from "react"

export const PostContext = React.createContext()

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])

    const getPosts = () => {
        return fetch("http://localhost:8000/posts", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setPosts)
    }

    const getPostById = (id) => {
        return fetch(`http://localhost:8000/posts/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
    }

    const getLastPost = () => {
        return fetch(`http://localhost:8000/latest_post`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
    }

    const addPost = post => {
        return fetch("http://localhost:8000/posts", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
            .then(getPosts)
    }

    const deletePost = postId => {
        return fetch(`http://localhost:8000/posts/${postId}`, {
            method: "DELETE",
            headers: {"Authorization": `Token ${localStorage.getItem("rare_token")}`},
        })
            .then(getPosts)
    }

    const getPostsByCategoryId = category_id => {
        return fetch(`http://localhost:8000/posts?category_id=${category_id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`
            }
        })
            .then(res => res.json())
            .then(setPosts);
    };

    const updatePost = post => {
        return fetch(`http://localhost:8000/posts/${post.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
            .then(getPosts)

    }

    const getPostsByUser = (id) => {
        return fetch(`http://localhost:8000/posts?rareuser_id=${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`
            }
        })
            .then(res => res.json())
            // .then(setPosts)
    }

    return (
        <PostContext.Provider value={{
            posts, addPost, getPostById, getLastPost, deletePost, updatePost, getPosts, getPostsByCategoryId, getPostsByUser
        }}>
            {props.children}
        </PostContext.Provider>
    )

}