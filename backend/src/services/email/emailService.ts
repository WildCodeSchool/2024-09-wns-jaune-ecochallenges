import { ChallengeCreated } from './templates/challengeCreated/challengeCreated';
import { OnboardingEmail } from './templates/onboarding/onboarding';

class EmailService {
  onboarding = new OnboardingEmail();
  challengeCreated = new ChallengeCreated();
}

export const email = new EmailService();
