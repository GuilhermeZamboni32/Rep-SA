import React, { useState, useEffect } from 'react';
import './TelaExer.css';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ExerciciosList from './ExerciciosList';

function TelaExer() {
  const navigate = useNavigate();
  const [exercicios, setExercicios] = useState([]);

  useEffect(() => {
    const fetchExercicios = async () => {
      try {
        const response = await axios.get('http://localhost:3000/exercicios');
        setExercicios(response.data);
      } catch (error) {
        console.error('Erro ao buscar exercícios:', error);
      }
    };

    fetchExercicios();
  }, []);

  function voltar() {
    navigate('/perfil');
  }

  
  
  return (
    <div className='container-exer'>
      <Navbar />
      <div className='div-grup-exer'>
        <div className='div-topo'>
          <div className='topo-es'>
            <h1 className='texto-exer'>Exercícios</h1>
          </div>
          <div className='topo-me'></div>
          <div className='topo-di'>
            <button className='butoon-voltar' onClick={voltar}>
              <h1 className='texto-exer'>Voltar</h1>
            </button>
          </div>
        </div>
        <div className='div-baixo'>
          <ExerciciosList exercicios={exercicios} />
        </div>
      </div>
    </div>
  );
}

export default TelaExer;