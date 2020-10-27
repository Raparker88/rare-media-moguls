import React, { useContext, useState, useEffect, useRef } from "react"
import { TagContext } from "./TagProvider"

import "./Tag.css"

export const TagForm = (props) => {
//REFS
    const tagName = useRef(null)
//CONTEXT
    const { createTag, getTags, tags } = useContext(TagContext)
//EFFECT
    useEffect(()=>{
        if(!props.isHidden){
            tagName.current.focus()
        }
    }, [props.isHidden])

    useEffect(()=>{
        setTagNameValue("")
        props.setIsHidden(true)
        tagName.current.blur()
    }, [tags])

//STATE
    const [tagNameValue, setTagNameValue] = useState("")
    const [tag, setTag] = useState({})
//HANDLE

    const handleTagNameKeyPress = (e) => {
        if(e.key === "Enter"){
            constructNewTag()
        }
        else {
            return
        }
    }

    const handleControlledInputChange = (e) => {
        const newTag = Object.assign({}, tag)
        newTag[e.target.name] = e.target.value
        setTag(newTag)
    }

    const constructNewTag = () => {
        if( tagName.current.value === ""){
            alert("Add a title to your reminder.")
        }
        else {
            {createTag({
                tag: tag.tagName
            })
            .then(getTags)}
        }
    }

    const handleBlur = () => {
        if (tagName.current.value === "") {
            props.setIsHidden(true)
        }
        else {
            props.setIsHidden(false)
        }
    }

    const tagNameChange = (e)=>{
        setTagNameValue(e.target.value)
    }

    return (
        <>
        <input ref={tagName} value={tagNameValue} placeholder="add a new tag..." name="tagName" className={`tag-input ${props.isHidden ? "hide" : "show"}`} onChange={(e)=> {
            tagNameChange(e)
            handleControlledInputChange(e)}}
            onBlur={()=>{handleBlur()}}
            onKeyPress={(e) => {
                handleTagNameKeyPress(e)
                }}/>
        </>
    )
}