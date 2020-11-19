import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PostContext } from "./PostProvider"
import "./Post.css";
import {AdminPostApproval} from "./AdminPostApproval"
import { UserContext } from "../users/UserProvider";


export const SubscribedPostList = (props) => {
    const {posts, getPosts, getPostsByCategoryId} = useContext(PostContext)
    const {currentUser, followedAuthors, getCurrentUserSubscriptions } = useContext(UserContext)
    const [isCategory, setIsCategory] = useState(false)
    const [postsBySubscribed, setPostsBySubscribed] = useState([])
    const [approvedAndUserCreatedPosts, setApprovedAndUserCreatedPosts] = useState([])
    const [postsForAdmins, setPostsForAdmins] = useState([])

    useEffect(()=>{
        getCurrentUserSubscriptions()
        getPosts()
    }, [])

    useEffect(()=>{
        const bySubscription = getSubscribed(posts, followedAuthors)
        setPostsBySubscribed(bySubscription)
    }, [posts])

    useEffect(()=>{
        const aaucp = postsBySubscribed.filter(p => p.publication_date != null && p.approved || p.is_user_author )
        const pfa = postsBySubscribed.filter(p => p.publication_date != null || p.is_user_author)
        setApprovedAndUserCreatedPosts(aaucp)
        setPostsForAdmins(pfa)
    }, [postsBySubscribed])

    useEffect(() => {
        if(props.match.params.categoryId) {
            setIsCategory(true)
            const categoryId = parseInt(props.match.params.categoryId)
            getPostsByCategoryId(categoryId)
        }
        else{
            getPosts()
        }
    },[])

// function to get only posts where current user is subscribed
    const getSubscribed = (posts, authors) =>{
        const subscribedPostArray = []
        authors.forEach(author=>{
            posts.forEach(post=>{
                if(post.rareuser.id === author.id){
                    subscribedPostArray.push(post)
                }
            })
        })
        return subscribedPostArray
    }
//return
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
                        postsForAdmins.map(p => {
                        return <div className="post-list-single" key={p.id}>
                        <div className="post-list-top">
                            <Link className="postLink" to={{pathname:`/posts/${p.id}`}}>
                                <p className="post-title">{p.title}</p>
                            </Link>
                            <p style={{ marginLeft: '.5rem' }} className="publication-date">Publication Date
                             {p.publication_date ? new Date(p.publication_date).toDateString() : " unpublished"}</p>
                        </div>
                        {p.image_url ?
                            <div className="divImg-postList">
                                <img className="img-postList" src={p.image_url}></img>
                            </div>
                            :null
                        }
                        <div className="post-author">
                            <p className="author-name"
                            onClick={()=>{
                                props.history.push(`/users/${p.rareuser.id}`)
                            }}>
                                {p.rareuser.full_name}
                                </p>
                        </div>
                        <p>Posted in <Link to={{pathname:`/posts/category/${p.category.id}`}}><b>{p.category.label}</b></Link></p>
                        <AdminPostApproval post = {p} isCategory = {isCategory} categoryId = {p.category.id}/>
                        </div>
                        })
                    : approvedAndUserCreatedPosts.map(p=> {
                        return <div key={p.id}>
                        <div className="post-author">
                            <p className="author-name"
                                onClick={()=>{
                                    props.history.push(`/users/${p.rareuser.id}`)
                                }}>
                                    {p.rareuser.full_name}
                            </p>
                            <p style={{ marginLeft: '.5rem' }} >• {p.publication_date ? new Date(p.publication_date).toDateString() : "unpublished"}</p>
                        </div>
                        <Link className="postLink" to={{pathname:`/posts/${p.id}`}}>
                        <p>{p.title}</p>
                        </Link>
                        <p>Posted in <Link className="cat-link" to={{pathname:`/posts/category/${p.category.id}`}}><b>{p.category.label}</b></Link></p>
                        </div>
                    })
                : null
            }
        </div>
        </>
    )
}