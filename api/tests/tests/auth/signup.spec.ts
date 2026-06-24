import { test, expect } from '@playwright/test';


  // Testes de API: POST /auth/signup
  // Valida criação de usuário com dados válidos e duplicidade de email
 

test.describe('POST /auth/signup', () => {

  // TESTE 1: Criar usuário com dados válidos

  test('deve criar usuário com dados válidos e retornar 200', async ({ request }) => {
  
    const timestamp = Date.now();
    const validUser = {
      email: `teste_api_${timestamp}@exemplo.com`,
      password: 'Senha123@'
    };


    const response = await request.post('/auth/signup', {
      data: validUser
    });


    expect(response.status()).toBe(200);

   
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('email', validUser.email);
    expect(body).toHaveProperty('password', validUser.password);
  });

  // TESTE 2: Email duplicado deve retornar 409

  test('não deve criar usuário com email já cadastrado - retorna 409', async ({ request }) => {
    
    const timestamp = Date.now();
    const emailDuplicado = `duplicado_${timestamp}@exemplo.com`;
    const validUser = {
      email: emailDuplicado,
      password: 'Senha123@'
    };

    await request.post('/auth/signup', {
      data: validUser
    });

   
    const response = await request.post('/auth/signup', {
      data: validUser
    });

    
    expect(response.status()).toBe(409);

  
    const body = await response.json();
    expect(body).toHaveProperty('message', 'E-mail já está em uso');
    expect(body).toHaveProperty('status', 409);
  });
});
