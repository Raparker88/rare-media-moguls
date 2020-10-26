import React, { useContext, useState, useEffect, useRef } from "react"
import { PostContext } from "./PostProvider"
import { CategoryContext } from "../categories/CategoryProvider"

export const PostForm = (props) => {

    const { addPost, getLastPost } = useContext(PostContext)
    const { categories, getCategories } = useContext(CategoryContext)

    const [post, setPost] = useState({})

    const handleControlledInputChange = (eve) => {
        const newPost = Object.assign({}, post)
        newPost[eve.target.name] = eve.target.value
        setPost(newPost)
    }

    useEffect(() => {
        getCategories()
    }, [])

    const constructNewPost = () => {
        if(post.title && post.category_id && post.content){
            const newPostObject = {
                title: post.title,
                content: post.content,
                category_id: parseInt(post.category_id),
                user_id: parseInt(localStorage.getItem("rare_user_id")),
                publication_date: Date.now()
            }
            addPost(newPostObject)
        }else{
            window.alert("please fill in all fields")
        }

    }
    return (

        <form className="form new_post_form" id="postForm">
            <h2 className="postForm_title">Create a New Post</h2>
            <fieldset>
                <div className="form-div">
                    <label htmlFor="title">Post Title: </label>
                    <input type="text" name="title" required className="form-control" id="title"
                        proptype="varchar"
                        placeholder="title"
                        defaultValue={post.title}
                        onChange={handleControlledInputChange}>
                    </input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-div">
                    <label htmlFor="category_id">Post Category: </label>
                    <select name="category_id" className="form-control" id="post"
                        proptype=""
                        value={post.category_id}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a category</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.category}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-div">
                    <label htmlFor="content">Post: </label>
                    <textarea type="text" name="content" required className="form-control" id="content"
                        proptype="varchar"
                        placeholder="post content"
                        defaultValue={post.content}
                        onChange={handleControlledInputChange}>
                    </textarea>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewPost()
                    getLastPost()
                        .then(lastPost => props.history.push(`/posts/${lastPost.id}`))
                }}
                className="btn post_submit_btn">
                Save Post
            </button>

        </form>
    )
}