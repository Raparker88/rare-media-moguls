import React, { useContext, useState } from "react"
import { TagContext } from "./TagProvider"
import "./Tag.css"

export const DeleteTagForm = (props) => {
    const { deleteTag, getTags } = useContext(TagContext)

    const [tag, setTag] = useState({})

    const handleControlledInputChange = (e) => {
        const newTag = Object.assign({}, tag)
        newTag[e.target.name] = e.target.value
        setTag(newTag)
    }

    const removeTag = () => {
        const tagId = props.tagToBeDeleted.id
        deleteTag(tagId)
            .then(()=> {
                props.setDeleteMode(false)
                props.setTagToBeDeleted({})
                getTags()
            })
        }

    return (

        <form className="form change_tag_form" id="editTagForm">
            <div className="toprow">
                <div className="toprowblank"></div>
                <span className="x" onClick={()=>{
                    props.setDeleteMode(false)
                    props.setTagToBeDeleted({})
                }}>X</span>
            </div>
            <h4 className="tagForm_label">Are you sure you want to delete this Tag?</h4>

            <button type="submit"
                onClick={e => {
                    e.preventDefault()
                    removeTag()
                }}
                className="btn post_submit_btn">
                Ok
            </button>
            <button type="button"
                className="btn cancel"
                onClick={e => {
                    e.preventDefault()
                    props.setDeleteMode(false)
                    props.setTagToBeDeleted({})
                }}>
                    Cancel
            </button>

        </form>
    )
}