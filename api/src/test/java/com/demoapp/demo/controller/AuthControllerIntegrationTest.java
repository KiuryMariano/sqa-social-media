// Define o pacote onde esta classe de teste está localizada
package com.demoapp.demo.controller;

// Importa o ObjectMapper para converter objetos Java para JSON e vice-versa
import com.fasterxml.jackson.databind.ObjectMapper;
// Importa as anotações e classes do JUnit 5 para criação de testes
import org.junit.jupiter.api.*;
// Importa a anotação @Autowired para injeção de dependências do Spring
import org.springframework.beans.factory.annotation.Autowired;
// Importa a configuração para usar o MockMvc em testes
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// Importa a anotação para carregar o contexto completo da aplicação Spring
import org.springframework.boot.test.context.SpringBootTest;
// Importa a constante para definir o tipo de mídia JSON nas requisições
import org.springframework.http.MediaType;
// Importa o MockMvc para simular requisições HTTP sem servidor real
import org.springframework.test.web.servlet.MockMvc;

// Importa os métodos estáticos para construir requisições HTTP (GET, POST, etc.)
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
// Importa os métodos estáticos para validar as respostas HTTP
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// Carrega o contexto completo da aplicação Spring (teste de integração real)
@SpringBootTest
// Configura automaticamente o MockMvc para testes de controllers
@AutoConfigureMockMvc
// Define um nome descritivo para a classe de teste que aparece nos relatórios
@DisplayName("Testes de Integração - AuthController")
// Define que os testes devem ser executados na ordem definida pela anotação @Order
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class AuthControllerIntegrationTest {

    // Injeta o MockMvc para simular requisições HTTP ao controller
    @Autowired
    private MockMvc mockMvc;

    // Injeta o ObjectMapper para converter objetos em JSON
    @Autowired
    private ObjectMapper objectMapper;

    // Variável estática para armazenar o email usado nos testes
    private static String testUserEmail = "test@example.com";
    // Variável estática para armazenar a senha usada nos testes
    private static String testUserPassword = "Abcdefg1@";

    // ==================== TESTE DE SUCESSO ====================

    // Marca este método como um método de teste do JUnit
    @Test
    // Define um nome descritivo para este teste que aparece nos relatórios
    @DisplayName("Deve criar usuário com credenciais válidas")
    void testSignup_ValidCredentials_Returns200() throws Exception {
        // Executa uma requisição POST para o endpoint /auth/signup
        mockMvc.perform(post("/auth/signup")
                // Define que o conteúdo da requisição é JSON
                .contentType(MediaType.APPLICATION_JSON)
                // Converte o objeto TestUserDTO para JSON e define como corpo da requisição
                .content(objectMapper.writeValueAsString(
                    new TestUserDTO(testUserEmail, testUserPassword))))
            // Verifica se o status HTTP da resposta é 200 OK
            .andExpect(status().isOk())
            // Verifica se o JSON de resposta contém um campo "id"
            .andExpect(jsonPath("$.id").exists())
            // Verifica se o campo "email" do JSON tem o valor esperado
            .andExpect(jsonPath("$.email").value(testUserEmail));
    }

    // ==================== DTOs para Teste ====================

    // Classe interna estática para representar o DTO de usuário usado nos testes
    static class TestUserDTO {
        // Campo para armazenar o email do usuário
        private String email;
        // Campo para armazenar a senha do usuário
        private String password;

        // Construtor que inicializa o DTO com email e senha
        public TestUserDTO(String email, String password) {
            this.email = email;
            this.password = password;
        }

        // Getter para obter o valor do email
        public String getEmail() { return email; }
        // Setter para definir o valor do email
        public void setEmail(String email) { this.email = email; }
        // Getter para obter o valor da senha
        public String getPassword() { return password; }
        // Setter para definir o valor da senha
        public void setPassword(String password) { this.password = password; }
    }
}
