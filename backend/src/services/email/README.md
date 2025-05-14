# ✈️ Email Service

This service was set up to handle email sending within our project.  
Source: [https://www.bretcameron.com/blog/sending-emails-with-nodejs-nodemailer-mjml-and-amazon-ses](https://www.bretcameron.com/blog/sending-emails-with-nodejs-nodemailer-mjml-and-amazon-ses)

## 📂 Pre requis

You need to put environnement variable in you file `.env.dev` with you email and password of your gmail acount where the sending email come from.

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
For example, for a user signup email, you could name it signup.

## ⚒️ Template configuration:

Once the template folder has been created, you need to define the dynamic variables that will be injected into your `template.mjml`.

To do this, open the `.ts` file generated in the folder.

Example for the onboarding template:

```ts
interface OnboardingEmailVariables {
  ecochallengeName: string;
  startDate: Date;
  endDate: Date;
  loginUrl: string;
}
```

These variables must be in the file `template.mjml`

```mjml
<mj-section>
  <mj-column width="100%">
    <mj-text align="center"
      >Ton invitation à l'éco-challenge 🦀<strong> {{ecochallengeName}} </strong
      >🦀</mj-text
    >
  </mj-column></mj-section
>
```

## ✉️ Sending the email:

After completing the previous steps, you can import the service in the file where you want to send the email:

```ts
import { email } from '@/services/email/emailService';
```

Then inject the required variables like this:

```ts
await email.onboarding.send('test@spam.com', {
  ecochallengeName: 'Eco-challenge du crabe',
  startDate: new Date(),
  endDate: new Date(),
  loginUrl:
    'http://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Date',
});
```
