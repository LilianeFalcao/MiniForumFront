import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import Posts from './pages/postagens/Posts';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/posts' element={<Posts />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
