import React from "react"
import { Nav } from "./nav/Nav"
import { Route } from "react-router-dom"
import "./Rare.css"
import { PostProvider } from "./posts/PostProvider"
import { CategoryProvider } from "./categories/CategoryProvider"
import { PostForm } from "./posts/PostForm"
import { CategoriesList } from "./categories/CategoriesList"
import { CategoryForm } from "./categories/CategoryForm"
import { PostDetails } from "./posts/PostDetail"



export const ApplicationViews = (props) => {
    return (
    <>
        <main className="main-container" style={{
            margin: "0 0",
            lineHeight: "1.75rem"
        }}>
            <Route path = "/" render = {props =>
                <nav className="cont--nav">
                    <Nav {...props} />
                </nav>
            }/>
                <PostProvider>
                    <CategoryProvider>
                        <Route exact path="/new_post" render={
                            props => <PostForm {...props} />
                        } />
                    </CategoryProvider>
                </PostProvider>

                <CategoryProvider>
                    <Route exact path="/categories/create" render ={
                        props => <CategoryForm {...props} />
                    } />

                    <Route exact path="/categories" render={
                        props => <CategoriesList {...props} />
                    } />
                </CategoryProvider>

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
    )
}
