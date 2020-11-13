import React, {useState} from "react"


export const CommentContext = React.createContext()

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([])

    const getComments = () => {
        return fetch("http://localhost:8000/comments",{
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`
            }
        }
        )
            .then(res => res.json())
            .then(setComments)
    }

    const getCommentById = (id) => {
        return fetch(`http://localhost:8000/comments/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`
            }
        })
            .then(res => res.json())
    }

    const getCommentsByPostId = (postId) => {
        return fetch(`http://localhost:8000/comments?post_id=${postId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`
            }
        })
            .then(res => res.json())
    }

    const addComment = comment => {
        return fetch("http://localhost:8000/comments", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
        .then(getComments)
    }

    const deleteComment = id => {
        return fetch(`http://localhost:8000/comments/${id}`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_token")}`
            }
        })
            .then(getComments)
    }

    const updateComment = (comment_id, comment) => {
        return fetch(`http://localhost:8000/comments/${comment_id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
            .then(getComments)
    }



    return (
        <CommentContext.Provider value={{
            comments, getComments, getCommentById, addComment, deleteComment, getCommentsByPostId, updateComment
        }}>
            {props.children}
        </CommentContext.Provider>
    )

}