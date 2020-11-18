import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { PostContext } from "./PostProvider"
import "./Post.css";
import {AdminPostApproval} from "./AdminPostApproval"
import { UserContext } from "../users/UserProvider";


export const PostList = (props) => {
    const {posts, getPosts} = useContext(PostContext)
    const {currentUser, getCurrentUser} = useContext(UserContext)

    const onlyApprovedPosts = posts.filter(p => p.approved === true)

    useEffect(() => {
        getPosts()
        getCurrentUser()
    },[])

    return (
        <>
        <h2 className="posts-site-title">Rare</h2>
                    <button
                    className="btn newPostbtn"
                    onClick={() => {
                        props.history.push(`/new_post/`)
                        window.location.reload()
                    }}>Add Post +</button>
        <div className="mainPostContainer">
            {
                posts !== [] ?  
                    currentUser.is_staff === true ?
                        posts.map(p => { 
                        return <div className="post-list-single" key={p.id}>
                        <Link className="postLink" to={{pathname:`/posts/${p.id}`}}>
                            <p>{p.title}</p>
                        </Link>
                        <p style={{ marginLeft: '.5rem' }} className="publication-date">Publication Date {new Date(p.publication_date).toDateString()}</p>
                        <img className="post-img" src="https://via.placeholder.com/300x150.png"></img>
                        <div className="post-author">
                            <p>Author: {p.rareuser.full_name}</p>
                        </div>
                        <p>Posted in <b>{p.category.label}</b></p>
                        <AdminPostApproval post = {p}/>
                        </div>
                        })
                    : onlyApprovedPosts.map(p=> {
                        return <div key={p.id}>
                        <div className="post-author">
                            <p>{p.rareuser.full_name}</p>
                            <p style={{ marginLeft: '.5rem' }} >• {new Date(p.publication_date).toDateString()}</p>
                        </div>
                        <Link className="postLink" to={{pathname:`/posts/${p.id}`}}>
                        <p>{p.title}</p>
                        </Link>
                        <p>Posted in <b>{p.category.label}</b></p>
                        </div>
                    })
                : null
            }
        </div>
        </>
    )
}