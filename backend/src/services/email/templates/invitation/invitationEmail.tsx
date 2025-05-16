// EcoChallengeInvitationEmail.tsx
import {
  Html,
  Head,
  Font,
  Preview,
  Section,
  Text,
  Img,
  Hr,
  Container,
  Link,
  Body,
} from '@react-email/components';
import * as React from 'react';

export interface InvitationEmailProps {
  readonly ecochallengeName: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly loginUrl: string;
}

export const InvitationEmail = ({
  ecochallengeName,
  startDate,
  endDate,
  loginUrl,
}: InvitationEmailProps) => {
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
        Ton invitation à l’éco-challenge🦀 {ecochallengeName} 🦀
      </Preview>
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
              🌿 INVITATION 🌿
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
              src="https://cdn.pixabay.com/photo/2022/12/28/02/23/crab-7682086_1280.jpg"
              alt="Image challenge"
              style={{
                textAlign: 'center',
                width: '100%',
              }}
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
              Ton invitation à l’éco-challenge 🦀
              <strong> {ecochallengeName} </strong>🦀
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
              <Text
                style={{
                  fontWeight: 300,
                  fontSize: '16px',
                  color: '#616161',
                  lineHeight: '24px',
                  textAlign: 'start',
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
                  textAlign: 'start',
                }}
              >
                Bonne nouvelle ! Tu as été invité(e) à participer à un
                éco-challenge par tes amis ou collègues de travail 🌿
                <br />
                Oui, tu as bien lu ! 🎉 Si tu acceptes le défi, toi et ton
                équipe commencerez l’aventure du
                <strong>{startDate}</strong> au <strong>{endDate}</strong>.
              </Text>

              <Text
                style={{
                  fontWeight: 300,
                  fontSize: '16px',
                  color: '#616161',
                  lineHeight: '24px',
                  textAlign: 'start',
                }}
              >
                Le but ? Réaliser un maximum d’éco-gestes simples et efficaces,
                comme prendre des douches de 5 minutes 🐳, ramasser les mégots
                dans ta rue 🚬♻️... et bien d’autres actions accessibles et
                ludiques 😍
              </Text>

              <Text
                style={{
                  fontWeight: 300,
                  fontSize: '16px',
                  color: '#616161',
                  lineHeight: '24px',
                  textAlign: 'start',
                }}
              >
                Alors, prêt(e) à relever le défi ? Inscris-toi dès maintenant en
                cliquant sur ce lien :
                <Link
                  href={loginUrl}
                  style={{ color: 'rgb(70, 163, 73)', textDecoration: 'none' }}
                >
                  ici
                </Link>
              </Text>
            </Text>
            <Hr style={{ border: '1px solid #E0E0E0' }} />
          </Section>

          <Section
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'start',
            }}
          >
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
            </Text>
            <Text
              style={{
                paddingLeft: 10,
                fontSize: '14px',
                color: '#bdbdbd',
              }}
            >
              Chaque geste compte
            </Text>
          </Section>

          <Hr
            style={{
              borderTop: '1px solid #E0E0E0',
              margin: '20px 0',
            }}
          />
        </Container>
      </Body>
    </Html>
  );
};
