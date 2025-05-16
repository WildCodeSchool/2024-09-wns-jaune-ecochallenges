# ✈️ Email Service

This service was set up to handle email sending within our project.  
Source: [https://www.bretcameron.com/blog/sending-emails-with-nodejs-nodemailer-mjml-and-amazon-ses](https://www.bretcameron.com/blog/sending-emails-with-nodejs-nodemailer-mjml-and-amazon-ses)
and :
[https://react.email/](https://react.email/)

## 📂 Pre requis

You need to put environnement variables in you file `.env.dev` with you email and password of your gmail acount where the sending email come from.

```
GOOGLE_APP_PASSWORD=
GOOGLE_APP_EMAIL=
```

## ✨ Template Creation

To create a new template, simply go to the root of the project and run the following command:

```sh
make email
📁 Enter the name of the folder to create:
```

You will be asked to provide a name for your template in the terminal.
It's recommended to choose a name related to the feature you're working on.
For example, for a user signup email, you could write it "signup".

Then, two files'll be created :

- email templs : `NameEmail.tsx`
- class that handle to send the mail : `NameEmailSender.ts`

## ⚒️ Template configuration:

Once the template folder has been created, you need to define the dynamic props that will be injected into your `nameEmail.tsx`.

Example for the onboarding template:

```ts
export interface TestEmailProps {
  preview: string;
  // rest of your props
}
export const TestEmail = (props: TestEmailProps) => {
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
        {props.preview} <- same kind of props injected in reactjs
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
```

Check the second file named `NameEmailSender.ts` if there are any error and add the sibject of your email in the file :

```ts
export class TestEmailSender extends BaseEmailT<TestEmailProps> {
  constructor() {
    super({
      subject: 'Ceci est un objet de mail!',
      emailComponent: TestEmail,
    });
  }
}
```

## ✉️ Add you sender in email service:

Open `emailService.ts` and add your new sender that you've just created :

```ts
class EmailService {
  testEmail = new TestEmailSender();
}
```

## ✉️ Sending the email:

After completing the previous steps, you can import the service in the file where you want to send the email:

```ts
import { email } from '@/services/email/emailService';
```

Then inject the required variables like this:

```ts
email.testEmail.send('marcos.marjorie@hotmail.fr', { preview: 'lalalal ' });
```

Congrats, you've just send your first email from this project 🤩
