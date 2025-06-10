import * as React from 'react';
import * as nodemailer from 'nodemailer';
import { transporter } from './transporter';
import { render } from '@react-email/components';

export abstract class BaseEmailT<T extends Record<string, any>> {
  protected subject: string;
  protected emailComponent: React.ComponentType<T>;

  constructor({
    subject,
    emailComponent,
  }: {
    subject: string;
    emailComponent: React.ComponentType<T>;
  }) {
    this.subject = subject;
    this.emailComponent = emailComponent;
  }

  public async send(
    to: string,
    variables: T,
    options?: nodemailer.SendMailOptions
  ) {
    const emailElement = React.createElement(this.emailComponent, variables);
    const emailHtml = await render(emailElement);

    await transporter
      .sendMail({
        to,
        subject: this.subject,
        html: emailHtml,
        ...options,
      })
      .then((info) => {
        console.info('Message sent: ', info.messageId);

        const previewUrl = nodemailer.getTestMessageUrl(info);
        if (previewUrl) {
          console.info('Preview URL: ', previewUrl);
        }
      });
  }
}
