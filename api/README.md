# SQA Social Media API

API REST desenvolvida em Spring Boot que serve como backend da aplicação. Gerencia autenticação, usuários, posts curtidos e integração com a API pública [DummyJSON](https://dummyjson.com/docs).

## 📋 Índice

- [Pré-requisitos](#pré-requisitos)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Configuração da Aplicação](#configuração-da-aplicação)
- [Como Rodar](#como-rodar)
- [Endpoints](#endpoints)
- [Estrutura do Projeto](#estrutura-do-projeto)

---

## 🔧 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Java 17+**
  ```bash
  java -version  # Deve mostrar OpenJDK 17 ou superior
  ```

- **MySQL 8.0+**
  ```bash
  # Ubuntu/Debian
  sudo apt update
  sudo apt install mysql-server

  # Iniciar MySQL (se não estiver rodando)
  sudo systemctl start mysql
  sudo systemctl enable mysql

  # Verificar status
  sudo systemctl status mysql
  ```

---

## 🗄️ Configuração do Banco de Dados

### Passo 1: Acessar o MySQL

No Ubuntu/Debian, o root do MySQL usa autenticação `auth_socket` por padrão:

```bash
sudo mysql
```

### Passo 2: Criar Banco de Dados e Usuário

Dentro do console MySQL, execute:

```sql
-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS social_media;

-- Criar usuário para a aplicação
CREATE USER IF NOT EXISTS 'sqaapp'@'localhost' IDENTIFIED BY 'sqaapp123';

-- Dar permissões ao usuário
GRANT ALL PRIVILEGES ON social_media.* TO 'sqaapp'@'localhost';

-- Aplicar mudanças
FLUSH PRIVILEGES;

-- Verificar se foi criado
SHOW DATABASES;

-- Sair
EXIT;
```

Ou execute tudo em uma linha no terminal:

```bash
sudo mysql -e "
CREATE DATABASE IF NOT EXISTS social_media;
CREATE USER IF NOT EXISTS 'sqaapp'@'localhost' IDENTIFIED BY 'sqaapp123';
GRANT ALL PRIVILEGES ON social_media.* TO 'sqaapp'@'localhost';
FLUSH PRIVILEGES;
"
```

### Passo 3: Verificar Conexão (Opcional)

Teste se o usuário consegue conectar:

```bash
mysql -u sqaapp -p'sqaapp123' -e "SHOW DATABASES;"
```

---

## ⚙️ Configuração da Aplicação

### Passo 1: Verificar `application.properties`

Edite o arquivo `src/main/resources/application.properties` e confirme que está assim:

```properties
spring.application.name=demo
spring.datasource.url=jdbc:mysql://localhost:3306/social_media
spring.datasource.username=sqaapp
spring.datasource.password=sqaapp123
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

**Explicação das propriedades:**

| Propriedade | Valor | Descrição |
|-------------|-------|-----------|
| `spring.datasource.url` | `jdbc:mysql://localhost:3306/social_media` | URL de conexão MySQL |
| `spring.datasource.username` | `sqaapp` | Usuário MySQL |
| `spring.datasource.password` | `sqaapp123` | Senha do usuário |
| `spring.jpa.hibernate.ddl-auto` | `update` | Cria/atualiza tabelas automaticamente |
| `spring.jpa.show-sql` | `true` | Mostra SQL no console (útil para debug) |

---

## 🚀 Como Rodar

### Método 1: Com Maven Wrapper (Recomendado)

```bash
cd api
./mvnw spring-boot:run
```

### Método 2: No Windows

```bash
cd api
mvnw.cmd spring-boot:run
```

### Método 3: Com Maven instalado

```bash
cd api
mvn spring-boot:run
```

### ✅ Sucesso!

Você deverá ver:

```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/

 :: Spring Boot ::                (v3.4.4)

...
Started DemoApplication in X.XXX seconds
Tomcat started on port 8080 (http)
```

A API estará disponível em: **http://localhost:8080**

---

## 📡 Endpoints

### Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/auth/signup` | Cadastro de novo usuário |
| POST | `/auth/signin` | Login de usuário |
| POST | `/auth/reset-password` | Resetar senha |

### Posts

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/posts` | Listar posts (com paginação) |
| GET | `/posts/liked` | Listar posts curtidos pelo usuário |
| POST | `/posts/{postId}/like` | Curtir um post |

### Exemplos de Uso

```bash
# Listar posts (requer userId)
curl "http://localhost:8080/posts?userId=1&limit=10&skip=0"

# Listar posts curtidos
curl "http://localhost:8080/posts/liked?userId=1"

# Curtir um post
curl -X POST "http://localhost:8080/posts/1/like?userId=1"
```

---

## 📁 Estrutura do Projeto

```
api/
├── src/
│   ├── main/
│   │   ├── java/com/demoapp/demo/
│   │   │   ├── config/                     # Configurações (RestTemplate)
│   │   │   ├── controller/                 # Controllers REST
│   │   │   │   ├── AuthController.java     # Auth: signup, signin, reset
│   │   │   │   └── PostController.java     # Posts: listar, curtir
│   │   │   ├── dto/                        # Data Transfer Objects
│   │   │   ├── model/                      # Entidades JPA
│   │   │   │   ├── User.java               # Usuário
│   │   │   │   └── UserPostReaction.java    # Curtidas
│   │   │   ├── repository/                 # Repositórios JPA
│   │   │   ├── service/                    # Lógica de negócio
│   │   │   └── DemoApplication.java        # Classe principal
│   │   └── resources/
│   │       └── application.properties      # Configurações
├── pom.xml                                  # Dependências Maven
├── mvnw                                     # Maven Wrapper (Linux/Mac)
├── mvnw.cmd                                 # Maven Wrapper (Windows)
└── README.md                                # Este arquivo
```

---

## 🗃️ Tabelas Criadas Automaticamente

O Hibernate cria automaticamente as tabelas no primeiro启动:

### `user_table`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | BIGINT (PK) | ID auto incremento |
| email | VARCHAR(255) | Email do usuário |
| password | VARCHAR(255) | Senha do usuário |

### `user_post_reaction`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | BIGINT (PK) | ID auto incremento |
| user_id | BIGINT (FK) | ID do usuário |
| post_id | BIGINT | ID do post (DummyJSON) |

---

## 🔍 Troubleshooting

### Erro: "Access denied for user 'root'@'localhost'"

No Ubuntu, o MySQL usa `auth_socket` para o root. Use `sudo mysql` ou crie outro usuário conforme descrito acima.

### Erro: "Unknown database 'social_media'"

O banco de dados não foi criado. Execute:

```bash
sudo mysql -e "CREATE DATABASE social_media;"
```

### Erro: Java não encontrado

Instale o Java 17:

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install openjdk-17-jdk

# Verificar
java -version
```

### Erro: Porta 8080 em uso

Mude a porta em `application.properties`:

```properties
server.port=8081
```

---

## 📚 Referências

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [DummyJSON API Docs](https://dummyjson.com/docs)
- [MySQL Documentation](https://dev.mysql.com/doc/)
