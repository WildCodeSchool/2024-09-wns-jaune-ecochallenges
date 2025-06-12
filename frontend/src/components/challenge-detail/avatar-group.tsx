import * as React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type AvatarProps = React.ComponentProps<typeof Avatar>;

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement<AvatarProps>[];
  max?: number;
  sizeClass?: string;
}

const AvatarGroup = ({
  children,
  max,
  className,
  sizeClass = '',
  ...props
}: AvatarGroupProps) => {
  const totalAvatars = React.Children.count(children);
  const displayedAvatars = React.Children.toArray(children)
    .slice(0, max)
    .reverse();
  const remainingAvatars = max && totalAvatars > max ? totalAvatars - max : 0;

  return (
    <div
      className={cn('flex flex-row-reverse items-center', className)}
      {...props}
    >
      {remainingAvatars > 0 && (
        <Avatar
          className={cn(
            'ring-background z-0 -ml-1 ring-1 hover:z-10',
            sizeClass
          )}
        >
          <AvatarFallback className="bg-zinc-500 text-white">{`+${remainingAvatars}`}</AvatarFallback>
        </Avatar>
      )}

      {displayedAvatars.map((child, index) => {
        if (!React.isValidElement<AvatarProps>(child)) return null;
        return React.cloneElement(child, {
          key: index,
          className: cn(
            child.props.className,
            'ring-background z-0 -ml-2 ring-1 hover:z-10',
            sizeClass
          ),
        });
      })}
    </div>
  );
};

export default function AvatarGroupDemo({
  max = 3,
  size = 'normal',
}: {
  max?: number;
  size?: 'small' | 'normal';
}) {
  const sizeClass = size === 'small' ? 'h-6 w-6 text-xs' : '';

  return (
    <AvatarGroup max={max} sizeClass={sizeClass}>
      <Avatar className={sizeClass}>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className={sizeClass}>
        <AvatarFallback className="bg-green-600 text-white">CN</AvatarFallback>
      </Avatar>
      <Avatar className={sizeClass}>
        <AvatarFallback className="bg-red-600 text-white">CN</AvatarFallback>
      </Avatar>
      <Avatar className={sizeClass}>
        <AvatarFallback className="bg-blue-600 text-white">CN</AvatarFallback>
      </Avatar>
      <Avatar className={sizeClass}>
        <AvatarFallback className="bg-pink-600 text-white">CN</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  );
}
