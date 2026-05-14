import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom" // 1. Added missing import
import { userService } from "../service/user.service"

export function AuthForm({
    setHasChanges,
    login,
    signup,
    isLoginMode,
    setIsLoginMode,
    handleModalClose }) {

    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const navigate = useNavigate()

    function handleSubmit(ev) {
        ev.preventDefault()

        if (isLoginMode) {
            login(credentials)
                .then((user) => {
                    if (user) {
                        navigate('/toy')
                        handleModalClose()
                    }
                    else return
                })
                .catch(err => console.log('err: ', err))
        }
        else {
            if (credentials.password !== credentials.verifiedPassword) return

            const signUpCreds = { ...credentials }
            delete signUpCreds.verifiedPassword


            signup(signUpCreds)
                .then((user) => {
                    if (user) {
                        navigate('/toy')
                        handleModalClose()
                    }
                    else return
                })
                .catch(err => console.log('err: ', err))

        }
    }

    function onSetIsLoginToggle() {
        setIsLoginMode(prevMode => !prevMode)
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break
            case 'checkbox':
                value = target.checked
                break
            default:
                break
        }

        setCredentials(prevEdit => ({ ...prevEdit, [field]: value }))
        setHasChanges(true)
    }

    const { username, fullname, password, verifiedPassword } = credentials

    return (
        <div className="auth-modal">
            <form className="auth-modal-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={handleChange}
                        placeholder="Enter Username"
                        required
                    />
                </div>

                {!isLoginMode && <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input
                        type="text"
                        name="fullname"
                        id="fullname"
                        value={fullname}
                        onChange={handleChange}
                        placeholder="Enter Fullname"
                    />
                </div>}

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                        required
                    />
                </div>

                {!isLoginMode && <div className="form-group">
                    <label htmlFor="verifiedPassword">Verify Password</label>
                    <input
                        type="password"
                        name="verifiedPassword"
                        id="verifiedPassword"
                        value={verifiedPassword}
                        onChange={handleChange}
                        placeholder="Verify Password"
                        required
                    />
                </div>}

                <button className="auth-modal-form__button btn save" type="submit">
                    {isLoginMode ? 'Login' : 'Signup'}
                </button>

                <button onClick={() => onSetIsLoginToggle()} className="auth-modal-form__button btn text-btn" type="button">
                    {isLoginMode ? "Don't have an account? Signup" : 'Already a user? Login'}
                </button>
            </form >
        </div >
    )
}