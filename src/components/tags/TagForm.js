import React, { useContext, useState } from "react"
import { TagContext } from "./TagProvider"


export const TagForm = (props) => {
    const { createTag } = useContext(TagContext)

    const [tag, setTag] = useState({})

    const handleControlledInputChange = (eve) => {
        const newTag = Object.assign({}, tag)
        newTag[eve.target.name] = eve.target.value
        setTag(newTag)
    }

    const constructNewTag = () => {
        if(tag.label){
            
            const newTagObject = {
               label: tag.label
            }
            createTag(newTagObject)
            .then(()=> {
                const newTag = {}
                setTag(newTag)
            })
                
        }else{
            window.alert("please provide a tag label")
        } 

    }

    return (

        <form className="form new_tag_form" id="tagForm">
            <h2 className="tagForm_label">Create a New Tag</h2>
            <fieldset>
                <div className="form-div">
                    <input type="text" name="label" required className="form-control" id="label"
                        proptype="varchar"
                        placeholder="tag"
                        defaultValue={tag.label}
                        onChange={handleControlledInputChange}>
                    </input>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewTag()
                        
                }}
                className="btn post_submit_btn">
                Save Tag
            </button>

        </form>
    )

}