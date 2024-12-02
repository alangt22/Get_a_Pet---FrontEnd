import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import api from '../../../utils/api';
import RoundedImage from '../../layouts/RoundedImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'; // Import the WhatsApp icon

const MyAdoptions = () => {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    api.get('/pets/myadoptions', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    .then((response) => {
      setPets(response.data.pets);
    });
  }, [token]);

  return (
    <section>
      <div className={styles.petlist_header}>
        <h1>Minhas Adoções</h1>
      </div>
      <div className={styles.petlist_container}>
        {pets.length > 0 ? (
          pets.map((pet) => (
            <div key={pet._id} className={styles.petlist_row}>
              <RoundedImage
                src={`${import.meta.env.VITE_API_URL}/images/pets/${pet.images[0]}`}
                alt={pet.name}
                width="75px"
              />
              <span className="bold">{pet.name}</span>
              <div className={styles.contacts}>
  <p>
    <span className="bold">Ligue para:</span> <span> {pet.user.phone}</span>
  </p>
  <FontAwesomeIcon icon={faWhatsapp} className={styles.icon}/>
  <a 
    href={`https://api.whatsapp.com/send/?phone=${pet.user.phone}&text=Olá%20${pet.user.name},%20estou%20interessado%20em%20adotar%20seu%20pet.%20&type=phone_number&app_absent=0`}
    target="_blank"
    rel="noopener noreferrer"
    className={styles.whatsappLink}  // Classe CSS para o link
  >
     {pet.user.phone}
  </a>
  <p>
    <span className="bold">Fale com:</span> {pet.user.name}
  </p>
</div>

              <div className={styles.actions}>
                {pet.available ? (
                  <p>Adoção em processo!</p>
                ) : (
                  <p>Parabéns por concluir a adoção</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Ainda não há Pets</p>
        )}
      </div>
    </section>
  );
}

export default MyAdoptions;
