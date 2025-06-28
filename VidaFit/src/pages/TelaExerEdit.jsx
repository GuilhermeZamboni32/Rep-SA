import ModalVermelho from '../Components/ModalVermelho';
import { Link, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import ModalVerde from '../Components/ModalVerde'
import ExerciciosList from './ExerciciosList'
import Navbar from '../Components/Navbar'
import './TelaExerEdit.css'
import axios from 'axios'

function TelaExerEdit() {
    const navigate = useNavigate()
    const [exercicios, setExercicios] = useState([]);
    const [exercicioSelecionado, setExercicioSelecionado] = useState(null);
    const [inputCategoriaExer, setInputCategoriaExer] = useState('');
    const [inputNomeExer, setInputNomeExer] = useState('');
    const [inputRepeticoesExer, setInputRepeticoesExer] = useState('');
    const [inputDescricaoExer, setInputDescricaoExer] = useState('');

    const [mostrarModal, setMostrarModal] = useState(false);
    const [mensagemModal, setMensagemModal] = useState('');

    const [mostrarErro, setMostrarErro] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');

    const [searchTerm, setSearchTerm] = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState('');

    const exerciciosFiltrados = exercicios.filter((exercicio) => {
        const nomeMatch = exercicio.nome_exer.toLowerCase().includes(searchTerm.toLowerCase());
        const categoriaMatch = filtroCategoria ? exercicio.categoria_exer === filtroCategoria : true;
        return nomeMatch && categoriaMatch;
    });

    function voltar() {
        navigate('/perfil');
    }

    const fetchExercicios = async () => {
        try {
            const response = await axios.get('http://localhost:3000/exercicios');
            setExercicios(response.data);
        } catch (error) {
            console.error('Erro ao buscar exercícios:', error);
        }
    };

    useEffect(() => {
        fetchExercicios();
    }, []);

    const cadastrarExercicio = async () => {
        if (!inputNomeExer || !inputRepeticoesExer || !inputDescricaoExer || !inputCategoriaExer) {
            setMensagemErro('Por favor, preencha todos os campos.');
            setMostrarErro(true);
            setTimeout(() => setMostrarErro(false), 5000);
            return;
        }
        try {
            const exercicio = {
                nome_exer: inputNomeExer,
                repeticoes_exer: inputRepeticoesExer,
                descricao_exer: inputDescricaoExer,
                categoria_exer: inputCategoriaExer,
            };
            const response = await axios.post('http://localhost:3000/exercicios', exercicio);
            if (response.status === 201) {
                fetchExercicios();
                limparForm();
                setMensagemModal('Exercício cadastrado com sucesso!');
                setMostrarModal(true);
                setTimeout(() => setMostrarModal(false), 30000);
            }
        }   catch (error) {
                console.error('Erro ao adicionar exercício:', error);
                setMensagemErro('Erro ao cadastrar exercício!');
                setMostrarErro(true);
                setTimeout(() => setMostrarErro(false), 5000);
            }
    };

    const salvarExercicio = async () => {
        if (!inputNomeExer || !inputRepeticoesExer || !inputDescricaoExer || !inputCategoriaExer) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        try {
            const exercicio = {
                nome_exer: inputNomeExer,
                repeticoes_exer: inputRepeticoesExer,
                descricao_exer: inputDescricaoExer,
                categoria_exer: inputCategoriaExer,
            };
            const response = await axios.put(`http://localhost:3000/exercicios/${exercicioSelecionado.id_exer}`, exercicio);
            if (response.status === 200) {
                fetchExercicios();
                setExercicioSelecionado(null);
                limparForm();
                setMensagemModal('Exercício alterado com sucesso!');
                setMostrarModal(true);
                setTimeout(() => setMostrarModal(false), 30000);
            }
        }   catch (error) {
                console.error('Erro ao atualizar exercício:', error);
                setMensagemErro('Erro ao atualizar exercício!');
                setMostrarErro(true);
                setTimeout(() => setMostrarErro(false), 5000);
            }
    };

    const buscarExercicioPorId = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/exercicios/${id}`);
            setExercicioSelecionado(response.data);
            exibirExercicio(response.data);
        }  catch (error) {
                console.error('Erro ao buscar exercício por ID:', error);
                setMensagemErro('Erro ao buscar exercício!');
                setMostrarErro(true);
                setTimeout(() => setMostrarErro(false), 5000);
            }
    };

    const deletarExercicio = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/exercicios/${id}`);
             if (response.status === 200) {
                fetchExercicios();
                setExercicioSelecionado(null);
                limparForm();
                setMensagemModal('Exercício deletado com sucesso!');
                setMostrarModal(true);
                setTimeout(() => setMostrarModal(false), 30000);
            }
        }   catch (error) {
                console.error('Erro ao deletar exercício:', error);
                setMensagemErro('Erro ao deletar exercício!');
                setMostrarErro(true);
                setTimeout(() => setMostrarErro(false), 5000);
            }
    };

    function limparForm() {
        setInputNomeExer('');
        setInputRepeticoesExer('');
        setInputDescricaoExer('');
        setInputCategoriaExer('');
    }

    function exibirExercicio(exercicio) {
        setInputNomeExer(exercicio.nome_exer || '');
        setInputRepeticoesExer(exercicio.repeticoes_exer || '');
        setInputDescricaoExer(exercicio.descricao_exer || '');
        setInputCategoriaExer(exercicio.categoria_exer || '');
    }

    return (
        <div className='container-exer-edit'>
            <Navbar />
            <div className='div-grup-exer-edit'>
                <div className='div-baixo-edit-1'>
                    <div className='container-exercicio'>
                        <div className='form-exercicio'>
                            <div className="input-container-exercicio">
                                <label htmlFor="nome_exer">Nome do Exercício</label>
                                <input type="text" placeholder="Agachamento" value={inputNomeExer} onChange={(e) => setInputNomeExer(e.target.value)} required />
                            </div>
                            <div className="input-container-exercicio">
                                <label htmlFor="repeticoes_exer">Repetições</label>
                                <input type="number" placeholder="10" value={inputRepeticoesExer} onChange={(e) => setInputRepeticoesExer(e.target.value)} required />
                            </div>
                            <div className="input-container-exercicio">
                                <label htmlFor="descricao_exer">Descrição</label>
                                <textarea placeholder="Descrição do exercício" value={inputDescricaoExer} onChange={(e) => setInputDescricaoExer(e.target.value)} />
                            </div>
                            <div className="input-container-exercicio">
                                <label htmlFor="categoria_exer">Categoria</label>
                                <select value={inputCategoriaExer} onChange={(e) => setInputCategoriaExer(e.target.value)} required>
                                    <option value="">Selecione uma categoria</option>
                                    <option value="peito">Peito</option>
                                    <option value="ombro">Ombro</option>
                                    <option value="braco">Braço</option>
                                    <option value="costas">Costas</option>
                                    <option value="abdomen">Abdômen</option>
                                    <option value="perna">Perna</option>
                                </select>
                            </div>
                            {exercicioSelecionado ? (
                                <button className="button-exercicio" onClick={salvarExercicio}>Salvar Alterações</button>
                            ) : (
                                <button className="button-exercicio" onClick={cadastrarExercicio}>Cadastrar Exercício</button>
                            )}
                        </div>
                    </div>
                </div>

                <div className='div-baixo-edit-2'>
                    <div className='div-baixo-edit-exer-2-cima'>
                        <div className='barra-pesquisa-edit'>
                            <img className='lupa' src="./Icons/Lupa-2.png" alt="Pesquisar" />
                            <input type="text" placeholder="Buscar por nome" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-pesquisa" />
                        </div>
                        <div className='barra-filtro-edit'>
                            <img className='filtro' src="./Icons/Filtro-2.png" alt="Filtro" />
                            <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)} className='select-filtro'>
                                <option value="">Todas as categorias</option>
                                <option value="peito">Peito </option>
                                <option value="ombro">Ombro</option>
                                <option value="braco">Braço</option>
                                <option value="costas">Costas</option>
                                <option value="abdomen">Abdômen</option>
                                <option value="perna">Perna</option>
                            </select>
                        </div>
                    </div>

                    <div className='apeneas-uma-barra'></div>

                    <div className='div-baixo-edit-exer-2-baixo'>
                        <section className='exercicios-container-23'>
                            <ExerciciosList
                                exercicios={exerciciosFiltrados}
                                buscarExercicioPorId={buscarExercicioPorId}
                                deletarExercicio={deletarExercicio}
                            />
                        </section>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {mostrarModal && ( <ModalVerde mensagem={mensagemModal} onClose={() => setMostrarModal(false)} />)}
            {mostrarErro && ( <ModalVermelho  mensagem={mensagemErro}  onClose={() => setMostrarErro(false)} />)}

        </div>
    )
}

export default TelaExerEdit;
