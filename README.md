### START 

add a new file : .env.dev to the root of the project.

Then, add this instructions : 

DB_HOST=
DB_PASSWORD=
DB_USER=
DB_SCHEMA=
GATEWAY_PORT=


Then run : docker compose -f compose.dev.yaml --env-file .env.dev up --build