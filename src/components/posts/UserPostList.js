import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PostContext } from "./PostProvider"
import { Post } from "./Post"
import "./Post.css";


export const UserPostList = (props) => {
    const { getPostsByUser, deletePost } = useContext(PostContext)
    const [posts, setPosts] = useState([])
    const currentUserId = localStorage.getItem("rare_user_id")

    const [selectedPostId, setSelectedPostId] = useState(0)
    const [open, setOpen] = useState(false)
    const [areYouSure, setAreYouSure] = useState(false)


    useEffect(()=>{
        getPostsByUser(currentUserId)
            .then(setPosts)
    }, [])

    const toggleSelected = (e)=>{
        if(selectedPostId !== e.id){
            setSelectedPostId(e.id)
        }
        else{
            setSelectedPostId(0)
        }
    }
    const toggleOpen = () => {
        if (open){
            setOpen(false)
        }
        else{
            setOpen(true)
        }
    }
    return (
        <>
            <div className="mainPostContainer">
                <div className="my-posts-heading">My Posts</div>
                <button className="btn newPostbtn"
                onClick={()=>{
                    props.history.push(`new_post`)
                }}>
                    Create New Post
                </button>
                {posts !== []
                    ? posts.map(p => {
                        return <Post
                                key={p.id}
                                post={p}
                                open={open}
                                toggleOpen={toggleOpen}
                                selectedPostId={selectedPostId}
                                setSelectedPostId={setSelectedPostId}
                                toggleSelected={toggleSelected}
                                deletePost={deletePost}
                                setAreYouSure={setAreYouSure}
                                areYouSure={areYouSure}
                                currentUserId={currentUserId}
                                {...props} />
                        })
                    : null
                }
            </div>
        </>
    )
}