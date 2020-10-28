import React from "react"

export const CurrentPostTags = ({tag}) => {

    return (
        <div className="current-post-tag">
            <h4>#{tag.tag.tag}</h4>
        </div>
    )
}