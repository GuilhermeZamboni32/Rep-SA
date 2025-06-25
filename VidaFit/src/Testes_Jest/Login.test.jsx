/*


import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { GlobalContext } from '../../Context/GlobalContext';
import Login from './Login';
import axios from 'axios';

// Mock do axios
vi.mock('axios');

describe('Login Component', () => {
  const mockUpdateUser = vi.fn();

  const renderLogin = () => {
    render(
      <BrowserRouter>
        <GlobalContext.Provider value={{ updateUser: mockUpdateUser }}>
          <Login />
        </GlobalContext.Provider>
      </BrowserRouter>
    );
  };

  test('renderiza campos e botão corretamente', () => {
    renderLogin();

    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('mostra mensagem de erro ao falhar login', async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: 'Credenciais inválidas' } },
    });

    renderLogin();

    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: 'usuario@teste.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: 'senha123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/credenciais inválidas/i)).toBeInTheDocument();
    });
  });

  test('chama updateUser e redireciona ao logar corretamente', async () => {
    const mockUser = {
      id_user: 1,
      username: 'Usuario',
      email_user: 'usuario@teste.com',
      age_user: 25,
      account_enable: true,
      first_name: 'Nome',
      last_name: 'Sobrenome',
      image: '',
      gender_user: 'M',
      problems_user: '',
      professional_confirm: false,
      professional_type: null,
      comments_user: '',
      user_rating: 5,
      avaliability: [],
      address: '',
      token: 'fake-token',
    };

    axios.post.mockResolvedValueOnce({ data: mockUser });

    renderLogin();

    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: 'usuario@teste.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: 'senha123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({
        ...mockUser,
        id: mockUser.id_user,
      });
    });
  });
});




*/