import React, { useState, useContext, useEffect } from "react"
import { CategoryContext } from "./CategoryProvider"
import { PostContext } from "../posts/PostProvider"
import { CategoryButton } from "./CategoryButton"
import "./Category.css"
export const CategoryButtonList = (props) => {

    const { categories, getCategories } = useContext(CategoryContext)
    const { getPosts, getPostsByCategoryId } = useContext(PostContext)

    const [selectedCategoryId, setSelectedCategoryId] = useState(0)

    useEffect(()=> {
        getCategories()
    },[])

    useEffect(()=>{
        if(selectedCategoryId > 0){
            getPostsByCategoryId(selectedCategoryId)
        }
        else{
            getPosts()
        }
    }, [selectedCategoryId])

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