import React from "react";
import { Route } from "react-router-dom";
import { CommentProvider } from "../comments/CommentProvider";
import { PostProvider } from "../posts/PostProvider";
import { CommentsListByPost } from "../comments/CommentsList";

export default () => {
    return (
            <CommentProvider>
                <PostProvider>
                    <Route exact path="/comments/:postId(\d+)" render={props =>
                        <CommentsListByPost {...props} />}
                    />
                </PostProvider>
            </CommentProvider>
    )
}