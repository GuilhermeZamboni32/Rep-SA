import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import './Cadastro.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import ModalVerde from '../Components/ModalVerde';
import ModalVermelho from '../Components/ModalVermelho';


function Cadastro() {
  const [user, setUsers] = useState({ username: '', password_user: '', email_user: '', age_user: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensagemModal, setMensagemModal] = useState('');
  const [mostrarErro, setMostrarErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');

  const handleReister = async (e) => {
    e.preventDefault();

    if (user.username === '') {
      mostrarErroModal('Nome de usuário é obrigatório');
      return;
    } else if (user.email_user === '') {
      mostrarErroModal('Email é obrigatório');
      return;
    } else if (!validarEmail(user.email_user)) {
      mostrarErroModal('Email inválido');
      return;
    } else if (user.age_user === '') {
      mostrarErroModal('Data de nascimento é obrigatória');
      return;
    } else if (user.password_user === '') {
      mostrarErroModal('Senha é obrigatória');
      return;
    } else if (user.password_user !== confirmPassword) {
      mostrarErroModal('Senhas não conferem!');
      return;
    } else if (
      user.password_user.length < 6 ||
      !/[A-Z]/.test(user.password_user) ||
      !/[0-9]/.test(user.password_user)
    ) {
      mostrarErroModal('Senha fraca. Adicione letras maiúsculas e números!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/users', user);
      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        setUsers(response.data);
        setMensagemModal('Usuário cadastrado com sucesso!');
        setMostrarModal(true);
        setTimeout(() => {
          setMostrarModal(false);
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      console.error('Erro:', error);
      mostrarErroModal('Erro ao cadastrar usuário. Tente novamente!');
    }
  };

  const validarEmail = (email) => {
    const emailt = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailt.test(email);
  };

  const mostrarErroModal = (mensagem) => {
    setMensagemErro(mensagem);
    setMostrarErro(true);
    setTimeout(() => setMostrarErro(false), 5000);
  };

  return (
    <div className='container-cadastro'>
      {/* <Navbar /> */}
      <div className='container-cadastro-2'>
        <div className='div-cadas-esquerda'>
          <div className='espaco-0'></div>
          <img className='titulo-logo' src='logomarca_VF.png' alt='' />
        </div>
        <div className='div-cadas-direita'>
          <div className='espaco-1'></div>

          <div className='cadas-inf'>
            <div className='titulo-cadas'>
              <img className='logomarca' src='logotipo_VF_2.png' alt='' />
            </div>
            <div className='cadas-input'>
              <input
                className='texto-cadas'
                type='text'
                placeholder='Nome de usuário:'
                value={user.username}
                onChange={(e) => setUsers({ ...user, username: e.target.value })}
              />
              <input
                className='texto-cadas'
                type='date'
                placeholder='Data de nascimento :'
                value={user.age_user}
                onChange={(e) => setUsers({ ...user, age_user: e.target.value })}
              />
              <input
                className='texto-cadas'
                type='text'
                placeholder='Email :'
                value={user.email_user}
                onChange={(e) => setUsers({ ...user, email_user: e.target.value })}
              />
              <input
                className='texto-cadas'
                type={showPassword ? 'text' : 'password'}
                placeholder='Senha :'
                value={user.password_user}
                onChange={(e) => setUsers({ ...user, password_user: e.target.value })}
              />
              <input
                className='texto-cadas'
                type={showPassword ? 'text' : 'password'}
                placeholder='Confirmar Senha :'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className='espaco-2'></div>
            </div>

            <div className='checkbox-container'>
              <input type='checkbox'  checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} />
              <label className='mostra-senha-cadastro'>Mostrar senha</label>
            </div>

            <div className='espaco-3'></div>
            <button className='button-cadastro' onClick={handleReister}>
              <h1>Cadastrar</h1>
            </button>
            <p className='register-link-cadastro-1'>
              Já tem uma conta? <Link className='register-link-cadastro-2' to='/login'>Entre</Link>
            </p>
          </div>
        </div>
      </div>

      {/* MODAIS */}
      {mostrarModal && <ModalVerde mensagem={mensagemModal} onClose={() => setMostrarModal(false)} />}
      {mostrarErro && <ModalVermelho mensagem={mensagemErro} onClose={() => setMostrarErro(false)} />}
    </div>
  );
}

export default Cadastro;
