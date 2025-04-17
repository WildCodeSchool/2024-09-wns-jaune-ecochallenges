import { ActionResume } from '@/components';

type Action = {
  id: string;
  title: string;
  description: string;
  tag: string;
};

type Props = {
  actions: Action[];
};

export const ActionList = ({ actions }: Props) => {
  return (
    <ul className="flex flex-col gap-3">
      {actions.map((action) => (
        <li key={action.id}>
          <ActionResume action={action} />
        </li>
      ))}
    </ul>
  );
};
