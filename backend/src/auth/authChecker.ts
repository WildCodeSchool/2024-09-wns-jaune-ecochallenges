import { type AuthChecker } from 'type-graphql';
import { User } from '@/entities';

interface UserContext {
  user?: User;
}

export const authChecker: AuthChecker<UserContext> = (
  { context },
  needeRoles
) => {
  if (context.user) {
    if (needeRoles.includes(context.user.role)) return true;
  }
  return true;
};
