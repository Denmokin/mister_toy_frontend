import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

export function AuthForm({
    login,
    signup,
    isLoginMode,
    setIsLoginMode,
    closeModal
}) {
    const navigate = useNavigate()

    const getValidationSchema = (isLogin) => {
        const baseSchema = {
            username: Yup.string()
                .min(3, 'Too Short!')
                .required('Username is required'),
            password: Yup.string()
                .min(2, 'Min 2 chars!')
                .required('Password is required'),
        }

        if (!isLogin) {
            baseSchema.fullname = Yup.string().min(3, 'Too Short!').required('Full name is required')
            baseSchema.verifiedPassword = Yup.string().min(2, 'Min 2 chars!')
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Please verify your password')
        }

        return Yup.object().shape(baseSchema)
    }

    const handleAuthSubmit = async (values, { setSubmitting }) => {
        try {
            let user

            if (isLoginMode) {
                user = await login({
                    username: values.username,
                    password: values.password
                })
            } else {
                const signUpCreds = {
                    username: values.username,
                    fullname: values.fullname,
                    password: values.password
                }
                user = await signup(signUpCreds)
            }

            if (user) {
                navigate('/toy')
                closeModal()
            }
        } catch (err) {
            console.log('Cannot authenticate:', err)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="auth-modal">
            <Formik
                initialValues={{
                    username: '',
                    fullname: '',
                    password: '',
                    verifiedPassword: ''
                }}
                validationSchema={getValidationSchema(isLoginMode)}
                onSubmit={handleAuthSubmit}
            >
                {({ resetForm, isSubmitting }) => (
                    <Form className="auth-modal-form">

                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter Username"
                            />
                            <ErrorMessage name="username" component="div" className="error-text" />
                        </div>

                        {!isLoginMode && (
                            <div className="form-group">
                                <label htmlFor="fullname">Full Name</label>
                                <Field
                                    type="text"
                                    name="fullname"
                                    id="fullname"
                                    placeholder="Enter Fullname"
                                />
                                <ErrorMessage name="fullname" component="div" className="error-text" />
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter Password"
                            />
                            <ErrorMessage name="password" component="div" className="error-text" />
                        </div>

                        {!isLoginMode && (
                            <div className="form-group">
                                <label htmlFor="verifiedPassword">Verify Password</label>
                                <Field
                                    type="password"
                                    name="verifiedPassword"
                                    id="verifiedPassword"
                                    placeholder="Verify Password"
                                />
                                <ErrorMessage name="verifiedPassword" component="div" className="error-text" />
                            </div>
                        )}

                        <button
                            className="auth-modal-form__button btn save"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isLoginMode ? 'Login' : 'Signup'}
                        </button>

                        <button
                            type="button"
                            className="auth-modal-form__button btn text-btn"
                            onClick={() => {
                                setIsLoginMode(prevMode => !prevMode)
                                resetForm()
                            }}
                        >
                            {isLoginMode ? "Don't have an account? Signup" : 'Already a user? Login'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}