import { Db as IDb, ObjectId } from 'mongodb';
import { IProject } from '../types/IProject';
import { getProject } from './getProject';

export const setProjectGroup = async (db: IDb, projectId: string | ObjectId, groupId: string): Promise<IProject> => {
  const projectUpdate = await db.collection('projects').findOneAndUpdate(
    { _id: new ObjectId(projectId) },
    {
      $set: { groupId: new ObjectId(groupId) },
    }
  );

  return await getProject(db, projectId);
};
