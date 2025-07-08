import {
  Action,
  Challenge,
  UserActionChallenge,
} from '@/lib/graphql/generated/graphql-types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const getUniqueTagsFromActions = (actions: Action[]) => {
  const tagsSet = new Set(actions.flatMap((action) => action.tags));
  return Array.from(tagsSet);
};

export const formatChallengeDates = (startDate: string, endDate: string) => {
  return {
    startDate: format(new Date(startDate), 'dd LLL', {
      locale: fr,
    }),
    endDate: format(new Date(endDate), 'dd LLL', {
      locale: fr,
    }),
    timeLeft: Math.floor(
      (new Date(endDate).getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24
    ),
  };
};

export const getProgressPercentageInChallenge = (
  challenge: Challenge,
  userActionChallenge: UserActionChallenge[]
): number => {
  const totalAction = challenge.actions.length;
  if (totalAction === 0) return 0;
  const toalActionDone = userActionChallenge.filter(
    (el) => el.status === 'completed'
  ).length;
  return Math.round((toalActionDone / totalAction) * 100);
};
