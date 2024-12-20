import React, { useState, useEffect } from 'react'
import api from '../../../utils/api'
import { useParams, Link } from 'react-router-dom'
import styles from './PetDetail.module.css'
import NewStyles from '../../form/Form.module.css'

//hooks
import useFlashMessage from '../../../hooks/useFlashMessage'


const PetDetail = () => {
    const [pet, setPet] = useState({})
    const { id } = useParams()
    const { setFlashMessage } = useFlashMessage()
    const [token] = useState(localStorage.getItem('token') || '')
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        api.get(`/pets/${id}`).then((response) => {
            setPet(response.data.pet)
        })
    }, [id])

    // Função para agendar a visita
    async function schedule() {
        setIsLoading(true);
        let msgType = 'success'

        try {
            const response = await api.patch(`/pets/schedule/${pet._id}`, {}, {
                headers: {
                  Authorization: `Bearer ${JSON.parse(token)}`,
                },
            })

            // Se a requisição for bem-sucedida, mostramos a mensagem de sucesso
            setFlashMessage(response.data.message, msgType)
        } catch (err) {
            // Caso haja erro, mostramos a mensagem de erro
            msgType = 'error'
            setFlashMessage(err.response?.data?.message || 'Erro ao agendar visita.', msgType)
            setIsLoading(false);
        }
    }

    return (
        <>
            {pet.name && (
                <section className={styles.pet_details_container}>
                    <div className={styles.petdetails_header}>
                        <h1>Conhecendo o Pet: {pet.name}</h1>
                        <p>Se tiver interesse, marque uma visita para conhecê-lo</p>
                    </div>

                    {/* Exibindo as imagens do pet */}
                    <div className={styles.pet_images}>
                        {pet.images.map((image, index) => (
                            <img
                                src={`${import.meta.env.VITE_API_URL}/images/pets/${image}`}
                                alt={pet.name}
                                key={index}
                            />
                        ))}
                    </div>

                    <p>
                        <span className='bold'>Peso:</span> {pet.weight}Kg
                    </p>
                    <p>
                        <span className='bold'>Idade:</span> {pet.age} anos
                    </p>

                    {/* Verifica se o usuário está logado */}
                    {token ? (
                        <div className={NewStyles.form_container_2}>
                            <button
                            type='submit'
                            onClick={schedule}
                            disabled={isLoading}  // Desabilitar o botão enquanto estiver carregando
                            className={NewStyles.submitButton}
                            >
                            {isLoading ? (
                                <span className={NewStyles.loader_2}></span> // Exibe o loader quando estiver carregando
                            ) : (
                                "Solicitar uma visita" // Texto do botão quando não estiver carregando
                            )}
                            </button>
                        </div>
                    ) : (
                        <p>Você precisa <Link to='/register'>criar uma conta</Link> para solicitar a visita</p>
                    )}
                </section>
            )}
        </>
    )
}

export default PetDetail
