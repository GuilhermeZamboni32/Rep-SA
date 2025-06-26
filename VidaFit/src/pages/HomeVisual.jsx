import React from 'react';
import './HomeVisual.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { Link } from "react-router-dom";

function HomeVisual() {
    const navigate = useNavigate()
    const redirectVitor = () => {
        navigate('/CadastroVitor');
    }
    function cadastro(){
        navigate('/Cadastro');
      }
    function login(){
        navigate('/login');
      }


  return (
    <div>
       {/** <Navbar />*/} 
      <header className="header">
         <img className='logotipo' src="logotipo_VF_2.png" alt="" />
        <div className='espacomaneiro'></div>
        <a href="#cadastro" className="btn-header" onClick={cadastro}>Cadastre-se</a>
         <a href="#cadastro" className="btn-header-2" onClick={login}>Logar</a>
      </header>

      <div className="hero">
        <div className='hero-img'>
            <div className="hero-content">
              <h1>Transforme sua vida com hábitos saudáveis</h1>
              <p>Dicas práticas de exercícios e dietas balanceadas para você.</p>
              <a href="#cadastro" className="btn-main" onClick={cadastro}>Comece Agora</a>
            </div>
        </div>
      </div>

    
<div className='sobre-M'>
  <div className="sobre-1">
    <div className="sobre-propósito">
      <h1>Qual é o propósito do projeto?</h1>
      <p>O Vida+Fit tem como propósito promover a adoção de um estilo de vida saudável por meio de orientações práticas e acessíveis. 
      A plataforma oferece conteúdos sobre exercícios físicos e dietas balanceadas, desenvolvidos para atender às necessidades de diferentes perfis de usuários.</p>
    </div>
    <div className="sobre-contribui">
      <h1>De que forma o projeto contribui?</h1>
      <p>A iniciativa contribui significativamente para a melhoria da saúde física e mental, incentivando a prática regular de atividades físicas e hábitos alimentares equilibrados. 
      Com isso, favorece a redução do estresse, o aumento da disposição diária e o fortalecimento do bem-estar geral.</p>
    </div>
  </div>


  <div className='sobre-2'>
    <div className="sobre-relevante">
      <h1>Por que esse projeto é relevante?</h1>
      <p>Porque integrar práticas saudáveis ao cotidiano é fundamental para uma vida mais longa e com qualidade. 
      O Vida+Fit oferece suporte confiável e orientações claras, tornando a transformação de hábitos mais simples, eficaz e sustentável.</p>
    </div>
    <div className="sobre-diferencia2">
      <h1>Como o projeto se diferencia?</h1>
      <p>O Vida+Fit se destaca por unir tecnologia, acessibilidade e orientação personalizada em um só lugar. 
      Diferente de outras plataformas, ele conecta usuários a profissionais qualificados e oferece recomendações adaptadas aos objetivos individuais de cada pessoa.</p>
    </div>
  </div>


  <div className='sobre-3'>
    <div className="sobre-diferencia">
      <h1>Quem são os responsáveis pelo projeto?</h1>
       <p>O Vida+Fit é desenvolvido por uma equipe comprometida e multidisciplinar, composta por profissionais das áreas de tecnologia,
         saúde e design. Juntos, trabalham para garantir que a plataforma seja intuitiva, eficiente e capaz de gerar um impacto positivo na vida dos usuários.</p>
    </div>
    <div className="sobre-futuros">
    <h1>Quais são os planos futuros?</h1>
    <p>O projeto planeja expandir suas funcionalidades com novos recursos, como acompanhamento personalizado, integração com wearables e fóruns interativos, 
    visando oferecer uma experiência ainda mais completa e engajadora aos usuários.</p>
    </div>
  </div>
</div>
  



      <div id="equipe" className="section">
        <h2>Nossa Equipe</h2>
        <ul className="team">
          <li>Guilherme Zamboni Menegacio - Treinos e Dietas</li>
          <li >Vitor Danielli de Oliveira - Cadastro</li>
          <li>Jonathan Stulp Zoz - Contatos</li>
          <li>Thiago Quadra Arnold - Avaliações</li>
        </ul>
      </div>

      

      <footer className="footer">
      <h2>Vida+Fit</h2>
      <p>Cuidar do corpo é cuidar da vida. Comece hoje com o Vida+Fit.</p>
      </footer>
    </div>
  );
}

export default HomeVisual;
