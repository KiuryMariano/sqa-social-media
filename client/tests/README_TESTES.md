# 📚 Guia Didático - Testes do Client (Frontend)

Este documento explica os testes do frontend de forma objetiva, bloco a bloco.

---

## 🛠️ Tecnologias

| Tecnologia | Para que serve |
|------------|----------------|
| **Jest** | Framework de testes JavaScript |
| **React Testing Library** | Testar componentes React |
| **TypeScript** | JavaScript com tipagem |

---

## 📖 PARTE 1: TESTES DE UTILITÁRIOS

Testam funções puras (validação de email, senha, etc.).

### Arquivo: email.test.ts

```typescript
import { isEmailValid } from "@/utils/email";

describe("Email Validation - Unit Tests", () => {
  test("Deve aceitar email válido com formato correto", () => {
    expect(isEmailValid("usuario@example.com")).toBe(true);
    expect(isEmailValid("user.name@domain.co")).toBe(true);
    expect(isEmailValid("test@test.br")).toBe(true);
  });
});
```

**Objetivo de cada bloco:**

| Bloco | O que faz |
|-------|-----------|
| **`import`** | Importa função de validação de email |
| **`describe()`** | Agrupa testes relacionados (suite) |
| **`test()`** | Define um teste individual |
| **`expect().toBe()`** | Verifica se resultado é true/false |

---

### Arquivo: password.test.ts

```typescript
import { isPasswordValid, getPasswordValidationMessage } from "@/utils/password";

describe("Password Validation - Unit Tests", () => {
  test("[BUG] Mensagem de senha inconsistente - diz 8 mas exige 9+", () => {
    const eightCharPassword = "Abcdef1@"; // Exatamente 8 caracteres

    expect(isPasswordValid(eightCharPassword)).toBe(false);

    const message = getPasswordValidationMessage(eightCharPassword);
    expect(message).toContain("9"); // FALHA porque a mensagem diz "8"
  });
});
```

**Objetivo de cada bloco:**

| Bloco | O que faz |
|-------|-----------|
| **`import`** | Importa funções de validação de senha |
| **`const eightCharPassword`** | Define senha de teste (8 caracteres) |
| **`expect().toBe(false)`** | Verifica que senha de 8 chars é inválida |
| **`expect().toContain("9")`** | Exibe BUG: mensagem diz "8" mas deveria dizer "9" |

---

## 📖 PARTE 2: TESTES DE COMPONENTES

Testam componentes React individuais.

### Arquivo: Input.test.tsx

```typescript
import React from "react";
import { render, screen } from "@testing-library/react";
import Input from "@/components/Input";

describe("Input Component - Unit Tests", () => {
  test("Deve renderizar input com label e mensagem de erro", () => {
    render(<Input label="Email" error="Email inválido" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Email inválido")).toBeInTheDocument();
  });
});
```

**Objetivo de cada bloco:**

| Bloco | O que faz |
|-------|-----------|
| **`import React`** | Necessário para usar JSX |
| **`import { render, screen }`** | Funções para renderizar e buscar elementos |
| **`render(<Component />)`** | Renderiza componente em ambiente de teste |
| **`screen.getByText()`** | Busca elemento pelo texto |
| **`.toBeInTheDocument()`** | Verifica se elemento existe no DOM |

---

### Arquivo: Button.test.tsx

```typescript
import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "@/components/Button";

describe("Button Component - Unit Tests", () => {
  test("Deve renderizar botão com texto correto", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });
});
```

**Objetivo de cada bloco:**

| Bloco | O que faz |
|-------|-----------|
| **`<Button>Click Me</Button>`** | Renderiza botão com children (texto) |
| **`getByText("Click Me")`** | Busca botão pelo texto |

---

## 📖 PARTE 3: TESTES DE PÁGINAS (INTEGRAÇÃO)

Testam páginas completas com múltiplos componentes e mocks de dependências.

### Arquivo: signin-page.test.tsx

