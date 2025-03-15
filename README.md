### START

- copy `.env` to `.env.dev` and fill env variables
- run command : `make start`

### ENTITIES

- [x] Revoir les relations `challenge` ↔ `user` et `challenge` ↔ `action`
      (supprimer les entités crées au profit d'une ManyToMany)
- [x] Renommer `UserActionChallenge` en `UserAction` pour simplifier
- [x] Revoir l'utilité d'une entité `Role` au profit d'un enum commun à `UserAction` et `Review`
