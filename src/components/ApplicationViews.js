import React from "react"
import { Route } from "react-router-dom"
import { PostProvider } from "./posts/PostProvider"
import { CategoryProvider } from "./categories/CategoryProvider"
import { PostForm } from "./posts/PostForm"
import { CategoriesList } from "./categories/CategoriesList"
import { CategoryForm } from "./categories/CategoryForm"
import { TagProvider } from "./tags/TagsProvider"
import { TagsList } from "./tags/TagsList"


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
                </CategoryProvider>
            </PostProvider>

            <CategoryProvider>
                <Route exact path="/categories/create" render={
                    props => <CategoryForm {...props} />
                } />

                <Route exact path="/categories" render={
                    props => <CategoriesList {...props} />
                } />
            </CategoryProvider>

            <TagProvider>
                <Route exact path="/tags" render={
                    props => <TagsList {...props} />
                } />
            </TagProvider>
        </main>

    </>
}
