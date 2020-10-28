import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PostContext } from "./PostProvider"
import { Post } from "./Post"

export const UserPostList = (props) => {
    const { getPostsByUser } = useContext(PostContext)
    const [posts, setPosts] = useState([])

    console.log(posts, "POSTS in userpostlist")
    
    useEffect(()=>{
        const currentUserId = localStorage.getItem("rare_user_id")
        getPostsByUser(currentUserId)
            .then(setPosts)
    }, [])

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