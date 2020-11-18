import React, { useRef, useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from '../users/UserProvider'
import "./Auth.css"

export const Login = (props) => {
    const username = useRef(null)
    const password = useRef(null)
    const invalidDialog = useRef(null)

    const {setLoggedIn, getCurrentUser, loggedIn, currentUser } = useContext(UserContext)

    const handleLogin = (e) => {
        e.preventDefault();

        return fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value,
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    setLoggedIn(true)
                    localStorage.setItem("rare_token", res.token)
                    props.history.push("/");
            }
            else {
                invalidDialog.current.showModal();
            }
            });
        };

    useEffect(()=>{
        if(loggedIn === true){
            getCurrentUser()
        }
    },[loggedIn])

    useEffect(()=>{
        if(currentUser !== {}){
            localStorage.setItem("currentUser", JSON.stringify(currentUser))
        }
    }, [currentUser])

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Media Moguls</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="username"> Username </label>
                        <input
                            ref={username}
                            type="text"
                            id="username"
                            className="form-control"
                            defaultValue=""
                            placeholder="Username"
                            required
                            autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password}
                            type="password"
                            id="password"
                            className="form-control"
                            defaultValue="me"
                            placeholder="Password"
                            required />
                    </fieldset>
                    <fieldset style={{
                        textAlign:"center"
                    }}>
                        <button className="btn btn-1 btn-sep icon-send" type="submit">Login</button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Don't have an account yet? Click here to sign up!</Link>
            </section>
        </main>
    )
}
