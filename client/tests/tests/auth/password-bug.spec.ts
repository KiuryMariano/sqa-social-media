import { test, expect } from '@playwright/test';

/**
 * Teste E2E: Bug na Validação de Senha
 *
 * BUG NO CÓDIGO: password.length <= 8 rejeita senhas de 8 caracteres
 * CORREÇÃO: password.length < 8
 *
 * Este teste demonstra o bug onde uma senha válida de exatamente 8 caracteres
 * é incorretamente rejeitada pelo sistema.
 */

test('BUG: senha de 8 caracteres válidos deve ser aceita', async ({ page }) => {
  // ========================================================================
  // PASSO 1: Navegar até a página de cadastro
  // ========================================================================
  await page.goto('/signup');

  // ========================================================================
  // PASSO 2: Criar senha com EXATAMENTE 8 caracteres (válidos)
  // ========================================================================
  // 8 caracteres: 1 maiúscula + 1 minúscula + 1 número + 1 especial + 4 letras
  const timestamp = Date.now();
  const senha8Caracteres = 'Abc123@#';  // Exatamente 8 caracteres - VÁLIDA!

  await page.getByPlaceholder('seu@email.com').fill(`teste_bug_${timestamp}@exemplo.com`);
  await page.locator('input[type="password"]').first().fill(senha8Caracteres);
  await page.locator('input[type="password"]').nth(1).fill(senha8Caracteres);

  // ========================================================================
  // PASSO 3: Submeter formulário
  // ========================================================================
  await page.locator('form button[type="submit"]').click();

  // ========================================================================
  // PASSO 4: Verificar se o bug está presente
  // ========================================================================
  const senhaError = page.getByText('A senha deve conter:').first();
  const hasError = await senhaError.isVisible({ timeout: 3000 }).catch(() => false);

  if (hasError) {
    // ======================================================================
    // BUG PRESENTE: Senha válida de 8 caracteres foi rejeitada
    // ======================================================================
    console.log('\n❌❌❌ BUG DETECTADO ❌❌❌');
    console.log('Senha de 8 caracteres foi rejeitada (mas deveria ser aceita!)');
    console.log('Arquivo: client/src/utils/password.ts, linha 2');
    console.log('Correção: mude "password.length <= 8" para "password.length < 8"\n');
    throw new Error('BUG: Senha de 8 caracteres deveria ser válida!');
  }

  // ========================================================================
  // BUG CORRIGIDO: Senha de 8 caracteres foi aceita
  // ========================================================================
  try {
    await page.waitForURL('/', { timeout: 5000 });
    console.log('\n✅ Bug corrigido! Senha de 8 caracteres foi aceita.\n');
  } catch (e) {
    throw e;
  }
});
