import React, { useCallback, useEffect, useState } from 'react'
import useForm from '../../hooks/useForm'
import styles from "./Comentario.module.css"
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { BaseUrl } from '../../constants/BaseUrl'
import { useParams } from 'react-router-dom'
//import Card from '../../components/cards/Card'

const Comentario = () => {
        const { postId } = useParams();
        const [comments, setComments] = useState([]);

        const {form, onChangeInputs, clearInputs} = useForm({
            content: ""
        });

        const fazerComentario = async (e) => {
            e.preventDefault();
        
            if (!form.content) {
            console.error("O campo 'Comentario' não pode ser postado vazio!");
            return;
            }
        
            try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("ERRO! Token não encontrado.");
                return;
            }
        
            const decodedToken = jwtDecode(token);
            const user_id = decodedToken.id;
        
            if (!user_id) {
                console.error("ERRO! Token inválido.");
                return;
            }
        
            const response = await axios.post(
                `${BaseUrl}/posts/${postId}/comentarios`,
                {
                post_id: postId,
                user_id: user_id,
                content: form.content,
                },
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                }
            );
        
            if (response) {
                console.log("Comentário enviado com sucesso!");
            }
            clearInputs();
        
            } catch (error) {
            console.log(error);
            if (error.response) {
                console.log("Error data:", error.response.data);
                console.log("Error status:", error.response.status);
            }
            }
        };
        const handleCarregaPostagem = useCallback(async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${BaseUrl}/posts/${postId}/comentarios`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setComments(response.data);
            } catch (error) {
                console.log("Error", error.response);
            }
        }, [postId]);
    
        useEffect(() => {
            handleCarregaPostagem();

        }, [handleCarregaPostagem]);

    return (
        <div>
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
            </div>
            <div className={styles.LinhaSeparacao}></div>
            <div className={styles.card}>
                {comments.map(comment => (
                    <div key={comment.id} className={styles.container}>
                        <li styles={{}}>
                            <p className={styles.userId}>Enviado por: <strong>{comment.user_id}</strong></p>
                            <h1 className={styles.conteudo}>{comment.content}</h1>
                        </li>
                    </div>
                    
                ))}
            <div className={styles.LinhaSeparacao}></div>
            </div>
        </div>
    )
}

export default Comentario