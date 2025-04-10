import { type AuthChecker } from 'type-graphql';

interface UserContext {
  user?: {
    roles: string;
    name: string;
    hashedPassword: string;
    email: string;
  };
}

export const authChecker: AuthChecker<UserContext> = (
  { context },
  needeRoles
) => {
  if (context.user) {
    if (needeRoles.includes(context.user.roles)) return true;
  }
  return true;
};
