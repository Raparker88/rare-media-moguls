import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"

export const PostTags = (props) => {
    const { getPostById } = useContext(PostContext)

    return (
        <div className="post-tag-container">
            <h3>TAGGED AS</h3>
            <button>manage tags</button>
            <div className="current-post-tags">
                <h4>#tag</h4>
                <h4>#tag</h4>
            </div>
            <div className="modify-tags-container">
                <input type="checkbox" id="first-tag"></input>
                <label for="#first-tag">#tag</label>
            </div>
        </div>
    )
}