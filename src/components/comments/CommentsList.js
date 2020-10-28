import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Comment } from "./Comment"
import { CommentContext } from "./CommentProvider"

export const CommentsListByPost = (props) => {
    const {getCommentsByPostId} = useContext(CommentContext)

    const [postComments, setComments] = useState([])
    
    const postId =parseInt(props.match.params.postId)

    const getCommentsForPost = () => {
        getCommentsByPostId(postId)
            .then(setComments)
    }

    useEffect(() => {
       getCommentsForPost()
    }, [])

    return (
        <>
            <Link className="linkToPostDetails" to={`/posts/${postId}`}>Back to Post</Link>
            <section className="comments">
               {
                   postComments.map(comment => {
                    return <Comment key={comment.id} comment={comment} {...props} />
                   })
               }
           </section>
        </>
    )
}