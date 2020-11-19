import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { Post } from "./Post"
import "./Post.css";


export const UserPostList = (props) => {
    const { getPostsByUser, deletePost, getPostsByAuthor} = useContext(PostContext)
    const [posts, setPosts] = useState([])
    const [selectedPostId, setSelectedPostId] = useState(0)
    const [open, setOpen] = useState(false)
    const [areYouSure, setAreYouSure] = useState(0)

    const seeAllPostsByAuthor = props.match.params.hasOwnProperty("userId")

    useEffect(()=>{
        if(seeAllPostsByAuthor){
            getPostsByAuthor(parseInt(props.location.state.name))
                .then(setPosts)
        } else{
            getPostsByUser()
                .then(setPosts)
        }
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
                    props.history.push(`/new_post`)
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
                                {...props} />
                        })
                    : null
                }
            </div>
        </>
    )
}