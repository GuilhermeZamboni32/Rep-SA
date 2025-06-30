import Navbar from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'
import './EditPerfil.css'
import { useState, useContext } from 'react'
import { GlobalContext } from "../Context/GlobalContext"
import ModalVerde from '../Components/ModalVerde'
import ModalVermelho from '../Components/ModalVermelho'

function EditPerfil() {
  const navigate = useNavigate()
  const { user, setUser } = useContext(GlobalContext)
  const [showPassword, setShowPassword] = useState(false)
  const [isPopupVisible, setPopupVisible] = useState(false)

  const [mostrarModal, setMostrarModal] = useState(false)
  const [mensagemModal, setMensagemModal] = useState('')
  const [mostrarErro, setMostrarErro] = useState(false)
  const [mensagemErro, setMensagemErro] = useState('')

  const [form, setForm] = useState({
    email_user: '',
    username: '',
    password_user: '',
    age_user: '',
    first_name: '',
    last_name: '',
    gender_user: '',
    problems_user: '',
    professional_confirm: '',
    avaliability: '',
    address: '',
    id: user?.id
  })

  const [professionalForm, setProfessionalForm] = useState({
    crefNumber: '',
    professionalType: '',
    validator: ''
  })

  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData }
    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  const formatDate = (date) => {
    const d = new Date(date)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }

  async function submitProfile() {
    try {
      const response = await fetch(`http://localhost:3000/usersEdit/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const contentType = response.headers.get('Content-Type')
        if (contentType?.includes('application/json')) {
          const errorData = await response.json()
          console.error('Erro ao atualizar perfil:', errorData.error)
        } else {
          const errorText = await response.text()
          console.error('Erro ao atualizar perfil:', errorText)
        }
        setMensagemErro('Erro ao atualizar perfil!')
        setMostrarErro(true)
        return
      }

      const updatedUser = await response.json()
      updateUser(updatedUser)
      setMensagemModal('Perfil atualizado com sucesso!')
      setMostrarModal(true)
    } catch (error) {
      console.error('Erro:', error)
      setMensagemErro('Erro ao atualizar perfil!')
      setMostrarErro(true)
    }
  }

  async function submitProfessionalRequest() {
    try {
      const response = await fetch(`http://localhost:3000/professional_info/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          cref_number: professionalForm.crefNumber,
          validator: professionalForm.validator,
          professional_type: professionalForm.professionalType,
          professional_confirm: true
        })
      })

      if (!response.ok) {
        setMensagemErro('Erro ao registrar como profissional!')
        setMostrarErro(true)
        return
      }

      setMensagemModal('Solicitação de profissional enviada com sucesso!')
      setMostrarModal(true)
    } catch (error) {
      console.error('Erro ao enviar requisição:', error)
      setMensagemErro('Erro ao enviar requisição!')
      setMostrarErro(true)
    }
  }

  async function deleteAccount() {
    try {
      const response = await fetch(`http://localhost:3000/disable/${user.id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })

      if (!response.ok) {
        setMensagemErro('Erro ao excluir conta!')
        setMostrarErro(true)
        return
      }

      setMensagemModal('Conta excluída com sucesso!')
      setMostrarModal(true)
      navigate('/')
    } catch (error) {
      console.error('Erro ao excluir conta:', error)
      setMensagemErro('Erro ao excluir conta!')
      setMostrarErro(true)
    }
  }

  function voltar() {
    navigate(-1)
  }

  return (
    <div className='container-editperfil'>
      <Navbar />
      <div className="div-grupo-1">

        <div className="div-grupo-usuario-1">
          <div className='div-img'>
            <img className='img' src={user?.image || './perfil-branco.png'} alt="Profile" />
          </div>

          <div className="perfil-edit-input">
            <p>Nome novo</p>
            <input className='texto-inp-edit' type="text" placeholder={user?.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />

            <p>Nascimento novo</p>
            <input className='texto-inp-edit' type="date" placeholder={formatDate(user?.age_user)} onChange={(e) => setForm({ ...form, age_user: e.target.value })} />

            <p>Email novo</p>
            <input className='texto-inp-edit' type="text" placeholder={user?.email_user} onChange={(e) => setForm({ ...form, email_user: e.target.value })} />
          </div>

          <div className='botoes-edit'>
            <button className="Salvar" onClick={submitProfile}>Salvar</button>
            <button className='Voltar' onClick={voltar}><p className='texto-ed'>Voltar</p></button>
            <button className='Excluir' onClick={() => {
              if (window.confirm('Deseja mesmo excluir a sua conta ?')) {
                deleteAccount()
              }
            }}><p className='texto-ed'>Excluir conta</p></button>
          </div>
        </div>

        <div className='container-inputs'>
          <div className='container-de-inputs-12'>
            <div className='div-inputs1'>
              <input className='texto-inp-inf' type="text" placeholder='primeiro nome' onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
              <input className='texto-inp-inf' type="text" placeholder='sobrenome' onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
              <input className='texto-inp-inf' type={showPassword ? 'text' : 'password'} placeholder="Senha Atual:" onChange={(e) => setForm({ ...form, password_user: e.target.value })} />
            
               <div className="senha-container">
                  <input
                    className='texto-inp-inf'
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Nova Senha:"
                  />
                  <div className="mostra-senha-wrapper">
                    <input
                      type="checkbox"
                      id="showPassword"
                      checked={showPassword}
                      onChange={(e) => setShowPassword(e.target.checked)}
                    />
                    <label htmlFor="showPassword" className="mostra-senha">Mostrar senha</label>
                  </div>
                </div>
            </div>

            <div className='div-inputs2'>
              <select className='selectEditPerfil' onChange={(e) => setForm({ ...form, avaliability: e.target.value })}>
                <option value="">Horários Disponíveis</option>
                <option value="Manhã">Manhã</option>
                <option value="Tarde">Tarde</option>
                <option value="Noite">Noite</option>
                <option value="Variado">Variado</option>
              </select>

              <select className='selectEditPerfil' onChange={(e) => setForm({ ...form, problems_user: e.target.value })}>
                <option value="">Comorbidades</option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>

              <select className='selectEditPerfil' onChange={(e) => setForm({ ...form, gender_user: e.target.value })}>
                <option value="">Gênero</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
                <option value="Prefiro não responder">Prefiro não responder</option>
              </select>

              <input className='texto-inp-inf' type="text" placeholder="Endereço:" onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>
          </div>

          <div className='container-buttom'>
            <h2>Deseja ser um profissional?</h2>
            <button className="butoon-click-1" onClick={() => setPopupVisible(true)}>Virar Profissional</button>
            {isPopupVisible && (
              <div className="popup" onClick={() => setPopupVisible(false)}>
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                  <h2>Formulário para se tornar profissional</h2>
                  <input type="text" placeholder="Número do CREF" value={professionalForm.crefNumber} onChange={(e) => setProfessionalForm({ ...professionalForm, crefNumber: e.target.value })} />
                  <select className='selectEditPerfil' onChange={(e) => setProfessionalForm({ ...professionalForm, professionalType: e.target.value })}>
                    <option value="">Tipo de profissional</option>
                    <option value="personal trainer">Personal Trainer</option>
                    <option value="nutricionista">Nutricionista</option>
                    <option value="ambos">Ambos</option>
                  </select>
                  <input type="text" placeholder="Validador" value={professionalForm.validator} onChange={(e) => setProfessionalForm({ ...professionalForm, validator: e.target.value })} />
                  <div className='botao-popup'>
                  <button onClick={submitProfessionalRequest}>Confirmar</button>
                  <button onClick={() => setPopupVisible(false)}>Fechar</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {mostrarModal && (
        <ModalVerde mensagem={mensagemModal} onClose={() => setMostrarModal(false)} />
      )}

      {mostrarErro && (
        <ModalVermelho mensagem={mensagemErro} onClose={() => setMostrarErro(false)} />
      )}
    </div>
  )
}

export default EditPerfil
