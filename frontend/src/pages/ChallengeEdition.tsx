import { ChallengeForm } from '@/components/ChallengeForm';
import { useParams } from 'react-router-dom';

export const ChallengeEdition = () => {
  const { challengeId } = useParams();
  return <ChallengeForm challengeId={challengeId} />;
};
