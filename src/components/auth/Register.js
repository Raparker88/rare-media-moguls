import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import "./Auth.css"

export const Register = (props) => {

    const [profileImg, setProfileImg] = useState('')

    const first_name = useRef()
    const last_name = useRef()
    const email = useRef()
    const username = useRef()
    const password = useRef()
    const bio = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createProfileImageJSON = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            setProfileImg(base64ImageString)
        });
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "first_name": first_name.current.value,
                "last_name": last_name.current.value,
                "username": username.current.value,
                "profile_image_url": profileImg,
                "email": email.current.value,
                "password": password.current.value,
                "bio": bio.current.value,
            }
            return fetch("http://localhost:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => {
                    return res.json()})
                .then(res => {
                        localStorage.setItem("rare_token", res.token)
                        props.history.push("/rare")
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login form--register" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Rare</h1>
                <img className="register-img" src="https://via.placeholder.com/200x125.png"></img>
                <fieldset className="register-input">
                    <input ref={first_name} type="text" name="first_name" className="form-control" placeholder="First Name" required autoFocus />
                </fieldset>
                <fieldset className="register-input">
                    <input ref={last_name} type="text" name="last_name" className="form-control" placeholder="Last Name" required />
                </fieldset>
                <fieldset className="register-input">
                    <input ref={email} type="email" name="email" className="form-control" placeholder="Email" required />
                </fieldset>
                <fieldset className="register-input">
                    <input ref={username} name="username" className="form-control" placeholder="Username" />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> Bio </label>
                    <input ref={bio} name="bio" className="form-control" placeholder="A little bit about yourself..." />
                </fieldset>
                <fieldset>
                    <label htmlFor="profile_image_url"> Profile Image </label>
                    <input className="register-input" type="file" id="profile_image" onChange={(evt) => {createProfileImageJSON(evt)}}/>
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset className="register-input">
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <fieldset className="register-input">
                    <input ref={bio} name="bio" className="form-control" placeholder="Bio" />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn login-button" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}
