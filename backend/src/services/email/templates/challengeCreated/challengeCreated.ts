import path from 'path';
import { BaseEmailT } from '../../config/baseEmail';

interface ChallengeCreatedVariables {
  ecochallengeName: string;
  startDate: Date;
  endDate: Date;
}

export class ChallengeCreated extends BaseEmailT<ChallengeCreatedVariables> {
  constructor() {
    super({
      subject: "Ton nouveau challenge vient d'être créé !💫",
      template: path.join(__dirname, 'template.mjml'),
    });
  }
}
