import React, { useContext } from 'react'
import './ModalConfirmProficional.css'
import axios from 'axios';
import { useState } from 'react';
import { GlobalContext } from "../Context/GlobalContext" 

/*
const [form, setForm] = useState({
  professional_confirm: false,
  cref_number: '',
  validator: '',
  professional_type: ''
});
const [user, setUser] = useContext(GlobalContext);

*/
async (form) =>  {
    try {
      const response = await axios.post(`http://localhost:3000/professional_info/${id_user}`, {
        professional_confirm: form.professional_confirm,
        cref_number: form.cref_number,
        validator: form.validator,
        professional_type: form.professional_type,
      });
      console.log('Profissional cadastrado com sucesso:', response.data);
    }catch (error) {
      console.error('Erro ao pegar dado do usuario:', error);
    }
  }

export default function Modal({ isOpen, setModalOpen, children }) {
  if (isOpen) {
    return (
      <div className='container-modal' >
        <div className='conteudo-modal' >
          <div className='conteudo-modal-topo'>
            
            <div className='topo-modal-es'>
           
            </div>
            <div className='topo-modal-di'>
            
              <div className='sair-modal' onClick={setModalOpen}>
                <img className='X' src="./Icons/icone-X.png" alt="" />
              </div>
            </div>
          </div>
            <div className='conteudo-modal-meio'>
              <button>Nutricionista</button>
              <button>Personal trainer</button>
              <button>Ambos</button>
              <input type="text" />
              <div className='texto-modal'>{children}</div>
            </div>
            <div className='conteudo-modal-baixo'>
              <button className='button-modal' onClick={setModalOpen}><h2>Fechar</h2></button>
            </div>
        </div>
      </div>
    )
  }

  return null
}



{/**<div className='container-modal' style={BACKGROUND_STYLE}>
        <div style={MODAL_STYLE}>
          <div style={{ cursor: 'pointer'}} onClick={setModalOpen}>
            x
          </div>
          <div>{children}</div>
          <button onClick={setModalOpen}>Fechar</button>
        </div>
      </div> */}