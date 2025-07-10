import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { UserActionChallenge } from '@/lib/graphql/generated/graphql-types';
import { StatusEnum } from '@/lib/enums';

type Props = {
  userActionChallenges: Partial<UserActionChallenge>[];
};

export const ChallengeFeed = ({ userActionChallenges }: Props) => {
  const validatedActions = userActionChallenges.filter(
    (uac) =>
      uac.status === StatusEnum.COMPLETED && uac.action?.requires_view === false
  );

  return (
    <ul className="space-y-4">
      {validatedActions.map((uac, index) => (
        <li key={index} className="rounded-md border p-4 shadow-sm">
          <div className="text-sm">
            <strong>
              {uac.user?.firstname} {uac.user?.lastname}
            </strong>{' '}
            a validé l’action <strong>{uac.action?.name}</strong> le{' '}
            {uac.updatedAt &&
              format(new Date(uac.updatedAt), "d MMMM yyyy 'à' HH:mm", {
                locale: fr,
              })}
          </div>
        </li>
      ))}
    </ul>
  );
};
