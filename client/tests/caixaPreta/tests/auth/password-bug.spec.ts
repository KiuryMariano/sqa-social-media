import { test, expect } from '@playwright/test';


//  Teste E2E: Bug na Validação de Senha

//  BUG NO CÓDIGO: password.length <= 8 rejeita senhas de 8 caracteres
//  CORREÇÃO: password.length < 8

//  Este teste demonstra o bug onde uma senha válida de exatamente 8 caracteres é incorretamente rejeitada pelo sistema.


test('BUG: senha de 8 caracteres válidos deve ser aceita', async ({ page }) => {
  
  await page.goto('/signup');

  
  const timestamp = Date.now();
  const senha8Caracteres = 'Abc123@#';  // Exatamente 8 caracteres - VÁLIDA!

  await page.getByPlaceholder('seu@email.com').fill(`teste_bug_${timestamp}@exemplo.com`);
  await page.locator('input[type="password"]').first().fill(senha8Caracteres);

  
  await page.locator('form button[type="submit"]').click();

  
  const senhaError = page.getByText('A senha deve conter:').first();
  const hasError = await senhaError.isVisible({ timeout: 3000 }).catch(() => false);

  if (hasError) {
    
    throw new Error('BUG: Senha de 8 caracteres deveria ser válida!');
  }
});
