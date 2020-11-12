import React, {useState} from "react"

export const CategoryContext = React.createContext()

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState({})

    const getCategories = () => {
        return fetch("http://localhost:8000/categories", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json",
            }
        })
        .then(res => res.json())
        .then(setCategories)
    }

    const addCategory = (category) => {
        return fetch("http://localhost:8000/categories", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        })
        .then(getCategories)
    }

    const deleteCategory = categoryId => {
        return fetch(`http://localhost:8000/categories/${categoryId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_token")}`
            }
        })
            .then(getCategories)
    }

    return (
        <CategoryContext.Provider value={{
            categories, getCategories, addCategory, category, setCategory, deleteCategory
        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}