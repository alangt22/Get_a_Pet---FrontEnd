import React, { useState } from 'react'
import formStyles from './Form.module.css'
import Input from './Input.jsx'
import Select from './Select'

const PetForm = ({ handleSubmit, petData, btnText }) => {
    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const [isLoading, setIsLoading] = useState(false) // Adicionando o estado de carregamento
    const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"]

    function onFileChange(e) {
        setPreview(Array.from(e.target.files))
        setPet({ ...pet, images: [...e.target.files] })
    }

    function handleChange(e) {
        setPet({ ...pet, [e.target.name]: e.target.value })
    }

    function handleColor(e) {
        setPet({ ...pet, color: e.target.options[e.target.selectedIndex].text })
    }

    async function Submit(e) {
        e.preventDefault()
        setIsLoading(true) // Começar o carregamento
        console.log(pet)
        await handleSubmit(pet)
        setIsLoading(false) // Finalizar o carregamento
    }

    return (
        <form onSubmit={Submit} className={formStyles.form_container}>
            <div className={formStyles.preview_pet_images}>
                {preview.length > 0
                    ? preview.map((image, index) => (
                        <img
                            src={URL.createObjectURL(image)}
                            alt={pet.name}
                            key={`${pet.name}+${index}`}
                        />
                    ))
                    : pet.images && pet.images.map((image, index) => (
                        <img
                            src={`${import.meta.env.VITE_API_URL}/images/pets/${image}`}
                            alt={pet.name}
                            key={`${pet.name}+${index}`}
                        />
                    ))
                }
            </div>
            <Input
                text="Imagens do Pet"
                type="file"
                name="images"
                handleOnChange={onFileChange}
                multiple={true}
            />
            <Input
                text="Nome do Pet"
                type="text"
                name="name"
                placeholder="Digite o nome"
                handleOnChange={handleChange}
                value={pet.name || ""}
            />
            <Input
                text="Idade do Pet"
                type="text"
                name="age"
                placeholder="Digite a idade (Apenas Numeros)"
                handleOnChange={handleChange}
                value={pet.age || ""}
            />
            <Input
                text="Peso do Pet"
                type="number"
                name="weight"
                placeholder="Digite o peso"
                handleOnChange={handleChange}
                value={pet.weight || ""}
            />
            <Select
                name="color"
                text="Selecione a cor"
                options={colors}
                handleOnChange={handleColor}
                value={pet.color || ''}
            />
            <button
                type="submit"
                disabled={isLoading}  // Desabilitar o botão enquanto estiver carregando
                className={formStyles.submitButton}
            >
                {isLoading ? (
                    <span className={formStyles.loader}></span> // Exibe o loader quando estiver carregando
                ) : (
                    btnText
                )}
            </button>
        </form>
    )
}

export default PetForm
