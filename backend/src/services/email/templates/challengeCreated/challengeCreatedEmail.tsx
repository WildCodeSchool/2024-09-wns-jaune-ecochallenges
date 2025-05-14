import {
  Html,
  Head,
  Font,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Img,
  Hr,
  Link,
} from '@react-email/components';
import * as React from 'react';

export interface ChallengeCreatedEmailProps {
  readonly ecochallengeName: string;
  readonly startDate: string;
  readonly endDate: string;
}

export default function ChallengeCreatedEmail({
  ecochallengeName,
  startDate,
  endDate,
}: ChallengeCreatedEmailProps) {
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
      <Preview>Création de ton challenge {ecochallengeName}</Preview>
      <Body
        style={{
          fontFamily: 'Roboto, Helvetica, sans-serif',
          backgroundColor: '#ffffff',
        }}
      >
        <Container>
          <Section style={{ padding: '20px 0' }} />

          <Section style={{ textAlign: 'center' }}>
            <Text
              style={{
                fontWeight: 500,
                fontSize: '18px',
                padding: 0,
                textAlign: 'center',
              }}
            >
              🌿 CHALLENGE 🌿 <br />
            </Text>
            <Hr
              style={{
                borderTop: '2px solid #616161',
                margin: '10px auto',
              }}
            />
            <Hr
              style={{
                borderTop: '2px solid #616161',
                margin: '10px auto',
                width: '45%',
              }}
            />
          </Section>

          <Section
            style={{
              textAlign: 'center',
            }}
          >
            <Img
              src="https://cdn.pixabay.com/photo/2022/12/07/08/39/labyrinth-7640561_1280.jpg"
              alt="Image challenge"
              style={{ width: '100%' }}
            />
          </Section>

          <Section style={{ textAlign: 'center' }}>
            <Text
              style={{
                fontWeight: 300,
                fontSize: '16px',
                color: '#616161',
                lineHeight: '24px',
              }}
            >
              Création de ton challenge 🦀 <strong>{ecochallengeName}</strong>{' '}
              🦀
            </Text>
            <Hr
              style={{
                borderTop: '2px solid #616161',
                margin: '10px auto',
                width: '45%',
              }}
            />
            <Hr
              style={{
                borderTop: '2px solid #616161',
                margin: '10px auto',
                width: '70%',
              }}
            />
          </Section>

          <Section style={{ paddingTop: 30 }}>
            <Text
              style={{
                fontWeight: 300,
                fontSize: '16px',
                color: '#616161',
                lineHeight: '24px',
              }}
            >
              Bonjour à toi, cher(ère) défenseur(se) de notre belle planète 🌍
              💚
            </Text>

            <Text
              style={{
                fontWeight: 300,
                fontSize: '16px',
                color: '#616161',
                lineHeight: '24px',
              }}
            >
              Bonne nouvelle ! Tu as réussi à créer ton challenge intitulé :{' '}
              <strong>{ecochallengeName}</strong>. Félicitations !<br />
              Il commencera le <strong>{startDate}</strong> et se terminera le{' '}
              <strong>{endDate}</strong>.
            </Text>

            <Text
              style={{
                fontWeight: 300,
                fontSize: '16px',
                color: '#616161',
                lineHeight: '24px',
              }}
            >
              N’hésite pas à l’enrichir avec des éco-gestes que toi, tes amis ou
              tes collègues aimeriez réaliser.
            </Text>

            <Text
              style={{
                fontWeight: 300,
                fontSize: '16px',
                color: '#616161',
                lineHeight: '24px',
              }}
            >
              Toute l’équipe d’Éco-Challenge te félicite pour ton engagement et
              te souhaite une belle aventure écoresponsable !
            </Text>

            <Hr
              style={{
                borderTop: '1px solid #E0E0E0',
                margin: '20px 0',
              }}
            />
          </Section>

          <Section style={{ display: 'flex' }}>
            <Img
              src="https://cdn.pixabay.com/photo/2022/12/28/02/23/crab-7682086_1280.jpg"
              alt="Crabe"
              width="70"
              style={{ paddingLeft: 2, paddingRight: 0 }}
            />
            <Text
              style={{
                paddingLeft: 10,
                fontSize: '14px',
                color: '#bdbdbd',
              }}
            >
              Toute l’équipe d’éco-challenge -
              <Link
                href="https://ecochallenge.fr"
                style={{ color: 'rgb(70, 163, 73)' }}
              >
                ecochallenge.fr
              </Link>
              Chaque geste compte
            </Text>
          </Section>

          <Section>
            <Hr
              style={{
                borderTop: '1px solid #E0E0E0',
                margin: '20px 0',
              }}
            />
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
