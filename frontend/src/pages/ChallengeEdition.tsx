import { ChallengeForm } from '@/components/forms/challenge';
import { useParams } from 'react-router-dom';

export const ChallengeEdition = () => {
  const { challengeId } = useParams();
  return <ChallengeForm challengeId={challengeId} />;
};
