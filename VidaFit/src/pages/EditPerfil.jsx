import Navbar from '../Components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import './EditPerfil.css'
import { useState, useEffect, userData, useContext} from 'react'
import { GlobalContext } from "../Context/GlobalContext" 
import axios from 'axios'
import Modal from '../Components/modalConfirmProficional'



function EditPerfil() {

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const {user} = useContext(GlobalContext)
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


  async function testing_id() {
    let id_user = user.id;
    console.log('new_id new_id======>>>>>', id_user);
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

const submitEditProfile = async (id, form) => {
  console.dir("id no front======>>>> ", new_id)
  testing_id()
  try {
    const response = await fetch(`http://localhost:3000/usersEdit/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, 
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error updating profile:', errorData.error);
      alert('Failed to update profile');
      return;
    }

    const updatedUser = await response.json();
    console.log('Profile updated successfully:', updatedUser);
    alert('Profile updated successfully');
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while updating the profile');
  }
};

  //---------------------------------------------------------------------------

  async function updateProfileImage(form) {
    try {
      const formData = new FormData();
      formData.append('profile_image', form.profile_image);
      const response = await axios.post('http://localhost:3000/upload', {
        image: form.profile_image,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
      console.log(response.data);
      console.log('Profile ima?,ge updated successfully:', response.data);
    }catch (error) {
      console.error('Error updating profile image:', error);
    }
  }

  //--------------------------------------------------------------------------

  async function profileImage() {
    try {
      const response = await axios.get('http://localhost:3000/profile_image');
      console.log('Profile image fetched successfully:', response.data);
    }catch (error) {
      console.error('Error fetching profile image:', error);
    }
  }

  //---------------------------------------------------------------------------

  async function deleteAccount(deleteAccount) {
    try {
      const response = await axios.post(`http://localhost:3000/disable`, {},
      {
        headers: { 
          Authorization: `Bearer ${user?.token}`,
        },
      }
      );
      console.log('Account deleted successfully:', response.data);
      navigate('/');
  }catch (error) {
      console.error('Error deleting account:', error);
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
                  value={user?.age_user ? formatDate(user?.age_user) : ''}
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

              <button className="Salvar" onClick={() =>testing_id() }>
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
                    <h2>deseja ser um profisional ?</h2>
                    
                    <button className="butoon-click-1" onClick={() => setOpenModal(true)}>clique aqui</button>
                    </div>
                    <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}></Modal>
  


        </div>

      </div>

  </div>
  )

}

export default EditPerfil