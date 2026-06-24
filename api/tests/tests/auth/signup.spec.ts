import { test, expect } from '@playwright/test';

/**
 * Testes de API: POST /auth/signup
 *
 * Valida criação de usuário com dados válidos e duplicidade de email
 */

test.describe('POST /auth/signup', () => {

  // =========================================================================
  // TESTE 1: Criar usuário com dados válidos
  // =========================================================================
  test('deve criar usuário com dados válidos e retornar 200', async ({ request }) => {
    // ========================================================================
    // PASSO 1: Preparar dados válidos
    // ========================================================================
    const timestamp = Date.now();
    const validUser = {
      email: `teste_api_${timestamp}@exemplo.com`,
      password: 'Senha123@'
    };

    // ========================================================================
    // PASSO 2: Enviar requisição POST
    // ========================================================================
    const response = await request.post('/auth/signup', {
      data: validUser
    });

    // ========================================================================
    // PASSO 3: Verificar status code 200
    // ========================================================================
    expect(response.status()).toBe(200);

    // ========================================================================
    // PASSO 4: Verificar corpo da resposta
    // ========================================================================
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('email', validUser.email);
    expect(body).toHaveProperty('password', validUser.password);
  });

  // =========================================================================
  // TESTE 2: Email duplicado deve retornar 409
  // =========================================================================
  test('não deve criar usuário com email já cadastrado - retorna 409', async ({ request }) => {
    // ========================================================================
    // PASSO 1: Criar um usuário primeiro
    // ========================================================================
    const timestamp = Date.now();
    const emailDuplicado = `duplicado_${timestamp}@exemplo.com`;
    const validUser = {
      email: emailDuplicado,
      password: 'Senha123@'
    };

    await request.post('/auth/signup', {
      data: validUser
    });

    // ========================================================================
    // PASSO 2: Tentar criar o mesmo usuário novamente
    // ========================================================================
    const response = await request.post('/auth/signup', {
      data: validUser
    });

    // ========================================================================
    // PASSO 3: Verificar status code 409 (Conflict)
    // ========================================================================
    expect(response.status()).toBe(409);

    // ========================================================================
    // PASSO 4: Verificar mensagem de erro
    // ========================================================================
    const body = await response.json();
    expect(body).toHaveProperty('message', 'E-mail já está em uso');
    expect(body).toHaveProperty('status', 409);
  });
});
