import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toCap } from '../service/util.service.js'

import { Modal } from './Modal.jsx'
import { AuthForm } from './AuthForm.jsx'
import { login, logout, signup } from "../store/actions/user.actions.js"
import { useConfirmTabClose } from '../hooks/useConfirmTabClose.js'
import { useSelector } from 'react-redux'
import { closeModal, openModal } from '../store/actions/modal.actions.js'


import logo from '../assets/vite.svg'

export function AppHeader() {

    const setHasChanges = useConfirmTabClose()
    const navigate = useNavigate()

    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const [isLoginMode, setIsLoginMode] = useState(null)



    function handleModalOpen(isLogin) {
        openModal()
        setIsLoginMode(isLogin)
    }

    function handleModalClose() {
        closeModal()
        setHasChanges(false)
    }

    const navLinks = [
        { name: 'home', link: '/' },
        { name: 'toys', link: '/toy' },
        { name: 'about', link: '/about' },
    ]

    if (loggedInUser) {
        navLinks.push({ name: 'user', link: `/user/${loggedInUser._id}` })
    }


    function onLogout() {
        navigate('/toy')
        logout()
    }

    return (
        <section className="app-header">
            <img className='app-header__logo' src={logo} alt='logo' />
            <nav className="app-header__nav" >
                {navLinks.map(nav =>
                    <NavLink
                        key={nav.name}
                        to={nav.link}
                        className="app-header__nav-link"
                    >{toCap(nav.name)}
                    </NavLink>
                )}
            </nav>

            <div className='app-header__auth-buttons'>
                {loggedInUser ? (
                    <button onClick={() => onLogout()} className='app-header__btn'>Logout</button>
                ) : (
                    <div className='app-header__auth-new'>
                        <button onClick={() => handleModalOpen(true)} className='app-header__btn btn'>Login</button>
                        <button onClick={() => handleModalOpen(false)} className='app-header__btn btn'>SignUp</button>
                    </div>
                )}
            </div>

            <Modal>
                <AuthForm
                    login={login}
                    signup={signup}
                    loggedInUser={loggedInUser}
                    setHasChanges={setHasChanges}
                    isLoginMode={isLoginMode}
                    setIsLoginMode={setIsLoginMode}
                    closeModal={closeModal}
                />
            </Modal>


        </section >
    )

}