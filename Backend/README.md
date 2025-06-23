-- Comandos para a tabela no postgreSQL

-- Rota de cração do database
CREATE DATABASE IF NOT EXIST VidaFit;

-- Extensão para uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de usuarios
CREATE TABLE users(
    username VARCHAR(555),
    first_name VARCHAR(555),
    age_user DATE,
    last_name VARCHAR(555),
    email_user VARCHAR(555),
    password_user VARCHAR(555),
    image VARCHAR(555),
    gender_user VARCHAR(255),
    problems_user VARCHAR(255),
    professional_confirm BOOLEAN,
    professional_type VARCHAR (555) CHECK (professional_type IN('personal trainer', 'nutricionista', 'ambos')),
    id_user UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    account_enable BOOLEAN DEFAULT TRUE,
    comments_user VARCHAR(255),
    user_rating NUMERIC(5,2),
    avaliability VARCHAR (255) CHECK (avaliability IN ('Manhã','Tarde','Noite', 'Variada', null)),
    address VARCHAR (255)
);

-- Tabela de profissionais
CREATE TABLE professional_info(
    cref_number VARCHAR(255),
    cref_card_photo VARCHAR(255),
    validator VARCHAR(255),
    id_user UUID,
    CONSTRAINT fk_user_professional
        FOREIGN KEY (id_user) REFERENCES users(id_user)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE exercicios (
    id_exer SERIAL PRIMARY KEY,
    nome_exer VARCHAR(100) NOT NULL,
    repeticoes_exer INTEGER NOT NULL,
    descricao_exer TEXT,
	categoria_exer VARCHAR(20) NOT NULL CHECK (
        categoria_exer IN ('peito', 'ombro', 'braco', 'costas', 'abdomen', 'perna')
    )
);