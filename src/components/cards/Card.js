import React, { useEffect, useState } from 'react';
import LikeIcon from "../../asset/like.png";
import Comentarios from "../../asset/comments.png";
import DeslikeIcon from "../../asset/deslike.png";
import styles from "./Card.module.css";
import axios from 'axios';
import { BaseUrl } from '../../constants/BaseUrl';

const Card = ({ postId, title, content, UserName}) => {
    const [likeActive, setLikeActive] = useState(false);
    const [deslikeActive, setDeslikeActive] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [deslikeCount, setDeslikeCount] = useState(0);

    useEffect(() => {
        // Buscar contagem de likes e deslikes do servidor ou localStorage
        const fetchPostData = async () => {
            try {
                const storedLikeCount = localStorage.getItem(`likeCount_${postId}`);
                const storedDeslikeCount = localStorage.getItem(`deslikeCount_${postId}`);

                if (storedLikeCount !== null && storedDeslikeCount !== null) {
                    setLikeCount(parseInt(storedLikeCount));
                    setDeslikeCount(parseInt(storedDeslikeCount));
                } else {
                    const response = await axios.get(`${BaseUrl}/posts/${postId}`);
                    const { numeroLikes, numeroDeslikes } = response.data;
                    setLikeCount(numeroLikes);
                    setDeslikeCount(numeroDeslikes);
                    localStorage.setItem(`likeCount_${postId}`, numeroLikes);
                    localStorage.setItem(`deslikeCount_${postId}`, numeroDeslikes);
                }

                // Verificar ações armazenadas localmente
                const storedActions = JSON.parse(localStorage.getItem(`actions_${postId}_${UserName}`)) || [];
                setLikeActive(storedActions.includes("like"));
                setDeslikeActive(storedActions.includes("deslike"));
            } catch (error) {
                console.error("Erro ao buscar dados do post:", error);
            }
        };

        fetchPostData();
    }, [postId, UserName]);
    const handleAction = async (actionType) => {
        try {
            const storedActions = JSON.parse(localStorage.getItem(`actions_${postId}_${UserName}`)) || [];
            let newStoredActions = [...storedActions];
    
            if (actionType === "like") {
                if (!likeActive) {
                    setLikeActive(true);
                    setLikeCount(prevCount => {
                        const newCount = prevCount + 1;
                        localStorage.setItem(`likeCount_${postId}`, newCount);
                        return newCount;
                    });
    
                    if (deslikeActive) {
                        setDeslikeActive(false);
                        setDeslikeCount(prevCount => {
                            const newCount = prevCount - 1;
                            localStorage.setItem(`deslikeCount_${postId}`, newCount);
                            return newCount;
                        });
                    }
                    newStoredActions = ["like"];
                    await sendActionsToServer("like");
                } else {
                    setLikeActive(false);
                    setLikeCount(prevCount => {
                        const newCount = prevCount - 1;
                        localStorage.setItem(`likeCount_${postId}`, newCount);
                        return newCount;
                    });
                    newStoredActions = [];
                    await sendActionsToServer("removeLike");
                }
            } else if (actionType === "deslike") {
                if (!deslikeActive) {
                    setDeslikeActive(true);
                    setDeslikeCount(prevCount => {
                        const newCount = prevCount + 1;
                        localStorage.setItem(`deslikeCount_${postId}`, newCount);
                        return newCount;
                    });
    
                    if (likeActive) {
                        setLikeActive(false);
                        setLikeCount(prevCount => {
                            const newCount = prevCount - 1;
                            localStorage.setItem(`likeCount_${postId}`, newCount);
                            return newCount;
                        });
                    }
                    newStoredActions = ["deslike"];
                    await sendActionsToServer("deslike");
                } else {
                    setDeslikeActive(false);
                    setDeslikeCount(prevCount => {
                        const newCount = prevCount - 1;
                        localStorage.setItem(`deslikeCount_${postId}`, newCount);
                        return newCount;
                    });
                    newStoredActions = [];
                    await sendActionsToServer("removeDeslike");
                }
            }
    
            localStorage.setItem(`actions_${postId}_${UserName}`, JSON.stringify(newStoredActions));
        } catch (error) {
            console.error("Erro ao realizar ação:", error);
        }
    };
    
    const sendActionsToServer = async (actionType) => {
        try {
            console.log(`Enviando ${actionType} para o servidor. postId: ${postId}, UserName: ${UserName}`);
            const response = await axios.post(`${BaseUrl}/posts/${postId}/likes`, {
                postId: postId,
                userId: UserName,
                action: actionType
            });
            console.log(`Resposta do servidor para ${actionType}:`, response.data);
        } catch (error) {
            console.error(`Erro ao enviar ${actionType} para o servidor:`, error);
        }
    };

    return ( 
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.titulo}>
                    <p className={styles.userId}>Enviado por: {UserName}</p>
                    <h3>{title}</h3>
                </div>
                <div className={styles.conteudo}>
                    {content}
                </div>
                <div className={styles.BotaoInteracao}>
                    <button onClick={() => handleAction('like')}>
                        <img src={LikeIcon} alt="likeIcon" /> {likeCount}
                    </button>
                    <button onClick={() => handleAction('deslike')}>
                        <img src={DeslikeIcon} alt="deslikeIcon" /> {deslikeCount}
                    </button>
                    <button>
                        <img src={Comentarios} alt="comments" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
