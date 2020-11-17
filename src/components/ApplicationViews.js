import React from "react";
import { Nav } from "./nav/Nav";
import { Route } from "react-router-dom";
import "./Rare.css";
import { PostProvider } from "./posts/PostProvider";
import { CategoryProvider } from "./categories/CategoryProvider";
import { PostForm } from "./posts/PostForm";
import { PostList } from "./posts/PostList";
import { CategoryForm } from "./categories/CategoryForm";
import { TagProvider } from "./tags/TagProvider";
import { CategoriesList } from "./categories/CategoryList"
import { TagsList } from "./tags/TagsList"
import { PostDetails } from "./posts/PostDetail"
import { CommentProvider } from "./comments/CommentProvider";
import { CommentsListByPost } from "./comments/CommentsList";
import { PostTagProvider } from "./PostTags/PostTagProvider"
import { UserPostList } from "./posts/UserPostList"
import { UsersList }  from "./users/UsersList"




export const ApplicationViews = (props) => {
    return (
        <>
            <main className="main-container" style={{ margin: "0 0", lineHeight: "1.75rem", }}>
                <PostProvider>
                    <Route path="/" render={(props) => (

                        <nav className="cont--nav">
                            <Nav {...props} />
                        </nav>)} />
                </PostProvider>


                <TagProvider>
                    <PostTagProvider>
                        <PostProvider>
                            <Route path="/posts/:postId(\d+)" render={
                                props => <PostDetails {...props} />
                            } />
                        </PostProvider>
                    </PostTagProvider>
                </TagProvider>

                <CategoryProvider>
                    <Route exact path="/categories/create" render={(props) =>
                        <CategoryForm {...props} />} />
                    <Route exact path="/categories" render={(props) =>
                        <CategoriesList {...props} />}
                    />
                    <PostTagProvider>
                        <TagProvider>
                            <PostProvider>
                                <>
                                    <Route exact path="/new_post" render={
                                        props => <PostForm {...props} />
                                    } />
                                    <Route exact path="/posts/edit/:postId(\d+)" render={
                                        props => <PostForm {...props} />
                                    } />

                                    <Route exact path="/posts/category/:categoryId(\d+)" render={
                                        props => <PostList {...props} />
                                    } />
                                    <Route exact path="/" render={(props) => (
                                        <>
                                            <div className="main-wrap">
                                                <div className="top-spacer"></div>
                                                <div className="mid-section">
                                                    <div className="left-main">
                                                        <PostList {...props}></PostList>
                                                    </div>
                                                </div>
                                                <div className="bottom-spacer"></div>
                                            </div>
                                        </>
                                    )} />
                                    <Route exact path="/users/posts" render={(props) => (
                                        <div className="main-wrap">
                                            <div className="top-spacer"></div>
                                            <div className="mid-section">
                                                <UserPostList
                                                    {...props} />
                                            </div>
                                            <div className="bottom-spacer"></div>
                                        </div>
                                    )} />
                                </>
                            </PostProvider>
                        </TagProvider>
                    </PostTagProvider>
                </CategoryProvider>

                <TagProvider>
                    <Route exact path="/tags" render={props =>
                        <TagsList {...props} />} />
                </TagProvider>

                <CommentProvider>
                    <PostProvider>
                        <Route exact path="/comments/:postId(\d+)" render={props =>
                            <CommentsListByPost {...props} />}
                        />
                    </PostProvider>
                </CommentProvider>
            <Route exact path="/users" render={(props) =>
                        <UsersList {...props} />}/>
            </main>
        </>
    )
};