import React, { useContext, useEffect, useRef } from 'react'
import { ReactionContext } from '../reactions/ReactionProvider';
import "./Post.css";
import { PostContext } from './PostProvider';


export const Post = (props) => {
    const {deletePost} = useContext(PostContext)
    const { reactions } = useContext(ReactionContext)
    const deletePostDialog = useRef(null)

    const editDeleteButtons = () => {
        if (props.post.is_user_author) {
            return (
                <div className="postButtonContainer">
                    <button
                        className="btn-small fa fa-edit"
                        onClick={() => {
                            props.history.push(`/posts/edit/${props.post.id}`)
                        }}></button>
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
            <div className="post-item">
                <div className="upperhalf">
                    <dialog className="dialog dialog--deletePost" ref={deletePostDialog}>
                        <div>Are you sure you want to delete this post?</div>
                        <button className="button--closeDialog btn" onClick={e => deletePostDialog.current.close()}>Close</button>
                        <button className="button--deleteDialog btn"
                            onClick={e => {
                                deletePost(props.post.id)
                                props.history.push("/users/posts")
                            }}>Delete Post</button>
                    </dialog>
                    <div className="post-title-cont">
                        <span className="post-title" onClick={() => {
                            props.history.push(`/posts/${props.post.id}`)
                        }}>
                            {props.post.title}
                        </span>
                    </div>
                    <div className="postDate">
                        {props.post.publication_date != null ?
                            new Date(props.post.publication_date.concat("T00:00:00")).toDateString({}) : "unpublished"}
                    </div>
                </div>
                <div className="middle">
                {props.post.image_url ? 
                            <div className="divImg-postList">
                                <img className="img-postList" src={props.post.image_url}></img>
                            </div>    
                            :null
                 }
                 </div>
                <div className="lowerhalf">
                     <div>Author: {props.post.rareuser.username}</div>
                     {/* <div className="reactions">
                     {reactions.map(r =>
                            <>
                                <img className="reaction" src={r.image_url} width="30" height="30"></img>

                                <p>{r.count}</p>
                            </>)}
                     </div> */}
                {editDeleteButtons()}
                </div>
            </div>
        </>
    )
}