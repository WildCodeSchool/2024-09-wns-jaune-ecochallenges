import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type AvatarProps = React.ComponentProps<typeof Avatar>;

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement<AvatarProps>[];
  max?: number;
}

const AvatarGroup = ({ children, max, className, ...props }: AvatarGroupProps) => {
  const totalAvatars = React.Children.count(children);
  const displayedAvatars = React.Children.toArray(children)
    .slice(0, max)
    .reverse();
  const remainingAvatars = max && totalAvatars > max ? totalAvatars - max : 0;

  return (
    <div
      className={cn("flex items-center flex-row-reverse", className)}
      {...props}
    >
      {remainingAvatars > 0 && (
        <Avatar className="-ml-2 z-0 hover:z-10 ring-1 ring-background">
          <AvatarFallback>+{remainingAvatars}</AvatarFallback>
        </Avatar>
      )}
      {displayedAvatars.map((child, index) =>
        React.cloneElement(child, {
          key: index,
          className: cn(child.props.className, "-ml-2 z-0 hover:z-10 ring-1 ring-background"),
        })
      )}
    </div>
  );
};

export default function AvatarGroupDemo() {
  return (
    <AvatarGroup max={3} className="bg-amber-400">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-green-600 text-white">CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-red-500 text-white">AB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-indigo-500 text-white">VK</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-orange-500 text-white">RS</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  );
}
