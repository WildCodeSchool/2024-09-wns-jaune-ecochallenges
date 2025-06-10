import { ChallengeCreatedEmailSender } from './templates/challengeCreated/challengeCreatedEmailSender';
import { InvitationEmailSender } from './templates/invitation/invitationEmailSender';

class EmailService {
  invitationEmail = new InvitationEmailSender();
  challengeCreatedEmail = new ChallengeCreatedEmailSender();
}

export const email = new EmailService();
