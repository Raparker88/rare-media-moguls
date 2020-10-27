import React from "react"
import { Route } from "react-router-dom"
import { PostProvider } from "./posts/PostProvider"
import { CategoryProvider } from "./categories/CategoryProvider"
import { PostForm } from "./posts/PostForm"
import { CategoriesList } from "./categories/CategoriesList"
import { PostList } from "./posts/PostList"
import { CategoryForm } from "./categories/CategoryForm"
import { PostDetails } from "./posts/PostDetail"



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
            <PostProvider>
                <Route path="/posts/:postId(\d+)" render={
                    props => <PostDetails {...props} />
                } />
            </PostProvider>
            <CategoryProvider>
                <Route exact path="/categories/create" render={
                    props => <CategoryForm {...props} />
                } />

                <Route exact path="/categories" render={
                    props => <CategoriesList {...props} />
                } />
            </CategoryProvider>
        </main>
    </>
}
