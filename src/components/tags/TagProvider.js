import React, { useState, useEffect } from "react"
export const TagContext = React.createContext()

export const TagProvider = (props) => {
    const [tags, setTags] = useState([])

    const getTags = () => {
        return fetch("http://localhost:8000/tags")
            .then(res => res.json())
            .then(setTags)
    }

    const getTagById = (tag_id) => {
        return fetch(`http://localhost:8000/tags/${tag_id}`)
            .then(res => res.json())
    }

    const createTag = tag => {
        return fetch("http://localhost:8000/tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag)
        })
        .then(res => res.json())
        .then(newTag => {
            get_all_tags()
            return newTag.id })
    }

    const updateTag = (tag_id, tag) => {
        return fetch(`http://localhost:8000/tags/${tag_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag)
        })
            .then(get_all_tags)
    }

    const deleteTag = (tag_id) => {
        return fetch(`http://localhost:8000/tags/${tag_id}`, {
            method: "DELETE"
        })
            .then(get_all_tags)
    }

useEffect(()=>{
    getTags()
}, [])

    return (
        <TagContext.Provider value={{
            tags,
            createTag,
            getTags,
            getTagById,
            deleteTag,
            updateTag,
        }}>
            {props.children}
        </TagContext.Provider>
    )
}