// src/features/challenge-detail/components/ChallengeDetail.tsx

import { useState } from 'react';
import { ChallengeBanner } from './ChallengeBanner';
import { ChallengeDetailTab } from './ChallengeDetailTab';
import { ChallengeActionList } from './ChallengeActionList';
import { ArrowLeft, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui';
import { Link, useNavigate } from 'react-router-dom';

type ChallengeDetailProps = {
  challengeId: string;
};

export const ChallengeDetail = ({ challengeId }: ChallengeDetailProps) => {
  const [activeTab, setActiveTab] = useState<'all' | 'done' | 'pending'>('all');
  const navigate = useNavigate();

  return (
    <Card className="relative h-full gap-2 p-0">
      <ChallengeBanner challengeId={challengeId} />

      <ChallengeDetailTab active={activeTab} setActive={setActiveTab} />
      <ChallengeActionList challengeId={challengeId} activeTab={activeTab} />

      <Button
        onClick={() => navigate(-1)}
        className="absolute bottom-0 left-0 z-50 m-2 size-10 rounded-full shadow-md shadow-black/50"
      >
        <ArrowLeft className="size-5" />
      </Button>

      <Link
        to={`/challenge/${challengeId}/edit`}
        className="absolute right-0 bottom-0 z-50 m-2 flex size-10 items-center justify-center rounded-full bg-green-600 text-white shadow-md shadow-black/50 hover:bg-green-700"
        title="Modifier le challenge"
        aria-label="Modifier le challenge"
      >
        <Pencil className="size-5" />
      </Link>
    </Card>
  );
};
