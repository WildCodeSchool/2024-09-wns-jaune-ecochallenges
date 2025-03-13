### START

- copy `.env` to `.env.dev` and fill env variables
- run command : `make start`

### ENTITIES

- Revoir les relations entre challenge et user / challenge et action (supprimer les tables d'association créées manuellement au profit d'une manytomany en direct)
- Renommer UserActionChallenge en UserAction pour simplifier ?
- Revoir l'utilité d'une entité role au profit d'un enum dans User ?
