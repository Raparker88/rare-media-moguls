import React from "react"

export const Tag = ({tag}) => {
    return (
        <>
        <section className="tag">
                <div className="tag_name">{tag.label}</div>

                <button className=" btn-small fa fa-edit">
                
                </button>
                <button className="btn-small fa fa-trash">
                   
                </button>
        </section> 
        </>
    )
}