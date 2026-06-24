import { test, expect } from '@playwright/test';

  // Testes de API: POST /auth/signin
  // Valida login com credenciais válidas e email não cadastrado


test.describe('POST /auth/signin', () => {

  // TESTE 1: Login com credenciais válidas

  test('deve fazer login com credenciais válidas e retornar 200', async ({ request }) => {
    
    const timestamp = Date.now();
    const loginUser = {
      email: `login_test_${timestamp}@exemplo.com`,
      password: 'Senha123@'
    };

    await request.post('/auth/signup', {
      data: loginUser
    });

    
    const response = await request.post('/auth/signin', {
      data: loginUser
    });

    
    expect(response.status()).toBe(200);

    
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('email', loginUser.email);
  });

  
  // TESTE 2: Email não cadastrado deve retornar 401

  test('não deve fazer login com email não cadastrado - retorna 401', async ({ request }) => {
    
    const nonexistentUser = {
      email: 'nao_existe@exemplo.com',
      password: 'Senha123@'
    };

    const response = await request.post('/auth/signin', {
      data: nonexistentUser
    });

    
    expect(response.status()).toBe(401);

    
    const body = await response.json();
    expect(body).toHaveProperty('message', 'Credenciais inválidas');
    expect(body).toHaveProperty('status', 401);
  });
});
