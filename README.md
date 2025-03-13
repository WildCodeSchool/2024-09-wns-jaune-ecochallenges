# START

- copy `.env` to `.env.dev` and fill env variables
- run command : `make start` if using make file or:

```bash
docker compose -f compose.dev.yaml --env-file .env.dev up --build
```

# Seeding the database

if using make file you can directly run the command: `make seed`

### enter the backend container:

run command

```bash
docker exec -it backend-eco sh
```

### run the seed command:

```bash
npm run seed
```
