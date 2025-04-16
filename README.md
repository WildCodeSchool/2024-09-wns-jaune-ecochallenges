# 🌱 Eco-challenges

## 🚀 Start here

- copy [env.example](env.example) to `.env.dev` and fill out env variables
- run command : `make start` if using make file or: `docker compose -f compose.dev.yaml --env-file .env.dev up --build`
- seed the database : `make seed` or `docker exec -it backend-eco sh -c "npm run seed"`
- generate graphql queries with codegen : `make codegen` or `cd ./frontend && npm run codegen`

> You can check out the [Makefile](Makefile) commands to run quick actions

### 🛠️ Tech stack

- 🖼️ Frontend

  - React 19 - JavaScript library for building user interfaces
  - TypeScript - Static type checking
  - Vite - Next generation frontend tooling
  - TailwindCSS v4 - Utility-first CSS framework
  - Apollo Client - GraphQL client
  - Shadcn/ui : UI Components toolkit, based on Radix UI and Tailwind CSS
  - Radix UI - Unstyled, accessible UI components
  - React Router - Client-side routing

- 💽 Backend

  - Node.js - JavaScript runtime
  - TypeScript - Static type checking
  - Apollo Server - GraphQL server
  - TypeORM - ORM for TypeScript and JavaScript
  - PostgreSQL - Open source relational database
  - Type-GraphQL - Create GraphQL schema and resolvers with TypeScript

- ⚙️ Development Tools
  - ESLint - JavaScript/TypeScript linting
  - Prettier - Code formatting
  - Docker - Containerization
  - GraphQL Codegen - Generate TypeScript types from GraphQL schema

### 🔨 Useful extensions

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - JavaScript/TypeScript linting
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Code formatting
- [GraphQL: Langage Feature Support](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql) - GraphQL LSP
- [GraphQL: Syntax Hightlighting](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql-syntax) - GraphQL syntax hightlighting
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Tailwind CSS tooling

## 💡 Useful info

### 🌱 Create a new seeder

- create a `<pluralEntityName>.seed.json` file in [backend/src/database/seeds/](backend/src/database/seeds/) that match the entity you want to seed
- import and export it in [backend/src/database/seeds/index.ts](backend/src/database/seeds/index.ts)
- follow this structure :
  ```json
  {
    "pluralEntityName": [
      {
        "field1": "someData",
        "field2": "94538032"
      }
    ]
  }
  ```
- go to [backend/src/database/seeder.ts](backend/src/database/seeder.ts)
  - import it using the TypeScript import alias `@/database/seeds`
  - find the line `// Add your seeds here` and paste your seeding instruction at the end of existing ones :
  ```ts
  await seedEntity(EntityName, entityData.pluralEntityName, [
    'date_start',
    'date_end',
  ]);
  ```
  > the third paramater is optional : array of entity fields of type Date
- 🎉 you can now run the seed command to add your new seeding data!
