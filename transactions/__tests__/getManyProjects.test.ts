import { Db as IDb, ObjectId } from 'mongodb';
import { IProject } from '../../types/IProject';
import { getManyProjects } from '../getManyProjects';
import { mongo } from '../../utils/mongo';

let db: IDb;
let projects;

const projectInputs = [{ name: 'Test Project 1' }, { name: 'Test Project 2' }];

let projectIds: ObjectId[];

beforeAll(async () => {
  db = await mongo();

  const projectInserts = await db.collection('projects').insertMany(projectInputs);
  projectIds = projectInserts.insertedIds;

  projects = await getManyProjects(db, projectIds);
});

afterAll(async () => {
  await db.close();
});

test('Gets projects for each id provided', () => {
  expect(projects).toHaveLength(2);
});
