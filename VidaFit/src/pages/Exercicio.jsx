// Components/ListaExercicios.jsx
import React from 'react';

function ListaExercicios({ exercicios, onEditar, onDeletar }) {
  return (
    <section className='exercicios-container-2'>
      {exercicios.map((exercicio) => (
        <div key={exercicio.id_exer} className='exercicio'>
          <h2>{exercicio.nome_exer}</h2>
          <p>Repetições: {exercicio.repeticoes_exer}</p>
          <p>Descrição: {exercicio.descricao_exer}</p>
          <p>ID: {exercicio.id_exer}</p>
          <p>Categoria: {exercicio.categoria_exer}</p>
          <div className='buttons-cards-exercicio'>
            <button onClick={() => onEditar(exercicio.id_exer)}>Editar</button>
            <button onClick={() => onDeletar(exercicio.id_exer)}>Deletar</button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default ListaExercicios;

