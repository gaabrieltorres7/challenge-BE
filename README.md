<h1 align="center" style="font-weight: bold;">Challenge Ecommerce 💻</h1>

<p align="center">
 • <a href="#technologies">Technologies</a> • 
 <a href="#started">Getting Started</a> • 
 <a href="#colab">Collaborators</a>
</p>

<p align="center">
    <b>Developed e-commerce REST API using GitFlow with Node/TS/Express, adhering to REST, CRUD. Ensured secure authentication (bcrypt, JWT), used Prisma ORM, integrated email confirmation, AWS S3 for sales report file uploads, Docker for app and PostgreSQL, followed SOLID principles.</b>
</p>

<h2 id="technologies">💻 Technologies</h2>

- NodeJS
- TypeScript
- Express
- PostgreSQL
- Docker
- AWS S3
- PrismaORM

<h2 id="started">🚀 Getting started</h2>

<h3>Prerequisites</h3>

- NodeJS
- Git
- Docker

<h3>Cloning</h3>

```bash
git clone https://github.com/gaabrieltorres7/challenge-BE
```

<h3>Config .env variables</h2>

Use the `.env.example` as reference to create your configuration file `.env`

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

<h3>Starting</h3>

```bash
cd challenge-BE
npm i
docker compose up
```

<h2 id="colab">🤝 Collaborators</h2>

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/98062444?v=4" width="100px;" alt="Gabriel Torres Profile Picture"/><br>
        <sub>
          <b>Gabriel Torres</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

<h3>If you want to contribute, here are some documentations that might help</h3>

[📝 How to create a Pull Request](https://www.atlassian.com/br/git/tutorials/making-a-pull-request)

[💾 Commit pattern](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)

