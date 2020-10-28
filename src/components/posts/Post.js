import React from 'react'

export const Post = (props) => {
    return (
        <div className="post-item">
            <div className="post-title-cont">
                <span className="post-title" onClick={props.history.push(`/posts/${props.post.id}`)}>
                    {props.post.title}
                </span>
            </div>
            <div>{props.post.user.display_name}</div>
            <div>Posted in {props.post.category.category}</div>
            <div>{new Date(props.post.publication_date).toDateString()}</div>
        </div>
    )
}