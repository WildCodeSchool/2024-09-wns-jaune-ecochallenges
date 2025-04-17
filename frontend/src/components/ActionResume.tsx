import { Pill } from '@/components';
import { Checkbox } from '@/components/ui';

type Action = {
  id: string;
  title: string;
  description: string;
  tag: string;
};

type Props = {
  action: Action;
};

export const ActionResume = ({ action }: Props) => {
  return (
    <div className="flex items-start justify-between rounded-lg border bg-white p-3 shadow-sm">
      <div className="flex items-start gap-3">
        {/* Action content */}
        <div>
          <h4 className="font-semibold">{action.title}</h4>
          <p className="text-sm text-gray-600">{action.description}</p>
          <div className="mt-1 flex items-center gap-2">
            <Pill>{action.tag}</Pill>

            {/* Placeholder: e.g., progress / difficulty */}
            <div className="flex gap-1">
              <span className="h-2 w-2 rounded-full bg-gray-300" />
              <span className="h-2 w-2 rounded-full bg-gray-300" />
              <span className="h-2 w-2 rounded-full bg-gray-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Validation checkbox */}
      <button className="mt-1">
        <Checkbox />
      </button>
    </div>
  );
};
