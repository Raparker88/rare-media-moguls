import React, { useContext, useEffect, useState, useRef } from "react"
import { PostContext } from "./PostProvider"
import { ReactionContext } from "../reactions/ReactionProvider"
import "./Post.css"
import { PostTags } from "../PostTags/PostTags"
import { Link } from "react-router-dom"
import { UserContext } from "../users/UserProvider"


export const PostDetails = (props) => {
    const { getPostById, deletePost, publishPost, post } = useContext(PostContext)
    const { reactions, getReactionsByPost, addReaction } = useContext(ReactionContext)
    const { currentUser, getCurrentUser } = useContext(UserContext)


    const deletePostDialog = useRef(null)

    useEffect(() => {
        const postId = parseInt(props.match.params.postId)
        getReactionsByPost(postId)
        getPostById(postId)
    }, [])

    useEffect(() => {
        getCurrentUser()
    }, [])


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
                                .then(() => getPostById(post.id))
                        }}>{post.publication_date == null ? "Publish" : "Unpublish"}</button>

                </div>
            )
        } else if (currentUser.is_staff === true) {
            return (<div className="postButtonContainer">
                <button
                    className="btn-small fa fa-trash"
                    onClick={() => {
                        deletePostDialog.current.showModal()
                    }}></button>
            </div>
            )
        }
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
                    <div className="postTitleContainer">
                        {editDeleteButtons()}
                        <h2 className="postTitle">{post.title}</h2>
                        <p>{post.category.label}</p>

                    </div>
                    {post.image_url ? 
                        <div className="img-div">
                            <img className="post-img" src={post.image_url}></img>
                        </div>
                        :null
                    }
                    <div className="author_date_container">
                        <h3 className="authorName"><Link className="postLink" to={ `/users/${post.rareuser.id}` }>
                            by {post.rareuser.username} </Link></h3>
                        {/* <div className="commentButtonContainer"> */}
                            <button
                                className="btn postEditBtn"
                                onClick={() => {
                                    props.history.push(`/comments/${post.id}`)
                                }}>View Comments</button>
                        
                        <div className='reactionContainer'>
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
                    </div>
                    <div className="postContent">
                        <p>{post.content}</p>
                    </div>
                </div>
                <div className="postTagContainer">
                    <PostTags postId={post.id} isUserAuthor={post.is_user_author} />
                </div>

            </div>
        </>
    )
}
