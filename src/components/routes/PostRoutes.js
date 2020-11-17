import React from "react";
import { Route } from "react-router-dom";
import { CategoryProvider } from "../categories/CategoryProvider";
import { PostTagProvider } from "../PostTags/PostTagProvider";
import { TagProvider } from "../tags/TagProvider";
import { PostProvider } from "../posts/PostProvider";
import { PostDetails } from "../posts/PostDetail"
import { PostForm } from "../posts/PostForm";
import { PostList } from "../posts/PostList";
import { UserPostList } from "../posts/UserPostList"

export default () => {
    return (
            <CategoryProvider>
                <PostTagProvider>
                    <TagProvider>
                        <PostProvider>
                            <>
                                <Route path="/posts/:postId(\d+)" render={
                                    props => <PostDetails {...props} />
                                } />
                                <Route exact path="/new_post" render={
                                    props => <PostForm {...props} />
                                } />
                                <Route exact path="/posts/edit/:postId(\d+)" render={
                                    props => <PostForm {...props} />
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
    )
}