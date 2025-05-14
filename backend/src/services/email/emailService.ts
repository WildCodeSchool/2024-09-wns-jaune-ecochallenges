import { ChallengeCreatedEmailSender } from './templates/challengeCreated/challengeCreatedEmailSender';
import { InvitationEmailSender } from './templates/onboarding/invitationEmailSender';
import { WelcomeEmailSender } from './templates/welcome/welcomeEmailSender';

class EmailService {
  welcomeEmail = new WelcomeEmailSender();
  invitationEmail = new InvitationEmailSender();
  challengeCreatedEmail = new ChallengeCreatedEmailSender();
}

export const email = new EmailService();
