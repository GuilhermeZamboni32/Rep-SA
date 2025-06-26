import React from 'react'
import Navbar from '../Components/Navbar'
import "./Avaliacao.css"
import { Link, useNavigate } from 'react-router-dom'
import { react, useContext } from 'react'
import { GlobalContext } from "../Context/GlobalContext"
import {useState} from 'react'

function Avaliacao() {
const [comentario, setComentario] = useState('')
const [nota, setNota] = useState(0);
const { user, setUser} = useContext(GlobalContext)
const { updateUser } = useContext(GlobalContext)
const { logout } = useContext(GlobalContext)

  const navigate = useNavigate()

  function voltar(){
    
    navigate(-1);
  }
  function avaliacoes(){
    navigate('/Av_notas')
  }


  console.log('User no contexto global:', user);

  const formatDate = (date) => {
    if (!date) return '';
    const parsedDate = new Date(date); 
    const day = String(parsedDate.getDate()).padStart(2, '0'); 
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); 
    const year = parsedDate.getFullYear(); 
    return `${day}/${month}/${year}`; 
}
  const enviarAvaliacao = async () => {
    if (!comentario.trim()) {
      alert('Por favor, escreva um comentário antes de enviar.');
      return;
    }
    const dados = {
      nota: nota || null, 
      comentario, 
      id_user: user?.id,
    };
    if (!dados.id_user) {
      alert('ID do usuário não encontrado. Certifique-se de que está autenticado.');
      return;
    }

    //console.log('Dados enviados:', dados);

    try {
      const response = await fetch(`http://localhost:3000/avaliacoes/${dados.id_user}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      if (response.ok) {
        alert('Avaliação enviada com sucesso!')
      } else {
        const errorData = await response.json()
        alert(`Erro: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error)
      alert('Erro ao conectar com o servidor.')
    }
  };

  const handleStarClick = (index, esquerda) => {
    const novaNota = esquerda ? parseFloat((index + 0.5).toFixed(2)) : index + 1
    if (index === 0 && novaNota === nota) {
      setNota(0)
    } else {
      setNota(novaNota)
    }
  };

const obterImagemEstrela = (index) => {
  if (nota >= index + 1) return '/star-cheia.png'
  if (nota >= parseFloat((index + 0.5).toFixed(2))) return '/star-meia.png' 
  return '/star-vazia.png'
};

  return (
    <div className="container-Ava">
    <Navbar />
      <div className="div-grupo-Ava">
        
        <div className="div-grupo-usuario-Ava">

          <div className='div-img'>
          {<img className='img' src="the-rock.jpg" alt="" />}
          </div>

          <div className="espaco"></div>

          <div className="perfil-input-1-ava">
          <input
                className='texto-inp'
                type="text"
                placeholder='Nome :'
                value={user?.username || ''}
                readOnly
            />
          </div> 

            <div className="perfil-input-2-ava">
            <input
                className='texto-inp'
                type="text"
                placeholder='Data de nascimento :'
                value={formatDate(user?.age_user)}
                readOnly
            />
           </div> 

           <div className="perfil-input-3-ava">
             <input
                className='texto-inp'
                type="text"
                placeholder='Email :'
                value={user?.email_user || ''}
                readOnly
            />
          </div>
            <div className="espaco"></div>


            <div className='botoes-av'>
            <button className='avaliar-usuario' onClick={avaliacoes}>avaliaçoes</button>
            <button className='voltar' onClick={voltar}>voltar</button>
            </div>

          
        </div>

      
        <div className="div-grupo-Avaliacao">
          <div className="titulo-Ava">
            <h1>  
            Avaliar Usuario
            </h1>
          </div>

          <div className="Ava-estrela">
            <div className="star-rating">
            {[0, 1, 2, 3, 4].map((index) => (
              <button key={index} className="star-button">
                <span
                  className="estrela-metade esquerda"
                  onClick={() => handleStarClick(index, true)} 
                />
                <span
                  className="estrela-metade direita"
                  onClick={() => handleStarClick(index, false)} 
                />
                <img
                  src={obterImagemEstrela(index)} 
                  alt="star"
                  className="star-img"
                />
              </button>
            ))}
            </div>
          </div>

          <div className="Ava-coment">
          <div className="titulo-Ava-coment">
            <h2>  
            Adicionar Comentario
            </h2>
            </div>
            <textarea className='comentario' 
            placeholder='escreva seu comentario aqui'
            value={comentario}
            cols="100" 
            rows="100" 
            onChange={(e) => setComentario(e.target.value)}
            ></textarea>
          </div>
         <button className='btn-av' onClick={enviarAvaliacao}>enviar</button>
        </div>
      </div>
    </div>
  )
}

export default Avaliacao ;