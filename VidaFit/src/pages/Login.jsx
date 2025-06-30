import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import './Login.css';
import { GlobalContext } from '../Context/GlobalContext';
import ModalVerde from '../Components/ModalVerde';
import ModalVermelho from '../Components/ModalVermelho';

function Login() {
  const [form, setForm] = useState({ email_user: '', password_user: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensagemModal, setMensagemModal] = useState('');
  const [mostrarErro, setMostrarErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMostrarErro(false);
    setMostrarModal(false);


    try {
      const response = await axios.post('http://localhost:3000/login', {
        email_user: form.email_user,
        password_user: form.password_user
      });

      updateUser({
        id: response.data.id,
        username: response.data.username,
        email_user: response.data.email_user,
        age_user: response.data.age_user,
        account_enable: response.data.account_enable,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        image: response.data.image,
        gender_user: response.data.gender_user,
        problems_user: response.data.problems_user,
        professional_confirm: response.data.professional_confirm,
        professional_type: response.data.professional_type,
        comments_user: response.data.comments_user,
        user_rating: response.data.user_rating,
        avaliability: response.data.avaliability,
        address: response.data.address,
        token: response.data.token
      });

      setMensagemModal('Login realizado com sucesso!');
      setMostrarModal(true);
      setTimeout(() => {
        setMostrarModal(false);
        navigate('/perfil');
      }, 3000);

    } catch (err) {
      console.error(err);
      setMensagemErro(err.response?.data?.message || 'Ocorreu um erro. Tente novamente.');
      setMostrarErro(true);
      setTimeout(() => setMostrarErro(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
   <div className='container-login'>
  {/* <Navbar /> */} <Navbar />
  <div className='container-login-2'>
    <div className='div-cadas-esquerda-login'>
      <div className='espaco-0-login'></div>
      <img className='titulo-logo-login' src='logomarca_VF.png' alt='' />
    </div>

    <div className='div-cadas-direita-login'>
      <div className='cadas-inf-login'>
        <div className='titulo-cadas-login'>
          <img className='logomarca-login' src='logotipo_VF_2.png' alt='' />
        </div>

        <form className='cadas-input-login' onSubmit={handleSubmit}>
          <input
            className='texto-cadas-login'
            type='email'
            name='email_user'
            placeholder='Email:'
            value={form.email_user}
            onChange={handleChange}
            required
          />
          <input
            className='texto-cadas-login'
            type={showPassword ? 'text' : 'password'}
            name='password_user'
            placeholder='Senha:'
            value={form.password_user}
            onChange={handleChange}
            required
          />
          <div className='espaco-2-login'></div>
        </form>

        <div className='checkbox-container-login'>
          <input
            type='checkbox'
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
            className='checkbox-login'
          />
          <label className='mostra-senha-login'>Mostrar senha</label>
        </div>

        <div className='espaco-3-login'></div>

        <button type='submit' className='button-login' onClick={handleSubmit} disabled={loading}>
          <h1>{loading ? 'Entrando...' : 'Login'}</h1>
        </button>

        <p className='register-link-login-1'>
          Não tem uma conta? <Link className='register-link-login-2' to='/cadastro'>Registre-se</Link>
        </p>
      </div>
    </div>
  </div>

  {/* MODAIS */}
  {mostrarModal && (
    <ModalVerde mensagem={mensagemModal} onClose={() => setMostrarModal(false)} />
  )}
  {mostrarErro && (
    <ModalVermelho mensagem={mensagemErro} onClose={() => setMostrarErro(false)} />
  )}
</div>

  );
}

export default Login;
