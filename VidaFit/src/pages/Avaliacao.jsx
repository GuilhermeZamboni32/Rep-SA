import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import "./Avaliacao.css"
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from "../Context/GlobalContext"
import axios from 'axios';
import ModalVerde from '../Components/ModalVerde'
import ModalVermelho from '../Components/ModalVermelho'

function Avaliacao() {
  const [comentario, setComentario] = useState('')
  const [nota, setNota] = useState(0)
  const { user } = useContext(GlobalContext)
  const navigate = useNavigate()
  const profissional = JSON.parse(localStorage.getItem('profissionalParaAvaliar')) || {};;
  const [mostrarModal, setMostrarModal] = useState(false)
  const [mensagemModal, setMensagemModal] = useState('')
  const [mostrarErro, setMostrarErro] = useState(false)
  const [mensagemErro, setMensagemErro] = useState('')
  const [selectedProfessional, setSelectedProfessional] = useState(null)

  const voltar = () => navigate(-1)
  const avaliacoes = () => navigate('/Av_notas')

  const formatDate = (date) => {
    if (!date) return ''
    const parsedDate = new Date(date)
    return `${String(parsedDate.getDate()).padStart(2, '0')}/${String(parsedDate.getMonth() + 1).padStart(2, '0')}/${parsedDate.getFullYear()}`
  }

 const enviarAvaliacao = async () => {
  try {
    const dados = {
      nota: nota || null,
      comentario,
      id_user: user?.id,
    };

    console.log('Enviando avaliação:', dados)

    if (!dados.id_user) {
      setMensagemErro('ID do usuário não encontrado. Faça login novamente.')
      setMostrarErro(true)
      return
    }

    if (!dados.comentario.trim()) {
      setMensagemErro('Comentário é obrigatório.')
      setMostrarErro(true)
      return
    }

    const response = await axios.post(`http://localhost:3000/avaliacoes/${dados.id_user}`, {
      nota: dados.nota,
      comentario: dados.comentario,
    });

    if (response.status === 201) {
      setMensagemModal('Avaliação enviada com sucesso!')
      setMostrarModal(true)
      setTimeout(() => {
        setMostrarModal(false)
      }, 3000)
    }
  } catch (error) {
    if (error.response?.status === 403) {
      mostrarErroModal('Você já enviou uma avaliação.')
    } else {
      console.error('Erro ao enviar avaliação:', error)
      mostrarErroModal('Erro ao enviar avaliação. Tente novamente!')
    }
  }
};
  const mostrarErroModal = (mensagem) => {
    setMensagemErro(mensagem);
    setMostrarErro(true);
    setTimeout(() => setMostrarErro(false), 5000);
  };

  const handleStarClick = (index, esquerda) => {
    const novaNota = esquerda ? parseFloat((index + 0.5).toFixed(2)) : index + 1
    setNota(index === 0 && novaNota === nota ? 0 : novaNota)
  }

  const obterImagemEstrela = (index) => {
    if (nota >= index + 1) return '/star-cheia.png'
    if (nota >= index + 0.5) return '/star-meia.png'
    return '/star-vazia.png'
  }

  useEffect(() => {
    const professional = localStorage.getItem('selectedProfessional')
    if (professional) {
      try {
        setSelectedProfessional(JSON.parse(professional));
      } catch {
        setSelectedProfessional('');
      }
    }
  }, []);

  useEffect(() => {
    if (selectedProfessional) {
      localStorage.setItem('profissionalParaAvaliar', JSON.stringify({
        id: selectedProfessional.id,
        nome: selectedProfessional.nome
      }));
    }
  }, [selectedProfessional]);
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
            <h1>Avaliar Profisional</h1>
          </div>
          <div className="profissional-selecionado-avaliacao">
            <strong>Profissional selecionado:</strong> {profissional?.nome || 'Nenhum selecionado'}
          </div>

          <div className="Ava-estrela">
            <div className="star-rating">
              {[0, 1, 2, 3, 4].map((index) => (
                <button key={index} className="star-button">
                  <span className="estrela-metade esquerda" onClick={() => handleStarClick(index, true)} />
                  <span className="estrela-metade direita" onClick={() => handleStarClick(index, false)} />
                  <img src={obterImagemEstrela(index)} alt="star" className="star-img" />
                </button>
              ))}
            </div>
          </div>

          <div className="Ava-coment">
            <div className="titulo-Ava-coment">
              <h2>Adicionar Comentário</h2>
            </div>
            <textarea
              className='comentario'
              placeholder='Escreva seu comentário aqui'
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              cols="100"
              rows="6"
            />
          </div>
          <button className='btn-av' onClick={enviarAvaliacao}>Enviar avaliaçao</button>
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
