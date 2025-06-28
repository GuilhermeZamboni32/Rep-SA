import React, { useState, useContext } from 'react'
import Navbar from '../Components/Navbar'
import "./Avaliacao.css"
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from "../Context/GlobalContext"
import ModalVerde from '../Components/ModalVerde'
import ModalVermelho from '../Components/ModalVermelho'

function Avaliacao() {
<<<<<<< HEAD
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
=======
  const [comentario, setComentario] = useState('')
  const [nota, setNota] = useState(0)
  const { user } = useContext(GlobalContext)
  const navigate = useNavigate()

  const [mostrarModal, setMostrarModal] = useState(false)
  const [mensagemModal, setMensagemModal] = useState('')
  const [mostrarErro, setMostrarErro] = useState(false)
  const [mensagemErro, setMensagemErro] = useState('')

  const voltar = () => navigate(-1)
  const avaliacoes = () => navigate('/Av_notas')

  const formatDate = (date) => {
    if (!date) return ''
    const parsedDate = new Date(date)
    return `${String(parsedDate.getDate()).padStart(2, '0')}/${String(parsedDate.getMonth() + 1).padStart(2, '0')}/${parsedDate.getFullYear()}`
  }

  const enviarAvaliacao = async () => {
    if (!comentario.trim()) {
      setMensagemErro('Por favor, escreva um comentário antes de enviar.')
      setMostrarErro(true)
      return
    }

    const dados = {
      nota: nota || null,
      comentario,
      id_user: user?.id,
    }

    if (!dados.id_user) {
      setMensagemErro('ID do usuário não encontrado. Faça login novamente.')
      setMostrarErro(true)
      return
    }
>>>>>>> 28fe4f61945bb895029b73738847311e132c9642

    try {
      const response = await fetch(`http://localhost:3000/avaliacoes/${dados.id_user}`, {
        method: 'POST',
<<<<<<< HEAD
        headers: {
          'Content-Type': 'application/json',
        },
=======
        headers: { 'Content-Type': 'application/json' },
>>>>>>> 28fe4f61945bb895029b73738847311e132c9642
        body: JSON.stringify(dados),
      })

      if (response.ok) {
<<<<<<< HEAD
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
=======
        setMensagemModal('Avaliação enviada com sucesso!')
        setMostrarModal(true)
        setComentario('')
        setNota(0)
      } else {
        const errorData = await response.json()
        setMensagemErro(errorData.error || 'Erro ao enviar avaliação.')
        setMostrarErro(true)
      }
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error)
      setMensagemErro('Erro ao conectar com o servidor.')
      setMostrarErro(true)
    }
  }

  const handleStarClick = (index, esquerda) => {
    const novaNota = esquerda ? parseFloat((index + 0.5).toFixed(2)) : index + 1
    setNota(index === 0 && novaNota === nota ? 0 : novaNota)
  }

  const obterImagemEstrela = (index) => {
    if (nota >= index + 1) return '/star-cheia.png'
    if (nota >= index + 0.5) return '/star-meia.png'
    return '/star-vazia.png'
  }
>>>>>>> 28fe4f61945bb895029b73738847311e132c9642

  return (
    <div className="container-Ava">
      <Navbar />
      <div className="div-grupo-Ava">
        <div className="div-grupo-usuario-Ava">
          <div className='div-img'>
            <img className='img' src="the-rock.jpg" alt="perfil" />
          </div>

          <div className="perfil-input-1-ava">
            <input className='texto-inp' type="text" placeholder='Nome :' value={user?.username || ''} readOnly />
          </div>

          <div className="perfil-input-2-ava">
            <input className='texto-inp' type="text" placeholder='Data de nascimento :' value={formatDate(user?.age_user)} readOnly />
          </div>

          <div className="perfil-input-3-ava">
            <input className='texto-inp' type="text" placeholder='Email :' value={user?.email_user || ''} readOnly />
          </div>

          <div className='botoes-av'>
            <button className='avaliar-usuario' onClick={avaliacoes}>avaliações</button>
            <button className='voltar' onClick={voltar}>voltar</button>
          </div>
        </div>

        <div className="div-grupo-Avaliacao">
          <div className="titulo-Ava">
            <h1>Avaliar Usuário</h1>
          </div>

          <div className="Ava-estrela">
            <div className="star-rating">
<<<<<<< HEAD
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
=======
              {[0, 1, 2, 3, 4].map((index) => (
                <button key={index} className="star-button">
                  <span className="estrela-metade esquerda" onClick={() => handleStarClick(index, true)} />
                  <span className="estrela-metade direita" onClick={() => handleStarClick(index, false)} />
                  <img src={obterImagemEstrela(index)} alt="star" className="star-img" />
                </button>
              ))}
>>>>>>> 28fe4f61945bb895029b73738847311e132c9642
            </div>
          </div>

          <div className="Ava-coment">
            <div className="titulo-Ava-coment">
              <h2>Adicionar Comentário</h2>
            </div>
<<<<<<< HEAD
            <textarea className='comentario' 
            placeholder='escreva seu comentario aqui'
            value={comentario}
            cols="100" 
            rows="100" 
            onChange={(e) => setComentario(e.target.value)}
            ></textarea>
=======
            <textarea
              className='comentario'
              placeholder='Escreva seu comentário aqui'
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              cols="100"
              rows="6"
            />
>>>>>>> 28fe4f61945bb895029b73738847311e132c9642
          </div>
          <button className='btn-av' onClick={enviarAvaliacao}>Enviar</button>
        </div>
      </div>

      {mostrarModal && (
        <ModalVerde mensagem={mensagemModal} onClose={() => setMostrarModal(false)} />
      )}

      {mostrarErro && (
        <ModalVermelho mensagem={mensagemErro} onClose={() => setMostrarErro(false)} />
      )}
    </div>
  )
}

export default Avaliacao
