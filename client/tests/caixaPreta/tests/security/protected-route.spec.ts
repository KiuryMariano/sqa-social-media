import { test, expect } from '@playwright/test';

/**
 * Teste E2E: Segurança - Rotas Protegidas
 *
 * Valida que páginas protegidas não podem ser acessadas sem autenticação
 */

test('não deve acessar página protegida sem autenticação', async ({ page }) => {
  // ========================================================================
  // PASSO 1: Garantir estado limpo (não autenticado)
  // ========================================================================
  await page.context().clearCookies();

  // ========================================================================
  // PASSO 2: Tentar acessar página protegida diretamente
  // ========================================================================
  await page.goto('/auth/liked');

  // ========================================================================
  // PASSO 3: Verificar redirecionamento para login
  // ========================================================================
  // Aguardar redirecionamento (router.push é assíncrono)
  await page.waitForURL(/\/signin/, { timeout: 8000 });

  // ========================================================================
  // PASSO 4: Verificar que está na página de login
  // ========================================================================
  await expect(page.getByRole('heading', { name: 'Entrar' })).toBeVisible();
});
