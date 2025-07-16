import { useParams } from 'react-router-dom';
import { ChallengeDetail } from '@/components/challenge-detail/ChallengeDetail';

export const ChallengeDetailPage = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const challengeIdString = challengeId ?? '';

  return <ChallengeDetail challengeId={challengeIdString} />;
};
