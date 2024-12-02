import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import logo from '../../assets/img/logo.png'
import { Context } from '../../context/UserContext'

const Navbar = () => {
  const { authenticated, logout, user } = useContext(Context) // Pegando o usuário do contexto
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  // Função para alternar a visibilidade do menu
  const toggleMenu = () => setMenuOpen(!menuOpen)

  // Fechar o menu ao clicar fora dele
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

  // Função para fechar o menu ao clicar em um item
  const handleMenuItemClick = () => {
    setMenuOpen(false)
  }

  // Função de logout que também fecha o menu
  const handleLogout = () => {
    logout()
    setMenuOpen(false)  // Fecha o menu ao clicar em "Sair"
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={logo} alt="GET a PET" />
        <h2>Get a Pet</h2>
      </div>

      {/* Botão para alternar o menu */}
      <div className={styles.menuToggle} onClick={toggleMenu}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>

      {/* Menu da Navbar */}
      <ul
        ref={menuRef}
        className={`${styles.navbarMenu} ${menuOpen ? styles.show : ''}`}
      >
        <li>
          <Link to="/" onClick={handleMenuItemClick}>Adotar</Link>
        </li>
        {authenticated ? (
          <>
            <li>
              <Link to="/pet/myadoptions" onClick={handleMenuItemClick}>Minhas adoções</Link>
            </li>
            <li>
              <Link to="/pet/mypets" onClick={handleMenuItemClick}>Meus Pets</Link>
            </li>
            <li>
              <Link to="/user/profile" onClick={handleMenuItemClick}>Perfil</Link>
            </li>
            <li onClick={handleLogout}>Sair</li>
            <div className={styles.profilePicContainer}>
              {user && user.image ? (
                <img 
                  src={user.image} // Aqui exibimos a foto de perfil
                  alt="Foto do perfil" 
                  className={styles.profilePic}
                />
              ) : (
                <div className={styles.profilePic}>🐾</div> // Caso não tenha foto, exibe o ícone de pet
              )}
            </div>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" onClick={handleMenuItemClick}>Entrar</Link>
            </li>
            <li>
              <Link to="/register" onClick={handleMenuItemClick}>Cadastrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
