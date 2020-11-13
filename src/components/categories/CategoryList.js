import React, { useContext, useEffect, useState } from "react"
import { Category } from "./Category"
import { CategoryContext } from "./CategoryProvider"
import { EditCategoryForm } from "./EditCategoryForm";
import "./Category.css"

export const CategoriesList = (props) => {
    const {categories, getCategories} = useContext(CategoryContext)
    useEffect(() => {
        getCategories()
    }, [])

    const [ editMode, setEditMode ] = useState(false)
    const [currentCategory, setCurrentCategory] = useState({})

    return (
        <>
            <section className="categories">
                <button className="btn add-cat-btn" onClick={() => props.history.push("/categories/create")}>
                    Add New Category
                </button>
                
                <div className="list cat-list-cont">
                    {categories.map(c => {
                        return <Category
                        key={c.id}
                        category={c}
                        setEditMode={setEditMode}
                        setCurrentCategory={setCurrentCategory}
                        {...props} />
                        }).reverse()
                    }
                </div>
                <div>
                    {editMode
                    ?<EditCategoryForm 
                     setCurrentCategory={setCurrentCategory}
                     currentCategory={currentCategory}
                     setEditMode={setEditMode}
                     {...props} />
                    :null}
                </div>
                
            </section>
        </>
    )
}
