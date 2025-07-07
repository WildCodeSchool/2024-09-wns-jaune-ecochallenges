import { Checkbox } from '@/components/ui/checkbox';
import { Pill } from '@/components';
import { CustomInfoDialog } from './CustomInfoDialog';
import AvatarGroupDemo from './avatar-group';
import { ValidateActionDialog } from '../ValidateActionDialog';
import { Action } from '@/lib/graphql/generated/graphql-types';
import { StatusEnum } from '@/lib/enums';

type Props = {
  userId?: string;
  isAuthorized: boolean | undefined;
  action: Partial<Action>;
  status: StatusEnum;
};
export const ActionItem = ({ action, userId, isAuthorized, status }: Props) => {
  const isChecked = status === StatusEnum.COMPLETED;

  return (
    <li className="flex items-center justify-between gap-2 rounded-xl p-4 shadow-sm">
      <div className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <h3 className="block text-sm font-semibold">{action.name}</h3>
          <CustomInfoDialog
            title={action.name || ''}
            description={action.description || ''}
          />
        </div>
        {action.tags && (
          <div className="mt-1 flex items-center gap-2">
            <Pill>{action.tags?.[0]?.name || 'Sans tag'}</Pill>

            <div className="text-muted-foreground flex items-center gap-x-2 text-xs">
              <span>Complété par :</span>
              <div className="origin-left scale-75">
                <AvatarGroupDemo size="small" />
              </div>
              <span>4/10</span>
            </div>
          </div>
        )}
      </div>

      {userId && isAuthorized && (
        <div className="flex flex-col items-center gap-2">
          {status === StatusEnum.COMPLETED ? (
            <Checkbox
              className="mx-2 mr-4 h-8 w-8 rounded-full border-3"
              checked={isChecked}
            />
          ) : (
            <ValidateActionDialog
              isChecked={isChecked}
              action={action as Partial<Action>}
              userIdChallenge={userId}
            />
          )}
        </div>
      )}
    </li>
  );
};
