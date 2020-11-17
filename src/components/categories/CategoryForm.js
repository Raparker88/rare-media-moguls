import React, { useContext, useState, useEffect } from "react"
import { CategoryContext } from "./CategoryProvider"
import "./Category.css"
import { UserContext } from "../users/UserProvider"

export const CategoryForm = (props) => {
    const { addCategory, getCategories } = useContext(CategoryContext)
    const { currentUser, getCurrentUser } = useContext(UserContext)

    const [currentCategory, setCategory] = useState({
        label: ""
    })


    const handleControlledInputChange = (event) => {
        const newCategory = Object.assign({}, currentCategory)
        newCategory[event.target.name] = event.target.value
        setCategory(newCategory)
    }


    useEffect(() => {
        getCategories()
        getCurrentUser()
    }, [])


    const constructNewCategory = () => {
        const category = { label: currentCategory.label }
        addCategory(category)
            .then(() => props.history.push("/categories"))
    }

    return (
        <>
            {currentUser.is_staff === true ? (
                <form className="form categoryForm">
                    <h2 className="categoryForm_title">
                        Add New Category
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
                    <button type="submit" className="btn saveCategoryButton" onClick={evt => {
                        evt.preventDefault()
                        constructNewCategory()
                    }}>Save New Category</button>
                </form>
            ) : (
                    <div></div>
                )
            }
        </>
    )
}
