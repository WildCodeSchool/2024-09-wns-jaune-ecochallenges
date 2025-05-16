import { BaseEmailT } from '../../config/baseEmail';
import { InvitationEmail, InvitationEmailProps } from './invitationEmail';

export class InvitationEmailSender extends BaseEmailT<InvitationEmailProps> {
  constructor() {
    super({
      subject: 'Welcome à toi !',
      emailComponent: InvitationEmail,
    });
  }
}
