# Challenge LOOMI

Variáveis de ambiente necessárias:

| Variável              | Configuração                                                     |
| --------------------- | ---------------------------------------------------------------- |
| APP_PORT              | Porta desejada, ex: 3333                                         |
| DATABASE_URL          | postgresql://example:example@localhost:5432/BDName?schema=public |
| JWT_SECRET            | Chave secreta do jwt                                             |
| EMAIL                 | Email padrão para confirmação de autenticação                    |
| PASSWORD              | Senha do email padrão acima                                      |
| ACCESS_AWS_KEY        | Access key da AWS                                                |
| SECRET_AWS_ACCESS_KEY | Secret key da AWS                                                |

## Como rodar o projeto

após setar corretamente as env e com o docker instalado, rode o comando
`docker run --name nomeDoSeuContainer -e POSTGRES_USER=test -e POSTGRES_PASSWORD=test -e POSTGRES_DB=nomeDoSeuDB -p 5432:5432 -d postgres` para subir seu banco de dados e `sudo docker compose up` para rodar a aplicação.
