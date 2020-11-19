import React from "react";
import { Route } from "react-router-dom";
import { CommentProvider } from "../comments/CommentProvider";
import { PostProvider } from "../posts/PostProvider";
import { UsersList }  from "../users/UsersList"

export default () => {
    return (
            <CommentProvider>
                <PostProvider>
                    <Route exact path="/users" render={(props) =>
                        <UsersList {...props} />}/>
                </PostProvider>
            </CommentProvider>
    )
}