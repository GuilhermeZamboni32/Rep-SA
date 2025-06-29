import React, { useState, useEffect } from 'react';
import './TelaDieta.css';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DietaList from './DietaList';

function TelaDieta() {
  const navigate = useNavigate();
  const [dietas, setDietas] = useState([]);

  useEffect(() => {
    const fetchDietas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/dietas');
        setDietas(response.data);
      } catch (error) {
        console.error('Erro ao buscar dietas:', error);
      }
    };

    fetchDietas();
  }, []);

  function voltar() {
    navigate('/perfil');
  }

  return (
    <div className='container-dieta'>
      <Navbar />
      <div className='div-grup-dieta'>
        <div className='div-topo-dieta'>
          <div className='topo-es-dieta'>
            <h1 className='texto-dieta'>Dietas</h1>
          </div>
          <div className='topo-me-dieta'></div>
          <div className='topo-di-dieta'>
            <button className='butoon-voltar-dieta' onClick={voltar}>
              <h1 className='texto-dietar'>Voltar</h1>
            </button>
          </div>
        </div>
        <div className='div-baixo-dieta'>
          <DietaList dietas={dietas} />
        </div>
      </div>
    </div>
  );
}

export default TelaDieta;
