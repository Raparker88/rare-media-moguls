import React, { useState, useEffect } from "react"
export const ReactionContext = React.createContext()

export const ReactionProvider = (props) => {
    const [reactions, setReactions] = useState([])

    const getReactionsByPost = (postId) => {
        return fetch(`http://localhost:8000/reactions?post_id=${postId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setReactions)
    }

    const addReaction = (reactionId, postIdObj) => {
        return fetch(`http://localhost:8000/reactions/${reactionId}/react`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postIdObj)
        })
    }


    return (
        <ReactionContext.Provider value={{
            reactions, getReactionsByPost, addReaction
        }}>
            {props.children}
        </ReactionContext.Provider>
    )
}