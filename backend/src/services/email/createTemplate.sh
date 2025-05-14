#!/bin/bash

cd src/services/email/templates
$PWD
pwd > $PWD 
echo $PWD

# Demande à l'utilisateur le nom du dossier
read -p "📁 Entrez le nom du dossier à créer : " NAME

DIR="./$NAME"

# Vérifie si le dossier existe déjà
if [ -d "$DIR" ]; then
  echo "⚠️ Le dossier '$NAME' existe déjà. Annulation."
  exit 1
fi

# Vérifie que le nom n'est pas vide
if [ -z "$NAME" ]; then
  echo "❌ Le nom ne peut pas être vide."
  exit 1
fi

# Capitalise la première lettre (PascalCase)
NAME_CAPITALIZED="$(tr '[:lower:]' '[:upper:]' <<< "${NAME:0:1}")${NAME:1}"


# Crée le dossier
mkdir -p "$DIR"

# Crée le fichier .ts avec un template
cat > "$DIR/$NAME.ts" <<EOL
// Fichier TypeScript pour le template "$NAME"
import path from 'path'
import { BaseEmailT } from '../../config/baseEmail'


interface ${NAME_CAPITALIZED}EmailVariables {
  exemple: string;
  // rest of your variable
}

export class ${NAME_CAPITALIZED} extends BaseEmailT<${NAME_CAPITALIZED}EmailVariables> {
  constructor() {
    super({
      subject: 'Welcome!',
      template: path.join(__dirname, 'template.mjml'),
    });
  }
}
EOL


# Crée le fichier template.mjml avec du contenu de base
cat > "$DIR/template.mjml" <<EOL
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text>
          Bonjour, ceci est le template MJML pour "$NAME".
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
EOL

echo "✅ Dossier '$NAME' créé avec :"
echo "- $NAME.ts"
echo "- template.mjml"
