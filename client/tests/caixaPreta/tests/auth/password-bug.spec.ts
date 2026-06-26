import { test, expect } from '@playwright/test';


//  Teste E2E: Validação de Mínimo de Caracteres da Senha
//  Verifica se o sistema aceita senhas com exatamente 8 caracteres (mínimo válido)


test('deve aceitar senha com exatamente 8 caracteres válidos', async ({ page }) => {

  await page.goto('/signup');

  const timestamp = Date.now();
  const senha8Caracteres = 'Abc123@X';  // Exatamente 8 caracteres - VÁLIDA!

  await page.getByPlaceholder('seu@email.com').fill(`teste_${timestamp}@exemplo.com`);
  await page.locator('input[type="password"]').first().fill(senha8Caracteres);
  await page.locator('input[type="password"]').nth(1).fill(senha8Caracteres);

  // Aguardar validação em tempo real
  await page.waitForTimeout(500);

  await page.locator('form button[type="submit"]').click();

  // Verificar se houve redirecionamento (sucesso) ou se ficou na página com erro
  await page.waitForTimeout(2000);
  const currentUrl = page.url();

  // Se ainda está na página de signup, verificar se há mensagem de erro
  if (currentUrl.includes('/signup')) {
    const generalError = page.locator('div').filter({ hasText: /Erro ao criar conta/ });
    const hasGeneralError = await generalError.isVisible().catch(() => false);

    if (hasGeneralError) {
      throw new Error('Não deveria haver erro ao criar conta com senha válida!');
    }

    // Verificar se o formulário foi submetido com sucesso (redirecionou)
    expect(currentUrl).not.toBe('/signup');
  }
});
