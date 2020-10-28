import React from "react"

export const Comment = ({comment}) => {

    const handleDate = (date) => {
        if ("timestamp" in comment) {
            return new Date(date).toDateString()
        }
    }

    return (
        <>
        <section className="comment">
                <div className="comment_user">{comment.user.display_name}</div>
                <div className="comment_subject">{comment.subject}</div>
                <div className="comment_content">{comment.content}</div>
                <div className="comment_date">{handleDate(comment.timestamp)}</div>

                <button className=" btn editTagButton">
                    Edit
                </button>
                <button className="btn deleteTagButton">
                    Delete
                </button>
        </section> 
        </>
    )
}