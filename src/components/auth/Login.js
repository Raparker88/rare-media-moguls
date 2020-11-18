import React, { useRef } from "react"
import { Link } from "react-router-dom"
import "./Auth.css"

export const Login = (props) => {
    const username = useRef(null)
    const password = useRef(null)
    const invalidDialog = useRef(null)

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
                    localStorage.setItem("rare_token", res.token)
                    props.history.push("/");
            }
            else {
                invalidDialog.current.showModal();
            }
            });
        };

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Rare</h1>
                    <img className="login-img" src="https://via.placeholder.com/300x150.png"></img>
                    <fieldset>
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
                        <button className="btn login-button" type="submit">Login</button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Don't have an account yet? Click here to sign up!</Link>
            </section>
        </main>
    )
}
