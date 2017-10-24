import { Db as IDb, ObjectId } from 'mongodb';
import { IProject } from '../types/IProject';

export const getProject = async (db: IDb, id: string | ObjectId): Promise<IProject> => {
  const project = await db.collection('projects').findOne<IProject>({
    _id: new ObjectId(id),
  });

  return project;
};
