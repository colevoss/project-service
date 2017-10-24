import { Db as IDb, ObjectId } from 'mongodb';
import { IProjectInput } from '../types/IProject';

export const createProject = async (db: IDb, projectInput: IProjectInput): Promise<ObjectId> => {
  const projectData = {
    ...projectInput,
    groupId: new ObjectId(projectInput.groupId),
  };

  const projectInsert = await db.collection('projects').insertOne(projectData);

  if (projectInsert.insertedCount == 0) {
    throw 'A user could not be created';
  }

  const projectId = projectInsert.insertedId;

  return projectId;
};
