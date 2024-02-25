# Challenge LOOMI

Variáveis de ambiente necessárias:

| Variável              | Configuração                                                     |
| --------------------- | ---------------------------------------------------------------- |
| APP_PORT              | Porta desejada, ex: 3333                                         |
| DATABASE_URL          | postgresql://example:example@localhost:5432/BDName?schema=public |
| POSTGRES_DB           | DB_NAME                                                          |
| POSTGRES_USER         | USER_EXAMPLE                                                     |
| POSTGRES_PASSWORD     | PASSWORD_EXAMPLE                                                 |
| JWT_SECRET            | Chave secreta do jwt                                             |
| EMAIL                 | Email padrão para confirmação de autenticação                    |
| PASSWORD              | Senha do email padrão acima                                      |
| ACCESS_AWS_KEY        | Access key da AWS                                                |
| SECRET_AWS_ACCESS_KEY | Secret key da AWS                                                |
| DB_PORT               | 5432                                                             |

## Como rodar o projeto
após setar corretamente as env e com o docker instalado, rode o comando `sudo docker compose up` para subir o banco de dados e rodar a aplicação.
