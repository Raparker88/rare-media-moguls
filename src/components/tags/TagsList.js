import React, { useContext, useEffect } from "react"
import { Tag } from "./Tag"
import { TagContext } from "./TagsProvider"

export const TagsList = (props) => {
    const {tags, getTags} = useContext(TagContext)

    useEffect(() => {
        getTags()
    }, [])

    return (
        <>
            <section className="tags">

                <button onClick={() => props.history.push("/tags/create")}>
                    Add New Tag
                </button>

               {
                   tags.map(tag => {
                    return <Tag key={tag.id} tag={tag} {...props} />
                   })
               }
           </section>
        </>
    )
}