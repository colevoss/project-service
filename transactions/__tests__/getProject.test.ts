import { Db as IDb, ObjectId } from 'mongodb';
import { IProject } from '../../types/IProject';
import { getProject } from '../getProject';
import { mongo } from '../../utils/mongo';

let db: IDb;
let project;
let projectId: ObjectId;

beforeAll(async () => {
  db = await mongo();

  const projectInsert = await db.collection('projects').insertOne({ name: 'Test Project' });
  projectId = projectInsert.insertedId;

  project = await getProject(db, projectId);
});

afterAll(async () => {
  await db.close();
});

test('Gets project from database by id', () => {
  expect(project.name).toBe('Test Project');
});

test('Project has matching id', () => {
  expect(projectId.toHexString()).toBe(project._id.toHexString());
});
