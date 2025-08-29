// Fichier component pour le template du mail: "envoiEmailTest"
import { Html, Head, Font, Body, Preview } from '@react-email/components';
import * as React from 'react';

export interface EnvoiEmailTestEmailProps {
  preview: string;
  // rest of your props
}

export const EnvoiEmailTestEmail = (props: EnvoiEmailTestEmailProps) => {
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
      <Preview>{props.preview}</Preview>
      <Body
        style={{
          fontFamily: 'Roboto, Helvetica, sans-serif',
          backgroundColor: '#ffffff',
        }}
      ></Body>
    </Html>
  );
};
