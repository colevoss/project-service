import { Db as IDb, ObjectId } from 'mongodb';
import { IProject } from '../../types/IProject';
import { createProject } from '../createProject';
import { mongo } from '../../utils/mongo';

let db: IDb;
const projectInput = {
  name: 'Test Project',
  groupId: '59dc2f34eafc40e0d61b6297',
};

let projectId;
let project: IProject;

beforeAll(async () => {
  db = await mongo();

  projectId = await createProject(db, projectInput);

  project = await db.collection('projects').findOne<IProject>({ _id: projectId });
});

afterAll(async () => {
  await db.close();
});

test('Creates a project in the database', () => {
  expect(project.name).toBe(projectInput.name);
});

test('Creates project with provided groupId', () => {
  expect(project.groupId.toHexString()).toBe(projectInput.groupId);
});

test('Transforms userIds to ObjectIds', () => {
  expect(project.groupId).toBeInstanceOf(ObjectId);
});
