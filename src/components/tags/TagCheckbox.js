import React, { useState } from "react"

export const TagBoxes = (props) => {
    const [checked, setChecked] = useState(false)
    
    const tag = props.tag
    const selectedTags = props.selectedTags
   

    const checkboxHandler = () => {
        if (checked) {
            let newArray = selectedTags.filter(t => tag.id !== t.id)
            props.setTags(newArray)
        }else{
            let newArray = selectedTags
            newArray.push(tag)
            props.setTags(newArray)
        }
        setChecked(!checked)
    }

    return (
        <div className="tag-container">
            <label>
                <input type="checkbox" id="tag" checked={checked} onChange={checkboxHandler}></input>
                {tag.label}
            </label>
        </div>
    )
}