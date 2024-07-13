import React from 'react'
import useForm from '../../hooks/useForm'
import LoginLogout from '../../components/loginLogOutbutton/LoginLogout'
import styles from "./Cadastro.module.css"
import axios from 'axios'
import { BaseUrl } from "../../constants/BaseUrl"
import { goToLogin } from '../../router/cordinator'
import { useNavigate } from 'react-router-dom'
const Cadastro = () => {
  const navigate = useNavigate()

  const {form, onChangeInputs, clearInputs} = useForm({
    apelido: "",
    email: "",
    password: ""
  });

  const handleCadastro = (e) => {
    e.preventDefault();

    const DadosCadastro = {
      apelido: form.apelido,
      email: form.email,
      password: form.password
    }

    axios
    .post(`${BaseUrl}/users`, DadosCadastro)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      goToLogin(navigate);
    }).catch((error) => {
      console.log(error.response);
    });

    clearInputs()
  }

  return (
    <div className={styles.background}>
    <div className={styles.CadastroBack}>
      <LoginLogout  className={styles.logOut}/>
      <p className={styles.textos} >Seja Bem-vindo!! </p >
      <form className={styles.FormCadastro}  onSubmit={handleCadastro} >
        <label>
          <input className={styles.InputsStyles}
            type="apelido"
            name='apelido'
            value={form.apelido}
            onChange={onChangeInputs}
            placeholder='Crie um apelido criativo!' />
        </label>
        <label>
          <input className={styles.InputsStyles}
            type="email"
            name='email'
            value={form.email}
            required
            onChange={onChangeInputs}
            placeholder='Insira seu melhor E-mail' />
        </label>
        <label>
          <input className={styles.InputsStyles}
            type="password"
            name='password'
            value={form.password}
            onChange={onChangeInputs}
            required
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$"
            title="A senha deve conter pelo menos 8 caracteres, incluindo pelo menos um dígito, uma letra minúscula, uma letra maiúscula e um caractere especial ($, *, &, @ ou #)"
            placeholder='Insira sua senha' />
        </label>
        <button className={styles.ButtonLogin}> Cadastrar </button >
      </form>
    </div>
  </div>
  )
}

export default Cadastro