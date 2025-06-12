import { Checkbox } from "@/components/ui/checkbox";
import { Pill } from "@/components";
import  AvatarGroupDemo from "./avatar-group"; // Assure-toi que ce chemin est correct

type Props = {
  id: string;
  title: string;
  description: string;
  status: 'done' | 'pending';
  tags?: { name: string }[] | null;
  onToggleStatus: (id: string) => void;
};

export const ActionItem = ({ id, title, description, tags, status, onToggleStatus }: Props) => {
  const isChecked = status === 'done';

  return (
    <li className="flex items-center justify-between gap-2 p-4 rounded-xl shadow-sm">
      <div className="flex items-center gap-4">
        <div className="bg-zinc-200">
          <h3 className="block text-sm font-semibold">{title}</h3>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
          {description}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <Pill>{tags?.[0]?.name || "Sans tag"}</Pill>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Complété par</span>
              <AvatarGroupDemo />
              <span>4/10</span>
            </div>
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
