import React from "react"
import { Route } from "react-router-dom"
import { PostProvider } from "./posts/PostProvider"
import { CategoryProvider } from "./categories/CategoryProvider"
import { PostForm } from "./posts/PostForm"
import { CategoriesList } from "./categories/CategoriesList"
import { PostList } from "./posts/PostList"
import { CategoryForm } from "./categories/CategoryForm"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <PostProvider>
                <CategoryProvider>
                    <Route exact path="/new_post" render={
                        props => <PostForm {...props} />
                    } />
                    <Route exact path="/posts" render={
                        props => <PostList {...props} />
                    } />
                </CategoryProvider>
            </PostProvider>
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
