import React, { useContext, useState } from "react"
import { CategoryContext } from "./CategoryProvider"
import "./Category.css"

export const EditCategoryForm = (props) => {
    const { updateCategory, getCategories } = useContext(CategoryContext)

    const [category, setCategory] = useState({})

    const handleControlledInputChange = (e) => {
        const newCategory = Object.assign({}, category)
        newCategory[e.target.name] = e.target.value
        setCategory(newCategory)
    }

    const changeCategory = () => {
        const newCategoryObject = {
            id: props.currentCategory.id,
            label: category.label
        }
        updateCategory(newCategoryObject)
            .then(()=> {
                props.setEditMode(false)
                props.setCurrentCategory({})
                getCategories()
            })

        }

    return (

        <form className="form change_Category_form" id="editCategoryForm">
            <div className="toprow">
                <div className="toprowblank"></div>
                <span className="x" onClick={()=>{
                    props.setEditMode(false)
                    props.setCurrentCategory({})
                }}>X</span>
            </div>
            <h2 className="CategoryForm_label">Edit this Category</h2>
            <fieldset>
                <div className="form-div">
                    <input type="text" name="label" className="form-control edit-Category-input" id="label"
                        proptype="varchar"
                        defaultValue={props.currentCategory.label}
                        onChange={handleControlledInputChange}>
                    </input>
                </div>
            </fieldset>
            <button type="submit"
                onClick={e => {
                    e.preventDefault()
                    changeCategory()
                }}
                className="btn post_submit_btn">
                Save Category
            </button>
            <button type="button"
                className="btn cancel"
                onClick={e => {
                    e.preventDefault()
                    props.setEditMode(false)
                    props.setCurrentCategory({})
                }}>
                    Cancel
            </button>

        </form>
    )
}