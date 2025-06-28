import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import AnimacaoModal from '../assets/AnimacaoModal.json' // ajuste o caminho se necessário
import './ModalCompartilhado.css'

function ModalVerde({ mensagem, onClose }) {
  return (
    <div className="modal-verde-overlay" onClick={onClose}>
      <div className="modal-verde-content" onClick={e => e.stopPropagation()}>
        <Player
          autoplay
          keepLastFrame
          src={AnimacaoModal}
          style={{ height: '200px', width: '200px' }}
        />
        <p className="modal-verde-texto">{mensagem}</p>
      </div>
    </div>
  )
}

export default ModalVerde
