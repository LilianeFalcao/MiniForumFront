import styled from "styled-components";

export const ImageLogo = styled.img`
    margin: 15px;
    width: 100px;
    height: 100px;
    object-fit: cover;
`;
export const DivLogout = styled.div`
    display: flex;
    flex-direct: row;
    justify-content:center;
    background-color: #3a3d52;

`
export const FormLogin = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;
`;

export const Container = styled.div`
    background-color: #262a37;
    width: 100%; 
    height: 100%; 
`;

export const Inputs = styled.input`
    padding: 15px;
    background: transparent;
    border: 1px solid #acacac;
    border-radius: 15px;
    font-size: 20px;
    color: white;
    margin:20px; 

    ::placeholder {
        color: #999;
    }
`;
export const ButtonLogin = styled.button`
    color: white;
    font-size: 20px;
    border-radius: 25px;
    background: rgb(31,21,121);
    background: linear-gradient(90deg, rgba(31,21,121,1) 0%, rgba(29,150,253,1) 50%, rgba(252,161,69,1) 100%);
    padding: 10px 20px;
    width: 200px;
    border: none;
    cursor: pointer;
    margin: 15px
`;

export const Ps = styled.p`
    color: #acacac;
    font-size: 1.3em
`;