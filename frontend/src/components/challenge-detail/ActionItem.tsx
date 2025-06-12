import { Checkbox } from '@/components/ui/checkbox';
import { Pill } from '@/components';
import { CustomInfoDialog } from './CustomInfoDialog';
import AvatarGroupDemo from './avatar-group';

type Props = {
  id: string;
  title: string;
  description: string;
  status: 'done' | 'pending';
  tags?: { name: string }[] | null;
  onToggleStatus: (id: string) => void;
};

export const ActionItem = ({
  id,
  title,
  description,
  tags,
  status,
  onToggleStatus,
}: Props) => {
  const isChecked = status === 'done';

  return (
    <li className="flex items-center justify-between gap-2 rounded-xl p-4 shadow-sm">
      <div className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <h3 className="block text-sm font-semibold">{title}</h3>
          <CustomInfoDialog title={title} description={description} />
        </div>

        <div className="mt-1 flex items-center gap-2">
          <Pill>{tags?.[0]?.name || 'Sans tag'}</Pill>

          <div className="text-muted-foreground flex items-center gap-x-2 text-xs">
            <span>Complété par :</span>
            <div className="origin-left scale-75">
              <AvatarGroupDemo size="small" />
            </div>
            <span>4/10</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Checkbox
          className="h-8 w-8 rounded-full border-3"
          checked={isChecked}
          onCheckedChange={() => onToggleStatus(id)}
        />
      </div>
    </li>
  );
};
