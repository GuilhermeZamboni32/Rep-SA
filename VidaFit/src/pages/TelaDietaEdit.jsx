import { Link, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import './TelaDietaEdit.css'
import axios from 'axios'


function TelaDietaEdit() {
    const navigate = useNavigate()
    const [dietas, setDietas] = useState([]);

    const [dietaSelecionada, setDietaSelecionada] = useState(null);
    const [inputCategoriaDieta, setInputCategoriaDieta] = useState('');
    const [inputNomeDieta, setInputNomeDieta] = useState('');
    const [inputCaloriasDieta, setInputCaloriasDieta] = useState('');
    const [inputDescricaoDieta, setInputDescricaoDieta] = useState('');
    
    const [searchTerm, setSearchTerm] = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState('');

    const dietasFiltradas = dietas.filter((dieta) => {
        const nomeMatch = dieta.nome_dieta.toLowerCase().includes(searchTerm.toLowerCase());
        const categoriaMatch = filtroCategoria ? dieta.categoria_dieta === filtroCategoria : true;
        return nomeMatch && categoriaMatch;
    });

    function voltar(){ 
        navigate('/perfil');
    }

    const fetchDietas = async () => {
        try {
            const response = await axios.get('http://localhost:3000/dietas');
            setDietas(response.data);
        } catch (error) {
            console.error('Erro ao buscar dietas:', error);
        }
    };

    useEffect(() => {
        fetchDietas();
    }, []);

    const cadastrarDieta = async () => {
        if (!inputNomeDieta || !inputCaloriasDieta || !inputDescricaoDieta || !inputCategoriaDieta) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        try {
            const dieta = {
                nome_dieta: inputNomeDieta,
                calorias_dieta: inputCaloriasDieta,
                descricao_dieta: inputDescricaoDieta,
                categoria_dieta: inputCategoriaDieta,
            };
            const response = await axios.post('http://localhost:3000/dietas', dieta);
            if (response.status === 201) {
                fetchDietas();
                limparForm();
                alert('Dieta cadastrada com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao adicionar dieta:', error);
        }
    };

    const salvarDieta = async () => {
        if (!inputNomeDieta || !inputCaloriasDieta || !inputDescricaoDieta || !inputCategoriaDieta) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        try {
            const dieta = {
                nome_dieta: inputNomeDieta,
                calorias_dieta: inputCaloriasDieta,
                descricao_dieta: inputDescricaoDieta,
                categoria_dieta: inputCategoriaDieta,
            };
            const response = await axios.put(`http://localhost:3000/dietas/${dietaSelecionada.id_dieta}`, dieta);
            if (response.status === 200) {
                fetchDietas();
                setDietaSelecionada(null);
                limparForm();
                alert('Dieta alterada com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao atualizar dieta:', error);
        }
    };

    const buscarDietaPorId = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/dietas/${id}`);
            setDietaSelecionada(response.data);
            exibirDieta(response.data);
        } catch (error) {
            console.error('Erro ao buscar dieta por ID:', error);
        }
    };

    const deletarDieta = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/dietas/${id}`);
            if (response.status === 200) {
                fetchDietas();
                alert('Dieta deletada com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao deletar dieta:', error);
        }
    };

    function limparForm() {
        setInputNomeDieta('');
        setInputCaloriasDieta('');
        setInputDescricaoDieta('');
        setInputCategoriaDieta('');
    }

    function exibirDieta(dieta) {
        setInputNomeDieta(dieta.nome_dieta || '');
        setInputCaloriasDieta(dieta.calorias_dieta || '');
        setInputDescricaoDieta(dieta.descricao_dieta || '');
        setInputCategoriaDieta(dieta.categoria_dieta || '');
    }

    return (
        <div className='container-dieta-edit'>
            <Navbar />
            <div className='div-grup-dieta-edit'>
                <div className='div-baixo-edit-1'>
                        <div className='form-dieta'>
                            <div className="input-container-dieta">
                                <label>Nome da Dieta</label>
                                <input type="text" value={inputNomeDieta} onChange={(e) => setInputNomeDieta(e.target.value)} placeholder="Dieta Fit" />
                            </div>
                            <div className="input-container-dieta">
                                <label>Calorias</label>
                                <input type="number" value={inputCaloriasDieta} onChange={(e) => setInputCaloriasDieta(e.target.value)} placeholder="2000" />
                            </div>
                            <div className="input-container-dieta">
                                <label>Descrição</label>
                                <textarea value={inputDescricaoDieta} onChange={(e) => setInputDescricaoDieta(e.target.value)} placeholder="Descrição da dieta" />
                            </div>
                            <div className="input-container-dieta">
                                <label>Categoria</label>
                                <select value={inputCategoriaDieta} onChange={(e) => setInputCategoriaDieta(e.target.value)}>
                                    <option value="">Selecione uma categoria</option>
                                    <option value="emagrecimento">Emagrecimento</option>
                                    <option value="ganho de massa">Ganho de massa</option>
                                    <option value="manutenção">Manutenção</option>
                                    <option value="vegetariana">Vegetariana</option>
                                    <option value="vegana">Vegana</option>
                                    <option value="low carb">Low Carb</option>
                                </select>
                            </div>
                            {dietaSelecionada
                                ? <button className='button-dieta' onClick={salvarDieta}>Salvar Alterações</button>
                                : <button className='button-dieta' onClick={cadastrarDieta}>Cadastrar Dieta</button>}
                        </div>


                </div>

                <div className='div-baixo-edit-2'>
                    <div className='div-baixo-edit-2-cima'>
                        <div className='barra-pesquisa-edit'>
                        <img className='lupa' src="./Icons/Lupa-2.png" alt="Pesquisar" />
                            <input className='input-pesquisa' type="text" placeholder="Buscar por nome" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                        <div className='barra-filtro-edit'>
                        <img className='filtro' src="./Icons/Filtro-2.png" alt="Filtro" />
                                 <select className='select-filtro' value={inputCategoriaDieta} onChange={(e) => setInputCategoriaDieta(e.target.value)}>
                                <option value="">Selecione uma categoria</option>
                                <option value="Emagrecimento">Emagrecimento</option>
                                <option value="Ganho de massa">Ganho de massa</option>
                                <option value="Manutenção">Manutenção</option>
                                <option value="Vegetariana">Vegetariana</option>
                                <option value="Vegana">Vegana</option>
                                <option value="Low Carb">Low Carb</option>
                            </select>
                        </div>
                    </div>

                    <div className='apeneas-uma-outra-barra'></div>

                    <div className='div-baixo-edit-2-baixo'>
                        <section className='dietas-container-2'>
                            {dietasFiltradas.map((dieta) => (
                                <div key={dieta.id_dieta} className='dieta'>
                                    <h2>{dieta.nome_dieta}</h2>
                                    <p>Calorias: {dieta.calorias_dieta}</p>
                                    <p>Descrição: {dieta.descricao_dieta}</p>
                                    <p>ID: {dieta.id_dieta}</p>
                                    <p>Categoria: {dieta.categoria_dieta}</p>
                                    <div className='buttons-cards-dieta'>
                                        <button onClick={() => buscarDietaPorId(dieta.id_dieta)}>Editar</button>
                                        <button onClick={() => deletarDieta(dieta.id_dieta)}>Deletar</button>
                                    </div>
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TelaDietaEdit;
