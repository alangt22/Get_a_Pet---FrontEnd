import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/img/logo.png';  // Imagem do logo
import { Context } from '../../context/UserContext';

const Navbar = () => {
  const { authenticated, logout } = useContext(Context); // Pegando o estado do usuário do contexto
  const [menuOpen, setMenuOpen] = useState(false);  // Controle da visibilidade do menu
  const menuRef = useRef(null);  // Referência para o menu para manipular o clique fora do menu

  // Função para alternar o menu (abertura/fechamento)
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Fechar o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);  // Fecha o menu
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Função para fechar o menu ao clicar em um item
  const handleMenuItemClick = () => setMenuOpen(false);

  // Função de logout
  const handleLogout = () => {
    logout();  // Chama a função de logout do contexto
    setMenuOpen(false);  // Fecha o menu
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={logo} alt="GET a PET" />  {/* Logo da aplicação */}
        <h2>Get a Pet</h2>
      </div>

      {/* Botão para abrir/fechar o menu */}
      <div className={styles.menuToggle} onClick={toggleMenu}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>

      {/* Menu da Navbar */}
      <ul ref={menuRef} className={`${styles.navbarMenu} ${menuOpen ? styles.show : ''}`}>
        <li>
          <Link to="/" onClick={handleMenuItemClick}>Adotar</Link>
        </li>

        {/* Verifica se o usuário está autenticado */}
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
            <div className={styles.onlineCircle}><span>on</span></div> 
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
  );
};

export default Navbar;
