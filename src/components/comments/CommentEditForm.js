import React, { useContext, useState } from "react"
import { CommentContext } from "./CommentProvider"
import "./Comment.css"

export const CommentEditForm = (props) => {

    const { updateComment } = useContext(CommentContext)

    const [editedComment, setEditedComment] = useState(props.comment)

    const handleControlledInputChange = (eve) => {
        const newComment = Object.assign({}, editedComment)
        newComment[eve.target.name] = eve.target.value
        setEditedComment(newComment)
    }

    const constructNewComment = () => {
        const post_id = props.postId
        if(editedComment.subject && editedComment.content){
            const newCommentObject = {
                subject: editedComment.subject,
                content: editedComment.content,
                post_id,
                user_id: parseInt(localStorage.getItem("rare_user_id")),
            }
            updateComment(props.comment.id,  newCommentObject)
                .then(props.getCommentsForPost)
        }else{
            window.alert("please fill in all fields")
        }

    }

    return (
        <div>
        <div>Edit Comment</div>
        <form className="form new_comment_form" id="commentForm">
                <div className="form-div">
                    <input type="text" name="subject" required className="form-control" id="subject"
                        proptype="varchar"
                        placeholder="New comment subject"
                        defaultValue={props.comment.subject}
                        onChange={handleControlledInputChange}>
                    </input>
                </div>
                <div className="form-div">
                    <textarea type="text" name="content" required className="form-control comment-content-input" id="content"
                        proptype="varchar"
                        placeholder="What are your thoughts?"
                        defaultValue={props.comment.content}
                        onChange={handleControlledInputChange}>
                    </textarea>
                </div>
            </form>
                <button className="button--deleteDialog btn"
                    onClick={e => {
                        updateComment(props.comment.id, editedComment)
                            .then(props.getCommentsForPost)
                        constructNewComment()
                        props.editCommentDialog.current.close()
                    }}>Save</button>
                    <button className="button--closeDialog btn" onClick={e => props.editCommentDialog.current.close()}>Cancel</button>
                    </div>
    )
}