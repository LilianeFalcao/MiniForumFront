import React, { useCallback, useEffect, useState } from 'react'
import Card from '../../components/cards/Card'
import LoginLogout from '../../components/loginLogOutbutton/LoginLogout'
import useForm from '../../hooks/useForm'
import styles from "./Posts.module.css"
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { BaseUrl } from "../../constants/BaseUrl"
import { jwtDecode } from 'jwt-decode'
import { useFetch } from '../../hooks/useFetch'

const Posts = () => {
  const UrlPost = `${BaseUrl}/posts`
  const {loading , error} = useFetch(UrlPost);

  //pegando dados dos inputs
  const { form, onChangeInputs, clearInputs} = useForm({
    title: "",
    content: ""
  })
  
  const [posts, setPosts] = useState([])
  //const [userId, setUserId] = useState("");

  const notify = () => {
    toast.success("Postado!")
  }

  const handlePostagem = async (e) => {
    e.preventDefault()

    if (!form.title || !form.content) {
      console.error("Dados Inválidos: título ou conteúdo vazio");
      return;
    }
  
    if (typeof form.content !== "string") {
      console.error("Dados Inválidos: conteúdo deve ser uma string");
      return;
    }
  
    if (form.content.length < 1) {
      console.error("Dados Inválidos: conteúdo deve ter no mínimo 1 caractere");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const User_id = decodedToken.id

      if(!User_id){
        console.error("ERRO! token inválido")
        return
      }

      const response = await axios.post(
        `${BaseUrl}/posts`,
        {
          title: form.title,
          content: form.content,
          user_id : User_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );

      if(response){
        notify()
      }
      handleCarregaPostagem()
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log("Error data:", error.response.data);
        console.log("Error status:", error.response.status);
      }
    }
    clearInputs()
  }


  const handleCarregaPostagem = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(UrlPost, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPosts(response.data);
    } catch (error) {
      console.log("Error", error.response);
    }
  }, [UrlPost]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        
      } catch (error) {
        console.log("Erro ao decodificar o token:", error);
      }
    }
    handleCarregaPostagem();
  }, [handleCarregaPostagem]);

  return (
    <div className={styles.background}>
      <div>
        <LoginLogout />
        <ToastContainer />
        <form className={styles.FormPost} onSubmit={handlePostagem}>
          <input 
            type="text"
            name='title'
            value={form.title}
            onChange={onChangeInputs}
            placeholder='Titulo'
            
            className={styles.titleText}/>
          <input 
            type="text"
            name='content'
            required
            value={form.content}
            onChange={onChangeInputs}
            placeholder='O que está acontecendo?'
            
            className={styles.inputStyle}/>
            <button 
            type='submit' 
            className={styles.PostButton}
            > Postar </button>
        </form>
      </div>
      <div className={styles.LinhaSeparacao}></div>
      <div className={styles.Cards}>
        {/*dando get dos posts */}
        {loading && <p style={{color:`white`}}>Carregando dados...</p>}
        {error && <p>{error}</p>}
        {posts && posts.map((post) => {
          const token = localStorage.getItem("token");
          const decodedToken = jwtDecode(token);
          const UserName = decodedToken.id;
          return <Card 
            postId = {post.id} 
            key={post.id} 
            title={post.title} 
            content={post.content} 
            UserName={UserName}
            loading={loading}
            />;
        })}
      </div>
    </div>
  );
}

export default Posts