import React, { useState } from 'react'
import './DietaEdit.css'


function DietaEdit({img, nome, descricao, onSave, onDelete}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedNome, setEditedNome] = useState(nome);
    const [editedDescricao, setEditedDescricao] = useState(descricao);

    const handleSave = () => {
        onSave({
            nome: editedNome,
            descricao: editedDescricao,
            img: img 
        });
        setIsEditing(false);
    };

return (
    <div className='container-produto-dieta-edit'>
        <div className='imagem-dieta-edit'>
            <img src={img} className='img-produto-dieta-edit' alt={nome}/>
        </div>

        <div className='nome-dieta-t-edit'>
            <div className='nome-dieta-b-edit'>
            {isEditing ? (
                <input 
                    type="text" 
                    value={editedNome} 
                    onChange={(e) => setEditedNome(e.target.value)}
                    className='input-nome-edit'
                />
            ) : (<h1>{nome}</h1>)}
            </div>
        </div>

        <div className='descricao-dieta-edit'>
            {isEditing ? (
                <textarea 
                    value={editedDescricao} 
                    onChange={(e) => setEditedDescricao(e.target.value)}
                    className='input-descricao-edit'
                />
            ) : (<h2>{descricao}</h2>)}
        </div>

    {isEditing ? (
        <>
            <button className='button-save' onClick={handleSave}>
                <img className='icone-save' src="./Icons/icon-salvar.png" alt="Salvar"/>
            </button>
            <button className='button-cancel' onClick={() => setIsEditing(false)}>
                <img className='icone-cancel' src="./Icons/icon-cancelar.png" alt="Cancelar"/>
            </button>
        </>
        ) : (
        <>
            <button className='button-edit' onClick={() => setIsEditing(true)}>
                <img className='icone-edit' src="./Icons/icon-Edit.png" alt="Editar"/>
            </button>
            <button className='button-delete' onClick={onDelete}>
                <img className='icone-delete' src="./Icons/icon-deletar.png" alt="Deletar"/>
            </button>
        </>
    )}
    </div>
)
}

export default DietaEdit 