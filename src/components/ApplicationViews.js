import React from "react"
import { Nav } from "./nav/Nav"
import { Route } from "react-router-dom"
import "./Rare.css"

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
        </main>
    </>
    )
}
