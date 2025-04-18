import { Resolver } from 'type-graphql';

import { Tag } from '@/entities';
import { Query } from 'type-graphql';

@Resolver(Tag)
export class TagResolver {
  @Query(() => [Tag])
  async getAllTags() {
    const tags = await Tag.find();
    return tags;
  }
}
