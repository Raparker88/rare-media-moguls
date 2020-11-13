import React, { useState, useContext } from "react"
import { CategoryContext } from "./CategoryProvider";
import "./Category.css"

export const Category = ( props ) => {
    
    const { deleteCategory, updateCategory } = useContext(CategoryContext)

    return (
        <>
            <section className="category">
                    <button className="btn-small fa fa-edit" onClick={() => {
                        props.setEditMode(true)
                        props.setCurrentCategory(props.category)}}>
                    </button>
                    <button className="btn-small fa fa-trash" onClick={() => deleteCategory(props.category.id)}>
                    </button>
                <div className="cat-name">
                    {props.category.label}
                </div>
            </section>
        </>
    )
}