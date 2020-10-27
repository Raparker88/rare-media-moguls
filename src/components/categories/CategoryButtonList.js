import React, { useState, useContext, useEffect } from "react"
import { CategoryContext } from "./CategoryProvider"
import { PostContext } from "../posts/PostProvider"
import { CategoryButton } from "./CategoryButton"
import "./Category.css"
export const CategoryButtonList = (props) => {
//useContext
    const { categories, getCategories } = useContext(CategoryContext)

//useState
    const [selectedCategoryId, setSelectedCategoryId] = useState(0)
//useEffect
    useEffect(()=> {
        getCategories()
    },[])

//Will use this to trigger filtered post list.
// useEffect(()=>{
//         if(selectedCategoryId > 0){
// filterbycategory
//         }
//         else{
// showallposts
//         }
//     }, [selectedCategoryId])

    const toggleSelected = (e) => {
        if(selectedCategoryId !== e.id){
            setSelectedCategoryId(e.id)
        }
        else{
            setSelectedCategoryId(0)
        }
    }

    return (
        <>
        <div className="list-title cat-btn-list-title">
            Post Categories
        </div>
        <div className="list-wrapper">
            <div className="list cat-btn--list">
                {categories.map(c => {

                    return <CategoryButton {...props}
                    key={c.id}
                    category={c}
                    selectedCategoryId={selectedCategoryId}
                    setSelectedCategoryId={setSelectedCategoryId}
                    toggleSelected={toggleSelected}
                    />
                    })
                }
            </div>
        </div>
        </>
    )
}