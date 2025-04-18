import { useState } from 'react'
import { Link } from "react-router-dom";

import './navbar.css'

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false)

    const handleMenu = () => {
        setOpenMenu(!openMenu)
    }

    return (
        <header className='navbar'>
            <nav>
                <Link className='logo' to='/'>LOGO</Link>
                <button 
                    className={openMenu ? 'hamburger selected' : 'hamburger'} 
                    onClick={handleMenu}/>
                <ul className={openMenu ? 'active' : ''} >
                    <li><Link to='/' onClick={handleMenu}>Home</Link></li>
                    <li><Link to='/portfolio' onClick={handleMenu}>Portfolio</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar