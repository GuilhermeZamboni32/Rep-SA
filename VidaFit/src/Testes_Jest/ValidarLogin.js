// utils/validarLogin.js



export function validarLoginCampos({ email_user, password_user }) {
    if (!email_user || !password_user) {
      return { valido: false, mensagem: 'Todos os campos são obrigatórios.' };
    }
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_user);
    if (!emailValido) {
      return { valido: false, mensagem: 'Email inválido.' };
    }
    if (password_user.length < 6) {
      return { valido: false, mensagem: 'Senha deve ter pelo menos 6 caracteres.' };
    }
    return { valido: true };
  }
  

  