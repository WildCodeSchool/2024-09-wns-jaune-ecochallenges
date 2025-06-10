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
cat > "$DIR/"$NAME"Email.tsx" <<EOL
// Fichier component pour le template du mail: "$NAME"
import {
  Html,
  Head,
  Font,
  Body,
  Preview,
} from '@react-email/components';
import * as React from 'react';


export interface ${NAME_CAPITALIZED}EmailProps {
  preview: string;
  // rest of your props
}

export const ${NAME_CAPITALIZED}Email = (props: ${NAME_CAPITALIZED}EmailProps) => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: 'https://fonts.googleapis.com/css?family=Roboto:300,500',
            format: 'woff2',
          }}
        />
      </Head>
      <Preview>
        {props.preview}
      </Preview>
      <Body
        style={{
          fontFamily: 'Roboto, Helvetica, sans-serif',
          backgroundColor: '#ffffff',
        }}
      >
      </Body>
    </Html>
  )
}
EOL


# Crée le fichier sender qui permettra d'envoyer le mail avec les props
cat > "$DIR/"$NAME"EmailSender.ts" <<EOL
import { BaseEmailT } from '../../config/baseEmail';
import { ${NAME_CAPITALIZED}Email, ${NAME_CAPITALIZED}EmailProps } from './${NAME}Email';

export class ${NAME_CAPITALIZED}EmailSender extends BaseEmailT<${NAME_CAPITALIZED}EmailProps> {
  constructor() {
    super({
      subject: "Ton challenge vient d'être créé !",
      emailComponent: ${NAME_CAPITALIZED}Email,
    });
  }
}
EOL

echo "✅ Dossier '$NAME' créé avec :"
echo "- $NAME.ts"
echo "- template.mjml"
