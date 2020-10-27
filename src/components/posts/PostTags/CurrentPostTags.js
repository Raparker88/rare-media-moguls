import React from "react"

export const CurrentPostTags = ({tag}) => {

    return (
        <div className="current-post-tag">
            <h4>{tag.id}</h4>
        </div>
    )
}