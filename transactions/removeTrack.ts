import { Db as IDb, ObjectId } from 'mongodb';
import { IProject } from '../types/IProject';

import { getProject } from './getProject';

export const removeTrack = async (
  db: IDb,
  projectId: string | ObjectId,
  trackId: string | ObjectId
): Promise<IProject> => {
  const projectOid = new ObjectId(projectId);
  const trackOId = new ObjectId(trackId);

  const projectUpdate = await db.collection('projects').findOneAndUpdate(
    { _id: projectOid },
    {
      $pull: {
        trackIds: trackOId,
      },
    }
  );

  return await getProject(db, projectOid);
};
