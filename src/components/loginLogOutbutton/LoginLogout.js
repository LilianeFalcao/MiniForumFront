import React from 'react'
import { goToLogin } from "../../router/cordinator";
import { useNavigate } from 'react-router-dom'
import styles from "./LoginLogout.module.css"

const LoginLogout = () => {

    const navigate = useNavigate()

    const handleLogin = () => {
        localStorage.removeItem("token");
        goToLogin(navigate);
    };

    const isAuthenticated = localStorage.getItem("token");

    let buttonText = isAuthenticated ? "Logout" : "Login";
    return (
        <>
        <div className={styles.container}>
            <p className={styles.buttonLogOutLogin}  onClick={handleLogin}> 
                {buttonText} 
            </p>
        </div>
        </>
    )
}

export default LoginLogout