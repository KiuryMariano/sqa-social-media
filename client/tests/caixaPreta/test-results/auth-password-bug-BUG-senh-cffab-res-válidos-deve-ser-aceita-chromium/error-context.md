# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth/password-bug.spec.ts >> BUG: senha de 8 caracteres válidos deve ser aceita
- Location: tests/auth/password-bug.spec.ts:12:5

# Error details

```
Error: BUG: Senha de 8 caracteres deveria ser válida!
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]:
        - heading "SQA Social Media" [level=1] [ref=e5] [cursor=pointer]
        - generic [ref=e6]:
          - button "Entrar" [ref=e7] [cursor=pointer]
          - button "Criar Conta" [ref=e8] [cursor=pointer]
    - main [ref=e9]:
      - generic [ref=e10]:
        - heading "Criar Conta" [level=1] [ref=e11]
        - generic [ref=e12]:
          - generic [ref=e13]:
            - generic [ref=e14]: Email
            - textbox "seu@email.com" [ref=e15]: teste_bug_1782416581344@exemplo.com
          - generic [ref=e16]:
            - generic [ref=e17]: Senha
            - textbox "••••••••" [ref=e18]: Abc123@#
            - paragraph [ref=e19]: "A senha deve conter: mínimo de 8 caracteres"
          - generic [ref=e20]:
            - generic [ref=e21]: Confirmar Senha
            - textbox "••••••••" [ref=e22]
            - paragraph [ref=e23]: Confirmação de senha é obrigatória
          - generic [ref=e24]:
            - text: "A senha deve conter:"
            - list [ref=e25]:
              - listitem [ref=e26]: Mínimo de 8 caracteres
              - listitem [ref=e27]: Pelo menos uma letra maiúscula
              - listitem [ref=e28]: Pelo menos uma letra minúscula
              - listitem [ref=e29]: Pelo menos um número
              - listitem [ref=e30]: Pelo menos um caractere especial
          - button "Criar Conta" [active] [ref=e31] [cursor=pointer]
        - generic [ref=e32]:
          - text: Já tem uma conta?
          - button "Entrar" [ref=e33] [cursor=pointer]
  - button "Open Next.js Dev Tools" [ref=e39] [cursor=pointer]:
    - img [ref=e40]
  - alert [ref=e43]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | 
  4  | //  Teste E2E: Bug na Validação de Senha
  5  | 
  6  | //  BUG NO CÓDIGO: password.length <= 8 rejeita senhas de 8 caracteres
  7  | //  CORREÇÃO: password.length < 8
  8  | 
  9  | //  Este teste demonstra o bug onde uma senha válida de exatamente 8 caracteres é incorretamente rejeitada pelo sistema.
  10 | 
  11 | 
  12 | test('BUG: senha de 8 caracteres válidos deve ser aceita', async ({ page }) => {
  13 |   
  14 |   await page.goto('/signup');
  15 | 
  16 |   
  17 |   const timestamp = Date.now();
  18 |   const senha8Caracteres = 'Abc123@#';  // Exatamente 8 caracteres - VÁLIDA!
  19 | 
  20 |   await page.getByPlaceholder('seu@email.com').fill(`teste_bug_${timestamp}@exemplo.com`);
  21 |   await page.locator('input[type="password"]').first().fill(senha8Caracteres);
  22 | 
  23 |   
  24 |   await page.locator('form button[type="submit"]').click();
  25 | 
  26 |   
  27 |   const senhaError = page.getByText('A senha deve conter:').first();
  28 |   const hasError = await senhaError.isVisible({ timeout: 3000 }).catch(() => false);
  29 | 
  30 |   if (hasError) {
  31 |     
> 32 |     throw new Error('BUG: Senha de 8 caracteres deveria ser válida!');
     |           ^ Error: BUG: Senha de 8 caracteres deveria ser válida!
  33 |   }
  34 | });
  35 | 
```