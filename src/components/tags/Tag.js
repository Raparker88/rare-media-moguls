import React, { useContext, useEffect } from "react"
import { UserContext } from "../users/UserProvider"

export const Tag = (props) => {
    const { currentUser, getCurrentUser } = useContext(UserContext)

    useEffect(() => {
        getCurrentUser()
    }, [])

    return (
        <>
            <section className="tag">
                {currentUser.is_staff === true ? (
                    <>
                        <button className=" btn-small fa fa-edit" onClick={() => {
                            props.setTagToBeEdited(props.tag)
                            props.setEditMode(true)
                            props.setDeleteMode(false)
                            props.setTagToBeDeleted({})
                        }}>
                        </button>
                        <button className="btn-small fa fa-trash" onClick={() => {
                            props.setTagToBeDeleted(props.tag)
                            props.setDeleteMode(true)
                            props.setEditMode(false)
                            props.setTagToBeEdited({})
                        }}>
                        </button>
                        <div className="tag_name">{props.tag.label}</div>
                    </>
                ) : (
                        <div className="tag_name">{props.tag.label}</div>
                    )}
            </section>
        </>
    )
}