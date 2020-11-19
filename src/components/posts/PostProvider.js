import React, { useState } from "react"

export const PostContext = React.createContext()

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])
    const [post, setCurrentPost] = useState({rareuser:{}, category:{}})

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
            .then(setCurrentPost)
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
            .then(res => res.json())
            .then((res) => {
                getPosts()
                return res.id})
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
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
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

    const getPostsByUser = () => {
        return fetch(`http://localhost:8000/users/posts`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`
            }
        })
            .then(res => res.json())
    }

    const adminPostApproval = (post) => {
        return fetch(`http://localhost:8000/posts/${ post.id }/approval`, {
            method: "PUT",
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
            .then(getPosts)

    }

    const publishPost = (postId) => {
        return fetch(`http://localhost:8000/posts/${ postId }/publish`, {
            method: "PATCH",
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(getPosts)
    }

    const getPostsByAuthor = (userId) => {
        return fetch(`http://localhost:8000/posts?rareuser_id=${userId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`
            }
        })
            .then(res => res.json())
    }

    return (
        <PostContext.Provider value={{
            posts, addPost, getPostById, deletePost, updatePost, getPosts,
            getPostsByCategoryId, getPostsByUser, adminPostApproval, publishPost, post, getPostsByAuthor, setPosts
        }}>
            {props.children}
        </PostContext.Provider>
    )

}