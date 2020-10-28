import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PostContext } from "./PostProvider"
import { Post } from "./Post"

export const UserPostList = (props) => {
    const { getPostsByUser, posts } = useContext(PostContext)



    return (
        <>
            <h2>Posts</h2>
            {/* <Link to={{pathname:`new_post`}}>
            create post
            </Link> */}
            {posts !== []
                ? posts.map(p => {
                    return <Post
                            key={p.id}
                            post={p}
                            {...props} />
                    })
                : null
            }
        </>
    )
}