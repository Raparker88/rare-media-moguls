import React from "react"

export const Tag = ({tag}) => {
    return (
        <>
        <section className="tag">
                <div className="tag_name">{tag.tag}</div>

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