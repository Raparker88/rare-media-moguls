import React from "react"

export const Tag = (props) => {
    return (
        <>
        <section className="tag">
                <button className=" btn-small fa fa-edit" onClick={() => {
                    props.setTagToBeEdited(props.tag)
                    props.setEditMode(true)
                    props.setDeleteMode(false)
                    props.setTagToBeDeleted({})}}>

                </button>
                <button className="btn-small fa fa-trash" onClick={() => {
                    props.setTagToBeDeleted(props.tag)
                    props.setDeleteMode(true)
                    props.setEditMode(false)
                    props.setTagToBeEdited({})}}>

                </button>
                <div className="tag_name">{props.tag.label}</div>

        </section>
        </>
    )
}