```typescript
import React from "react";
import { render, screen } from "@testing-library/react";
import SignInPage from "@/app/signin/page";

// Mock do Next.js routing
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock do módulo api
jest.mock("@/service/api", () => ({
  default: {
    post: jest.fn(() => Promise.resolve({ data: { id: 1, email: "test@example.com" } })),
  },
}));

// Mock do AuthContext
jest.mock("@/contexts/AuthContext", () => ({
  AuthContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
  useAuth: () => ({
    login: jest.fn(),
    user: null,
    logout: jest.fn(),
  }),
}));

describe("SignIn Page - Integration Tests", () => {
  test("Deve renderizar página de signin com todos os elementos", () => {
    render(<SignInPage />);

    expect(screen.getAllByText("Entrar")).toHaveLength(3);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Senha")).toBeInTheDocument();
  });
});
```

**Objetivo de cada bloco:**

| Bloco | O que faz |
|-------|-----------|
| **`jest.mock("next/navigation")`** | Simula roteamento do Next.js (não navega de verdade) |
| **`jest.mock("@/service/api")`** | Simula API (não faz requisição HTTP real) |
| **`jest.mock("@/contexts/AuthContext")`** | Simula contexto de autenticação |
| **`useRouter: () => ({ push: jest.fn() })`** | Retorna função mock de navegação |
| **`post: jest.fn(...)`** | Simula POST que retorna Promise resolvida |
| **`useAuth: () => ({ login: jest.fn(), ... })`** | Simula hook de autenticação |
| **`render(<SignInPage />)`** | Renderiza página completa |
| **`getAllByText("Entrar")`** | Busca todas ocorrências do texto |
| **`.toHaveLength(3)`** | Verifica quantidade de elementos |

---

### Arquivo: signup-page.test.tsx

```typescript
import React from "react";
import { render, screen } from "@testing-library/react";
import SignUpPage from "@/app/signup/page";

// Mesmos mocks do signin...

describe("SignUp Page - Integration Tests", () => {
  test("Deve renderizar página de signup com todos os elementos", () => {
    render(<SignUpPage />);

    expect(screen.getAllByText("Criar Conta")).toHaveLength(3);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Senha")).toBeInTheDocument();
    expect(screen.getByText("Confirmar Senha")).toBeInTheDocument();
  });
});
```

**Objetivo de cada bloco:**

| Bloco | O que faz |
|-------|-----------|
| **`render(<SignUpPage />)`** | Renderiza página de cadastro |
| **`getByText("Confirmar Senha")`** | Verifica campo específico de cadastro |

---

## 🎣 Comandos Principais

| Comando | O que faz |
|---------|-----------|
| **`render(<Component />)`** | Renderiza componente |
| **`screen.getByText("texto")`** | Busca por texto (erro se não encontrar) |
| **`screen.getAllByText("texto")`** | Busca todos os elementos com o texto |
| **`screen.queryByText("texto")`** | Busca (retorna null se não encontrar) |
| **`.toBeInTheDocument()`** | Verifica se elemento existe |
| **`.toHaveLength(n)`** | Verifica quantidade de elementos |

---

## 🔤 Glossário

| Termo | Significado |
|-------|-------------|
| **Jest** | Framework de testes JavaScript |
| **React Testing Library** | Biblioteca para testar componentes |
| **Mock** | Simulação de módulo/dependência |
| **`jest.fn()`** | Cria função mock vazia |
| **`jest.mock()`** | Substitui módulo por simulação |
| **`render()`** | Renderiza componente React |
| **`screen`** | Representa a página renderizada |
| **Props** | Propriedades passadas a componentes |
| **JSX** | HTML dentro do JavaScript |

---

## 🎯 Comparação: Jest vs JUnit

| JavaScript (Jest) | Java (JUnit) | O que faz |
|-------------------|--------------|-----------|
| `test()` | `@Test` | Marca teste |
| `describe()` | Classe de teste | Agrupa testes |
| `expect(x).toBe(y)` | `assertEquals(x, y)` | Compara valores |
| `expect(x).toBe(true)` | `assertTrue(x)` | Verifica true |
| `expect(x).toContain(y)` | `assertTrue(x.contains(y))` | Verifica contém |
