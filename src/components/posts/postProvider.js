import React, {useState} from "react"


export const PostContext = React.createContext()

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])

    const getPosts = () => {
        return fetch("http://localhost:8000/posts")
            .then(res => res.json())
            .then(res => res.sort(compare))
            .then(setPosts)
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

    return (
        <PostContext.Provider value={{
            posts, addPost
        }}>
            {props.children}
        </PostContext.Provider>
    )

}