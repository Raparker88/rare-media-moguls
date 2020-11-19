import React from "react";
import { Route } from "react-router-dom";
import { PostProvider } from "../posts/PostProvider";
import { Nav } from "../nav/Nav"

export default () => {
    return (
            <PostProvider>
                <Route path="/" render={(props) => (
                    <nav className="cont--nav">
                        <Nav {...props} />
                    </nav>)} />
            </PostProvider>
    )
}