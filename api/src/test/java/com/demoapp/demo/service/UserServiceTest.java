// Define o pacote onde esta classe de teste está localizada
package com.demoapp.demo.service;

// Importa a anotação @BeforeEach do JUnit 5 para métodos de configuração
import org.junit.jupiter.api.BeforeEach;
// Importa a anotação @Test do JUnit 5 para marcar métodos de teste
import org.junit.jupiter.api.Test;
// Importa a anotação @DisplayName do JUnit 5 para nomes descritivos nos testes
import org.junit.jupiter.api.DisplayName;

// Importa todos os métodos estáticos de asserções do JUnit 5 (assertTrue, assertFalse, etc.)
import static org.junit.jupiter.api.Assertions.*;

// Classe de teste unitário para o UserService
class UserServiceTest {

    // Declaração da instância do UserService que será testada
    private UserService userService;

    // Método executado antes de cada teste para configurar o ambiente de teste
    @BeforeEach
    void setUp() {
        // Cria uma nova instância do UserService passando null como parâmetro
        // (null indica que não há dependência de repositório neste contexto)
        userService = new UserService(null);
    }

    // ==================== TESTE DE SUCESSO ====================

    // Marca este método como um teste unitário
    @Test
    // Define um nome descritivo que aparece nos relatórios de teste
    @DisplayName("Deve aceitar email válido com formato correto")
    void testIsValidEmail_ValidEmail_ReturnsTrue() {
        // Verifica se o método isEmailValid retorna true para um email válido
        assertTrue(userService.isEmailValid("usuario@example.com"),
            "Email válido deve ser aceito"); // Mensagem exibida se o teste falhar
    }

    // ==================== TESTE DE BUG (FALHA) ====================

    // Marca este método como um teste que expõe um bug conhecido
    @Test
    // Define um nome descritivo indicando que este teste demonstra um bug
    @DisplayName("[BUG] Deve rejeitar email sem ponto no domínio")
    void testBug_EmailWithoutDot_ShouldBeRejected() {
        // Comentário explicativo: O bug é que o backend aceita emails inválidos
        // BUG: O backend aceita emails como "a@b" que não têm ponto no domínio
        // Este teste FALHA porque o bug existe no código
        // Verifica se o método isEmailValid retorna false para email inválido
        assertFalse(userService.isEmailValid("a@b"),
            "Email sem ponto no domínio (ex: a@b) deve ser rejeitado"); // Mensagem se falhar
    }
}
