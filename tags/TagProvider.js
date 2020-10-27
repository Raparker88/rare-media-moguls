import React, { useState, useEffect } from "react"
export const TagContext = React.createContext()

export const TagProvider = (props) => {
    const [tags, setTags] = useState([])

    const get_all_tags = () => {
        return fetch("http://localhost:8000/tags")
            .then(res => res.json())
            .then(setTags)
    }

    const get_single_tag = (tag_id) => {
        return fetch(`http://localhost:8000/tags/${tag_id}`)
            .then(res => res.json())
    }

    const create_tag = tag => {
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

    const update_tag = (tag_id, tag) => {
        return fetch(`http://localhost:8000/tags/${tag_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag)
        })
            .then(get_all_tags)
    }

    const delete_tag = (tag_id) => {
        return fetch(`http://localhost:8000/tags/${tag_id}`, {
            method: "DELETE"
        })
            .then(get_all_tags)
    }

useEffect(()=>{
    get_all_tags()
}, [])

    return (
        <TagContext.Provider value={{
            tags,
            create_tag,
            get_all_tags,
            delete_tag,
            update_tag,
            get_single_tag,
        }}>
            {props.children}
        </TagContext.Provider>
    )
}