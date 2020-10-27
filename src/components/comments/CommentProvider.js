import React, {useState} from "react"


export const CommentContext = React.createContext()

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([])

    const getComments = () => {
        return fetch("http://localhost:8000/comments")
            .then(res => res.json())
            .then(setComments)
    }

    const getCommentById = (id) => {
        return fetch(`http://localhost:8000/comments/${id}`)
            .then(res => res.json())
    }

    const getCommentsByPostId = (postId) => {
        return fetch(`http://localhost:8000/comments?post_id=${postId}`)
            .then(res => res.json())
    }

    const addComment = comment => {
        return fetch("http://localhost:8000/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
        .then(getComments) 
    }

    const deleteComment = id => {
        return fetch(`http://localhost:8000/comments/${id}`, {
            method: "DELETE"
        })
            .then(getComments)
    }

   

    return (
        <CommentContext.Provider value={{
            comments, getComments, getCommentById, addComment, deleteComment, getCommentsByPostId
        }}>
            {props.children}
        </CommentContext.Provider>
    )

}