import { usersData, tagsData, actionsData, challengesData } from './seeds';
import { User, Tag, Action, Challenge } from '@/entities';
import { seedDb } from './seeder';

const parseDynamicDates = (data: any) => {
  const now = new Date();

  const datePattern = /\{\{now(?:\+(\d+)d)?\}\}/;

  const parseDate = (value: string) => {
    const match = value.match(datePattern);
    if (!match) return value;

    const offsetDays = match[1] ? parseInt(match[1], 10) : 0;
    const date = new Date(now);
    date.setDate(now.getDate() + offsetDays);
    return date.toISOString();
  };

  const recurse = (obj: any): any => {
    if (Array.isArray(obj)) return obj.map(recurse);
    if (typeof obj === 'object' && obj !== null) {
      const newObj: any = {};
      for (const key in obj) {
        const val = obj[key];
        newObj[key] =
          typeof val === 'string' && datePattern.test(val)
            ? parseDate(val)
            : recurse(val);
      }
      return newObj;
    }
    return obj;
  };

  return recurse(data);
};

const parsedChallenges = parseDynamicDates(challengesData.challenges);

(async () => {
  await seedDb(async (seed) => {
    // Seed your entities here
    await seed(User, usersData.users, {});
    await seed(Tag, tagsData.tags, {});
    await seed(Action, actionsData.actions, {
      relations: [
        { name: 'tags', entity: Tag },
        {
          name: 'createdBy',
          entity: User,
          property: 'email',
          type: 'manyToOne',
        },
      ],
    });
    await seed(Challenge, parsedChallenges, {
      relations: [
        { name: 'actions', entity: Action },
        { name: 'members', entity: User, property: 'email' },
        { name: 'owner', entity: User, property: 'email', type: 'manyToOne' },
      ],
      dates: ['startDate', 'endDate'],
    });
  });
})();
