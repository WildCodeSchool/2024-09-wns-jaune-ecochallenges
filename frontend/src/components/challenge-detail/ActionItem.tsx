import { Checkbox } from '@/components/ui/checkbox';
import { Pill } from '@/components';
import { Eye } from 'lucide-react';
import {
  CustomInfoDialog,
  ActionCompletedBy,
} from '@/components/challenge-detail';
import { ValidateActionDialog } from '../ValidateActionDialog';
import {
  Action,
  UserActionChallengeScore,
} from '@/lib/graphql/generated/graphql-types';
import { StatusEnum } from '@/lib/enums';

type Props = {
  userId?: string;
  isAuthorized: boolean | undefined;
  action: Partial<Action>;
  userActionChallengeScore: UserActionChallengeScore;
};
export const ActionItem = ({
  action,
  userId,
  isAuthorized,
  userActionChallengeScore,
}: Props) => {
  const isChecked = userActionChallengeScore?.status === StatusEnum.COMPLETED;

  return (
    <li className="flex items-center justify-between gap-2 rounded-xl p-4 shadow-sm">
      <div className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <h3 className="block text-sm font-semibold">{action.name}</h3>
          <CustomInfoDialog
            title={action.name || ''}
            description={action.description || ''}
          />
          {action.requires_view && <Eye className="size-4 text-black" />}
        </div>

        <div className="mt-1 flex items-center gap-2">
          <Pill>{action.tags?.[0]?.name || 'Sans tag'}</Pill>

          <div className="text-muted-foreground flex items-center gap-x-2 text-xs">
            <span>
              Complété par : {userActionChallengeScore?.validatedFor?.firstname}{' '}
              {userActionChallengeScore?.validatedFor?.lastname}
            </span>
            {userActionChallengeScore?.validatedBy && (
              <div className="origin-left scale-75">
                <ActionCompletedBy
                  completedBy={userActionChallengeScore.validatedBy}
                  maxLength={2}
                />
              </div>
            )}
            <span>
              {userActionChallengeScore?.status === StatusEnum.PENDING
                ? 'En attente de validation'
                : userActionChallengeScore?.status === StatusEnum.COMPLETED
                  ? `Validé par ${userActionChallengeScore.validatedBy?.firstname} ${userActionChallengeScore.validatedBy?.lastname}`
                  : 'Validation en cours'}
            </span>
          </div>
        </div>
      </div>

      {userId && isAuthorized && (
        <div className="flex flex-col items-center gap-2">
          {userActionChallengeScore?.status === StatusEnum.COMPLETED ? (
            <Checkbox
              className="mx-2 mr-4 h-8 w-8 rounded-full border-3"
              checked={isChecked}
            />
          ) : userActionChallengeScore?.status === StatusEnum.PENDING ? (
            <div>En attente de validation</div>
          ) : (
            <ValidateActionDialog
              isChecked={isChecked}
              action={action as Action}
              userIdChallenge={userId}
            />
          )}
        </div>
      )}
    </li>
  );
};
