import React, {useRef} from 'react'
import "./Post.css";


export const Post = (props) => {
    const dotdotdot = useRef(null)

    return (
        <>
        <div className="post-item">
            <div className="upperhalf">
                <div className="post-title-cont">
                    {props.areYouSure
                    ?
                    <div className="are-u-sure">
                    Are You Sure You Want To Delete This Post?
                    </div>
                    :
                    <span className="post-title" onClick={()=>{
                        props.history.push(`/posts/${props.post.id}`)}}>
                        {props.post.title}
                    </span>
                    }
                </div>
            </div>
            <div className="lowerhalf">
                <div className="lowerhalf-left">
                    <div>{props.post.user.display_name}</div>
                    <div className="posted-in">
                    <div>Posted in </div>
                        <div className="cat-on-post">{props.post.category.category}</div>
                    </div>
                    <div className="dot-div"></div>
                    <div>{new Date(props.post.publication_date).toDateString({})}</div>
                </div>
                <div className="lowerhalf-right">
                    {props.open
                    ?<>
                    <div className="post-buttons">
                        <div className="close-btn btn"
                        onClick={()=>{
                            props.setAreYouSure(false)
                            props.toggleOpen()
                            props.toggleSelected(props.post)}}>
                            <div className="dot-w"></div>
                            <div className="dot-w"></div>
                            <div className="dot-w"></div>
                        </div>
                        {props.areYouSure
                        ? <>
                        <button className="btn nvm" onClick={()=>{
                            props.setAreYouSure(false)}}>
                            nvm
                        </button>
                        <button className="btn del-sure" onClick={()=>
                            {props.deletePost(props.selectedPostId).then(()=>{props.history.push(`/posts/user/${props.currentUserId}`)})}}>
                            yes
                            </button>
                        </>
                        : <>
                        <button className="btn edit-my-post" onClick={()=>{
                            props.history.push(`/posts/edit/${props.selectedPostId}`)}}>
                            edit
                        </button>
                        <button className="btn del-my-post" onClick={()=>{props.setAreYouSure(true)}}>
                            delete
                        </button>
                        </>
                        }
                    </div>
                    </>
                    :<>
                        <div className="dot-dot-dot" onClick={()=>{
                            props.setAreYouSure(false)
                            props.toggleOpen()
                            props.toggleSelected(props.post)}}>
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                    </>
                    }
                </div>
            </div>
        </div>
        </>
        )
}