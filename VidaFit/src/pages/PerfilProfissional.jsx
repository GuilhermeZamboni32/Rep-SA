import React from 'react'
import Navbar from '../Components/Navbar'
import './PerfilProfissional.css'
//import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

function PerfilProfissional() {
    const navigate = useNavigate()

    const profissional = JSON.parse(localStorage.getItem('profissionalSelecionado')) || {};

    function exercicio(){
      navigate('/telaexer');
    }
  
    function dieta(){
      navigate('/teladieta');
    }
  
    function avaliar(){
    navigate('/avaliacao');
  }

    function voltar(){
    //navigate(-1);
    navigate('/perfil');
  }
  
    return (
     
      <div className="container-perfil-prof">
        <Navbar />
          <div className="div-grupo-prof">
            
           
            <div className="div-grupo-usuario-prof">
  
              <div className='div-img-prof'>
              <img className='img' src="perfil-branco.png" alt="" />
              </div>
  
              <div className="espaco-prof"></div>
  
              <div className="perfil-input-prof">
                <input className='texto-perfil-prof' type="text" placeholder='Nome :' value={profissional.nome || ''} readOnly />
                <input className='texto-perfil-prof' type="text" placeholder='Data de nascimento :' value={profissional.nascimento || ''} readOnly />
                <input className='texto-perfil-prof' type="text" placeholder='Email :' value={profissional.email || ''} readOnly />
                
                <div className="espaco-prof"></div>
                 <button className='button-perfil' onClick={avaliar}>Avaliar Usuario</button>
                 <button className='voltar-prof' onClick={voltar}>voltar</button>
              </div>
  
                
            </div>
  
          
  
           
  
            <div className="div-grupo-exercicio-prof">
              <div className="titulo-prof">
                <h1>  
                Alunos - Exercicios
                </h1>
              </div>
  
              <div className="exercicios-prof">
                <button onClick={exercicio}>Gabriel Souza</button>
                <button onClick={exercicio}>Lucas Oliveira</button>
                <button onClick={exercicio}>Mariana Costa</button>
                <button onClick={exercicio}>Fernanda Alves</button>
              </div>
            </div>
  
           
  
            <div className="div-grupo-dieta-prof">
            <div className="titulo-prof">
                <h1>  
                Alunos - Dietas
                </h1>
              </div>
              <div className="dieta-prof">
                <button onClick={dieta}>Thiago Martins</button>
                <button onClick={dieta}>Camila Rocha</button>
                <button onClick={dieta}>Eduardo Lima</button>
              </div>
            </div>
  
          </div>
        </div>
  
    )
}

export default PerfilProfissional