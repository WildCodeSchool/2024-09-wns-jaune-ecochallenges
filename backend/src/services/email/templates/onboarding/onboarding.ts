import path from 'path';
import { BaseEmailT } from '../../config/baseEmail';

interface OnboardingEmailVariables {
  ecochallengeName: string;
  startDate: Date;
  endDate: Date;
  loginUrl: string;
}

export class OnboardingEmail extends BaseEmailT<OnboardingEmailVariables> {
  constructor() {
    super({
      subject: 'Welcome!',
      template: path.join(__dirname, 'template.mjml'),
    });
  }
}
