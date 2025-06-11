import { usersData, tagsData, actionsData, challengesData } from './seeds';
import { User, Tag, Action, Challenge } from '@/entities';
import { seedDb } from './seeder';

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
    await seed(Challenge, challengesData.challenges, {
      relations: [
        { name: 'actions', entity: Action },
        { name: 'members', entity: User, property: 'email' },
        { name: 'owner', entity: User, property: 'email', type: 'manyToOne' },
      ],
      dates: ['startDate', 'endDate'],
    });
  });
})();
