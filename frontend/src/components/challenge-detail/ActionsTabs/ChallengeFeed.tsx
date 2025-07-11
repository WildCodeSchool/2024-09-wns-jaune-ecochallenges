import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { UserActionChallengeScore } from '@/lib/graphql/generated/graphql-types';
import { StatusEnum } from '@/lib/enums';

type Props = {
  userActionChallengeScore: Partial<UserActionChallengeScore>[];
};

export const ChallengeFeed = ({ userActionChallengeScore }: Props) => {
  const validatedActions = userActionChallengeScore.filter(
    (uac) => uac.status === StatusEnum.COMPLETED
  );

  return (
    <ul className="space-y-4">
      {validatedActions.map((uac, index) => (
        <li key={index} className="rounded-md border p-4 shadow-sm">
          <div className="text-sm">
            <strong>
              {uac.validatedFor?.firstname} {uac.validatedFor?.lastname}
            </strong>{' '}
            a complété et validé l’action <strong>{uac.action?.name}</strong> le{' '}
            {uac.createdAt &&
              format(new Date(uac.createdAt), 'PPP', { locale: fr })}
          </div>
        </li>
      ))}
    </ul>
  );
};
