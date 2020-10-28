import React, { useState } from "react"
import "./Category.css"

export const Category = ( props ) => {
    return (
        <>
        <span className={`cat ${props.selectedCategoryId === props.category.id ? "selected" : ""}`} onClick={() => {
            props.toggleSelected(props.category)}}>
            <span className="cat-btn-name">
                {props.category.category}
            </span>
            <button className=" btn editTagButton">
                Edit
            </button>
            <button className="btn deleteTagButton">
                Delete
            </button>
        </span>
        </>
    )
}