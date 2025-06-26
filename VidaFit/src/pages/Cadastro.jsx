import React, {useState} from 'react'
import Navbar from '../Components/Navbar'
import "./Cadastro.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from  'axios'
import bcrypt from 'bcryptjs';




function Cadastro() {

  const [user, setUsers] = useState({username:'', password_user:'', email_user:'', age_user:''})
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();



  //!Esse metodo de verificar o cadastro é bem feio, não repita
  const handleReister = async (e) => {
    e.preventDefault()

    if (user.username === ''){
      alert('Nome de usuario é obrigatório')
      return
    }else if(user.email_user === ''){
      alert('Email é obrigatório')
      return
    }else if(!validarEmail(user.email_user)){
      alert('Email inválido')
      return
    }else if(user.age_user === ''){
      alert('Idade é obrigatória')
      return
    }else if(user.password_user === ''){
      alert('Senha é obrigatória')
      return
    }else if(user.password_user!= confirmPassword){
      alert('Senhas não conferem!')
      return
    }else if(user.password_user >= 6 ||  !/[A-Z]/.test(user.password_user) || !/[0-9]/.test(user.password_user)) {
      alert('Senha fraca, adicione letras maiusculas ou numeros!')
      return
    }else{
        try {
          const response = await axios.post('http://localhost:3000/users', user)
            if (response.status === 201) {
              localStorage.setItem('token', response.data.token);
              setUsers(response.data) 
              alert('Usuário cadastrado com sucesso!')
              navigate('/login');
        }
        } catch (error) {
            console.error('Error:', error)
          alert('Erro ao cadastrar usuário, tente novamente!', error)
        }
      }
    }

    const validarEmail = (email) => {
      const emailt = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      return emailt.test(email);
    }

  return (
    
    <div className='container-cadastro'>
    {/* <Navbar /> */}
     
      <div className='container-cadastro-2'>

      <div className='div-cadas-esquerda'>
        <div className='espaco-0'></div>
        <img className='titulo-logo' src="logomarca_VF.png" alt="" />
        <p></p>
      </div>
        <div className='div-cadas-direita'>
        <div className="espaco-1"></div>
        
        <div className='cadas-inf'>
          <div className='titulo-cadas'><img className='logomarca' src="logotipo_VF_2.png" alt="" /></div>
          <div className="cadas-input">
              <input className='texto-cadas' type="text" placeholder='Nome de usuario:' value={user.username} onChange={(e) => setUsers({ ...user, username: e.target.value })}/>
              <input className='texto-cadas' type="date" placeholder='Data de nascimento :' value={user.age_user} onChange={(e) => setUsers({ ...user, age_user: e.target.value })} />
              <input className='texto-cadas' type="text" placeholder='Email :' value={user.email_user} onChange={(e) => setUsers({ ...user, email_user: e.target.value })} />
              <input className='texto-cadas' type={showPassword ? 'text' : 'password'} placeholder='Senha :' value={user.password_users} onChange={(e) => setUsers({ ...user, password_user: e.target.value })} />
              <input className='texto-cadas' type={showPassword ? 'text' : 'password'} placeholder='Comfirmar Senha :' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <div className="espaco-2"></div>
            </div>
            <div className="checkbox-container">
              <input type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)}/>
              <label>Mostrar senha</label>
            </div>

            <div className="espaco-3"></div>
              <button className='button-cadastro' onClick={handleReister}><h1>Cadastrar</h1></button>
              <p className="register-link">
              Já tem uma conta? <Link to="/login">Entre</Link>
              </p>
          </div>
        </div>
      </div>
      </div>
    
  )
}

export default Cadastro




{/**
  import Navbar from "../components/Navbar"
import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import { useNavigate } from 'react-router-dom';
function Home() {
    const {usuarioLogado} = useContext(GlobalContext)
    const navigate = useNavigate(); // Hook para navegação 

    function logar(){
      //processo da validação do usuario
      navigate('/final');
    }

  return (
    <div>
        <Navbar />
      <h1>Página home do site</h1>
      <p>Olá {usuarioLogado}</p>

      <button onClick={logar}>Login</button>

    </div>
  )
}

export default Home
 */}