import React, {useState} from "react"


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

    const deletePost = postId => {
        return fetch(`http://localhost:8000/posts/${postId}`, {
            method: "DELETE"
        })
            .then(getPosts)
    }

    const getPostsByCategoryId = category_id => {
        return fetch(`http://localhost:8000/posts?category_id=${category_id}`)
            .then(res => res.json())
            .then(setPosts);
    };

    return (
        <PostContext.Provider value={{
            posts, addPost, getPosts, getPostById, getLastPost, deletePost, getPostsByCategoryId
        }}>
            {props.children}
        </PostContext.Provider>
    )

}