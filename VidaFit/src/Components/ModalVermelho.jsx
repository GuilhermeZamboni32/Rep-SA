import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import AnimacaoErro from '../assets/AnimacaoModalERRO.json'; // ajuste o nome e caminho se necessário
import './ModalCompartilhado.css'; // ou use ModalVermelho.css, se preferir separado

function ModalVermelho({ mensagem, onClose }) {
  return (
    <div className="modal-vermelho-overlay" onClick={onClose}>
      <div className="modal-vermelho-content" onClick={(e) => e.stopPropagation()}>
        <Player
          autoplay
          loop={false}
          keepLastFrame
          src={AnimacaoErro}
          style={{ height: '200px', width: '200px' }}
        />
        <p className="modal-vermelho-texto">{mensagem}</p>
      </div>
    </div>
  );
}

export default ModalVermelho;
