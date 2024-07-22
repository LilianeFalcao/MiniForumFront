import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import Posts from './pages/postagens/Posts';
import Comentario from './pages/comentarios/Comentario';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/posts' element={<Posts />}/>
        <Route path='/posts/:postId/comentarios' element={<Comentario />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
