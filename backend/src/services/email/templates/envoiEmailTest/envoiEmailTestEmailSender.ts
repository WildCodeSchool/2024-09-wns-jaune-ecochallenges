import { BaseEmailT } from '../../config/baseEmail';
import {
  EnvoiEmailTestEmail,
  EnvoiEmailTestEmailProps,
} from './envoiEmailTestEmail';

export class EnvoiEmailTestEmailSender extends BaseEmailT<EnvoiEmailTestEmailProps> {
  constructor() {
    super({
      subject: 'Ceci est un test',
      emailComponent: EnvoiEmailTestEmail,
    });
  }
}
