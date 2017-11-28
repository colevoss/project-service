import { ObjectId } from 'mongodb';

export interface IProject {
  _id: ObjectId;
  name: string;
  groupId: ObjectId;
  trackIds: ObjectId[];
}

export interface IProjectInput {
  name: string;
  groupId: string;
}
