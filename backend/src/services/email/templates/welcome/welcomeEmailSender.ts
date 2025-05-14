import { BaseEmailT } from '../../config/baseEmail';
import { EmailProps, WelcomeEmail } from './welcomeEmail';

export class WelcomeEmailSender extends BaseEmailT<EmailProps> {
  constructor() {
    super({
      subject: 'Welcome à toi !',
      emailComponent: WelcomeEmail,
    });
  }
}
