import React from 'react'
import { useNavigate } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import styles from "./Login.module.css"
import { goToCadastro, goToFeed } from '../../router/cordinator'
import { BaseUrl } from "../../constants/BaseUrl"
import axios from 'axios'
//import { jwtDecode } from "jwt-decode";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate();
  
  const IrCadastro = () => {
    goToCadastro(navigate)
  };

  const {form, onChangeInputs, clearInputs} = useForm({
    email: "",
    password: ""
  });
  
  const handleSubmit = (e) =>{
    e.preventDefault()

    const DadosLogin = {
      email: form.email,
      password: form.password,
    }

    axios
    .post(`${BaseUrl}/login`, DadosLogin)
    .then((res) => {
      const { token } = res.data
      localStorage.setItem("token", token);
      toast.success("Login realizado com sucesso!");
      goToFeed(navigate);
      
    }).catch((error) => {
      console.log(error.response);
      let errorMessage = "Erro ao fazer login";
      let statusCode = 500;
    
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data && error.response.data.error) {
          errorMessage = error.response.data.error;
        }
        statusCode = error.response.status;
      }
      alert(`${errorMessage} - Status: ${statusCode}`);
    });

    clearInputs();
  }

  return (
    <div className={styles.background}>
      <ToastContainer />
      <div className={styles.LoginBack}>
        <p className={styles.textos} >Projeto de rede Social</p>
        <form className={styles.FormLogin} onSubmit={handleSubmit}>
          <label>
            <input className={styles.InputsStyles}
              type="email"
              name='email'
              required
              value={form.email}
              onChange={onChangeInputs}
              placeholder='Insira seu melhor E-mail' />
          </label>
          <label>
            <input className={styles.InputsStyles}
              type="password"
              name='password'
              required
              value={form.password}
              onChange={onChangeInputs}
              placeholder='Insira sua senha' 
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$"
            title="A senha deve conter pelo menos 8 caracteres, incluindo pelo menos um dígito, uma letra minúscula, uma letra maiúscula e um caractere especial ($, *, &, @ ou #)"/>
          </label>
          <div className={styles.divButtons}> 
            <button className={styles.ButtonLogin}>Login</button>
            <button className={styles.ButtonCadastro} onClick={IrCadastro}> Crie uma conta! </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login