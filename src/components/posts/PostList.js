import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PostContext } from "./PostProvider"
import "./Post.css";
import {AdminPostApproval} from "./AdminPostApproval"
import { UserContext } from "../users/UserProvider";


export const PostList = (props) => {
    const {posts, getPosts, getPostsByCategoryId} = useContext(PostContext)
    const {currentUser, getCurrentUser} = useContext(UserContext)
    const [isCategory, setIsCategory] = useState(false)

    const approvedAndUserCreatedPosts = posts.filter(p => p.publication_date != null && p.approved || p.is_user_author )
    const postsForAdmins = posts.filter(p => p.publication_date != null || p.is_user_author)

    useEffect(() => {
        if(props.match.params.categoryId) {
            setIsCategory(true)
            const categoryId = parseInt(props.match.params.categoryId)
            getPostsByCategoryId(categoryId)
        }else {
            getPosts()
            getCurrentUser()
        }
    },[])


    return (
        <>
        <div className="mainPostContainer">
            <h2>Posts</h2>
            <button
                    className="btn newPostbtn"
                    onClick={() => {
                        props.history.push(`/new_post/`)
                        window.location.reload()
                    }}>Create New Post</button>
            {
                posts !== [] ?
                    currentUser.is_staff === true ?
                        postsForAdmins.map(p => { 
                        return <div key={p.id}>
                        <div className="post-author">
                            <p>{p.rareuser.full_name}</p>
                            <p style={{ marginLeft: '.5rem' }} >• {p.publication_date ? 
                            new Date(p.publication_date.concat("T00:00:00")).toDateString() : "unpublished"}</p>
                        </div>
                        <Link className="postLink" to={{pathname:`/posts/${p.id}`}}>
                        <p>{p.title}</p>
                        </Link>
                        <p>Posted in <Link to={{pathname:`/posts/category/${p.category.id}`}}><b>{p.category.label}</b></Link></p>
                        <AdminPostApproval post = {p} isCategory = {isCategory} categoryId = {p.category.id}/>
                        </div>
                        })
                    : approvedAndUserCreatedPosts.map(p=> {
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