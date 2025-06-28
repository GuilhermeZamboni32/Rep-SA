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
    <div className="container-login">
      <div className='container-login-2'>
        {/* <Navbar /> */}

        <div className='div-login-esquerda'>
          <div className='espaco-0-l'></div>
          <img className='titulo-logo-l' src="logomarca_VF.png" alt="" />
        </div>

        <div className='div-login-dirita'>
          <div className="cadas-inf-l">
            <form onSubmit={handleSubmit}>
              <h2 className="titulo-cadas">Login</h2>

              <div className="input-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email_user"
                  value={form.email_user}
                  onChange={handleChange}
                  className="inputs"
                  required
                />

                <label>Senha:</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password_user"
                  value={form.password_user}
                  onChange={handleChange}
                  className="inputs"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="botao-login"
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="botao-login"
                >
                  {loading ? 'Entrando...' : 'Login'}
                </button>

                <p className="register-link">
                  Não tem uma conta? <Link to="/cadastro">Registre-se</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* MODAIS */}
      {mostrarModal && (
        <ModalVerde
          mensagem={mensagemModal}
          onClose={() => setMostrarModal(false)}
        />
      )}
      {mostrarErro && (
        <ModalVermelho
          mensagem={mensagemErro}
          onClose={() => setMostrarErro(false)}
        />
      )}
    </div>
  );
}

export default Login;
