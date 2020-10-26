import React from "react"

export const PostList = (props) => {
    return (
        <>
        <button onClick={() => props.history.push("/post/create")}>
                Add New Post
            </button>
        </>
    )
}