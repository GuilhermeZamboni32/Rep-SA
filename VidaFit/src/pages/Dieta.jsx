import React from 'react';

function ListaDietas({ dietas, onEditar, onDeletar }) {
  return (
    <section className='dietas-container'>
      {dietas.map((dieta) => (
        <div key={dieta.id_dieta} className='dieta'>
          <h2>{dieta.nome_dieta}</h2>
          <p>Descrição: {dieta.descricao_dieta}</p>
          <p>Calorias: {dieta.calorias_dieta}</p>
          <p>ID: {dieta.id_dieta}</p>
          <p>Categoria: {dieta.categoria_dieta}</p>
          <div className='buttons-cards-dieta'>
            <button onClick={() => onEditar(dieta.id_dieta)}>Editar</button>
            <button onClick={() => onDeletar(dieta.id_dieta)}>Deletar</button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default ListaDietas;