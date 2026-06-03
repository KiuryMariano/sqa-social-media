# 📚 Guia Didático - Testes da API (Java/Spring Boot)

Este documento explica os testes da API de forma objetiva, bloco a bloco.

---

## 📖 Arquivo 1: UserServiceTest.java (Teste Unitário)

Testa isoladamente o método de validação de email do `UserService`.

### Bloco 1: Importações
```java
package com.demoapp.demo.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;
```
- **Objetivo**: Importar bibliotecas necessárias
- **`BeforeEach`**: Para executar código antes de cada teste
- **`Test`**: Para marcar métodos como testes
- **`DisplayName`**: Para dar nomes descritivos aos testes
- **`Assertions.*`**: Para usar assertTrue, assertFalse, etc.

---

### Bloco 2: Declaração da Classe e Variáveis
```java
class UserServiceTest {
    private UserService userService;

    @BeforeEach
    void setUp() {
        userService = new UserService(null);
    }
```
- **Objetivo**: Configurar o ambiente de teste
- **`userService`**: Objeto que será testado
- **`@BeforeEach`**: Executa `setUp()` antes de cada teste para garantir um ambiente limpo
- **`new UserService(null)`**: Cria instância sem dependência de repositório (não necessária para este teste)

---

### Bloco 3: Teste de Sucesso
```java
    @Test
    @DisplayName("Deve aceitar email válido com formato correto")
    void testIsValidEmail_ValidEmail_ReturnsTrue() {
        assertTrue(userService.isEmailValid("usuario@example.com"),
            "Email válido deve ser aceito");
    }
```
- **Objetivo**: Verificar se email válido é aceito
- **`@Test`**: Marca como método de teste
- **`assertTrue()`**: Verifica se o resultado é `true`
- **Mensagem**: Exibida se o teste falhar

---

### Bloco 4: Teste que Expõe Bug
```java
    @Test
    @DisplayName("[BUG] Deve rejeitar email sem ponto no domínio")
    void testBug_EmailWithoutDot_ShouldBeRejected() {
        assertFalse(userService.isEmailValid("a@b"),
            "Email sem ponto no domínio (ex: a@b) deve ser rejeitado");
    }
}
```
- **Objetivo**: Expor bug onde email sem ponto (`a@b`) é aceito incorretamente
- **`assertFalse()`**: Verifica se o resultado é `false` (esperado), mas retorna `true` (bug)
- **Este teste FALHA**: Porque o bug existe no código

---

## 📖 Arquivo 2: AuthControllerIntegrationTest.java (Teste de Integração)

Testa o endpoint de cadastro simulando uma requisição HTTP real.

### Bloco 1: Importações e Configuração
```java
package com.demoapp.demo.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
```
- **Objetivo**: Importar bibliotecas para testes de integração
- **`ObjectMapper`**: Converter objetos Java para JSON
- **`MockMvc`**: Simular requisições HTTP
- **`MediaType`**: Definir tipo de conteúdo (JSON)
- **`MockMvcRequestBuilders`**: Construir requisições (POST, GET, etc.)
- **`MockMvcResultMatchers`**: Validar respostas HTTP

---

### Bloco 2: Configuração da Classe
```java
@SpringBootTest
@AutoConfigureMockMvc
@DisplayName("Testes de Integração - AuthController")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class AuthControllerIntegrationTest {
```
- **Objetivo**: Configurar o teste de integração
- **`@SpringBootTest`**: Carrega contexto completo do Spring Boot
- **`@AutoConfigureMockMvc`**: Configura MockMvc automaticamente
- **`@DisplayName`**: Nome descritivo para o grupo de testes
- **`@TestMethodOrder`**: Define ordem de execução dos testes

---

### Bloco 3: Injeção de Dependências
```java
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private static String testUserEmail = "test@example.com";
    private static String testUserPassword = "Abcdefg1@";
```
- **Objetivo**: Injetar dependências e definir dados de teste
- **`@Autowired`**: Spring injeta automaticamente MockMvc e ObjectMapper
- **`testUserEmail/testUserPassword`**: Dados reutilizados nos testes

---

### Bloco 4: Teste de Integração
```java
    @Test
    @DisplayName("Deve criar usuário com credenciais válidas")
    void testSignup_ValidCredentials_Returns200() throws Exception {
        mockMvc.perform(post("/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(
                    new TestUserDTO(testUserEmail, testUserPassword))))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").exists())
            .andExpect(jsonPath("$.email").value(testUserEmail));
    }
```
- **Objetivo**: Testar endpoint `/auth/signup` com requisição HTTP simulada
- **`mockMvc.perform()`**: Inicia a requisição HTTP
- **`post("/auth/signup")`**: Define método POST e endpoint
- **`.contentType(JSON)`**: Define que estamos enviando JSON
- **`.content(...)`**: Corpo da requisição (objeto convertido para JSON)
- **`.andExpect(status().isOk())`**: Verifica se status HTTP é 200
- **`.andExpect(jsonPath("$.id").exists())`**: Verifica se campo `id` existe na resposta
- **`.andExpect(jsonPath("$.email").value(...))`**: Verifica se campo `email` tem valor esperado

---

### Bloco 5: DTO para Teste
```java
    static class TestUserDTO {
        private String email;
        private String password;

        public TestUserDTO(String email, String password) {
            this.email = email;
            this.password = password;
        }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
```
- **Objetivo**: DTO simples para representar dados de teste
- **Construtor**: Inicializa email e password
- **Getters/Setters**: Padrão JavaBean para serialização JSON

---

## 🎯 Resumo: Diferenças entre Testes

| Característica | UserServiceTest | AuthControllerIntegrationTest |
|----------------|-----------------|-------------------------------|
| **Tipo** | Unitário | Integração |
| **O que testa** | Método isolado | Endpoint HTTP completo |
| **Dependências** | Mockadas (null) | Reais (Spring Boot) |
| **Velocidade** | Rápido | Mais lento |
| **Ferramentas** | JUnit Assertions | MockMvc + JSON Path |

---

## 🔤 Glossário

| Termo | Significado |
|-------|-------------|
| **JUnit** | Framework de testes Java |
| **Spring Boot** | Framework para aplicações Java |
| **MockMvc** | Simulador de requisições HTTP |
| **ObjectMapper** | Conversor Java ↔ JSON (Jackson) |
| **DTO** | Data Transfer Object |
| **@Autowired** | Injeção automática de dependências |
| **JSON Path** | Linguagem para acessar campos JSON (`$.email`) |
