import Navbar from '../Components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import './EditPerfil.css'
import { useState, useEffect, userData, useContext} from 'react'
import { GlobalContext } from "../Context/GlobalContext" 
import axios from 'axios'



function EditPerfil() {

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const {user, setUser} = useContext(GlobalContext)
  const [isPopupVisible, setPopupVisible] = useState(false);
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
  });
  const [professionalForm,  setProfessionalForm] = useState({
    professional_confirm: '',
    crefNumber: '',
    professionalType: '',
    validator: '',
  });


  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  async function submitProfile() {
    let id_user = user.id;
    try {
      const response = await fetch(`http://localhost:3000/usersEdit/${id_user}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(form),
      });
  
      if (!response.ok) {
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          console.error('Error updating profile:', errorData.error);
          alert('Failed to update profile');
        } else {
          const errorText = await response.text();
          console.error('Error updating profile (non-JSON):', errorText);
          alert('Failed to update profile: Non-JSON response received');
        }
        return;
      }
      const updatedUser = await response.json();
      console.log('Profile updated successfully:', updatedUser);
      updateUser(updatedUser);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the profile');
    }
  }

  // data para formato BR 
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

  //---------------------------------------------------------------------------
  async function submitProfessionalRequest() {
    const id_user = user.id;
  
    try {
      const response = await fetch(`http://localhost:3000/professional_info/${id_user}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(
          professionalForm
        ),
      });
  
      if (!response.ok) {
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          console.error('Erro ao registrar profissional:', errorData.error);
          alert('Erro ao registrar profissional');
        } else {
          const errorText = await response.text();
          console.error('Erro ao registrar profissional (non-JSON):', errorText);
          alert('Erro ao registrar profissional: resposta não JSON');
        }
        return;
      }
  
      const result = await response.json();
      console.log("Profissional registrado com sucesso:", result);
      alert('Dados de profissional enviados com sucesso!');
      setPopupVisible(false);
    } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro ao enviar os dados profissionais');
    }
  }

  //---------------------------------------------------------------------------

  async function updateProfileImage(form) {
    try {
      const formData = new FormData();
      formData.append('profile_image', form.profile_image);
  
      const response = await fetch(`http://localhost:3000/upload/${id_user}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          console.error('Error uploading image:', errorData.error || errorData.message);
          alert('Failed to upload profile image');
        } else {
          const errorText = await response.text();
          console.error('Error uploading image (non-JSON):', errorText);
          alert('Failed to upload profile image: Non-JSON response received');
        }
        return;
      }
  
      const result = await response.json();
      console.log('Profile image updated successfully:', result);
      alert('Profile image updated successfully');
    } catch (error) {
      console.error('Error uploading profile image:', error);
      alert('An error occurred while uploading the image');
    }
  }
  
  //---------------------------------------------------------------------------

  async function profileImage() {
    try {
      const response = await fetch(`http://localhost:3000/profile_image/${id_user}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error fetching profile image:', errorText);
        alert('Failed to fetch profile image');
        return;
      }
  
      const imageData = await response.json();
      console.log('Profile image fetched successfully:', imageData);
      // You can optionally return or update state with imageData here
    } catch (error) {
      console.error('Error fetching profile image:', error);
      alert('An error occurred while fetching the profile image');
    }
  }
  
  //---------------------------------------------------------------------------
  
  async function deleteAccount() {
    try {
      const response = await fetch(`http://localhost:3000/disable/${id_user}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error deleting account:', errorText);
        alert('Failed to delete account');
        return;
      }
  
      const result = await response.json();
      console.log('Account deleted successfully:', result);
      alert('Account deleted successfully');
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('An error occurred while deleting the account');
    }
  }

  function voltar(){
    navigate(-1);
  }
  
console.log(form)


  return (
   <div className='container-editperfil'>
            <Navbar />

      <div className="div-grupo-1">
          

          <div className="div-grupo-usuario-1">

            <div className='div-img'>
              <form>
                 <input type="file" name="file" /*value={form.image}*/
                onChange={(e) => setForm({ ... form, image: e.target.value })}/>
                <button onClick={updateProfileImage}>Upload</button>
              </form>

            <img 
              className='img' 
              type="file"
              src={user?.image || './Icons/perfil-branco.png'} 
              alt="Profile"
              />
            </div>

            <div className="espaco"></div>

            <div className="perfil-input">
          
            <p>Nome novo</p>
            <input
                className='texto-inp-edit'
                type="text"
                placeholder={user?.username}

                onChange={(e) => setForm({ ...form, username: e.target.value })}
            />

            <p>Nascimento novo</p>
            <input
                  className='texto-inp-edit'
                  type="date"
                  placeholder={form?.age_user ? formatDate(form?.age_user) : ''}
                  onChange={(e) => setForm({ ...form, age_user: e.target.value })}
            />

            <p>Email novo</p>
            <input
                className='texto-inp-edit'
                type="text"
                placeholder={user?.email_user}

                onChange={(e) => setForm({ ...form, email_user: e.target.value })}
            />
            
             
            <div className="espaco"></div>

            </div>
          
              <div className='botoes-edit'>

              <button className="Salvar" onClick={() =>submitProfile() }>
                Salvar
              </button>

              <button className='Voltar' onClick={voltar}>
                <p className='texto-ed'>Voltar</p>
                </button>

                 
                <button className='Excluir'onClick={() => {
                  const confirmDelete = window.confirm('Deseja mesmo excluir a sua conta ?');
                  if (confirmDelete === true) {
                    deleteAccount(deleteAccount);
                  }
                }}>
                <p className='texto-ed'>Excluir conta</p>
                </button>
            </div>   
   
            </div>

        <div className='container-inputs'>
        <div className='container-de-inputs-12'>
              <div className='div-inputs1'>
                    <input className='texto-inp-inf' type="text" placeholder='primeiro nome' onChange={(e) => setForm({ ...form, first_name: e.target.value })}/>
                    <input className='texto-inp-inf' type="text" placeholder='sobre nome' onChange={(e) => setForm({ ...form, last_name: e.target.value })}/>
                    <input className='texto-inp-inf' type={showPassword ? 'text' : 'password'} placeholder="Senha Atual:"onChange={(e) => setForm({ ...form, password_user: e.target.value })}/>
                    <input className='texto-inp-inf' type={showPassword ? 'text' : 'password'} placeholder="Nova Senha:"/>
                    <input type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)}/>
                    
                    
              </div>  


              <div className='div-inputs2'>
                  
                    <select className='selectEditPerfil'onChange={(e) => setForm({ ...form, avaliability: e.target.value })}>
                      <option value="">Horários Disponiveis</option>
                      <option value="Manhã">Manhã</option>
                      <option value="Tarde">Tarde</option>     
                      <option value="Noite">Noite</option>      
                      <option value="Variado">Variado</option>   
                    </select>

                    <select className='selectEditPerfil' onChange={(e) => setForm({ ...form,  problems_user: e.target.value })}>
                      <option value="">comorbidades</option>
                      <option value="Sim">Sim</option>
                      <option value="Não">Não</option>              
                    </select>
                    
                    <select className='selectEditPerfil' onChange={(e) => setForm({ ...form,  gender_user: e.target.value })}>
                      <option value="">Genero</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femimino">Femimino</option>     
                      <option value="Croissant">Croissant</option>  
                      <option value="Outro">Outro</option>  
                      <option value="Prefiro não responder">Prefiro não responder</option>           
                    </select> 
                    <input className='texto-inp-inf' type="text" placeholder="Endereço:" onChange={(e) => setForm({ ...form,  address: e.target.value })}/>
              </div>
        </div>
        <div className='container-buttom'>
          <h2>Deseja ser um profissional?</h2>
          <button className="butoon-click-1" onClick={() => setPopupVisible(true)}>Open Popup</button>
          {isPopupVisible && (
            <div className="popup" onClick={() => setPopupVisible(false)}>
              <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <h2>Formulário para se tornar profissional</h2>

                <input
                  type="text"
                  placeholder="Número do CREF (ex: 12345-G/SP)"
                  value={professionalForm.crefNumber}
                  onChange={(e) => setProfessionalForm({ ...professionalForm, crefNumber: e.target.value })}
                />
                <select className='selectEditPerfil'onChange={(e) => setForm({ ...professionalForm, professional_type: e.target.value })}>
                      <option value="">Tipo de profissional</option>
                      <option value="personal trainer">Personal trainer</option>
                      <option value="nutricionista">Nutricionista</option>     
                      <option value="ambos">Ambos</option>      
                </select>

                <input
                  type="text"
                  placeholder="Validador"
                  value={professionalForm.validator}
                  onChange={(e) => setProfessionalForm({ ...professionalForm, validator: e.target.value })}
                />

                <button onClick={submitProfessionalRequest}>Confirmar</button>
                <button onClick={() => setPopupVisible(false)}>Fechar</button>
              </div>
            </div>
          )}
        </div>
        </div>

      </div>

  </div>
  )

}

export default EditPerfil