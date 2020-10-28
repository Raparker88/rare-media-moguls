import React, { useContext, useEffect, useState } from "react"
import { Category } from "./Category"
import { CategoryContext } from "./CategoryProvider"
import "./Category.css"

export const CategoriesList = (props) => {
    const {categories, getCategories} = useContext(CategoryContext)
    useEffect(() => {
        getCategories()
    }, [])

    return (
        <>
            <section className="categories">
            <button onClick={() => props.history.push("/categories/create")}>
                Add New Category
            </button>

            {categories.map(c => {
                return <Category
                key={c.id}
                category={c}
                {...props} />
                }).reverse()
            }
            </section>
        </>
    )
}