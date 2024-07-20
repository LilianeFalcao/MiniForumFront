import React from 'react'
import useForm from '../../hooks/useForm'
import styles from "./Comentario.module.css"
//import Card from '../../components/cards/Card'

const Comentario = () => {
    const {form, onChangeInputs, clearInputs} = useForm({
        content: " "
    })

    const fazerComentario = (e) =>{
        e.preventDefault()

        const dadosComentario = {
            content : form.content
        }

        console.log(dadosComentario)

        clearInputs()
    }
    return (
        <div>
            <form onSubmit={fazerComentario} className={styles.FormPost}>
                <input 
                    type="text"
                    name='content'
                    value={form.content}
                    onChange={onChangeInputs}
                    placeholder='Adicionar um comentário...'

                    className={styles.titleText}
                    />
                <button className={styles.respostaButton}>
                    Responder
                </button>
            </form>
            
            <div className={styles.LinhaSeparacao}></div>
        </div>
    )
}

export default Comentario