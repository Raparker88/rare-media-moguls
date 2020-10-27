import React from "react"

export const CategoriesList = (props) => {
    return (
        <>
        <button onClick={() => props.history.push("/categories/create")}>
                Add New Category
            </button>
        </>
    )
}