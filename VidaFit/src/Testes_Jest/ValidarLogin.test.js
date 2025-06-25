// utils/validarLogin.test.js


import { validarLoginCampos } from './ValidarLogin';

describe('Validação de login', () => {

    it('retorna erro se campos estiverem vazios', () => {
        const resultado = validarLoginCampos({ email_user: '', password_user: '' });
        expect(resultado.valido).toBe(false);
        expect(resultado.mensagem).toBe('Todos os campos são obrigatórios.');
    });

    it('retorna erro se o email for inválido', () => {
        const resultado = validarLoginCampos({ email_user: 'email@errado', password_user: '123456' });
        expect(resultado.valido).toBe(false);
        expect(resultado.mensagem).toBe('Email inválido.');
    });

    it('retorna erro se a senha for muito curta', () => {
        const resultado = validarLoginCampos({ email_user: 'email@valido.com', password_user: '123' });
        expect(resultado.valido).toBe(false);
        expect(resultado.mensagem).toBe('Senha deve ter pelo menos 6 caracteres.');
    });

    it('passa com email e senha válidos', () => {
        const resultado = validarLoginCampos({ email_user: 'email@valido.com', password_user: '123456' });
        expect(resultado.valido).toBe(true);
    });
    
    it('retorna erro se o email contiver espaços', () => {
        const resultado = validarLoginCampos({ email_user: 'email @valido.com', password_user: '123456' });
        expect(resultado.valido).toBe(false);
        expect(resultado.mensagem).toBe('Email inválido.');
    });
        
    it('retorna erro se a senha contiver apenas espaços', () => {
        const resultado = validarLoginCampos({ email_user: 'email@valido.com', password_user: '      ' });
        expect(resultado.valido).toBe(false);
        expect(resultado.mensagem).toBe('Senha deve ter pelo menos 6 caracteres.');
    });

        
    it('passa com email e senha contendo caracteres especiais válidos', () => {
        const resultado = validarLoginCampos({ email_user: 'email+test@valido.com', password_user: '123456!' });
        expect(resultado.valido).toBe(true);
    });

        
    it('retorna erro se o email estiver vazio e a senha for válida', () => {
        const resultado = validarLoginCampos({ email_user: '', password_user: '123456' });
        expect(resultado.valido).toBe(false);
        expect(resultado.mensagem).toBe('Todos os campos são obrigatórios.');
    });

        
    it('retorna erro se a senha estiver vazia e o email for válido', () => {
        const resultado = validarLoginCampos({ email_user: 'email@valido.com', password_user: '' });
        expect(resultado.valido).toBe(false);
        expect(resultado.mensagem).toBe('Todos os campos são obrigatórios.');
    });
});


