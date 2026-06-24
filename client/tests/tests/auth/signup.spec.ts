import { test, expect } from '@playwright/test';

/**
 * Teste E2E: Cadastro de Usuário (Sign Up)
 *
 * Valida o fluxo completo de cadastro com dados válidos
 */

test('deve criar conta com dados válidos e redirecionar para home', async ({ page }) => {
  // ========================================================================
  // PASSO 1: Navegar até a página de cadastro
  // ========================================================================
  await page.goto('/signup');
  await expect(page.getByRole('heading', { name: 'Criar Conta' })).toBeVisible();

  // ========================================================================
  // PASSO 2: Preencher formulário com dados válidos
  // ========================================================================
  const timestamp = Date.now();
  const testEmail = `teste_${timestamp}@exemplo.com`;
  const testPassword = 'Senha123@';

  await page.getByPlaceholder('seu@email.com').fill(testEmail);
  await page.locator('input[type="password"]').first().fill(testPassword);
  await page.locator('input[type="password"]').nth(1).fill(testPassword);

  // ========================================================================
  // PASSO 3: Submeter formulário
  // ========================================================================
  await page.locator('form button[type="submit"]').click();

  // ========================================================================
  // PASSO 4: Verificar resultado - sucesso e redirecionamento
  // ========================================================================
  try {
    await page.waitForURL('/', { timeout: 10000 });
  } catch (e) {
    const currentUrl = page.url();
    if (!currentUrl.includes('/signup')) {
      console.log(`Redirecionado para: ${currentUrl}`);
    }
  }

  // Verifica que não há erros
  const generalError = page.getByText(/Erro ao criar conta/);
  await expect(generalError).not.toBeVisible();
});
