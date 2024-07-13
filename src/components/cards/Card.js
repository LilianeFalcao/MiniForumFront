import React from 'react'
import LikeIcon from "../../asset/like.png"
import Comentarios from "../../asset/comments.png"
import DeslikeIcon from "../../asset/deslike.png"
import styles from "./Card.module.css"
const Card = ({title, content, User_id, dislikes_count, likes_count}) => {

    return ( 
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.titulo}>
                    <p className={styles.userId} >Enviado por: {User_id} </p>
                    <h3>{title}</h3>
                </div>
                <div className={styles.conteudo}>
                    {content}
                </div>
                <div className={styles.BotaoInteracao}>
                    <button><img src={LikeIcon} alt="likeIcon"/> {likes_count} </button>
                    <button><img src={DeslikeIcon} alt="deslike"/> {dislikes_count} </button>
                    <button><img src={Comentarios} alt="comments"/></button>
                </div>
            </div>
        </div>
    )
}

export default Card