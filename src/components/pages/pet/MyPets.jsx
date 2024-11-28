import React, { useState, useEffect } from 'react'
import api from '../../../utils/api'
import { Link } from 'react-router-dom'
import styles from './Dashboard.module.css'
import RoundedImage from '../../layouts/RoundedImage'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function MyPets() {
  const [pets, setPets] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  // Verifica se o token está presente. Caso contrário, não tenta fazer a requisição.
  if (!token) {
    setFlashMessage('Você precisa estar logado para acessar essa página!', 'error')
    return <p>Você precisa estar logado para acessar essa página.</p>
  }

  useEffect(() => {
    // Obtendo a lista de pets do usuário com o token
    api
      .get('/pets/mypets', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets)
      })
      .catch((err) => {
        setFlashMessage('Erro ao carregar seus pets!', 'error')
      })
  }, [token])

  // Função para remover o pet
  async function removePet(id) {
    let msgType = 'success'

    try {
      const response = await api.delete(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      const updatedPets = pets.filter((pet) => pet._id !== id)
      setPets(updatedPets)
      setFlashMessage(response.data.message, msgType)
    } catch (err) {
      msgType = 'error'
      setFlashMessage(err.response?.data?.message || 'Erro ao excluir o pet.', msgType)
    }
  }

  // Função para concluir a adoção do pet
  async function concludeAdoption(id) {
    let msgType = 'success'

    try {
      const response = await api.patch(`/pets/conclude/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      setFlashMessage(response.data.message, msgType)
    } catch (err) {
      msgType = 'error'
      setFlashMessage(err.response?.data?.message || 'Erro ao concluir a adoção.', msgType)
    }
  }

  return (
    <section>
      <div className={styles.petslist_header}>
        <h1>Meus Pets Cadastrados</h1>
        <Link to="/pet/add">Cadastrar Pet</Link>
      </div>
      <div className={styles.petslist_container}>
        {pets.length > 0 ? (
          pets.map((pet) => (
            <div key={pet._id} className={styles.petlist_row}>
              <RoundedImage
                src={`${import.meta.env.VITE_API_URL}/images/pets/${pet.images[0]}`}
                alt={pet.name}
                width="px75"
              />
              <span className="bold">{pet.name}</span>
              <div className={styles.actions}>
                {pet.available ? (
                  <>
                    {pet.adopter && (
                      <button
                        className={styles.conclude_btn}
                        onClick={() => {
                          concludeAdoption(pet._id)
                        }}
                      >
                        Concluir adoção
                      </button>
                    )}
                    <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                    <button
                      onClick={() => {
                        removePet(pet._id)
                      }}
                    >
                      Excluir
                    </button>
                  </>
                ) : (
                  <p>Pet já adotado</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Ainda não há pets cadastrados!</p>
        )}
      </div>
    </section>
  )
}

export default MyPets
