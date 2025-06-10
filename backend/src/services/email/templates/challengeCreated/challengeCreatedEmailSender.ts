import { BaseEmailT } from '../../config/baseEmail';
import ChallengeCreatedEmail, {
  ChallengeCreatedEmailProps,
} from './challengeCreatedEmail';

export class ChallengeCreatedEmailSender extends BaseEmailT<ChallengeCreatedEmailProps> {
  constructor() {
    super({
      subject: "Ton challenge vient d'être créé !",
      emailComponent: ChallengeCreatedEmail,
    });
  }
}
