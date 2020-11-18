import React, { useContext, useEffect, useState, useRef } from "react"
import { PostContext } from "./PostProvider"
import { ReactionContext } from "../reactions/ReactionProvider"
import "./Post.css"
import { PostTags } from "../PostTags/PostTags"
import { Link } from "react-router-dom"
import { UserContext } from "../users/UserProvider"


export const PostDetails = (props) => {
    const { getPostById, deletePost, publishPost } = useContext(PostContext)
    const { reactions, getReactionsByPost, addReaction } = useContext(ReactionContext)
    const {currentUser, getCurrentUser} = useContext(UserContext)

    const [post, setPost] = useState({ rareuser: {} })

    const deletePostDialog = useRef(null)

    useEffect(() => {
        const postId = parseInt(props.match.params.postId)
        getReactionsByPost(postId)
        getPostById(postId)
            .then(setPost)
    }, [])

    useEffect(() => {
        getCurrentUser()
    }, [])

    const handleDate = (date) => {
        if ("publication_date" in post) {
            if (post.publication_date != null){
                return new Date(date.concat("T00:00:00")).toDateString()
            }else{
                return "currently unpublished"
            }
        }
    }

    const editDeleteButtons = () => {
        if (post.is_user_author) {
            return (
                <div className="postButtonContainer">
                    <button
                        className="btn-small fa fa-edit"
                        onClick={() => {
                            props.history.push(`/posts/edit/${post.id}`)
                        }}></button>
                    <button
                        className="btn-small fa fa-trash"
                        onClick={() => {
                            deletePostDialog.current.showModal()
                        }}></button>
                    <button
                        className="btn-small publishBtn"
                        onClick={() => {
                            publishPost(post.id)
                            .then(window.location.reload())
                        }}>{post.publication_date == null ? "Publish" : "Unpublish" }</button>
                    
                </div>
            )
        } else if (currentUser.is_staff === true) {
           return ( <div className="postButtonContainer">
                <button
                    className="btn-small fa fa-trash"
                    onClick={() => {
                        deletePostDialog.current.showModal()
                    }}></button>
            </div>
            )}
    }

    return (
        <>
            <dialog className="dialog dialog--deletePost" ref={deletePostDialog}>
                <div>Are you sure you want to delete this post?</div>
                <button className="button--closeDialog btn" onClick={e => deletePostDialog.current.close()}>Close</button>
                <button className="button--deleteDialog btn"
                    onClick={e => {
                        deletePost(post.id)
                        props.history.push("/")
                    }}>Delete Post</button>
            </dialog>
            <div className="postFlex">
                <div className="flexLeftSpace"></div>
                <div className="postDetailContainer">
                    <h2 className="postTitle">{post.title}</h2>
                    <div className="author_date_container">
                        <h3 className="authorName"><Link className="postLink" to={{ pathname: `` }}>
                            by {post.rareuser.username} </Link></h3>
                        <h3>{handleDate(post.publication_date)}</h3>
                        {reactions.map(r =>
                            <>
                                <img className="reaction-img" src={r.image_url} width="30" height="30"
                                    onClick={() => {
                                        const postIdObj = { post_id: post.id }
                                        addReaction(r.id, postIdObj)
                                            .then(() => {
                                                getReactionsByPost(post.id)
                                            })
                                    }}></img>
                                <p>{r.count}</p>
                            </>)}
                    </div>
                    <div className="postContent">
                        <p>{post.content}</p>
                    </div>
                    {editDeleteButtons()}
                    <div className="commentButtonContainer">
                        <button
                            className="btn postEditBtn"
                            onClick={() => {
                                props.history.push(`/comments/${post.id}`)
                            }}>View and Add Comments</button>
                    </div>
                </div>
                <div className="postTagContainer">
                    <PostTags postId={post.id} />
                </div>

            </div>
        </>
    )
}
