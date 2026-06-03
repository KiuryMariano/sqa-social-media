package com.demoapp.demo.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.*;

class UserServiceTest {

    private UserService userService;

    @BeforeEach
    void setUp() {
        userService = new UserService(null);
    }

    // ==================== TESTE DE SUCESSO ====================

    @Test
    @DisplayName("Deve aceitar email válido com formato correto")
    void testIsValidEmail_ValidEmail_ReturnsTrue() {
        assertTrue(userService.isEmailValid("usuario@example.com"),
            "Email válido deve ser aceito");
    }

    // ==================== TESTE DE BUG (FALHA) ====================

    @Test
    @DisplayName("[BUG] Deve rejeitar email sem ponto no domínio")
    void testBug_EmailWithoutDot_ShouldBeRejected() {
        assertFalse(userService.isEmailValid("a@b"),
            "Email sem ponto no domínio (ex: a@b) deve ser rejeitado");
    }
}
