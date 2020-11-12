import React, { useState, useEffect, useContext } from "react"
import {removePostTag, addPostTag, PostTagContext} from "../PostTags/PostTagProvider"

export const TagBoxes = (props) => {
    const [checked, setChecked] = useState(false)
    const { removePostTag, addPostTag } = useContext(PostTagContext)
    
    
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
            if(props.editMode){
                const foundPostTag = postTags.find(pt => pt.tag_id === tag.id && pt.post_id === props.post.id)
                removePostTag(foundPostTag.id)
            }else{
            let newArray = selectedTags.filter(t => tag.id !== t.id)
            props.setTags(newArray)
            }
        }else{
            if(props.editMode){
                const newPostTag = ({
                    tag_id: tag.id,
                    post_id:  props.post.id
                })
                addPostTag(newPostTag)
            }
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