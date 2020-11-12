import React, { useContext, useEffect } from "react"
import { Tag } from "./Tag"
import { TagContext } from "./TagProvider"
import { TagForm } from "./TagForm"
import "./Tag.css"

export const TagsList = (props) => {
    const {tags, getTags} = useContext(TagContext)


    useEffect(() => {
        getTags()
    }, [])

    return (
        <>
            <section className="tags">

               {
                   tags.map(tag => {
                       return <Tag key={tag.id} tag={tag} {...props} />
                    }).reverse()
                }
                <TagForm {...props} />
           </section>
        </> 
    )
}