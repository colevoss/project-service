import { Db as IDb, ObjectId } from 'mongodb';
import { IProject } from '../../types/IProject';
import { addTrack } from '../addTrack';
import { mongo } from '../../utils/mongo';

let db: IDb;
let project: IProject;
let projectId: ObjectId;
let trackId = '5a19e73b951333456b4c88c3';

beforeAll(async () => {
  db = await mongo();

  const projectInsert = await db.collection('projects').insertOne({ name: 'Test Project' });
  projectId = projectInsert.insertedId;

  project = await addTrack(db, projectId, trackId);
});

afterAll(async () => {
  await db.close();
});

test('Adds a track id to the project', () => {
  expect(project.trackIds).toHaveLength(1);
  expect(project.trackIds[0]).toBeInstanceOf(ObjectId);
  expect(project.trackIds[0].toHexString()).toBe(trackId);
});

test('Does not add the same trackId twice', async () => {
  const project2 = await addTrack(db, projectId, trackId);

  expect(project2.trackIds).toHaveLength(1);
});
