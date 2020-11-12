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
        <div className="tagList-containerFlex">

            <section className="tags">
                <h2>Tags</h2>
               {
                   tags.map(tag => {
                       return <Tag key={tag.id} tag={tag} {...props} />
                    }).reverse()
                }
           </section>
           <section>
                <TagForm {...props} />

           </section>
        </div>
        </> 
    )
}