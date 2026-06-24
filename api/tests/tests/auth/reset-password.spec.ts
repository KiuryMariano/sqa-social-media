import { test, expect } from '@playwright/test';

/**
 * Testes de API: POST /auth/reset-password
 *
 * Valida reset de senha com email válido e email não cadastrado
 */

test.describe('POST /auth/reset-password', () => {

  // =========================================================================
  // TESTE 1: Reset com email válido
  // =========================================================================
  test('deve enviar email de reset para usuário cadastrado - retorna 200', async ({ request }) => {
    // ========================================================================
    // PASSO 1: Criar usuário
    // ========================================================================
    const timestamp = Date.now();
    const userEmail = `reset_${timestamp}@exemplo.com`;

    await request.post('/auth/signup', {
      data: {
        email: userEmail,
        password: 'Senha123@'
      }
    });

    // ========================================================================
    // PASSO 2: Solicitar reset de senha
    // ========================================================================
    const response = await request.post('/auth/reset-password', {
      data: { email: userEmail }
    });

    // ========================================================================
    // PASSO 3: Verificar status code 200
    // ========================================================================
    expect(response.status()).toBe(200);

    // ========================================================================
    // PASSO 4: Verificar mensagem de sucesso
    // ========================================================================
    const body = await response.json();
    expect(body).toHaveProperty('message');
  });

  // =========================================================================
  // TESTE 2: Reset com email não cadastrado
  // =========================================================================
  test('não deve enviar reset para email não cadastrado - retorna 404', async ({ request }) => {
    // ========================================================================
    // PASSO 1: Solicitar reset para email que não existe
    // ========================================================================
    const response = await request.post('/auth/reset-password', {
      data: { email: 'nao_existe@exemplo.com' }
    });

    // ========================================================================
    // PASSO 2: Verificar status code 404 (Not Found)
    // ========================================================================
    expect(response.status()).toBe(404);

    // ========================================================================
    // PASSO 3: Verificar mensagem de erro
    // ========================================================================
    const body = await response.json();
    expect(body).toHaveProperty('message', 'Usuário não encontrado');
    expect(body).toHaveProperty('status', 404);
  });
});
