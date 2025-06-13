import { BaseEmailT } from '../../config/baseEmail';
import { InvitationEmail, InvitationEmailProps } from './invitationEmail';

export class InvitationEmailSender extends BaseEmailT<InvitationEmailProps> {
  constructor() {
    super({
      subject: 'Bienvenue à toi !',
      emailComponent: InvitationEmail,
    });
  }
}
