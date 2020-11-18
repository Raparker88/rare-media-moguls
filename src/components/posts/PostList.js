import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PostContext } from "./PostProvider"
import "./Post.css";
import {AdminPostApproval} from "./AdminPostApproval"
import { UserContext } from "../users/UserProvider";


export const PostList = (props) => {
    const {posts, getPosts, getPostsByCategoryId} = useContext(PostContext)
    const {currentUser, getCurrentUser} = useContext(UserContext)

    const onlyApprovedPosts = posts.filter(p => p.approved === true)

    const [filteredPosts, setFilteredPosts] = useState([]) 

    useEffect(() => {
        getCurrentUser()
        .then(getPosts())
    }, [])

    useEffect(() => {
        if(props.match.params.categoryId) {
            const categoryId = parseInt(props.match.params.categoryId)
            const filtered = posts.filter(p => {
                if( currentUser.is_staff) {
                    return (p.category_id === categoryId)
                } else {
                    if (p.approved){
                        return p 
                    }
                }
            })
            setFilteredPosts(filtered) 
        } else {
            setFilteredPosts(posts)
        }
    }, [posts])


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
                filteredPosts !== [] ?  
                    filteredPosts.map(p => { 
                        if (p.approved)
                        return <div key={p.id}>
                        <div className="post-author">
                            <p>{p.rareuser.full_name}</p>
                            <p style={{ marginLeft: '.5rem' }} >• {new Date(p.publication_date).toDateString()}</p>
                        </div>
                        <Link className="postLink" to={{pathname:`/posts/${p.id}`}}>
                        <p>{p.title}</p>
                        </Link>
                        <p>Posted in <Link to={{pathname:`/posts/category/${p.category.id}`}}><b>{p.category.label}</b></Link></p>
                        {currentUser.is_staff
                        ?
                        <AdminPostApproval post = {p}/>
                        : null
                        }
                        </div>
                        })
                : null
            }
        </div>
        </>
    )
}