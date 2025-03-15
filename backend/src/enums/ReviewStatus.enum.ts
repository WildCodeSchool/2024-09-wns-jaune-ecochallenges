import { registerEnumType } from 'type-graphql';

export enum ReviewStatus {
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Rejected = 'REJECTED',
}

registerEnumType(ReviewStatus, {
  name: 'ReviewStatus',
  description: 'The status of an action or review',
});
