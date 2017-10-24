import { Db as IDb, ObjectId } from 'mongodb';
import { IProject } from '../types/IProject';

const mapToObjectIds = (ids: Array<string | ObjectId>): ObjectId[] => ids.map(id => new ObjectId(id));

export const getManyProjects = async (db: IDb, ids: Array<string | ObjectId>): Promise<Array<IProject>> => {
  const projects = await db
    .collection('projects')
    .find<IProject>({
      _id: {
        $in: mapToObjectIds(ids),
      },
    })
    .toArray();

  return projects;
};
