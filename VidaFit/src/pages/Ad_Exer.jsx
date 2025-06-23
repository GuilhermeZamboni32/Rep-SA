/*import React from 'react'
import './Ad_Exer.css'
import { useState } from 'react'
import Exercicio from './Exercicio'
import { useLocation } from 'react-router-dom'


function Ad_Exer() {
    const [inputNome, setInputNome] = useState('')
    const [inputDescricao, setInputDescricao] = useState('')
    const [inputImagem, setInputImagem] = useState('')


    const location = useLocation();
    const categoria = location.state?.categoria || 'todos';

    const [exer, setexer] = useState([
  //############################### Peito ###############################
  {
    id: Date.now(),
    nome: "Supino",
    descricao: "3 Séries de 12 Repetições",
    img: "./exercicios/supino.gif",
    categoria: "peito",
  },
  {
    id: Date.now() + 1,
    nome: "Crossover",
    descricao: "3 Séries de 12 Repetições",
    img: "./exercicios/crossover.gif",
    categoria: "peito",
  },
  {
    id: Date.now() + 2,
    nome: "Flexão",
    descricao: "3 Séries de 12 Repetições",
    img: "./exercicios/flexao.webp",
    categoria: "peito",
  },
  {
    id: Date.now() + 3,
    nome: "Crucifixo",
    descricao: "3 Séries de 12 Repetições",
    img: "./exercicios/crusifixo.gif",
    categoria: "peito",
  },
  {
    id: Date.now() + 4,
    nome: "Peck Deck",
    descricao: "3 Séries de 12 Repetições",
    img: "./exercicios/peck-deck.gif",
    categoria: "peito",
  },
  {
    id: Date.now() + 5,
    nome: "Flexão com apoio",
    descricao: "3 Séries de 12 Repetições",
    img: "./exercicios/flexao.gif",
    categoria: "peito",
  },
  {
    id: Date.now() + 6,
    nome: "Paralelas",
    descricao: "3 Séries de 10 Repetições",
    img: "./exercicios/Paralelas.gif",
    categoria: "peito",
  },
  {
    id: Date.now() + 7,
    nome: "Pullover",
    descricao: "3 Séries de 12 Repetições",
    img: "./exercicios/pullover.gif",
    categoria: "peito",
  },
  {
    id: Date.now() + 8,
    nome: "Flexão inclinada",
    descricao: "3 Séries de 12 Repetições",
    img: "./exercicios/flexao-inclinada.gif",
    categoria: "peito",
  },
  {
    id: Date.now() + 9,
    nome: "Supino Inclinado com Halteres",
    descricao: "3 Séries de 12 Repetições",
    img: "./exercicios/supino-inclinado-com-halteres.gif",
    categoria: "peito",
  },

  //############################### Costas ###############################
  {
    id: Date.now() + 10,
    nome: "Puxada Frente",
    descricao: "3 Séries de 12 Repetições",
    img: "./exercicios/puxada-frente.gif",
    categoria: "costas",
  },
  {
    id: Date.now() + 11,
    nome: "Puxada Supinada",
    descricao: "3 Séries de 12 Repetições",
    img: "./exercicios/puxada-supinada.webp",
    categoria: "costas",
  },
  {
    id: Date.now() + 12,
    nome: "Remada Curvada",
    descricao: "3 Séries de 10 Repetições",
    img: "./exercicios/remada-curvada.gif",
    categoria: "costas",
  },
  {
    id: Date.now() + 13,
    nome: "Remada Cavalinho",
    descricao: "3 Séries de 12 Repetições",
    img: "./exercicios/remada-cavalinho.gif",
    categoria: "costas",
  },
  {
    id: Date.now() + 14,
    nome: "Remada Máquina",
    descricao: "3 Séries de 12 Repetições",
    img: "./exercicios/remada-maquina.gif",
    categoria: "costas",
  },
  {
    id: Date.now() + 15,
    nome: "Pulldown",
    descricao: "3 Séries de 12 Repetições",
    img: "./exercicios/pulldown.gif",
    categoria: "costas",
  },
  {
    id: Date.now() + 16,
    nome: "Levantamento Terra",
    descricao: "3 Séries de 8 Repetições",
    img: "./exercicios/levantamento-terra.gif",
    categoria: "costas",
  },
  {
    id: Date.now() + 17,
    nome: "Barra Fixa",
    descricao: "3 Séries de 8-10 Repetições",
    img: "./exercicios/barra-fixa.gif",
    categoria: "costas",
  },
  {
    id: Date.now() + 18,
    nome: "Remada Unilateral",
    descricao: "3 Séries de 12 Repetições",
    img: "./exercicios/remada-unilateral.gif",
    categoria: "costas",
  },
  {
    id: Date.now() + 19,
    nome: "Face Pull",
    descricao: "3 Séries de 12 Repetições",
    img: "./exercicios/face-pull.webp",
    categoria: "costas",
  },

  //############################### Perna ###############################
  {
    id: Date.now() + 20,
    nome: "Agachamento Livre",
    descricao: "3 Séries de 10 Repetições",
    img: "./exercicios/agachamento-livre.gif",
    categoria: "perna",
  },
  {
    id: Date.now() + 21,
    nome: "Leg Press",
    descricao: "3 Séries de 12 Repetições",
    img: "./exercicios/leg-press.gif",
    categoria: "perna",
  },
  {
    id: Date.now() + 22,
    nome: "Cadeira Extensora",
    descricao: "3 Séries de 12 Repetições",
    img: "./exercicios/cadeira-extensora.gif",
    categoria: "perna",
  },
  {
    id: Date.now() + 23,
    nome: "Cadeira Flexora",
    descricao: "3 Séries de 12 Repetições",
    img: "./exercicios/cadeira-flexora.gif",
    categoria: "perna",
  },
  {
    id: Date.now() + 24,
    nome: "Stiff",
    descricao: "3 Séries de 10 Repetições",
    img: "./exercicios/stiff.gif",
    categoria: "perna",
  },
  {
    id: Date.now() + 25,
    nome: "Avanço com Halteres",
    descricao: "3 Séries de 12 Passos",
    img: "./exercicios/avanco-com-halteres.gif",
    categoria: "perna",
  },
  {
    id: Date.now() + 26,
    nome: "Agachamento Smith",
    descricao: "3 Séries de 12 Repetições",
    img: "./exercicios/agachamento-smith.gif",
    categoria: "perna",
  },
  {
    id: Date.now() + 27,
    nome: "Elevação de Quadril",
    descricao: "3 Séries de 15 Repetições",
    img: "./exercicios/elevacao-de-quadril.gif",
    categoria: "perna",
  },
  {
    id: Date.now() + 28,
    nome: "Cadeira Abdutora",
    descricao: "3 Séries de 12 Repetições",
    img: "./exercicios/cadeira-abdutora.gif",
    categoria: "perna",
  },
  {
    id: Date.now() + 29,
    nome: "Panturrilha em Pé",
    descricao: "3 Séries de 20 Repetições",
    img: "./exercicios/panturrilha-em-pe.gif",
    categoria: "perna",
  },
]);

    function CadastrarExercicio(){
        const Exercicio = {
          id: Date.now(),
          nome: inputNome,
          descricao: inputDescricao,
          img: inputImagem,
          categoria: categoria
      
        }
      
        setexer([...exer, Exercicio])
      }
       const exerciciosFiltrados = categoria === 'todos'
      ? exer
      : exer.filter(e => e.categoria === categoria);


return (
    

    <div className='container-corpo-exer'>
      
     <div className="lista-cards-exer">
  {exerciciosFiltrados.map((item) => (
    <Exercicio 
      key={item.id}
      nome={item.nome}
      descricao={item.descricao}
      img={item.img}
    />
  ))}
</div>
    
   {/**
    * 
     <div className='formCadastro-exer'>
         <div className="input-contaner-exer">
            <label htmlFor="">Produto:</label>
            <input type="text" 
            value={inputNome}
            onChange={(Event) => setInputNome(Event.target.value)}
            />
         </div>
    
    
         <div className="input-contaner-exer">
             <label htmlFor="">Descrição:</label>
             <input type="text" 
            value={inputDescricao}
            onChange={(Event) => setInputDescricao(Event.target.value)}
            />
         </div>
    
         <div className="input-contaner-exer">
             <label htmlFor="">Imagem:</label>
             <input type="text" 
            value={inputImagem}
            onChange={(Event) => setInputImagem(Event.target.value)}
            />
         </div>
         <button onClick={CadastrarExercicio}>Cadastrar Exercicio</button>
            
    </div>
    *//*}
        
    
     </div>
      )
}

export default Ad_Exer*/