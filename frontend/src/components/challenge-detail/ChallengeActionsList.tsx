import { ActionItem } from "./ActionItem";

type ActionLite = {
  id: string;
  name: string;
  description: string;
  status: 'done' | 'pending';
  tags?: { name: string }[] | null;
};

type Props = {
  actions: (ActionLite & { status: 'done' | 'pending' })[];
  onToggleStatus: (id: string) => void;
};

export const ChallengeActionsList = ({ actions, onToggleStatus }: Props) => (
  <div className="space-y-4">
    {actions.map((action) => {
      return (
        <ActionItem
          key={action.id}
          id={action.id}
          title={action.name}
          description={action.description}
          tags={action.tags}
          status={action.status}
          onToggleStatus={onToggleStatus}
        />
      );
    })}
  </div>
);

