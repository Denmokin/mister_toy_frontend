import { NavLink } from 'react-router-dom'
import { toCap } from '../service/util.service.js'

import logo from '../assets/vite.svg'

export function AppHeader({ loggedinUser }) {

    const navLinks = [
        { name: 'home', link: '/' },
        { name: 'toys', link: '/toy' },
        { name: 'about', link: '/about' },
    ]

    if (loggedinUser) {
        navLinks.push({ name: 'user', link: '/user' })
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
                {loggedinUser ? (
                    <button className='app-header__btn'>LogOut</button>
                ) : (
                    <div className='app-header__auth-new'>
                        <button className='app-header__btn btn'>Login</button>
                        <button className='app-header__btn btn'>SignUp</button>
                    </div>
                )}
            </div>
        </section >
    )

}