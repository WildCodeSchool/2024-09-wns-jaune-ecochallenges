# START

- copy `.env` to `.env.dev` and fill env variables
- run command : `make start` if using make file or:

```bash
docker compose -f compose.dev.yaml --env-file .env.dev up --build
```

# Seeding the database

## insert data to the database

- if using make file you can directly run the command: `make seed`
- else enter the backend container and run the command:

```bash
docker exec -it backend-eco sh
```

-then

```bash
npm run seed
```

## Create a new seeder

### create a yourData.seed.json file that match the entity you want to seed

```json
[
  {
    "id": "cee5b95e-c5ee-4d1e-99c6-72e6911009f0",
    "name": "thomas",
    "email": "thomas@example.com",
    "hashedPassword": "Thomas123!"
  }
]
```

### add the new seed to the seeder.ts file

#### clear the entities you want to seed

```typescript
await dataSource.manager.delete(YourEntity, {});
```

#### add the json file to the seeder.ts file

```typescript
const yourData = loadJSON(__dirname + '/seeds/yourData.seed.json');
```

#### add the new seed to the seeder.ts file

```typescript
const dataRepository = dataSource.getRepository(YourEntity);
for (const yourData of yourDatas) {
  const newData = dataRepository.create(yourData);
  await dataRepository.save(newData);
}
```

### run the seeder

```bash
make seed
```
