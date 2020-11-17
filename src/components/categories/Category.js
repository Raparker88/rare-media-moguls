import React, { useContext, useEffect } from "react"
import { CategoryContext } from "./CategoryProvider";
import "./Category.css"
import { UserContext } from "../users/UserProvider";

export const Category = (props) => {

    const { deleteCategory } = useContext(CategoryContext)
    const { currentUser, getCurrentUser } = useContext(UserContext)

    useEffect(() => {
        getCurrentUser()
    }, [])

    return (
        <>
            <section className="category">
                {currentUser.is_staff === true ? (
                    <>
                        <button className="btn-small fa fa-edit" onClick={() => {
                            props.setEditMode(true)
                            props.setCurrentCategory(props.category)
                        }}>
                        </button>
                        <button className="btn-small fa fa-trash" onClick={() => deleteCategory(props.category.id)}>
                        </button>
                        <div className="cat-name">
                            {props.category.label}
                        </div>
                    </>)
                    : (
                        <div className="cat-name">
                            {props.category.label}
                        </div>
                    )}

            </section>
        </>
    )
}