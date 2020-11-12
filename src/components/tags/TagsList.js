import React, { useContext, useEffect, useState } from "react"
import { Tag } from "./Tag"
import { TagContext } from "./TagProvider"
import { TagForm } from "./TagForm"
import { EditTagForm } from "./EditTagForm"
import "./Tag.css"

export const TagsList = (props) => {
    const {tags, getTags} = useContext(TagContext)
    const [editMode, setEditMode] = useState(false)
    const [deleteMode, setDeleteMode] = useState(false)
    const [tagToBeEdited, setTagToBeEdited] = useState({})
    const [tagToBeDeleted, setTagToBeDeleted] = useState({})
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
                        return <Tag
                                key={tag.id}
                                tag={tag}
                                setEditMode={setEditMode}
                                setDeleteMode={setDeleteMode}
                                setTagToBeEdited={setTagToBeEdited}
                                {...props} />
                    }).reverse()
                }
            </section>
            <section className="edit-tag-form">
                {editMode
                ? <EditTagForm
                tagToBeEdited={tagToBeEdited}
                setTagToBeEdited={setTagToBeEdited}
                setEditMode={setEditMode}
                {...props} />
                : null
                }
                {deleteMode
                ? <DeleteTagForm
                tagToBeDeleted={tagToBeDeleted}
                setTagToBeDeleted={setTagToBeDeleted}
                {...props}/>
                : null
                }
            </section>
            <section>
                <TagForm {...props} />

            </section>
        </div>
        </>
    )
}