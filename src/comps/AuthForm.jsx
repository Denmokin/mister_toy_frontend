import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { userService } from "../service/user.service"

export function AuthForm({
    login,
    signup,
    isLoginMode,
    setIsLoginMode,
    closeModal
}) {
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials(true))

    const navigate = useNavigate()

    async function handleSubmit(ev) {
        ev.preventDefault()

        try {
            let user

            if (isLoginMode) {
                user = await login(credentials)
            } else {
                if (credentials.password !== credentials.verifiedPassword) return

                const signUpCreds = { ...credentials }
                delete signUpCreds.verifiedPassword
                user = await signup(signUpCreds)
            }

            if (user) {
                navigate('/toy')
                closeModal()
            }
        } catch (err) {
            console.log('Cannot authenticate:', err)
        }
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
        }

        setCredentials(prevEdit => ({ ...prevEdit, [field]: value }))
    }


    function onAuthToggleMode() {
        setIsLoginMode(prevMode => !prevMode)
        setCredentials(userService.getEmptyCredentials())
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

                {!isLoginMode && (
                    <div className="form-group">
                        <label htmlFor="fullname">Full Name</label>
                        <input
                            type="text"
                            name="fullname"
                            id="fullname"
                            value={fullname}
                            onChange={handleChange}
                            placeholder="Enter Fullname"
                            required={!isLoginMode}
                        />
                    </div>
                )}

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

                {!isLoginMode && (
                    <div className="form-group">
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
                    </div>
                )}

                <button className="auth-modal-form__button btn save" type="submit">
                    {isLoginMode ? 'Login' : 'Signup'}
                </button>

                <button
                    onClick={onAuthToggleMode}
                    className="auth-modal-form__button btn text-btn"
                    type="button"
                >
                    {isLoginMode ? "Don't have an account? Signup" : 'Already a user? Login'}
                </button>
            </form>
        </div>
    )
}