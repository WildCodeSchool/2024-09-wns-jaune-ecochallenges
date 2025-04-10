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
  console.log('ici');
  if (context.user) {
    console.log('ici2');
    if (needeRoles.includes(context.user.roles)) return true;
  }
  console.log('ici3');
  return true;
};
