import React from "react"
import { Route } from "react-router-dom"
import { CategoriesList } from "./categories/CategoriesList"
import { CategoryForm } from "./categories/CategoryForm"
import { CategoryProvider } from "./categories/CategoryProvider"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
        </main>
        <CategoryProvider>
            <Route exact path="/categories/create" render ={
                props => <CategoryForm {...props} />
            } />

            <Route exact path="/categories" render={
                props => <CategoriesList {...props} />
            } />
        </CategoryProvider>
    </>
}
