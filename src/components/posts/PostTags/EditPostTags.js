import React from "react"

export const EditPostTags = ({tag}) => {

    return (
        <div className="modify-tags-container">
            <label>
                <input type="checkbox" id="first-tag"></input>
                {tag.id}
            </label>
        </div>
    )
}