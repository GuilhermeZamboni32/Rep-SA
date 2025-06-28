import React from 'react';

function ExerciciosList({ exercicios, buscarExercicioPorId, deletarExercicio }) {
  return (
    <section className='exercicios-container-21'>
      {exercicios.map((exercicio) => (
        <div key={exercicio.id_exer} className='exercicio'>
          <h2>{exercicio.nome_exer}</h2>
          <p>Repetições: {exercicio.repeticoes_exer}</p>
          <p>Descrição: {exercicio.descricao_exer}</p>
          <p>ID: {exercicio.id_exer}</p>
          <p>Categoria: {exercicio.categoria_exer}</p>
          <div className='buttons-cards-exercicio'>
            {buscarExercicioPorId && (
              <button onClick={() => buscarExercicioPorId(exercicio.id_exer)}>Editar</button>
            )}
            {deletarExercicio && (
              <button onClick={() => deletarExercicio(exercicio.id_exer)}>Deletar</button>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}

export default ExerciciosList;
