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
                    <button className="btn-small fa fa-edit" onClick={() => {
                        props.setEditMode(true)
                        props.setCurrentCategory(props.category)}}>
                    </button>
                    <button className="btn-small fa fa-trash" onClick={() => deleteCategory(props.category.id)}>
                    </button>
                </div>
            </div>
        </>
    )
}