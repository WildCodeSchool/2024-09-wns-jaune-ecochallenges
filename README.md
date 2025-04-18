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

- create a `<pluralEntityName>.seed.json` file in [backend/src/seeding/seeds/](backend/src/seeding/seeds/) that match the entity you want to seed
- import and export it in [backend/src/database/seeds/index.ts](backend/src/seeding/seeds/index.ts)
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
- go to [backend/src/seeding/index.ts](backend/src/seeding/index.ts)

  - import it using the TypeScript import alias `@/database/seeds`
  - find the line `// Seed your entities here` and paste your seeding instruction at the end of existing ones :

  ```ts
  await seed(EntityClass, entityData.pluralEntityName, {
    relations: [{
      { name: 'relationName', entity: relationEntityClass, property: 'email', type: 'manyToOne'},
    }],
    dates: ['startDate', 'endDate'],
  }
  );
  ```

  - the third paramater is optional : an option object where you can pass relations and date properties

    - `relations`: an array of objects describing the relations
      - `name`: relation name as a string
      - `entity`: the entity class of the relation
      - `property`: _optional_, specify if other than `id`
      - `type`: _optional_, specify if other than `manyToMany`
    - `dates`: an array of date properties as strings

- 🎉 you can now run the seed command (`make seed`) to add your new seeding data!
