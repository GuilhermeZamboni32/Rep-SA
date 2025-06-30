import React from 'react'
import Navbar from '../Components/Navbar'
import './Perfil.css'
//import React, {useState} from 'react'
import { useState , useEffect} from 'react';
import { Link, useNavigate} from 'react-router-dom'
import { react, useContext } from 'react';
import { GlobalContext } from "../Context/GlobalContext"
import bcrypt from 'bcryptjs';

function Perfil() {

  const [selectedProfessional, setSelectedProfessional] = useState('');
  useEffect(() => {
    const professional = localStorage.getItem('selectedProfessional'); // Recupera o nome do profissional do localStorage
    if (professional) {
      setSelectedProfessional(professional);
    }
  }, []);


const { user, setUser} = useContext(GlobalContext)
const { updateUser } = useContext(GlobalContext)
const { logout } = useContext(GlobalContext)
const navigate = useNavigate()
  

const formatDate = (date) => {
    if (!date) return '';
    const parsedDate = new Date(date); 
    const day = String(parsedDate.getDate()).padStart(2, '0'); 
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); 
    const year = parsedDate.getFullYear(); 
    return `${day}/${month}/${year}`; 
};


 function exercicio(categoria) {
  navigate('/telaexer', { state: { categoria } });
}

  function dieta(){
    navigate('/teladieta');
  }

  function edit(){
    navigate('/editperfil');
  }

  function avaliar(){
    navigate('/avaliacao');
  }

  return (
   
    <div className="container-perfil">
      <Navbar />
        <div className="div-grupo">
          
         
          <div className="div-grupo-usuario">

            <div className='div-img'>
            {/*<img 
              className='img'
              src={user?.image || 'the-glock.png'}
              alt="Profile"
            />*/}
            <img className='imagem-teste' src="perfil-branco.png" alt="" />
            </div>

            <div className="espaco"></div>

            <div className="perfil-input">
            <input
                className='texto-perfil'
                type="text"
                placeholder='Nome :'
                value={user?.username || ''}
                readOnly
            />

            <input
                className='texto-perfil'
                type="text"
                placeholder='Data de nascimento :'
                value={formatDate(user?.age_user)}
                readOnly
            />
            <input
                className='texto-perfil'
                type="text"
                placeholder='Email :'
                value={user?.email_user || ''}
                readOnly
            />
            
              <div className="espaco"></div>
            </div>
           <div className='profisional-selecionado'>
           <p className="label-profissional">profissional selecionado</p>

                {selectedProfessional ? (
                  <div className="linha-profissional">
                    <input
                      className="campo-profissional"
                      type="text"
                      value={selectedProfessional}
                      readOnly
                    />
                    <button
                      className="botao-perfil-profissional"
                      onClick={() => navigate('/perfilprofissional')}
                    >
                      Perfil profissional
                    </button>
                  </div>
                ) : (
                  <button
                    className="button-perfil"
                    onClick={() => navigate('/home')}
                  >
                    Escolher Profissional
                  </button>
                )}
          </div>

            <div className='botoes-perfil'>

              <button className='button-perfil' onClick={edit}>Editar</button>
              <button className='button-perfil' onClick={avaliar}>Avaliar Usuario</button>
              <button className='button-perfil' onClick={logout}>Sair</button>
            </div>

          </div>

        

         

          <div className="div-grupo-exercicio">
            <div className="titulo">
              <h1>  
              Grupo de Exercícios
              </h1>
              
            </div>

            <div className="exercicios">
              <button className='button-exer-perfil-0' onClick={() => exercicio('peito')}>treino de peito</button>
              <button className='button-exer-perfil-0' onClick={() => exercicio('costas')}>treino de costas</button>
              <button className='button-exer-perfil-0' onClick={() => exercicio('perna')}>treino de pernas</button>
              {/*<button onClick={exercicio}>Treino D</button>*/}
            </div>
          </div>

         


          <div className="div-grupo-dieta">
          <div className="titulo">
              <h1>  
              Grupo de Dietas
              </h1>
            </div>
            <div className="dieta1">
              <button className='button-dieta-perfil-1' onClick={dieta}>Dieta A</button>
              {/*<button onClick={dieta}>Dieta B</button>
              <button onClick={dieta}>Dieta C</button>*/}
            </div>
          </div>
 
        </div>
      </div>

  )
}

export default Perfil



/*
    <div className='container-perfil'>
      <div className='div-grupo'>

      <div className='div-grupo-use'></div>

      <div className='div-grupo-exe'></div>

      <div className='div-grupo-die'></div>
      </div>
      

    </div>*/