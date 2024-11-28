import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import logo from '../../assets/img/logo.png'


import { Context } from '../../context/UserContext'

const Navbar = () => {
  const { authenticated, logout } = useContext(Context)

  
  const [menuOpen, setMenuOpen] = useState(false)

  
  const menuRef = useRef(null)

  
  const toggleMenu = () => setMenuOpen(!menuOpen)

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    
    document.addEventListener('mousedown', handleClickOutside)

    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={logo} alt="GET a PET" />
        <h2>Get a Pet</h2>
      </div>

      
      <div className={styles.menuToggle} onClick={toggleMenu}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>

      
      <ul
        ref={menuRef}
        className={`${styles.navbarMenu} ${menuOpen ? styles.show : ''}`}
      >
        <li>
          <Link to="/">Adotar</Link>
        </li>
        {authenticated ? (
          <>
            <li>
              <Link to="/pet/myadoptions">Minhas adoções</Link>
            </li>
            <li>
              <Link to="/pet/mypets">Meus Pets</Link>
            </li>
            <li>
              <Link to="/user/profile">Perfil</Link>
            </li>
            <li onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Entrar</Link>
            </li>
            <li>
              <Link to="/register">Cadastrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
