import React, { useState, useContext } from "react"
import { CategoryContext } from "./CategoryProvider";
import "./Category.css"

export const Category = ( props ) => {
    
    const { deleteCategory, updateCategory } = useContext(CategoryContext)

    return (
        <>
            <div className="category-item">
                <div className="cat-name">
                    {props.category.label}
                </div>
                <div className="btn-group">
                    <button className=" btn editTagButton" onClick={() => {
                        props.setEditMode(true)
                        props.setCurrentCategory(props.category)}}>
                        Edit
                    </button>
                    <button className="btn deleteTagButton" onClick={() => deleteCategory(props.category.id)}>
                        Delete
                    </button>
                </div>
            </div>
        </>
    )
}