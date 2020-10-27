import React, { useState, useContext, useEffect } from "react"
import { CategoryContext } from "./CategoryProvider"
import { CategoryButton } from "./CategoryButton"
import "./Category.css"
export const CategoryButtonList = (props) => {
//useContext
    const { categories, getCategories } = useContext(CategoryContext)
//useEffect
    useEffect(()=>{
        getCategories()
    },[])

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
                    setCategory={props.setCategory}
                    />
                    })
                }
            </div>
        </div>
        </>
    )
}