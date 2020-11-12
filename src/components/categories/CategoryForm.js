import React, {useContext, useState, useEffect} from "react"
import { CategoryContext } from "./CategoryProvider"
import "./Category.css"

export const CategoryForm = (props) => {
    const {addCategory, updateCategory, getCategories, categories} = useContext(CategoryContext)

    const [currentCategory, setCategory] = useState({
        label: ""
    })

    const editMode = props.match.params.hasOwnProperty("categoryId")

    const handleControlledInputChange = (event) => {
        const newCategory = Object.assign({}, currentCategory)
        newCategory[event.target.label] = event.target.value
        setCategory(newCategory)
    }

    const getCategoryEdit = () => {
        if(editMode) {
            const categoryId = parseInt(props.match.params.categoryId)
            const selectedCategory = categories.find(c => c.id === categoryId) || {}
            setCategory(selectedCategory)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        getCategoryEdit()
    }, [categories])

    const constructNewCategory = () => {
        if (editMode) {
            updateCategory({
                label: currentCategory.label
            })
                .then(() => props.history.push("/categories"))
        } else {
        const category = {label: currentCategory.label}
        addCategory(category)
        .then(()=> props.history.push("/categories"))
    }}

    return (
        <form className="form categoryForm">
            <h2 className="categoryForm_title">
            {editMode ? "Update Category" : "Add New Category"}
            </h2>
            <fieldset>
                <div className="form-group">
                    <input type="text" name="label" required autoFocus className="form-control"
                        proptype="varchar"
                        placeholder="Category Name"
                        defaultValue={currentCategory.label}
                        onChange={handleControlledInputChange}
                        />
                </div>
            </fieldset>
            <button type="submit" className="btn saveCategoryButton" onClick= {evt => {
                evt.preventDefault()
                constructNewCategory()
            }}>{editMode ? "Save Update" : "Save New Category"}</button>
        </form>
    )}
