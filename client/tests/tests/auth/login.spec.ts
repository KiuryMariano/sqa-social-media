import { test, expect } from '@playwright/test';

/**
 * Testes E2E: Login de Usuário (Sign In)
 *
 * Valida fluxos de login com credenciais válidas e inválidas
 */

test.describe('Login', () => {
  // Configuração: email e senha usados nos testes
  const testEmail = `usuario_login_${Date.now()}@exemplo.com`;
  const testPassword = 'Senha123@';

  test.beforeEach(async ({ page }) => {
    // ======================================================================
    // SETUP: Criar usuário antes dos testes
    // ======================================================================
    await page.goto('/signup');
    await page.getByPlaceholder('seu@email.com').fill(testEmail);
    await page.locator('input[type="password"]').first().fill(testPassword);
    await page.locator('input[type="password"]').nth(1).fill(testPassword);
    await page.locator('form button[type="submit"]').click();

    try {
      await page.waitForURL('/', { timeout: 10000 });
    } catch (e) {
      const error = page.getByText(/Erro ao criar conta|já cadastrado/i);
      if (await error.isVisible({ timeout: 1000 })) {
        throw new Error('Setup falhou: ' + await error.textContent());
      }
    }
  });

  // =========================================================================
  // TESTE 1: Login com credenciais válidas
  // =========================================================================
  test('deve fazer login com credenciais válidas e redirecionar para home', async ({ page }) => {
    // ======================================================================
    // PASSO 1: Fazer login
    // ======================================================================
    await page.goto('/signin');
    await expect(page.getByRole('heading', { name: 'Entrar' })).toBeVisible();

    await page.getByPlaceholder('seu@email.com').fill(testEmail);
    await page.locator('input[type="password"]').fill(testPassword);
    await page.locator('form button[type="submit"]').click();

    // ======================================================================
    // PASSO 2: Verificar resultado - sucesso e redirecionamento
    // ======================================================================
    await page.waitForURL('/', { timeout: 10000 });
    await expect(page).toHaveURL('/');

    const errorMessages = page.getByText(/Erro ao fazer login|credenciais/i);
    await expect(errorMessages).not.toBeVisible();
  });

  // =========================================================================
  // TESTE 2: Login com senha incorreta
  // =========================================================================
  test('não deve fazer login com senha incorreta', async ({ page }) => {
    // ======================================================================
    // PASSO 1: Tentar login com senha incorreta
    // ======================================================================
    await page.goto('/signin');
    await page.getByPlaceholder('seu@email.com').fill(testEmail);
    await page.locator('input[type="password"]').fill('SenhaIncorreta456@');
    await page.locator('form button[type="submit"]').click();

    // ======================================================================
    // PASSO 2: Verificar mensagem de erro
    // ======================================================================
    const errorMessage = page.getByText(/Erro ao fazer login|credenciais|inválidas/i);
    await expect(errorMessage).toBeVisible({ timeout: 5000 });

    // ======================================================================
    // PASSO 3: Verificar que continua na página de login
    // ======================================================================
    await expect(page.getByRole('heading', { name: 'Entrar' })).toBeVisible();
    await expect(page).toHaveURL('/signin');
  });
});
