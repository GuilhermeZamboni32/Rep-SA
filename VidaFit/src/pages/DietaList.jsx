import React from 'react';
import './DietaList.css';

function DietasList({ dietas, buscarDietaPorId, deletarDieta }) {
  return (
    <section className='dietas-list-container'>
      {dietas.map((dieta) => (
        <div key={dieta.id_dieta} className='dieta-card'>
          <h2>{dieta.nome_dieta}</h2>
          <p>Calorias: {dieta.calorias_dieta}</p>
          <p>Descrição: {dieta.descricao_dieta}</p>
          <p>ID: {dieta.id_dieta}</p>
          <p>Categoria: {dieta.categoria_dieta}</p>
          <div className='buttons-cards-dieta'>
            {buscarDietaPorId && (
              <button onClick={() => buscarDietaPorId(dieta.id_dieta)}>Editar</button>
            )}
            {deletarDieta && (
              <button onClick={() => deletarDieta(dieta.id_dieta)}>Deletar</button>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}

export default DietasList;
