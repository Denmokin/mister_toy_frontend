import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { toCap } from '../service/util.service.js'

import { Modal } from './Modal.jsx'
import { AuthForm } from './AuthForm.jsx'
import { login, logout, signup } from "../store/actions/user.actions.js"
import { useConfirmTabClose } from '../hooks/useConfirmTabClose.js'
import { useSelector } from 'react-redux'


import logo from '../assets/vite.svg'

export function AppHeader() {

    const setHasChanges = useConfirmTabClose()

    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)


    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoginMode, setIsLoginMode] = useState(null)


    function handleModalOpen(isLogin) {
        setIsModalOpen(true)
        setIsLoginMode(isLogin)
    }

    function handleModalClose() {
        setIsModalOpen(false)
    }

    const navLinks = [
        { name: 'home', link: '/' },
        { name: 'toys', link: '/toy' },
        { name: 'about', link: '/about' },
    ]

    if (loggedInUser) {
        navLinks.push({ name: 'user', link: '/user' })
    }


    function onLogout() {
        return logout()

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
                    <button onClick={() => logout()} className='app-header__btn'>LogOut</button>
                ) : (
                    <div className='app-header__auth-new'>
                        <button onClick={() => handleModalOpen(true)} className='app-header__btn btn'>Login</button>
                        <button onClick={() => handleModalOpen(false)} className='app-header__btn btn'>SignUp</button>
                    </div>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}>

                <AuthForm
                    login={login}
                    signup={signup}
                    loggedInUser={loggedInUser}
                    setHasChanges={setHasChanges}
                    isLoginMode={isLoginMode}
                    setIsLoginMode={setIsLoginMode}
                    handleModalClose={handleModalClose}
                />
            </Modal>


        </section >
    )

}