import React, { useState, useEffect } from "react"

export const TagBoxes = (props) => {
    const [checked, setChecked] = useState(false)
    
    const tag = props.tag
    const selectedTags = props.selectedTags
    const postTags = props.postTags
   
    useEffect(() => {
        let postTag = postTags.find(pt => pt.tag_id === tag.id)
        if(postTag){
            setChecked(true)
        }
    }, [props.postTags])

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