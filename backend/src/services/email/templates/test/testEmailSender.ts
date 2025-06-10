import { BaseEmailT } from '../../config/baseEmail';
import { TestEmail, TestEmailProps } from './testEmail';

export class TestEmailSender extends BaseEmailT<TestEmailProps> {
  constructor() {
    super({
      subject: 'ceci est un test',
      emailComponent: TestEmail,
    });
  }
}
