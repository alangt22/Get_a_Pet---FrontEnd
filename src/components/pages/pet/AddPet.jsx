import api from '../../../utils/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './AddPet.module.css'
import PetForm from '../../form/PetForm'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function AddPet() {
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()

  // Estado para controlar o carregamento
  const [isLoading, setIsLoading] = useState(false)

  async function registerPet(pet) {
    let msgType = 'success'

    const formData = new FormData()

    const petFormData = await Object.keys(pet).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append('images', pet[key][i])
        }
      } else {
        formData.append(key, pet[key])
      }
    })

    formData.append('pet', petFormData)

    setIsLoading(true)  // Inicia o loading

    const data = await api
      .post('pets/create', formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgType = 'error'
        return err.response.data
      })

    setIsLoading(false)  // Finaliza o loading

    setFlashMessage(data.message, msgType)
    if (msgType !== 'error') {
      navigate('/pet/mypets')
    }
  }

  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponível para adoção</p>
      </div>
      <PetForm handleSubmit={registerPet} btnText="Cadastrar" isLoading={isLoading} />
    </section>
  )
}

export default AddPet
