/*import React, { useState } from 'react'
import './ExercicioEdit.css'

function ExercicioEdit({img, nome, descricao, onSave, onDelete}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedNome, setEditedNome] = useState(nome);
    const [editedDescricao, setEditedDescricao] = useState(descricao);
    const [editedImg, setEditedImg] = useState(img);

    const handleSave = () => {
        onSave({
            nome: editedNome,
            descricao: editedDescricao,
            img: editedImg
        });
        setIsEditing(false);
    };

    return (
        <div className='container-produto-exer-edit'>
            <div className='imagem-exer-edit'>
                {isEditing ? (
                    <input 
                        type="text" 
                        value={editedImg} 
                        onChange={(e) => setEditedImg(e.target.value)}
                        className='input-img-edit'
                    />
                ) : (
                    <img src={img} className='img-produto-exer-edit' alt={nome}/>
                )}
            </div>

            <div className='nome-exer-t-edit'>
                <div className='nome-exer-b-edit'>
                    {isEditing ? (
                        <input 
                            type="text" 
                            value={editedNome} 
                            onChange={(e) => setEditedNome(e.target.value)}
                            className='input-nome-edit'
                        />
                    ) : (
                        <h1>{nome}</h1>
                    )}
                </div>
            </div>

            <div className='descricao-exer-edit'>
                {isEditing ? (
                    <textarea 
                        value={editedDescricao} 
                        onChange={(e) => setEditedDescricao(e.target.value)}
                        className='input-descricao-edit'
                    />
                ) : (
                    <h2>{descricao}</h2>
                )}
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

export default ExercicioEdit */