export const goToCadastro = (navigate) =>{
    navigate("/cadastro");
}

export const goToLogin = (navigate) =>{
    navigate("/");
}

export const goToFeed = (navigate) =>{
    navigate("/posts");
}

export const goToComentarios = (navigate, postId) =>{
    navigate(`/posts/${postId}/comentarios`);
}