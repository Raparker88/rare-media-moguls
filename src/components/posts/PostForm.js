import React, { useContext, useState, useEffect } from "react"
import { PostContext } from "./PostProvider"
import { CategoryContext } from "../categories/CategoryProvider"
import { PostTagContext } from "../PostTags/PostTagProvider"
import { TagContext } from "../tags/TagProvider"
import { TagBoxes } from "../tags/TagCheckbox"

export const PostForm = (props) => {
    const { posts, getPosts, addPost, updatePost } = useContext(PostContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const { tags, getTags } = useContext(TagContext)
    const [selectedTags, setTags] = useState([])
    const [post, setPost] = useState({rareuser: {}, category: {}})
    const [base64, setBase64] = useState(null)
    
    const editMode = props.match.params.hasOwnProperty("postId")
    
    const handleControlledInputChange = (eve) => {
        const newPost = Object.assign({}, post)
        newPost[eve.target.name] = eve.target.value
        setPost(newPost)
    }

    const getPostInEditMode = () => {
        if (editMode) {
            const postId = parseInt(props.match.params.postId)
            const selectedPost = posts.find(p => p.id === postId) || {}
            setPost(selectedPost)
        }
    }

    useEffect(() => {
        getPosts()
        .then(getCategories)
        .then(getTags)
    }, [])

    useEffect(() => {
        getPostInEditMode()
    }, [posts])

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createPostImageJSON = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            setBase64(base64ImageString)
        });
    }

    const constructNewPost = () => {
        if (post.title && post.category_id && post.content) {
            if (editMode) {
                updatePost({
                    id: post.id,
                    title: post.title,
                    content: post.content,
                    category_id: parseInt(post.category_id),
                    publication_date: post.publication_date,
                    post_img: base64
                }).then(() => {
                    props.history.push(`/posts/${post.id}`)
                })
            } else {
                const newPostObject = {
                    title: post.title,
                    content: post.content,
                    category_id: parseInt(post.category_id),
                    publication_date: new Date(Date.now()).toISOString().split('T')[0],
                    post_img: base64,
                    selected_tags: selectedTags

                }
                addPost(newPostObject)
                    .then(resId => {
                        props.history.push(`/posts/${resId}`)
                    })
            }
        } else {
            window.alert("please fill in all fields")
        }

    }
    return (

        <form className="form new_post_form" id="postForm">
            <h2 className="postForm_title">{editMode ? "Update Post" : "Create a New Post"}</h2>
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
                <div className="header-image-div">
                    {editMode && post.image_url != null ? <img src={post.image_url}></img> : null}
                    <label htmlFor="profile_img">Select a header image for this post</label>
                    <input type="file" id="profle_image" name="profile_img"
                        onChange={(evt) => {
                            createPostImageJSON(evt)
                    }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-div">
                    <label htmlFor="category_id">Post Category: </label>
                        <select name="category_id" className="form-control" id="post"
                            proptype=""
                            value={post.category_id}
                            onChange={handleControlledInputChange}>
                            <option value="0">Choose a category...</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.label}
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

            <div className="tag-container">
                {
                    tags.map(t => <TagBoxes tag={t} selectedTags={selectedTags} setTags={setTags}  post={post} editMode={editMode} {...props} />)
                }

            </div>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewPost()

                }}
                className="btn post_submit_btn">
                Save Post
            </button>

        </form >
    )
}