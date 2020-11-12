import React, { useContext, useState } from "react"
import { TagContext } from "./TagProvider"
import "./Tag.css"

export const EditTagForm = (props) => {
    const { updateTag, getTags } = useContext(TagContext)

    const [tag, setTag] = useState({})

    const handleControlledInputChange = (e) => {
        const newTag = Object.assign({}, tag)
        newTag[e.target.name] = e.target.value
        setTag(newTag)
    }

    const changeTag = () => {
        const newTagObject = {
            id: props.tagToBeEdited.id,
            label: tag.label
        }
        updateTag(newTagObject)
            .then(()=> {
                props.setEditMode(false)
                props.setTagToBeEdited({})
                getTags()
            })

        }

    return (

        <form className="form change_tag_form" id="editTagForm">
            <h2 className="tagForm_label">Edit this tag</h2>
            <fieldset>
                <div className="form-div">
                    <input type="text" name="label" className="form-control edit-tag-input" id="label"
                        proptype="varchar"
                        defaultValue={props.tagToBeEdited.label}
                        onChange={handleControlledInputChange}>
                    </input>
                </div>
            </fieldset>
            <button type="submit"
                onClick={e => {
                    e.preventDefault()
                    changeTag()
                }}
                className="btn post_submit_btn">
                Save Tag
            </button>
            <button type="button"
                className="btn cancel"
                onClick={e => {
                    e.preventDefault()
                    props.setEditMode(false)
                    props.setTagToBeEdited({})
                }}>
                    Cancel
            </button>

        </form>
    )
}