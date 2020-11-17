import React, { useContext, useEffect, useState } from "react"
import { Category } from "./Category"
import { CategoryContext } from "./CategoryProvider"
import { EditCategoryForm } from "./EditCategoryForm";
import { CategoryForm } from "./CategoryForm"
import "./Category.css"

export const CategoriesList = (props) => {
    const { categories, getCategories } = useContext(CategoryContext)
    
    useEffect(() => {
        getCategories()
    }, [])

    const [editMode, setEditMode] = useState(false)
    const [currentCategory, setCurrentCategory] = useState({})

    return (
        <>
            <div className="cat-list-cont">
                <section className="categories">
                <h2>Categories</h2>
                    {categories.map(c => {
                        return <Category
                            key={c.id}
                            category={c}
                            setEditMode={setEditMode}
                            setCurrentCategory={setCurrentCategory}
                            {...props} />
                    }).reverse()
                    }
                </section>
                <div>
                    {editMode
                        ? <EditCategoryForm
                            setCurrentCategory={setCurrentCategory}
                            currentCategory={currentCategory}
                            setEditMode={setEditMode}
                            {...props} />
                        : null}
                </div>
                <section>
                    <CategoryForm {...props} />
                </section>
            </div>
        </>
    )
}
