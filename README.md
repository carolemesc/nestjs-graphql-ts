# nestjs-graphql-ts

## para rodar os testes:

- `npm run start` - para rodar o código
- `npm run start:dev` - para sempre que atualiza o código, o código roda direto

## para ver o projeto:

- `http://localhost:3000/`

## cURL para validar as rotas:

```bash
curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
```

# resposta esperada:

```bash
{
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiam9obiIsImlhdCI6MTc2MTg1Mjc5OSwiZXhwIjoxNzYxODUyODU5fQ.8X04qt9_EsWAbdE7ADlyody3KkXIgEF3pb1A6t1aU7E"
}
```
