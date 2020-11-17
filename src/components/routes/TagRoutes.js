import React from "react";
import { Route } from "react-router-dom";
import { TagProvider } from "../tags/TagProvider";
import { TagsList } from "../tags/TagsList"


export default () => {
    return (
            <TagProvider>
                <Route exact path="/tags" render={props =>
                    <TagsList {...props} />} />
            </TagProvider>
    )
}